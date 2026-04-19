#!/usr/bin/env node
// Create new Aryeo product categories + products from scripts/aryeo/new-products.json
//
// Usage:
//   node scripts/aryeo/create-products.mjs            # DRY RUN (default) — prints what would happen
//   node scripts/aryeo/create-products.mjs --execute  # Actually creates categories + products in Aryeo
//
// Safety:
// - Products are NOT attached to any order form, so they can't be ordered until you wire them up.
// - Skips items whose title already exists in Aryeo (prevents double-create on reruns).
// - Requires ARYEO_API_KEY in env.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const MANIFEST = JSON.parse(
  readFileSync(join(here, "new-products.json"), "utf8"),
);

const API_BASE = process.env.ARYEO_API_BASE_URL ?? "https://api.aryeo.com/v1";
const API_KEY = process.env.ARYEO_API_KEY;
const EXECUTE = process.argv.includes("--execute");

if (!API_KEY) {
  console.error("ARYEO_API_KEY is not set. Set it or run `vercel env pull`.");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function aryeoGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`);
  return res.json();
}

async function aryeoPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    parsed = text;
  }
  if (!res.ok) {
    throw new Error(
      `POST ${path} → ${res.status}\n${JSON.stringify(parsed, null, 2)}`,
    );
  }
  return parsed;
}

function log(label, detail = "") {
  const prefix = EXECUTE ? "EXEC" : "DRY ";
  console.log(`[${prefix}] ${label}${detail ? " — " + detail : ""}`);
}

async function main() {
  console.log(
    `\nAryeo product creator — ${EXECUTE ? "EXECUTE mode" : "DRY RUN"}\n`,
  );

  // 1. Load existing categories and products so we can dedupe
  const existingCats = (await aryeoGet("/product-categories?per_page=100")).data ?? [];
  const existingProds = (await aryeoGet("/products?per_page=100")).data ?? [];

  const catByTitle = new Map(existingCats.map((c) => [c.title, c]));
  const prodTitles = new Set(existingProds.map((p) => p.title));

  // 2. Create any missing categories
  const categoryIds = {};
  for (const cat of MANIFEST.categories_to_create) {
    const existing = catByTitle.get(cat.title);
    if (existing) {
      log(`category exists: ${cat.title}`, `id=${existing.id.slice(0, 8)}`);
      categoryIds[cat.key] = existing.id;
      continue;
    }
    log(`create category: ${cat.title}`);
    if (EXECUTE) {
      const res = await aryeoPost("/product-categories", {
        title: cat.title,
        type: "product",
      });
      categoryIds[cat.key] = res.data?.id ?? res.id;
    } else {
      categoryIds[cat.key] = `DRY-${cat.key}`;
    }
  }
  // Pull in existing ones by key so we can reference them
  for (const [key, title] of Object.entries(MANIFEST.categories_existing)) {
    const existing = catByTitle.get(title);
    if (existing) categoryIds[key] = existing.id;
    else console.warn(`⚠️  Expected category "${title}" not found`);
  }

  // 3. Create products
  let created = 0;
  let skipped = 0;
  for (const p of MANIFEST.products) {
    if (prodTitles.has(p.title)) {
      log(`skip existing product: ${p.title}`);
      skipped++;
      continue;
    }
    const payload = {
      title: p.title,
      description: p.description,
      type: p.type,
      category_ids: p.categories.map((k) => categoryIds[k]).filter(Boolean),
      variants: [
        {
          price_amount: p.price,
          duration: p.duration,
        },
      ],
    };
    log(`create product: ${p.title}`, `$${(p.price / 100).toFixed(2)} · ${p.duration}min`);
    if (EXECUTE) {
      try {
        await aryeoPost("/products", payload);
        created++;
      } catch (err) {
        console.error(`   failed:`, err.message);
      }
    } else {
      created++;
    }
  }

  console.log(
    `\nDone. ${created} ${EXECUTE ? "created" : "would create"}, ${skipped} skipped.`,
  );
  if (!EXECUTE) {
    console.log("Re-run with --execute to actually create in Aryeo.");
  }
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
