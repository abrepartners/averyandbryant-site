/**
 * Order tags override the inferred vertical in data/gallery-listings.json.
 *
 * The owner tags ORDERS in Aryeo by hand; those tags are the authority for a
 * listing's gallery vertical. This step reads scripts/aryeo/order-tags.json
 * (written by order-tags.mjs) and, for every listing whose order carries a
 * mapped tag, sets `vertical` and records
 * `classification-source: "order-tag:<name>"`. The inferred value is kept in
 * `inferred-vertical` / `inferred-source` so a rerun can restore it when a
 * tag is removed. Listings the dump has never seen (orders newer than the
 * harvest) are fetched from Aryeo and appended in the dump's row format.
 *
 * Usage: node --env-file=/path/to/.env scripts/aryeo/apply-order-tags.mjs
 */
import fs from "node:fs";
import path from "node:path";

// Tag name -> gallery vertical. First match wins when an order has several.
export const TAG_TO_VERTICAL = [
  ["COMMERCIAL", "commercial"],
  ["church", "commercial"],
  ["Golf Course", "commercial"],
  ["Apartment", "multi-family"],
  ["AirBNB/Rental", "airbnb-str"],
  ["Land/Lot", "lot-land"],
  ["HD HOMES", "builder-new-construction"],
  ["Progress", "builder-new-construction"],
];

const here = path.dirname(new URL(import.meta.url).pathname);
const dumpPath = path.join(here, "../../data/gallery-listings.json");
const dump = JSON.parse(fs.readFileSync(dumpPath, "utf8"));
const tags = JSON.parse(fs.readFileSync(path.join(here, "order-tags.json"), "utf8")).tags;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

// listingId -> { tag, vertical, order }
const byListing = new Map();
for (const [tag, vertical] of TAG_TO_VERTICAL) {
  for (const o of tags[tag] || []) {
    if (!o.listingId || byListing.has(o.listingId)) continue;
    byListing.set(o.listingId, { tag, vertical, order: o });
  }
}

async function fetchRow(id, order) {
  const KEY = process.env.ARYEO_API_KEY;
  if (!KEY) throw new Error("ARYEO_API_KEY required to fetch listings missing from the dump");
  const r = await fetch(`https://api.aryeo.com/v1/listings/${id}?include=images`, {
    headers: { Authorization: `Bearer ${KEY}`, Accept: "application/json", "User-Agent": UA },
  });
  if (!r.ok) throw new Error(`listing ${id}: HTTP ${r.status}`);
  const d = (await r.json()).data || {};
  const a = d.address || {};
  const imgs = (d.images || [])
    .filter((im) => im.display_in_gallery !== false && im.large_url)
    .sort((x, y) => (x.index || 0) - (y.index || 0));
  const hero = imgs[0];
  const slug = (d.thumbnail_url || hero?.large_url || "").match(/\/listings\/([^/]+)\//)?.[1];
  const street = a.unparsed_address_part_one || [a.street_number, a.street_name].filter(Boolean).join(" ") || null;
  const address = a.unparsed_address || [street, a.city, [a.state_or_province, a.postal_code].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  return {
    "aryeo-listing-id": d.id,
    address,
    street,
    city: a.city || null,
    state: a.state_or_province || null,
    zip: a.postal_code || null,
    latitude: a.latitude ?? null,
    longitude: a.longitude ?? null,
    "property-type": d.type || null,
    "property-sub-type": d.sub_type || null,
    beds: d.building?.bedrooms ?? null,
    baths: d.building?.bathrooms ?? null,
    sqft: d.building?.square_feet ?? null,
    "lot-acres": d.lot?.size_acres ?? null,
    "year-built": d.building?.year_built ?? null,
    "list-price": d.price?.list_price ?? null,
    "mls-number": d.mls_number || null,
    status: d.status || null,
    "standard-status": d.standard_status || null,
    "delivery-status": d.delivery_status || null,
    "order-date": order.created || null,
    "order-number": order.number,
    "order-count": 1,
    "order-form": null,
    "hero-image-url": d.large_thumbnail_url || hero?.large_url || null,
    "thumbnail-url": d.thumbnail_url || hero?.thumbnail_url || null,
    "image-count": imgs.length,
    "public-website-url": slug ? `https://homes.averyandbryant.com/sites/${slug}/branded` : null,
    "public-website-url-source": slug ? "derived-from-cdn-slug" : null,
    "login-gated-url": `https://avery-bryant.aryeo.com/admin/listings/${d.id}/edit`,
    "is-showcasable": !!d.is_showcasable,
    "is-showcase": !!d.is_showcase,
    vertical: "residential-listing",
    confidence: "low",
    "classification-source": "type-default",
  };
}

const byId = new Map(dump.map((r) => [r["aryeo-listing-id"], r]));
const counts = {};
let restored = 0;
let fetched = 0;

// Restore rows whose tag went away.
for (const r of dump) {
  const src = String(r["classification-source"] || "");
  if (src.startsWith("order-tag:") && !byListing.has(r["aryeo-listing-id"])) {
    r.vertical = r["inferred-vertical"] || r.vertical;
    r["classification-source"] = r["inferred-source"] || "type-default";
    r.confidence = "low";
    delete r["inferred-vertical"];
    delete r["inferred-source"];
    restored++;
  }
}

for (const [id, { tag, vertical, order }] of byListing) {
  let row = byId.get(id);
  if (!row) {
    row = await fetchRow(id, order);
    dump.push(row);
    byId.set(id, row);
    fetched++;
    console.error(`fetched #${order.number} ${row.address} (${row["image-count"]} images)`);
  }
  const src = String(row["classification-source"] || "");
  if (!src.startsWith("order-tag:")) {
    row["inferred-vertical"] = row.vertical;
    row["inferred-source"] = row["classification-source"];
  }
  const before = row.vertical;
  row.vertical = vertical;
  row.confidence = "high";
  row["classification-source"] = `order-tag:${tag}`;
  row["order-tag"] = tag;
  counts[tag] ??= { listings: 0, changed: 0 };
  counts[tag].listings++;
  if (before !== vertical) counts[tag].changed++;
}

fs.writeFileSync(dumpPath, JSON.stringify(dump, null, 2) + "\n");
console.error(`tagged listings: ${byListing.size}, fetched ${fetched}, restored ${restored}`);
for (const [tag, c] of Object.entries(counts))
  console.error(`  ${tag.padEnd(14)} ${c.listings} listings, ${c.changed} reclassified`);
