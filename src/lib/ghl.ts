import "server-only";

const API_BASE = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

function token() {
  const t = process.env.GHL_API_TOKEN;
  if (!t) throw new Error("GHL_API_TOKEN not set");
  return t;
}

function locationId() {
  const id = process.env.GHL_LOCATION_ID;
  if (!id) throw new Error("GHL_LOCATION_ID not set");
  return id;
}

export type GhlContactInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
  tags?: string[];
};

async function ghl(method: string, path: string, body?: unknown) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token()}`,
      Version: VERSION,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
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
    throw new Error(
      `GHL ${method} ${path} → ${res.status}: ${JSON.stringify(parsed)}`,
    );
  }
  return parsed;
}

export async function upsertContact(input: GhlContactInput) {
  const payload = {
    locationId: locationId(),
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    source: input.source ?? "stripe-checkout",
    tags: input.tags,
  };
  return (await ghl("POST", "/contacts/upsert", payload)) as {
    new?: boolean;
    contact?: { id: string };
  };
}

export async function addTags(contactId: string, tags: string[]) {
  return ghl("POST", `/contacts/${contactId}/tags`, { tags });
}
