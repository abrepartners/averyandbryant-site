/**
 * Harvest full image sets for a curated set of FEATURED homes (not a mass pull).
 * Picks a small, city-diverse selection of strong listings and fetches ~12
 * gallery images each via the Aryeo API.
 *
 * Usage: KEYFILE=/path/to/aryeo_key.txt node scripts/aryeo/harvest-featured.mjs
 * Output: data/featured-homes.json
 */
import fs from "node:fs";

const KEY = fs.readFileSync(process.env.KEYFILE, "utf8").trim();
const HEADERS = { Authorization: `Bearer ${KEY}`, Accept: "application/json" };
const cur = JSON.parse(
  fs.readFileSync(new URL("../../data/gallery-curated.json", import.meta.url)),
);

// Candidate selection: prefer new-construction + high image count, keep city
// diversity, cap at 6. (Thomas approves/swaps the final lineup.)
const scored = [...cur].sort(
  (a, b) =>
    (b.cat === "builder-new-construction" ? 1 : 0) -
      (a.cat === "builder-new-construction" ? 1 : 0) || b.count - a.count,
);
const picked = [];
const cities = new Set();
for (const c of scored) {
  if (picked.length >= 6) break;
  if ((c.count || 0) < 15) continue;
  if (cities.has(c.city) && picked.length >= 3) continue;
  picked.push(c);
  cities.add(c.city);
}

const out = [];
for (const p of picked) {
  const r = await fetch(
    `https://api.aryeo.com/v1/listings/${p.id}?include=images`,
    { headers: HEADERS },
  );
  if (!r.ok) {
    console.error("skip", p.city, r.status);
    continue;
  }
  const d = (await r.json()).data || {};
  const imgs = (d.images || [])
    .filter((im) => im.display_in_gallery !== false)
    .sort((a, b) => (a.index || 0) - (b.index || 0))
    .slice(0, 12)
    .map((im) => ({
      url: im.large_url || im.original_url,
      thumb: im.thumbnail_url,
      caption: im.caption || "",
    }));
  if (imgs.length < 6) {
    console.error("too few imgs, skip", p.city, imgs.length);
    continue;
  }
  out.push({
    id: p.id,
    city: p.city,
    label: p.label,
    beds: p.beds,
    baths: p.baths,
    sqft: p.sqft,
    images: imgs,
  });
  console.error(`${p.city} · ${p.label} — ${imgs.length} imgs`);
}

fs.writeFileSync(
  new URL("../../data/featured-homes.json", import.meta.url),
  JSON.stringify(out),
);
console.error(`wrote ${out.length} featured homes`);
