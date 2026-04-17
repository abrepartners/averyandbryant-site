"use server";

import { redirect } from "next/navigation";
import { ORDER_FORMS, type Vertical } from "@/lib/order-forms";
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
      address: {
        street_number: str(formData, "street_number") || undefined,
        street_name: str(formData, "street_name") || undefined,
        city: str(formData, "city") || undefined,
        state_or_province: str(formData, "state") || undefined,
        postal_code: str(formData, "postal_code") || undefined,
      },
    });
  } catch (err) {
    if (err instanceof AryeoApiError) {
      console.error("[order] Aryeo error", err.status, err.body);
    } else {
      console.error("[order] unexpected error", err);
    }
    return {
      error:
        "We couldn't start your order. Please try again or call (501) 502-2925.",
    };
  }

  redirect(url);
}
