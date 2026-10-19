"use server";

import { redirect } from "next/navigation";
import { orderFormUrl } from "@/lib/order-forms";
import { AryeoApiError, createOrderFormSession } from "@/lib/aryeo";

export type HomeBookingState = {
  error?: string;
};

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function startHomeBooking(
  _prev: HomeBookingState,
  formData: FormData,
): Promise<HomeBookingState> {
  const email = str(formData, "email");
  if (!email) return { error: "Email is required." };
  // Aryeo rejects customer_data without a phone (422), which drops the pre-fill.
  if (!str(formData, "phone")) return { error: "Phone is required." };

  let url: string;
  try {
    url = await createOrderFormSession({
      vertical: "real-estate",
      customer: {
        email,
        first_name: str(formData, "first_name") || undefined,
        last_name: str(formData, "last_name") || undefined,
        phone: str(formData, "phone") || undefined,
      },
      // No address on purpose: a pre-filled address makes Aryeo skip its
      // first step, which is also where it asks the home size, and then every
      // size tier shows (tested 2026-10-18, even with step_visibility set).
    });
  } catch (err) {
    if (err instanceof AryeoApiError) {
      // Same fallback as /order: the booking form still works by link.
      console.error("[book/home] Aryeo error, falling back to the form link", err.status, err.body);
      redirect(orderFormUrl("real-estate"));
    }
    console.error("[book/home] unexpected error", err);
    return {
      error:
        "We couldn't start your order. Please try again or call (501) 502-2925.",
    };
  }

  redirect(url);
}
