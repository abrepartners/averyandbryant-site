#!/usr/bin/env node
// Join Aryeo orders (order_form => vertical, address) with listings (address => images).
// order_form is the ONLY reliable vertical signal; listing.type is ~all SINGLE_FAMILY.
// Output: per-vertical image manifest + commercial-resolution candidates. Read-only. No downloads.

const KEY = process.env.ARYEO_API_KEY;
if (!KEY) { console.error("ARYEO_API_KEY not set"); process.exit(1); }
const BASE = "https://api.aryeo.com/v1";

const FORM_TO_VERTICAL = [
  [/real estate/i, "real-estate"],
  [/lot.*land/i, "lot-land"],
  [/airbnb|rental/i, "airbnb-rentals"],
  [/multi.*family/i, "multi-family"],
  [/builder|business/i, "builders"],       // also the commercial source bucket
  [/headshot|branding/i, "branding"],
];
function formVertical(name) {
  if (!name) return null;
  for (const [re, v] of FORM_TO_VERTICAL) if (re.test(name)) return v;
  return null; // custom client forms (Back Porch, Sumbles, etc.) -> unknown
}
function addrKey(a) {
  if (!a) return null;
  const sn = (a.street_number || "").toString().trim();
  const st = (a.street_name || "").toString().trim().toLowerCase();
  if (sn && st) return `${sn} ${st}`.replace(/\s+/g, " ");
  const f = (a.formatted_address || a.raw || "").toLowerCase().trim();
  return f || null;
}
async function getAll(path, extra = "") {
  const out = []; let last = 1;
  for (let p = 1; p <= 30; p++) {
    const r = await fetch(`${BASE}/${path}?per_page=100&page=${p}${extra}`,
      { headers: { Authorization: `Bearer ${KEY}`, Accept: "application/json" } });
    if (!r.ok) { console.error(path, "HTTP", r.status); break; }
    const j = await r.json();
    last = j?.meta?.last_page || last;
    const d = j?.data || []; if (!d.length) break;
    out.push(...d);
    if (p >= last) break;
  }
  return out;
}

(async () => {
  const [orders, listings] = await Promise.all([
    getAll("orders", "&include=order_form"),
    getAll("listings"),
  ]);

  // Index listings by address key -> images
  const listingByAddr = new Map();
  for (const it of listings) {
    const imgs = (it.images || []).filter(i => i.large_url || i.original_url);
    if (!imgs.length) continue;
    const k = addrKey(it.address);
    if (!k) continue;
    const rec = {
      id: it.id, address: it.address?.formatted_address || `${it.address?.street_number || ""} ${it.address?.street_name || ""}`.trim(),
      city: it.address?.city || null, imageCount: imgs.length,
      images: imgs.slice(0, 30).map(i => ({ url: i.large_url || i.original_url, caption: i.caption || null, index: i.index ?? null })),
    };
    if (!listingByAddr.has(k) || listingByAddr.get(k).imageCount < rec.imageCount) listingByAddr.set(k, rec);
  }

  const manifest = {};       // vertical -> [listing recs]
  const commercialCandidates = [];
  const seen = new Set();

  for (const o of orders) {
    const v = formVertical(o.order_form?.title || o.order_form?.name);
    const k = addrKey(o.address);
    const rec = k && listingByAddr.get(k);
    const orderAddr = o.address?.formatted_address || `${o.address?.street_number || ""} ${o.address?.street_name || ""}`.trim();
    if (v === "builders") {
      commercialCandidates.push({ order: o.number, address: orderAddr, city: o.address?.city, lat: o.address?.latitude, lng: o.address?.longitude, hasImages: !!rec, imageCount: rec?.imageCount || 0 });
    }
    if (!v || !rec) continue;
    if (seen.has(v + "|" + rec.id)) continue;
    seen.add(v + "|" + rec.id);
    (manifest[v] ||= []).push(rec);
  }

  // Real-estate: don't rely on join alone — backfill from richest single-family listings.
  const reSet = new Set((manifest["real-estate"] || []).map(r => r.id));
  const richest = [...listingByAddr.values()].sort((a, b) => b.imageCount - a.imageCount);
  for (const r of richest) {
    if (reSet.has(r.id)) continue;
    (manifest["real-estate"] ||= []).push(r);
    if ((manifest["real-estate"].length) >= 40) break;
  }

  for (const v of Object.keys(manifest)) manifest[v].sort((a, b) => b.imageCount - a.imageCount);

  const fs = await import("node:fs");
  fs.writeFileSync("/tmp/aryeo-vertical-manifest.json", JSON.stringify(manifest, null, 2));
  fs.writeFileSync("/tmp/aryeo-commercial-candidates.json", JSON.stringify(commercialCandidates, null, 2));

  console.log("orders:", orders.length, "| listings w/ images:", listingByAddr.size);
  console.log("=== per-vertical manifest (joined real images) ===");
  for (const v of Object.keys(manifest)) {
    const arr = manifest[v]; const imgs = arr.reduce((s, r) => s + r.imageCount, 0);
    console.log(`  ${v.padEnd(14)} listings:${String(arr.length).padStart(3)}  images:${String(imgs).padStart(5)}`);
  }
  console.log("commercial candidates (Builders & Business orders):", commercialCandidates.length,
    "| w/ images:", commercialCandidates.filter(c => c.hasImages).length);
  console.log("wrote /tmp/aryeo-vertical-manifest.json + /tmp/aryeo-commercial-candidates.json");
})();
