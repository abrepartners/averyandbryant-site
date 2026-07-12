/**
 * Harvest real lot-line / property-boundary overlay images (the "outline edit"
 * add-on deliverable). Identified by boundary/lot-line/outline in the filename
 * (e.g. DJI_0398landboundary.jpg).
 *
 * Usage: KEYFILE=/path/to/aryeo_key.txt node scripts/aryeo/harvest-boundary.mjs
 * Output: data/boundary-showcase.json
 */
import fs from "node:fs";

const KEY = fs.readFileSync(process.env.KEYFILE, "utf8").trim();
const H = { Authorization: `Bearer ${KEY}`, Accept: "application/json" };
const cur = JSON.parse(
  fs.readFileSync(new URL("../../data/gallery-curated.json", import.meta.url)),
);

// Boundary overlays live mostly on land listings — scan those first.
const order = { "lot-land": 0, "builder-new-construction": 1 };
const pool = [...cur]
  .filter((c) => (c.count || 0) > 0)
  .sort((a, b) => (order[a.cat] ?? 2) - (order[b.cat] ?? 2))
  .slice(0, 50);

const out = [];
for (const p of pool) {
  if (out.length >= 6) break;
  const r = await fetch(
    `https://api.aryeo.com/v1/listings/${p.id}?include=images`,
    { headers: H },
  );
  if (!r.ok) continue;
  const d = (await r.json()).data || {};
  const bnd = (d.images || []).filter((im) =>
    /boundary|lot.?line|outline|parcel|site.?plan/i.test(im.filename || ""),
  );
  for (const im of bnd.slice(0, 2)) {
    if (out.length >= 6) break;
    out.push({
      url: im.large_url || im.original_url,
      thumb: im.thumbnail_url,
      city: p.city,
      label: p.label,
    });
  }
}

fs.writeFileSync(
  new URL("../../data/boundary-showcase.json", import.meta.url),
  JSON.stringify(out),
);
console.error(`wrote ${out.length} lot-line/outline shots`);
