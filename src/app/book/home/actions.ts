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

type PlaceComponent = { longText?: string; shortText?: string; types?: string[] };

/**
 * Turns the typed address into the shape Aryeo needs to pre-fill its address
 * step. Aryeo rejects an address without coordinates, so this asks Google
 * Places for them. Any failure returns null and the visitor simply types the
 * address again on the booking form.
 */
async function lookUpAddress(text: string, unit: string): Promise<AddressData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey || !text) return null;
  try {
    const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "places.location,places.addressComponents",
      },
      body: JSON.stringify({ textQuery: text, regionCode: "US", maxResultCount: 1 }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[book/home] address lookup failed", res.status);
      return null;
    }
    const body = (await res.json()) as {
      places?: {
        location?: { latitude?: number; longitude?: number };
        addressComponents?: PlaceComponent[];
      }[];
    };
    const place = body.places?.[0];
    const lat = place?.location?.latitude;
    const lng = place?.location?.longitude;
    if (typeof lat !== "number" || typeof lng !== "number") return null;

    const part = (type: string, short = false) => {
      const c = place?.addressComponents?.find((x) => x.types?.includes(type));
      return (short ? c?.shortText : c?.longText) || undefined;
    };
    return {
      latitude: lat,
      longitude: lng,
      street_number: part("street_number"),
      street_name: part("route"),
      unit_number: unit || undefined,
      city: part("locality") ?? part("postal_town"),
      state_or_province: part("administrative_area_level_1", true),
      postal_code: part("postal_code"),
      country: part("country", true),
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
