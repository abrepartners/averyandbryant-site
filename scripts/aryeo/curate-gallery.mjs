/**
 * Curate the committed Aryeo listing dump into a small, gallery-ready dataset.
 *
 * Input:  data/gallery-listings.json  (full 2,222-record dump from Aryeo)
 * Output: data/gallery-curated.json   (~120 best/most-recent listings, minimal fields)
 *
 * The page imports the curated file (small bundle); this script is the
 * reproducible step to regenerate it. Re-run after a fresh Aryeo harvest.
 *
 * Usage: node scripts/aryeo/curate-gallery.mjs
 */
import fs from "node:fs";

const src = JSON.parse(
  fs.readFileSync(new URL("../../data/gallery-listings.json", import.meta.url)),
);
const arr = Array.isArray(src) ? src : src.listings || Object.values(src);

// vertical slug -> public category label
const LABEL = {
  "residential-listing": "Residential",
  "builder-new-construction": "New Construction",
  "lot-land": "Land",
  "airbnb-str": "Short-Term Rentals",
  "multi-family": "Multi-Family",
  commercial: "Commercial",
};
// per-category display cap (keeps the page snappy; residential is the deep well)
const CAP = {
  "residential-listing": 60,
  "builder-new-construction": 8,
  "lot-land": 24,
  "airbnb-str": 18,
  "multi-family": 4,
  commercial: 1,
};
const ORDER = Object.keys(LABEL);

const ok = arr.filter(
  (r) => r["hero-image-url"] && r["thumbnail-url"] && (r["image-count"] || 0) > 0,
);
// most recent first
ok.sort((a, b) =>
  String(b["order-date"] || "").localeCompare(String(a["order-date"] || "")),
);

const seen = {};
const out = [];
for (const r of ok) {
  const v = r.vertical;
  if (!LABEL[v]) continue;
  seen[v] = (seen[v] || 0) + 1;
  if (seen[v] > (CAP[v] || 9999)) continue;
  out.push({
    id: r["aryeo-listing-id"],
    cat: v,
    label: LABEL[v],
    hero: r["hero-image-url"],
    thumb: r["thumbnail-url"],
    city: r.city || "",
    street: r.street || "",
    beds: r.beds ?? null,
    baths: r.baths ?? null,
    sqft: r.sqft ?? null,
    count: r["image-count"] || 0,
    tour: r["public-website-url"] || "",
  });
}
out.sort((a, b) => ORDER.indexOf(a.cat) - ORDER.indexOf(b.cat));

fs.writeFileSync(
  new URL("../../data/gallery-curated.json", import.meta.url),
  JSON.stringify(out),
);
const counts = {};
out.forEach((o) => (counts[o.label] = (counts[o.label] || 0) + 1));
console.log(`curated ${out.length} listings:`, counts);
