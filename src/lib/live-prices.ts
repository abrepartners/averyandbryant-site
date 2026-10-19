import "server-only";
import type { SizeTier } from "./size-tiers";

// Size-priced residential products, read live from Aryeo so the website never
// shows a price the booking form doesn't. Aryeo is the source of truth for
// client-facing pricing; nothing here is typed in by hand.
//
// Looked up by product ID, not title: the retired pre-size packages share the
// same names, and the sized copies drop their "(sized)" suffix on rename.
export const SIZED_PRODUCTS = {
  "Listing Launch Kit": "01a14604-b63f-71bc-95f7-8eababbea987",
  "Listing Domination System": "01a14604-e77b-704e-9822-fca50aa9215a",
  "Market Takeover Blueprint": "01a14605-1950-7271-919c-ab527c36dab4",
  "Zillow 3D Tour + Interactive Floor Plan": "01a143b7-0bc2-728b-949c-3df84bd4127a",
} as const;

export type SizedProductName = keyof typeof SIZED_PRODUCTS;

export type SizedPrices = Partial<Record<SizedProductName, SizeTier[]>>;

const API_BASE_URL =
  process.env.ARYEO_API_BASE_URL ?? "https://api.aryeo.com/v1";

const num = (s: string) => Number(s.replace(/,/g, ""));

/**
 * Reads a variant title into a size range. Titles are ours and follow two
 * shapes: "Up to 3,500 sq ft" and "3,501 to 5,500 sq ft" (older products use
 * an en dash in place of "to"). Anything else is skipped.
 */
export function parseTierTitle(title: string): { min: number; max: number } | null {
  const upTo = title.match(/^\s*up to\s+([\d,]+)/i);
  if (upTo) return { min: 0, max: num(upTo[1]) };
  const range = title.match(/^\s*([\d,]+)\s*(?:to|-|–)\s*([\d,]+)/i);
  if (range) return { min: num(range[1]), max: num(range[2]) };
  return null;
}

type AryeoVariant = { title?: string | null; price?: number | null };
type AryeoProduct = { id: string; variants?: AryeoVariant[] };

export async function getSizedPrices(): Promise<SizedPrices> {
  const apiKey = process.env.ARYEO_API_KEY;
  if (!apiKey) return {};

  const wanted = new Map<string, SizedProductName>(
    (Object.entries(SIZED_PRODUCTS) as [SizedProductName, string][]).map(
      ([name, id]) => [id, name],
    ),
  );
  const out: SizedPrices = {};

  for (let page = 1; page <= 5 && wanted.size > Object.keys(out).length; page++) {
    const res = await fetch(`${API_BASE_URL}/products?per_page=100&page=${page}`, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
      next: { revalidate: 600 },
    });
    if (!res.ok) {
      console.error("[live-prices] Aryeo products failed", res.status);
      break;
    }
    const body = (await res.json()) as {
      data?: AryeoProduct[];
      links?: { next?: string | null };
    };
    for (const p of body.data ?? []) {
      const name = wanted.get(p.id);
      if (!name) continue;
      const tiers: SizeTier[] = [];
      for (const v of p.variants ?? []) {
        const range = v.title ? parseTierTitle(v.title) : null;
        if (range && typeof v.price === "number") tiers.push({ ...range, price: v.price });
      }
      tiers.sort((a, b) => a.min - b.min);
      if (tiers.length > 0) out[name] = tiers;
    }
    if (!body.links?.next) break;
  }

  return out;
}
