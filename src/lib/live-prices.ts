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
  photos: "019f4d81-bf02-73e5-b149-62734109a0ae",
  video: "019f4d82-3860-7101-8525-5403640fb833",
  drone: "019f4d83-0a21-710a-8ae4-9b81d70e73a9",
  zillow3d: "01a143b7-0bc2-728b-949c-3df84bd4127a",
  floorPlan: "019f4d84-47b7-72b2-85c0-960b6fa7e6a0",
  twilight: "019f4d85-8cd7-7389-b72f-401d9ee5cd9d",
  reel: "019f4d93-ee14-70ea-b534-e3e1b82d9715",
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
