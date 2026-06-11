#!/usr/bin/env node
// Harvest showcasable Aryeo listings + images, grouped by site vertical.
// Reads ARYEO_API_KEY from env. Writes catalog JSON to /tmp for downstream wiring.
// Read-only against Aryeo. Does NOT download anything (selection happens after mapping).

const KEY = process.env.ARYEO_API_KEY;
if (!KEY) { console.error("ARYEO_API_KEY not set"); process.exit(1); }
const BASE = "https://api.aryeo.com/v1";
const MAX_PAGES = Number(process.env.MAX_PAGES || 25); // 25 * 100 ≈ 2500 > 2149 total

// Aryeo `type` → site vertical. Builders/Airbnb/Branding are NOT pure property types,
// so they're resolved later (order_form / manual). We capture what type gives us.
function vertical(type, sub) {
  const t = (type || "").toUpperCase();
  const s = (sub || "").toUpperCase();
  if (t.includes("COMMERCIAL")) return "commercial";
  if (t.includes("LAND") || t.includes("LOT") || s.includes("LAND") || s.includes("LOT")) return "lot-land";
  if (t.includes("MULTI") || t.includes("INCOME") || s.includes("MULTI") || s.includes("DUPLEX") || s.includes("APARTMENT")) return "multi-family";
  if (t.includes("SINGLE") || t.includes("RESIDENTIAL") || t.includes("CONDO") || t.includes("TOWNHOUSE")) return "real-estate";
  return "other";
}

async function getPage(page) {
  const url = `${BASE}/listings?per_page=100&page=${page}&sort=-created_at`;
  const r = await fetch(url, { headers: { Authorization: `Bearer ${KEY}`, Accept: "application/json" } });
  if (!r.ok) throw new Error(`page ${page} HTTP ${r.status}`);
  return r.json();
}

const byVertical = {};
const commercial = [];
const typeCounts = {};
let totalSeen = 0, withImages = 0;

(async () => {
  let lastPage = 1;
  for (let p = 1; p <= MAX_PAGES; p++) {
    let json;
    try { json = await getPage(p); }
    catch (e) { console.error(String(e)); break; }
    lastPage = json?.meta?.last_page || lastPage;
    const data = json?.data || [];
    if (!data.length) break;
    for (const it of data) {
      totalSeen++;
      typeCounts[it.type] = (typeCounts[it.type] || 0) + 1;
      const imgs = (it.images || []).filter(i => i.display_in_gallery !== false && (i.large_url || i.original_url));
      if (!imgs.length) continue;
      if (!it.is_showcasable && !it.is_showcase) continue;
      withImages++;
      const addr = it.address || {};
      const rec = {
        id: it.id,
        type: it.type,
        sub_type: it.sub_type,
        address: addr.formatted_address || addr.raw || null,
        city: addr.city || null,
        status: it.standard_status || it.status,
        is_showcase: !!it.is_showcase,
        price: it.price ?? null,
        imageCount: imgs.length,
        images: imgs.slice(0, 24).map(i => ({
          id: i.id, url: i.large_url || i.original_url, caption: i.caption || null, index: i.index ?? null,
        })),
      };
      const v = vertical(it.type, it.sub_type);
      (byVertical[v] ||= []).push(rec);
      if (v === "commercial") commercial.push({ id: rec.id, address: rec.address, city: rec.city, type: rec.type, sub_type: rec.sub_type, imageCount: rec.imageCount });
    }
    if (p >= lastPage) break;
  }

  // Rank each vertical's listings by image count (more images = better shoot to pull from)
  for (const v of Object.keys(byVertical)) byVertical[v].sort((a, b) => b.imageCount - a.imageCount);

  const fs = await import("node:fs");
  fs.writeFileSync("/tmp/aryeo-by-vertical.json", JSON.stringify(byVertical, null, 2));
  fs.writeFileSync("/tmp/aryeo-commercial.json", JSON.stringify(commercial, null, 2));

  console.log("=== Aryeo harvest summary ===");
  console.log("listings seen:", totalSeen, "| showcasable w/ gallery images:", withImages, "| last_page:", lastPage);
  console.log("type counts:", JSON.stringify(typeCounts));
  console.log("by vertical (usable listings):");
  for (const v of Object.keys(byVertical)) {
    const arr = byVertical[v];
    const totImgs = arr.reduce((s, r) => s + r.imageCount, 0);
    console.log(`  ${v.padEnd(14)} listings:${String(arr.length).padStart(4)}  images:${String(totImgs).padStart(5)}  top:${arr[0]?.imageCount || 0}`);
  }
  console.log("wrote /tmp/aryeo-by-vertical.json + /tmp/aryeo-commercial.json");
})();
