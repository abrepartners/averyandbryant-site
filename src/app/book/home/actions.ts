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

type AddressData = {
  latitude: number;
  longitude: number;
  street_number?: string;
  street_name?: string;
  unit_number?: string;
  city?: string;
  state_or_province?: string;
  postal_code?: string;
  country?: string;
};

type CensusMatch = {
  matchedAddress?: string;
  coordinates?: { x?: number; y?: number };
  addressComponents?: {
    preDirection?: string;
    streetName?: string;
    suffixType?: string;
    suffixDirection?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
};

const title = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Turns the typed address into the shape Aryeo needs to pre-fill its address
 * step. Aryeo rejects an address without coordinates, so this asks the US
 * Census geocoder (free, no key) for them. Any failure returns null and the
 * visitor simply types the address again on the booking form.
 */
async function lookUpAddress(text: string, unit: string): Promise<AddressData | null> {
  if (!text) return null;
  try {
    const url =
      "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?" +
      new URLSearchParams({ address: text, benchmark: "Public_AR_Current", format: "json" });
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      console.error("[book/home] address lookup failed", res.status);
      return null;
    }
    const body = (await res.json()) as { result?: { addressMatches?: CensusMatch[] } };
    const m = body.result?.addressMatches?.[0];
    const lat = m?.coordinates?.y;
    const lng = m?.coordinates?.x;
    if (typeof lat !== "number" || typeof lng !== "number") return null;

    const c = m?.addressComponents ?? {};
    const street = [c.preDirection, c.streetName, c.suffixType, c.suffixDirection]
      .filter(Boolean)
      .join(" ");
    return {
      latitude: lat,
      longitude: lng,
      street_number: m?.matchedAddress?.match(/^\s*(\S+)/)?.[1],
      street_name: street ? title(street) : undefined,
      unit_number: unit || undefined,
      city: c.city ? title(c.city) : undefined,
      state_or_province: c.state || undefined,
      postal_code: c.zip || undefined,
      country: "US",
    };
  } catch (err) {
    console.error("[book/home] address lookup error", err);
    return null;
  }
}

export async function startHomeBooking(
  _prev: HomeBookingState,
  formData: FormData,
): Promise<HomeBookingState> {
  const email = str(formData, "email");
  if (!email) return { error: "Email is required." };
  // Aryeo rejects customer_data without a phone (422), which drops the pre-fill.
  if (!str(formData, "phone")) return { error: "Phone is required." };

  const address = await lookUpAddress(str(formData, "address"), str(formData, "unit"));

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
      address: address ?? undefined,
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
