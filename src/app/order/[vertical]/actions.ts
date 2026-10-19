"use server";

import { redirect } from "next/navigation";
import { ORDER_FORMS, orderFormUrl, type Vertical } from "@/lib/order-forms";
import { AryeoApiError, createOrderFormSession } from "@/lib/aryeo";

export type OrderState = {
  error?: string;
};

const VERTICALS = Object.keys(ORDER_FORMS) as Vertical[];

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function submitOrder(
  _prev: OrderState,
  formData: FormData,
): Promise<OrderState> {
  const vertical = str(formData, "vertical") as Vertical;
  if (!VERTICALS.includes(vertical)) {
    return { error: "Invalid service selection." };
  }

  const email = str(formData, "email");
  if (!email) return { error: "Email is required." };
  // Aryeo rejects customer_data without a phone (422), which drops the pre-fill.
  if (!str(formData, "phone")) return { error: "Phone is required." };

  let url: string;
  try {
    url = await createOrderFormSession({
      vertical,
      customer: {
        email,
        first_name: str(formData, "first_name") || undefined,
        last_name: str(formData, "last_name") || undefined,
        phone: str(formData, "phone") || undefined,
      },
    });
  } catch (err) {
    if (err instanceof AryeoApiError) {
      // A session can fail for a form Aryeo will not pre-fill (for example a
      // private form). The booking page itself still works by link, so send
      // the visitor straight there instead of showing an error (2026-10-13).
      console.error("[order] Aryeo error, falling back to the form link", err.status, err.body);
      redirect(orderFormUrl(vertical));
    }
    console.error("[order] unexpected error", err);
    return {
      error:
        "We couldn't start your order. Please try again or call (501) 502-2925.",
    };
  }

  redirect(url);
}
