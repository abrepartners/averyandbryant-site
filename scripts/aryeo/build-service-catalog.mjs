/**
 * Build a service→examples catalog from Aryeo.
 *
 * Unlike build-manifest.mjs (which buckets by order FORM → vertical),
 * this buckets by order LINE ITEMS → service, so we can show real
 * examples of each specific service (drone, reels, video, 3D, photos).
 *
 * Usage: ARYEO_API_KEY=... node scripts/aryeo/build-service-catalog.mjs
 * Output: /tmp/aryeo-service-catalog.json
 */
const KEY = process.env.ARYEO_API_KEY;
if (!KEY) throw new Error("ARYEO_API_KEY required");

const BASE = "https://api.aryeo.com/v1";
const HEADERS = { Authorization: `Bearer ${KEY}`, Accept: "application/json" };

// product title → service slug (first match wins, order matters)
const SERVICE_RULES = [
  { slug: "reels", re: /reel/i },
  { slug: "3d-tours", re: /matterport|3d|zillow/i },
  { slug: "drone", re: /drone|aerial/i },
  { slug: "video-tours", re: /video|cinematic|walkthrough/i },
  { slug: "virtual-staging", re: /staging/i },
  { slug: "photos", re: /photo|media package|hdr/i },
];

function classify(itemTitle) {
  for (const r of SERVICE_RULES) if (r.re.test(itemTitle)) return r.slug;
  return null;
}

const addrKey = (a) => {
  if (!a) return null;
  const DIR = new Set(["n", "s", "e", "w", "north", "south", "east", "west"]);
  if (a.street_number && a.street_name) {
    const toks = a.street_name
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(/\s+/)
      .filter(Boolean);
    while (toks.length > 1 && DIR.has(toks[0])) toks.shift();
    return toks[0] ? `${a.street_number} ${toks[0]}` : null;
  }
  const s = (
    a.unparsed_address ||
    a.street_address ||
    a.full_address ||
    ""
  ).toLowerCase();
  const m = s.match(/^(\d+)\s+(?:[nsew]\.?\s+)?([a-z]+)/);
  return m ? `${m[1]} ${m[2]}` : null;
};

async function fetchAll(path, params) {
  const out = [];
  let page = 1;
  while (true) {
    const url = `${BASE}${path}?${params}&per_page=100&page=${page}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) throw new Error(`${path} p${page}: HTTP ${res.status}`);
    const json = await res.json();
    out.push(...json.data);
    if (!json.meta || page >= json.meta.last_page) break;
    page++;
    process.stderr.write(`\r${path} page ${page}/${json.meta.last_page}  `);
  }
  process.stderr.write("\n");
  return out;
}

const orders = await fetchAll("/orders", "include=items&sort=-created_at");
const listings = await fetchAll(
  "/listings",
  "include=images,videos&sort=-created_at",
);

// index listings by normalized address
const byAddr = new Map();
for (const l of listings) {
  const k = addrKey(l.address);
  if (k && !byAddr.has(k)) byAddr.set(k, l);
}

const catalog = {}; // slug → [{address, orderDate, items, images, videos}]
for (const o of orders) {
  const k = addrKey(o.address);
  const listing = k && byAddr.get(k);
  if (!listing) continue;
  const services = new Set(
    (o.items || []).map((i) => classify(i.title || "")).filter(Boolean),
  );
  for (const slug of services) {
    (catalog[slug] ||= []).push({
      address:
        o.address?.unparsed_address ||
        o.address?.full_address ||
        o.address?.street_address,
      orderDate: o.created_at,
      items: (o.items || []).map((i) => i.title),
      imageCount: (listing.images || []).length,
      images: (listing.images || [])
        .slice(0, 60)
        .map((im) => ({ url: im.large_url || im.original_url, idx: im.index, caption: im.caption })),
      videos: (listing.videos || []).map((v) => ({
        title: v.title,
        duration: v.duration,
        download_url: v.download_url,
        playback_url: v.playback_url,
        thumbnail_url: v.thumbnail_url,
        share_url: v.share_url,
      })),
    });
  }
}

for (const [slug, arr] of Object.entries(catalog)) {
  arr.sort((a, b) => (b.orderDate || "").localeCompare(a.orderDate || ""));
  console.error(`${slug}: ${arr.length} listings`);
}

const fs = await import("node:fs");
fs.writeFileSync(
  "/tmp/aryeo-service-catalog.json",
  JSON.stringify(catalog, null, 1),
);
console.error("wrote /tmp/aryeo-service-catalog.json");
