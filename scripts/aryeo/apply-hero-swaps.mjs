/**
 * Apply reviewed hero swaps to data/gallery-curated.json.
 *
 *   node scripts/aryeo/apply-hero-swaps.mjs <setsDir> <swaps.json>
 *
 * <setsDir> holds <listingId>.json files written by review-sheets.mjs (the
 * full image set in index order). <swaps.json> is { "<listingId>": <pos> }
 * where pos is the verified front-exterior position. For each entry the
 * card's hero (large), thumb and medium URLs are replaced; the medium URL is
 * verified with a HEAD request and dropped if the CDN has none.
 */
import fs from "node:fs";
import path from "node:path";

const [setsDir, swapsFile] = process.argv.slice(2);
const here = path.dirname(new URL(import.meta.url).pathname);
const curatedPath = path.join(here, "../../data/gallery-curated.json");
const curated = JSON.parse(fs.readFileSync(curatedPath, "utf8"));
const swaps = JSON.parse(fs.readFileSync(swapsFile, "utf8"));
const UA = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
};

let changed = 0;
for (const [id, pos] of Object.entries(swaps)) {
  const card = curated.find((c) => c.id === id);
  const setFile = path.join(setsDir, `${id}.json`);
  if (!card || !fs.existsSync(setFile)) {
    console.error("skip", id, card ? "no set file" : "not in curated");
    continue;
  }
  const set = JSON.parse(fs.readFileSync(setFile, "utf8"));
  const im = set.find((x) => x.pos === pos);
  if (!im) {
    console.error("skip", id, "no position", pos);
    continue;
  }
  if (card.hero === im.large) {
    console.error("same", id, pos);
    continue;
  }
  const medium = im.large.replace("/resized/large/large-", "/resized/medium/medium-");
  const r = await fetch(medium, { method: "HEAD", headers: UA });
  card.hero = im.large;
  card.thumb = im.thumb;
  if (r.ok) card.medium = medium;
  else delete card.medium;
  changed++;
  console.error(`swap ${card.city}, ${card.street}: pos ${pos} (${im.id})`);
}
fs.writeFileSync(curatedPath, JSON.stringify(curated));
console.error(`changed ${changed} cards`);
