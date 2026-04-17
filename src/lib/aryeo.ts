import "server-only";
import { ORDER_FORMS, type Vertical } from "@/lib/order-forms";

const API_BASE_URL =
  process.env.ARYEO_API_BASE_URL ?? "https://api.aryeo.com/v1";

export type CustomerInput = {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
};

export type AddressInput = {
  street_number?: string;
  street_name?: string;
  unit_number?: string;
  city?: string;
  state_or_province?: string;
  postal_code?: string;
  country?: string;
};

export type CreateSessionInput = {
  vertical: Vertical;
  customer?: CustomerInput;
  address?: AddressInput;
  successUrl?: string;
};

export class AryeoApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown, message: string) {
    super(message);
    this.name = "AryeoApiError";
    this.status = status;
    this.body = body;
  }
}

function compact<T extends object>(obj: T): Partial<T> {
  const out: Partial<T> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null && v !== "") {
      (out as Record<string, unknown>)[k] = v;
    }
  }
  return out;
}

export async function createOrderFormSession({
  vertical,
  customer,
  address,
  successUrl,
}: CreateSessionInput): Promise<string> {
  const apiKey = process.env.ARYEO_API_KEY;
  if (!apiKey) {
    throw new Error("ARYEO_API_KEY is not set");
  }

  const body: Record<string, unknown> = {
    order_form_id: ORDER_FORMS[vertical],
  };
  if (customer) {
    const c = compact(customer);
    if (Object.keys(c).length > 0) body.customer_data = c;
  }
  if (address) {
    const a = compact(address);
    if (Object.keys(a).length > 0) body.address_data = a;
  }
  if (successUrl) body.success_url = successUrl;

  const res = await fetch(`${API_BASE_URL}/order-form-sessions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await res.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text;
  }

  if (!res.ok) {
    throw new AryeoApiError(
      res.status,
      parsed,
      `Aryeo create session failed: ${res.status}`,
    );
  }

  const url = (parsed as { data?: { url?: string } } | null)?.data?.url;
  if (typeof url !== "string" || !url) {
    throw new AryeoApiError(
      res.status,
      parsed,
      "Aryeo response missing data.url",
    );
  }
  return url;
}
