import "server-only";
import { parseTierTitle, type SizeTier } from "./size-tiers";

// Residential products read live from Aryeo so the website never shows a
// price the booking form doesn't. Aryeo is the source of truth for
// client-facing pricing; nothing here is typed in by hand.
//
// Looked up by product ID, not title: the retired pre-size packages share the
// same names, and the sized copies drop their "(sized)" suffix on rename.
export const PRODUCT_IDS = {
  launch: "01a14604-b63f-71bc-95f7-8eababbea987",
  domination: "01a14604-e77b-704e-9822-fca50aa9215a",
  takeover: "01a14605-1950-7271-919c-ab527c36dab4",
  // Single services: the main products on the pilot form (B40, 2026-10-19),
  // so the price here is the one the visitor adds there.
  photos: "01a15293-6c9f-71c7-85f8-6fd4834e08f7",
  video: "01a15293-9a91-701f-aa97-8945b1c09f16",
  drone: "01a15295-639c-7229-b6a5-de715c18e456",
  zillow3d: "01a15293-f4b0-7192-ae0e-72607d83b70a",
  floorPlan: "01a15295-9154-712d-8275-1eb1dd98ebc6",
  twilight: "01a15295-f286-71df-8945-5f5167dc6861",
  reel: "01a15295-be26-7027-947d-f968746e6c5a",
} as const;

export type ProductKey = keyof typeof PRODUCT_IDS;

/** A variant as Aryeo names and prices it. Price in cents. */
export type LiveVariant = { title: string; price: number };

export type LiveProducts = Partial<Record<ProductKey, LiveVariant[]>>;

const API_BASE_URL =
  process.env.ARYEO_API_BASE_URL ?? "https://api.aryeo.com/v1";

type AryeoVariant = { title?: string | null; price?: number | null };
type AryeoProduct = { id: string; variants?: AryeoVariant[] };

export async function getLiveProducts(): Promise<LiveProducts> {
  const apiKey = process.env.ARYEO_API_KEY;
  if (!apiKey) return {};

  const wanted = new Map<string, ProductKey>(
    (Object.entries(PRODUCT_IDS) as [ProductKey, string][]).map(([key, id]) => [id, key]),
  );
  const out: LiveProducts = {};

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
      const key = wanted.get(p.id);
      if (!key) continue;
      const variants: LiveVariant[] = [];
      for (const v of p.variants ?? []) {
        if (typeof v.price === "number") variants.push({ title: v.title ?? "", price: v.price });
      }
      if (variants.length > 0) out[key] = variants;
    }
    if (!body.links?.next) break;
  }

  return out;
}

/** Size tiers when every variant is a size range, otherwise null. */
export function sizeTiers(variants: LiveVariant[] | undefined): SizeTier[] | null {
  if (!variants?.length) return null;
  const tiers: SizeTier[] = [];
  for (const v of variants) {
    const range = parseTierTitle(v.title);
    if (!range) return null;
    tiers.push({ ...range, price: v.price });
  }
  return tiers.sort((a, b) => a.min - b.min);
}
