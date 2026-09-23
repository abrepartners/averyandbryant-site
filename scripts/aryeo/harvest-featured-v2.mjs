/**
 * Featured gallery sets, v2. Builds data/featured-homes.json from the curated
 * project index (data/gallery-curated.json) and the Aryeo listing images.
 *
 * Rules (owner review, 2026-09-22):
 *  - 2 to 3 projects per vertical where candidates exist, city-diverse,
 *    highest image count first.
 *  - 12 frames per project. Frame 1 is the listing cover (curated `hero`).
 *    The rest are sampled evenly across the FULL image set in index order so
 *    interiors are covered, not the first 12 uploads.
 *  - No repeats: dedupe by exact URL and by perceptual similarity (dHash over a
 *    9x8 grayscale thumbnail, Hamming distance <= 6 drops the frame).
 *  - QC decisions live in scripts/aryeo/featured-overrides.json:
 *      { "_pick": { "<cat>": ["<listingId>", ...] },  reviewed picks for a vertical
 *      { "_skip": ["<listingId>"],            projects reviewed out
 *        "_add": ["<listingId>"],             projects pulled in by review
 *        "<listingId>": { "frames": [pos, ...],   verified by eye, hero first
 *                         "cover": <position or imageId>,
 *                         "exclude": ["<imageId>", ...] } }
 *    `frames` (positions in index order) is the reviewed pick: the first is
 *    the hero. Missing or duplicate frames fall through to the automatic
 *    sampler. Excluded frames are skipped and the next candidate fills the
 *    slot; `cover` replaces the Aryeo cover. A rerun reproduces the set.
 *
 * Usage:
 *   node --env-file=/path/to/.env scripts/aryeo/harvest-featured-v2.mjs
 *   (reads ARYEO_API_KEY, or KEYFILE=/path/to/key.txt like v1)
 *   SHEETS=/dir  also writes one contact sheet PNG per project for review.
 *
 * Output: data/featured-homes.json (+ scratch candidates.json next to SHEETS)
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const KEY = process.env.KEYFILE
  ? fs.readFileSync(process.env.KEYFILE, "utf8").trim()
  : process.env.ARYEO_API_KEY;
if (!KEY) throw new Error("ARYEO_API_KEY or KEYFILE required");

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const HEADERS = {
  Authorization: `Bearer ${KEY}`,
  Accept: "application/json",
  "User-Agent": UA,
};
const CDN_HEADERS = { "User-Agent": UA };

const here = path.dirname(new URL(import.meta.url).pathname);
const dataDir = path.join(here, "../../data");
const curated = JSON.parse(
  fs.readFileSync(path.join(dataDir, "gallery-curated.json"), "utf8"),
);
const overridesPath = path.join(here, "featured-overrides.json");
const overrides = fs.existsSync(overridesPath)
  ? JSON.parse(fs.readFileSync(overridesPath, "utf8"))
  : {};

const FRAMES = 12;
const HAMMING_MAX = 6;
// Projects per vertical. Multi-family has 4 candidates, one of them with 13
// images. Commercial candidates are the order-tagged COMMERCIAL shoots
// (slice 1c, 2026-09-23): the three with the most images, facade hero first.
const PER_VERTICAL = {
  "residential-listing": 3,
  "airbnb-str": 3,
  "multi-family": 3,
  commercial: 3,
  "lot-land": 3,
  "builder-new-construction": 3,
};
const MIN_IMAGES = 16;

// ---------- candidate projects ----------
const skip = new Set(overrides._skip || []);
function pickProjects() {
  const picked = [];
  for (const [cat, want] of Object.entries(PER_VERTICAL)) {
    // Reviewed picks replace the automatic selection for a vertical.
    const pick = overrides._pick && overrides._pick[cat];
    if (pick) {
      for (const id of pick) {
        const p = curated.find((c) => c.id === id);
        if (p) picked.push(p);
        else console.error("pick not in curated", cat, id);
      }
      continue;
    }
    const pool = curated
      .filter(
        (p) => p.cat === cat && (p.count || 0) >= MIN_IMAGES && !skip.has(p.id),
      )
      .sort((a, b) => (b.count || 0) - (a.count || 0));
    const chosen = [];
    const cities = new Set();
    // First pass: one per city, highest count first.
    for (const p of pool) {
      if (chosen.length >= want) break;
      const city = (p.city || "").toLowerCase();
      if (cities.has(city)) continue;
      chosen.push(p);
      cities.add(city);
    }
    // Second pass: fill from the same cities if the vertical is small.
    for (const p of pool) {
      if (chosen.length >= want) break;
      if (!chosen.includes(p)) chosen.push(p);
    }
    picked.push(...chosen);
  }
  for (const id of overrides._add || []) {
    const p = curated.find((c) => c.id === id);
    if (p && !picked.includes(p)) picked.push(p);
  }
  return picked;
}

// ---------- perceptual hash ----------
async function dhash(buf) {
  const { data } = await sharp(buf)
    .grayscale()
    .resize(9, 8, { fit: "fill" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  let bits = 0n;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const l = data[y * 9 + x];
      const r = data[y * 9 + x + 1];
      bits = (bits << 1n) | (l > r ? 1n : 0n);
    }
  }
  return bits;
}
function hamming(a, b) {
  let x = a ^ b;
  let n = 0;
  while (x) {
    n += Number(x & 1n);
    x >>= 1n;
  }
  return n;
}

async function fetchBuf(url) {
  const r = await fetch(url, { headers: CDN_HEADERS });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

// The Aryeo CDN serves a 1024px "medium" rendition for most images even
// though the API does not list it. Verified per frame; undefined when absent
// so the card falls back to the large rendition without a fake srcSet entry.
const mediumCache = new Map();
async function mediumFor(largeUrl) {
  const m = largeUrl.replace("/resized/large/large-", "/resized/medium/medium-");
  if (m === largeUrl) return undefined;
  if (mediumCache.has(m)) return mediumCache.get(m);
  const r = await fetch(m, { method: "HEAD", headers: CDN_HEADERS });
  const out = r.ok ? m : undefined;
  mediumCache.set(m, out);
  return out;
}

// Even sample of `want` indexes from 0..n-1 (excluding the cover index).
function evenIndexes(n, want, skip) {
  const out = [];
  if (n <= 1) return out;
  for (let i = 0; i < want; i++) {
    const idx = Math.round(((i + 1) * (n - 1)) / (want + 1));
    if (idx !== skip && !out.includes(idx)) out.push(idx);
  }
  return out;
}

function cleanCaption(s) {
  return String(s || "")
    .replace(/\s*[\u2013\u2014\u00b7]\s*/g, ", ")
    .trim();
}

// ---------- per project ----------
async function buildProject(p) {
  const r = await fetch(
    `https://api.aryeo.com/v1/listings/${p.id}?include=images`,
    { headers: HEADERS },
  );
  if (!r.ok) {
    console.error("skip", p.city, p.street, r.status);
    return null;
  }
  const d = (await r.json()).data || {};
  const all = (d.images || [])
    .filter((im) => im.display_in_gallery !== false && im.large_url)
    .sort((a, b) => (a.index || 0) - (b.index || 0));
  if (all.length < MIN_IMAGES) {
    console.error("too few imgs, skip", p.city, all.length);
    return null;
  }

  const exclude = new Set((overrides[p.id] && overrides[p.id].exclude) || []);

  // Cover: the curated hero (large url), else the listing thumbnail's id,
  // else index 0.
  const heroId = (p.hero || "").match(/large-([0-9a-f-]{36})/)?.[1];
  const thumbId = (d.thumbnail_url || "").match(/thumbnail-([0-9a-f-]{36})/)?.[1];
  let coverIdx = all.findIndex((im) => im.id === heroId);
  if (coverIdx < 0) coverIdx = all.findIndex((im) => im.id === thumbId);
  if (coverIdx < 0) coverIdx = 0;
  const ov = overrides[p.id] || {};
  if (ov.cover != null) {
    const c =
      typeof ov.cover === "number"
        ? (ov.cover < all.length ? ov.cover : -1)
        : all.findIndex((im) => im.id === ov.cover);
    if (c >= 0) coverIdx = c;
    else console.error("cover override not found", p.city, ov.cover);
  }

  // Candidate order: the reviewed frames (hero first) when present, else the
  // cover then the even sample; then everything else in index order (used
  // when a frame is a dupe or excluded).
  const reviewed = (ov.frames || []).filter((i) => i >= 0 && i < all.length);
  if (reviewed.length) coverIdx = reviewed[0];
  const order = reviewed.length
    ? [...reviewed]
    : [coverIdx, ...evenIndexes(all.length, FRAMES - 1, coverIdx)];
  for (let i = 0; i < all.length; i++) if (!order.includes(i)) order.push(i);

  const picked = [];
  const seenUrl = new Set();
  const hashes = [];
  const audit = [];
  for (const idx of order) {
    if (picked.length >= FRAMES) break;
    const im = all[idx];
    if (exclude.has(im.id)) {
      audit.push({ idx, id: im.id, why: "excluded" });
      continue;
    }
    if (seenUrl.has(im.large_url)) {
      audit.push({ idx, id: im.id, why: "dupe-url" });
      continue;
    }
    let h;
    try {
      h = await dhash(await fetchBuf(im.thumbnail_url || im.large_url));
    } catch (e) {
      audit.push({ idx, id: im.id, why: `fetch-fail ${e.message}` });
      continue;
    }
    const near = hashes.find((x) => hamming(x.h, h) <= HAMMING_MAX);
    if (near && idx !== coverIdx) {
      audit.push({ idx, id: im.id, why: `near-dupe of #${near.idx} (d=${hamming(near.h, h)})` });
      continue;
    }
    seenUrl.add(im.large_url);
    hashes.push({ h, idx });
    picked.push({
      id: im.id,
      idx,
      url: im.large_url,
      medium: await mediumFor(im.large_url),
      thumb: im.thumbnail_url,
      caption: cleanCaption(im.caption),
    });
  }
  if (picked.length < 8) {
    console.error("too few unique frames, skip", p.city, picked.length);
    return null;
  }
  const home = {
    id: p.id,
    cat: p.cat,
    label: p.label,
    city: p.city,
    street: p.street || "",
    beds: p.beds || null,
    baths: p.baths || null,
    sqft: p.sqft || null,
    tour: p.tour || "",
    total: all.length,
    images: picked.map(({ url, medium, thumb, caption }) =>
      medium ? { url, medium, thumb, caption } : { url, thumb, caption },
    ),
  };
  const candidates = {
    id: p.id,
    city: p.city,
    street: p.street,
    picked: picked.map((x) => ({ id: x.id, idx: x.idx, thumb: x.thumb })),
    audit,
    all: all.map((im, i) => ({ id: im.id, idx: i, thumb: im.thumbnail_url })),
  };
  console.error(
    `${p.cat.padEnd(26)} ${p.city}, ${p.street}: ${picked.length}/${all.length} frames, cover #${coverIdx}, dropped ${audit.length}`,
  );
  return { home, candidates, picked };
}

async function contactSheet(project, dir) {
  const cell = 240;
  const rows = Math.ceil(project.picked.length / 4);
  const tiles = [];
  for (let i = 0; i < project.picked.length; i++) {
    const buf = await fetchBuf(project.picked[i].thumb);
    const tile = await sharp(buf)
      .resize(cell, Math.round(cell * 0.66), { fit: "cover" })
      .composite([
        {
          input: Buffer.from(
            `<svg width="${cell}" height="${Math.round(cell * 0.66)}"><rect x="0" y="0" width="44" height="22" fill="black" opacity="0.7"/><text x="6" y="16" font-size="14" fill="white" font-family="sans-serif">${i + 1}:${project.picked[i].idx}</text></svg>`,
          ),
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();
    tiles.push({
      input: tile,
      left: (i % 4) * cell,
      top: Math.floor(i / 4) * Math.round(cell * 0.66),
    });
  }
  const file = path.join(
    dir,
    `${project.home.cat}--${project.home.city}--${(project.home.street || project.home.id).replace(/[^a-z0-9]+/gi, "-")}.png`,
  );
  await sharp({
    create: {
      width: cell * 4,
      height: rows * Math.round(cell * 0.66),
      channels: 3,
      background: "#000",
    },
  })
    .composite(tiles)
    .png()
    .toFile(file);
  return file;
}

// ---------- main ----------
const projects = pickProjects();
console.error(`candidates: ${projects.length} projects`);
const out = [];
const cands = [];
for (const p of projects) {
  const res = await buildProject(p);
  if (!res) continue;
  out.push(res.home);
  cands.push(res.candidates);
  if (process.env.SHEETS) {
    fs.mkdirSync(process.env.SHEETS, { recursive: true });
    await contactSheet(res, process.env.SHEETS);
  }
}
fs.writeFileSync(
  path.join(dataDir, "featured-homes.json"),
  JSON.stringify(out),
);
if (process.env.SHEETS) {
  fs.writeFileSync(
    path.join(process.env.SHEETS, "candidates.json"),
    JSON.stringify(cands, null, 1),
  );
}
const perCat = {};
for (const h of out) perCat[h.cat] = (perCat[h.cat] || 0) + 1;
console.error(`wrote ${out.length} featured homes`, perCat);
