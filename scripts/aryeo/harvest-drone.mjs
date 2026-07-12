/**
 * Harvest real drone/aerial shots for the gallery's add-ons showcase.
 * Drone images are identified by DJI in the filename (DJI = the drone maker).
 * Boundary/lot-line overlays (DJI_*landboundary.jpg) are excluded here — those
 * are a separate "outline edit" deliverable for a later add-on.
 *
 * Usage: KEYFILE=/path/to/aryeo_key.txt node scripts/aryeo/harvest-drone.mjs
 * Output: data/drone-showcase.json
 */
import fs from "node:fs";

const KEY = fs.readFileSync(process.env.KEYFILE, "utf8").trim();
const H = { Authorization: `Bearer ${KEY}`, Accept: "application/json" };
const cur = JSON.parse(
  fs.readFileSync(new URL("../../data/gallery-curated.json", import.meta.url)),
);

// Aerial-rich first: land + new construction, then residential as backup.
const order = { "lot-land": 0, "builder-new-construction": 1 };
const pool = [...cur]
  .filter((c) => (c.count || 0) > 0)
  .sort((a, b) => (order[a.cat] ?? 2) - (order[b.cat] ?? 2))
  .slice(0, 40);

const out = [];
const perCity = {};
for (const p of pool) {
  if (out.length >= 12) break;
  const r = await fetch(
    `https://api.aryeo.com/v1/listings/${p.id}?include=images`,
    { headers: H },
  );
  if (!r.ok) continue;
  const d = (await r.json()).data || {};
  const drone = (d.images || []).filter(
    (im) =>
      /DJI/i.test(im.filename || "") &&
      !/boundary|lot.?line|outline/i.test(im.filename || "") &&
      im.display_in_gallery !== false,
  );
  if (!drone.length) continue;
  const cap = (perCity[p.city] = (perCity[p.city] || 0) + 1);
  for (const im of drone.slice(0, cap > 1 ? 1 : 2)) {
    if (out.length >= 12) break;
    out.push({
      url: im.large_url || im.original_url,
      thumb: im.thumbnail_url,
      city: p.city,
      label: p.label,
    });
  }
}

fs.writeFileSync(
  new URL("../../data/drone-showcase.json", import.meta.url),
  JSON.stringify(out),
);
console.error(`wrote ${out.length} drone shots across ${Object.keys(perCity).length} listings`);
