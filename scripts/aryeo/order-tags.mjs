/**
 * Scan every Aryeo order for its hand-applied order tags and write the
 * tag -> listing map the classification step relies on.
 *
 * The owner tags ORDERS in Aryeo (COMMERCIAL, Apartment, AirBNB/Rental,
 * Land/Lot, HD HOMES, Progress, ...). Those tags are the authority for the
 * gallery vertical; listing.type is almost always SINGLE_FAMILY. The tag
 * filters on GET /v1/orders are ignored by the API, so every page is walked.
 *
 * Usage: node --env-file=/path/to/.env scripts/aryeo/order-tags.mjs
 * Output: scripts/aryeo/order-tags.json
 *   { scannedAt, orders, tags: { "<TAG>": [ { number, orderId, listingId,
 *     fulfilled, address, created } ] } }
 */
import fs from "node:fs";
import path from "node:path";

const KEY = process.env.ARYEO_API_KEY;
if (!KEY) throw new Error("ARYEO_API_KEY required");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const HEADERS = { Authorization: `Bearer ${KEY}`, Accept: "application/json", "User-Agent": UA };
const here = path.dirname(new URL(import.meta.url).pathname);

const all = [];
let page = 1;
let last = 1;
do {
  const r = await fetch(
    `https://api.aryeo.com/v1/orders?per_page=100&page=${page}&include=tags,listing&sort=-created_at`,
    { headers: HEADERS },
  );
  if (!r.ok) throw new Error(`orders page ${page}: HTTP ${r.status}`);
  const j = await r.json();
  all.push(...(j.data || []));
  last = j.meta?.last_page || 1;
  page++;
} while (page <= last && page <= 80);

const tags = {};
for (const o of all) {
  for (const t of o.tags || []) {
    (tags[t.name] ??= []).push({
      number: o.number,
      orderId: o.id,
      listingId: o.listing?.id || null,
      fulfilled: o.fulfillment_status || null,
      address: o.listing?.address?.full_address || o.address?.full_address || null,
      created: o.created_at || null,
    });
  }
}
const out = { scannedAt: new Date().toISOString(), orders: all.length, tags };
fs.writeFileSync(path.join(here, "order-tags.json"), JSON.stringify(out, null, 1));
console.error(`orders ${all.length}, pages ${last}`);
console.error(
  Object.entries(tags)
    .map(([k, v]) => `${k}=${v.length}`)
    .sort()
    .join(", "),
);
