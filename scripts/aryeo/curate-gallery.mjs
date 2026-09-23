/**
 * Curate the committed Aryeo listing dump into the gallery-ready dataset.
 *
 * Input:  data/gallery-listings.json      (full dump, verticals already set by
 *                                          apply-order-tags.mjs)
 *         scripts/aryeo/hero-overrides.json (by-eye card decisions: hero/thumb
 *                                          replacing the Aryeo cover, a `cat`
 *                                          correction where no order tag
 *                                          applies, or `skip` to hold a
 *                                          listing out of the gallery)
 * Output: data/gallery-curated.json       (minimal fields, medium rendition
 *                                          verified per card with a HEAD)
 *
 * Order-tagged listings (classification-source order-tag:*) are curated first
 * and never fall to the per-category cap; the rest fill by most recent order.
 *
 * Usage: node scripts/aryeo/curate-gallery.mjs
 */
import fs from "node:fs";

const src = JSON.parse(
  fs.readFileSync(new URL("../../data/gallery-listings.json", import.meta.url)),
);
const arr = Array.isArray(src) ? src : src.listings || Object.values(src);
const overridesUrl = new URL("./hero-overrides.json", import.meta.url);
const overrides = fs.existsSync(overridesUrl)
  ? JSON.parse(fs.readFileSync(overridesUrl, "utf8"))
  : {};
const UA = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
};

// vertical slug -> public category label
const LABEL = {
  "residential-listing": "Residential",
  "builder-new-construction": "New Construction",
  "lot-land": "Land",
  "airbnb-str": "Short-Term Rentals",
  "multi-family": "Multi-Family",
  commercial: "Commercial",
};
// per-category display cap for untagged listings (residential is the deep well)
const CAP = {
  "residential-listing": 60,
  "builder-new-construction": 8,
  "lot-land": 24,
  "airbnb-str": 18,
  "multi-family": 4,
  commercial: 4,
};
const MIN_IMAGES = 3;
const ORDER = Object.keys(LABEL);
const isTagged = (r) => String(r["classification-source"] || "").startsWith("order-tag:");

const ok = arr.filter(
  (r) =>
    r["hero-image-url"] && r["thumbnail-url"] && (r["image-count"] || 0) >= MIN_IMAGES,
);
// tagged first, then most recent first
ok.sort(
  (a, b) =>
    Number(isTagged(b)) - Number(isTagged(a)) ||
    String(b["order-date"] || "").localeCompare(String(a["order-date"] || "")),
);

const seen = {};
const out = [];
for (const r of ok) {
  const id = r["aryeo-listing-id"];
  const ov = overrides[id] || {};
  if (ov.skip) continue; // reviewed out (note in the override)
  let v = r.vertical;
  if (ov.cat && ov.cat !== v) {
    if (isTagged(r)) console.error(`override cat ignored for ${r.street} (order tag wins: ${r["classification-source"]})`);
    else v = ov.cat;
  }
  if (!LABEL[v]) continue;
  if (!isTagged(r)) {
    seen[v] = (seen[v] || 0) + 1;
    if (seen[v] > (CAP[v] || 9999)) continue;
  }
  out.push({
    id,
    cat: v,
    label: LABEL[v],
    hero: ov.hero || r["hero-image-url"],
    thumb: ov.thumb || r["thumbnail-url"],
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

// The Aryeo CDN serves a 1024px medium rendition for most images even though
// the API does not list it; verify per card so cards never point at a 404.
let i = 0;
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (i < out.length) {
      const c = out[i++];
      const m = c.hero.replace("/resized/large/large-", "/resized/medium/medium-");
      if (m === c.hero) continue;
      try {
        const r = await fetch(m, { method: "HEAD", headers: UA });
        if (r.ok) c.medium = m;
      } catch {}
    }
  }),
);

fs.writeFileSync(
  new URL("../../data/gallery-curated.json", import.meta.url),
  JSON.stringify(out),
);
const counts = {};
out.forEach((o) => (counts[o.label] = (counts[o.label] || 0) + 1));
console.error(`curated ${out.length} listings:`, counts, `medium ${out.filter((o) => o.medium).length}`);
