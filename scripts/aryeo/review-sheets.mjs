/**
 * Contact sheets for reviewing Aryeo imagery by eye.
 *
 *   node --env-file=.env scripts/aryeo/review-sheets.mjs sets <outDir> <listingId...>
 *     Fetches each listing's full image set (index order) and writes
 *     <outDir>/<listingId>--<n>.png sheets (30 per sheet, position printed on
 *     every tile) plus <outDir>/<listingId>.json (position, id, urls).
 *
 *   node scripts/aryeo/review-sheets.mjs curated <outDir>
 *     Sheets the 115 curated project heroes (24 per sheet, running number
 *     printed) plus <outDir>/curated-map.json mapping number -> project.
 *
 * Pure review tooling: no data file is written by this script.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const here = path.dirname(new URL(import.meta.url).pathname);
const dataDir = path.join(here, "../../data");

async function fetchBuf(url) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

/** items: [{ label, thumb }] -> one or more PNG sheets. */
export async function makeSheets(items, file, { cols = 6, perSheet = 30, tileW = 200 } = {}) {
  const tileH = Math.round(tileW * 0.66);
  const files = [];
  for (let s = 0; s * perSheet < items.length; s++) {
    const chunk = items.slice(s * perSheet, (s + 1) * perSheet);
    const tiles = [];
    for (let i = 0; i < chunk.length; i++) {
      let buf;
      try {
        buf = await fetchBuf(chunk[i].thumb);
      } catch {
        continue;
      }
      if (!buf.length) continue; // CDN sometimes answers 200 with an empty body
      const tile = await sharp(buf)
        .resize(tileW, tileH, { fit: "cover" })
        .composite([
          {
            input: Buffer.from(
              `<svg width="${tileW}" height="${tileH}"><rect x="0" y="0" width="${12 + String(chunk[i].label).length * 9}" height="22" fill="black" opacity="0.75"/><text x="5" y="16" font-size="15" font-weight="bold" fill="#fff" font-family="sans-serif">${chunk[i].label}</text></svg>`,
            ),
            top: 0,
            left: 0,
          },
        ])
        .png()
        .toBuffer();
      tiles.push({ input: tile, left: (i % cols) * tileW, top: Math.floor(i / cols) * tileH });
    }
    const rows = Math.ceil(chunk.length / cols);
    const out = items.length > perSheet ? file.replace(/\.png$/, `--${s + 1}.png`) : file;
    await sharp({
      create: { width: cols * tileW, height: rows * tileH, channels: 3, background: "#000" },
    })
      .composite(tiles)
      .png()
      .toFile(out);
    files.push(out);
  }
  return files;
}

export async function fetchSet(id) {
  const KEY = process.env.ARYEO_API_KEY;
  if (!KEY) throw new Error("ARYEO_API_KEY required");
  const r = await fetch(`https://api.aryeo.com/v1/listings/${id}?include=images`, {
    headers: { Authorization: `Bearer ${KEY}`, Accept: "application/json", "User-Agent": UA },
  });
  if (!r.ok) throw new Error(`${r.status} listing ${id}`);
  const d = (await r.json()).data || {};
  return (d.images || [])
    .filter((im) => im.display_in_gallery !== false && im.large_url)
    .sort((a, b) => (a.index || 0) - (b.index || 0))
    .map((im, pos) => ({
      pos,
      id: im.id,
      thumb: im.thumbnail_url,
      large: im.large_url,
      caption: im.caption || "",
    }));
}

const [cmd, outDir, ...rest] = process.argv.slice(2);
if (cmd === "sets") {
  fs.mkdirSync(outDir, { recursive: true });
  for (const id of rest) {
    let set;
    try {
      set = await fetchSet(id);
    } catch (e) {
      console.error(id, "skipped:", e.message);
      continue;
    }
    fs.writeFileSync(path.join(outDir, `${id}.json`), JSON.stringify(set));
    const files = await makeSheets(
      set.map((im) => ({ label: im.pos, thumb: im.thumb })),
      path.join(outDir, `${id}.png`),
    );
    console.error(id, set.length, "images ->", files.length, "sheets");
  }
} else if (cmd === "curated") {
  fs.mkdirSync(outDir, { recursive: true });
  const cur = JSON.parse(fs.readFileSync(path.join(dataDir, "gallery-curated.json"), "utf8"));
  const map = cur.map((p, i) => ({ n: i + 1, id: p.id, cat: p.cat, city: p.city, street: p.street }));
  fs.writeFileSync(path.join(outDir, "curated-map.json"), JSON.stringify(map, null, 1));
  const files = await makeSheets(
    cur.map((p, i) => ({ label: i + 1, thumb: p.thumb || p.hero })),
    path.join(outDir, "curated.png"),
    { cols: 6, perSheet: 24, tileW: 200 },
  );
  console.error(cur.length, "heroes ->", files.length, "sheets");
}
