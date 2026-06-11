#!/usr/bin/env node
// Download a curated set of Aryeo image URLs into the repo's public/ tree.
// Input: JSON array [{url, dest}] where dest is a /images/... web path.
// Usage: node scripts/aryeo/download-selected.mjs /tmp/ab-image-plan.json
import fs from "node:fs";
import path from "node:path";

const planPath = process.argv[2] || "/tmp/ab-image-plan.json";
const PUBLIC = path.resolve(process.cwd(), "public");
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));

let ok = 0, fail = 0;
for (const { url, dest } of plan) {
  if (!url || !dest) { console.error("skip (missing url/dest):", JSON.stringify({ url, dest })); fail++; continue; }
  const rel = dest.replace(/^\//, "");          // images/real-estate/hero.jpg
  const abs = path.join(PUBLIC, rel);
  try {
    const r = await fetch(url);
    if (!r.ok) { console.error(`FAIL ${r.status} ${dest}`); fail++; continue; }
    const buf = Buffer.from(await r.arrayBuffer());
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, buf);
    console.log(`ok  ${dest}  (${(buf.length / 1024).toFixed(0)}kb)`);
    ok++;
  } catch (e) { console.error(`ERR ${dest}: ${String(e)}`); fail++; }
}
console.log(`\ndownloaded ${ok}, failed ${fail}`);
process.exit(fail && !ok ? 1 : 0);
