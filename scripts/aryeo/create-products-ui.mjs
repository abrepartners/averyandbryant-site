#!/usr/bin/env node
/**
 * create-products-ui.mjs — Create the staged 2026 Aryeo product catalog through
 * the admin dashboard UI (the public API is READ-ONLY for products).
 *
 * Manifest: scripts/aryeo/new-products.json (titles, descriptions, MAIN/ADD_ON,
 * category keys, prices in CENTS, durations in minutes, optional variants).
 *
 * How it works (proven flow, 2026-07-10):
 *   1. /admin/products/create — fill Title, Trix description, Product Type,
 *      price (DOLLARS in the UI), duration. duration 0 => uncheck Serviceable.
 *      Variants: click "Add Variant" (N-1) times, fill each block.
 *   2. Submit redirects to /admin/products/{id}/edit — attach the category tag
 *      via "+ Add Tag" (tags == API product categories).
 *   3. Activate via Product Details accordion (#active) + "Update Product
 *      Details". Products must be ACTIVE to appear in GET /v1/products.
 *      Active products are NOT client-facing until added to an order form —
 *      this script never touches order forms.
 *
 * Idempotency / resume:
 *   - Skips any manifest title already returned by GET /v1/products.
 *   - Keeps .create-products-ui-progress.json beside this script; a crashed
 *     run resumes tag-attach/activation from the recorded edit URL instead of
 *     creating a duplicate.
 *
 * SAFETY: never edits existing products — only ever opens edit pages recorded
 * in its own progress file (i.e. products it created itself).
 *
 * Usage:
 *   1. Copy the logged-in bridge Chromium profile (never use it directly):
 *        rsync -a --exclude 'Singleton*' ~/autohdr-bridge/browser-data/ /tmp/aryeo-profile/
 *   2. node --env-file=$HOME/aryeo-ghl-bridge/.env.local \
 *        scripts/aryeo/create-products-ui.mjs --profile /tmp/aryeo-profile [--limit N] [--dry-run]
 *
 * Requires: ARYEO_API_KEY in env, Playwright from ~/autohdr-bridge/node_modules.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PLAYWRIGHT = process.env.PLAYWRIGHT_PATH ?? `${process.env.HOME}/autohdr-bridge/node_modules/playwright/index.mjs`;
const ADMIN = "https://avery-bryant.aryeo.com/admin";
const HERE = dirname(fileURLToPath(import.meta.url));
const args0 = process.argv.slice(2);
const MANIFEST_ARG = args0.indexOf("--manifest");
const MANIFEST_PATH = join(
  HERE,
  MANIFEST_ARG > -1 && process.argv.slice(2)[MANIFEST_ARG + 1]
    ? process.argv.slice(2)[MANIFEST_ARG + 1]
    : "new-products.json",
);
const PROGRESS_PATH = join(HERE, ".create-products-ui-progress.json");

// ---------- args ----------
const args = process.argv.slice(2);
function argValue(flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
}
const PROFILE = argValue("--profile");
const LIMIT = argValue("--limit") ? parseInt(argValue("--limit"), 10) : Infinity;
const DRY_RUN = args.includes("--dry-run");

if (!PROFILE) {
  console.error("Missing --profile <dir> (a COPY of ~/autohdr-bridge/browser-data — never the original)");
  process.exit(1);
}
const API_KEY = process.env.ARYEO_API_KEY;
if (!API_KEY) {
  console.error("Missing ARYEO_API_KEY (run with --env-file=$HOME/aryeo-ghl-bridge/.env.local)");
  process.exit(1);
}

// ---------- manifest ----------
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
const CATEGORY_TITLES = {
  ...Object.fromEntries(manifest.categories_to_create.map((c) => [c.key, c.title])),
  ...manifest.categories_existing,
};

// ---------- progress ----------
const progress = existsSync(PROGRESS_PATH) ? JSON.parse(readFileSync(PROGRESS_PATH, "utf8")) : {};
function saveProgress() {
  writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2));
}

// ---------- API helpers ----------
async function apiGetAll(path) {
  const out = [];
  let page = 1;
  while (true) {
    const r = await fetch(`https://api.aryeo.com/v1/${path}?per_page=100&page=${page}`, {
      headers: { Authorization: `Bearer ${API_KEY}`, Accept: "application/json" },
    });
    if (!r.ok) throw new Error(`API read failed: ${path} ${r.status}`);
    const j = await r.json();
    out.push(...(j.data || []));
    if (!j.meta || j.meta.current_page >= j.meta.last_page) break;
    page++;
  }
  return out;
}

async function apiTitles() {
  return new Set((await apiGetAll("products")).map((p) => p.title));
}

/** name -> tag id for all product-type tags (GET /v1/tags is paginated). */
async function apiProductTagMap() {
  const map = new Map();
  for (const t of await apiGetAll("tags")) {
    if (t.type === "product") map.set(t.name, t.id);
  }
  return map;
}

// ---------- browser helpers ----------
const { chromium } = await import(PLAYWRIGHT);

async function ensureAuth(page) {
  const loginButton = await page.$('a[href*="login"], button:has-text("Log in")');
  if (loginButton) throw new Error("auth_required: Aryeo session expired in profile copy.");
}

async function goto(page, url) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  } catch {
    // A late navigation from a slow prior submit can abort this goto — settle and retry once.
    await page.waitForTimeout(5000);
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  }
  await page.waitForTimeout(2500);
  await ensureAuth(page);
}

async function fillTrix(page, text) {
  await page.waitForSelector("trix-editor", { timeout: 10000 });
  await page.evaluate((t) => {
    const trix = document.querySelector("trix-editor");
    trix.editor.loadHTML("");
    trix.editor.insertString(t);
  }, text);
}

/** JS-click a styled checkbox into the desired state (Playwright check/uncheck races Vue). */
async function setCheckbox(page, selector, desired) {
  const ok = await page.evaluate(
    ({ sel, want }) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      if (el.checked !== want) el.click();
      return true;
    },
    { sel: selector, want: desired }
  );
  if (!ok) throw new Error(`checkbox not found: ${selector}`);
  await page.waitForTimeout(400);
  const state = await page.evaluate((sel) => document.querySelector(sel)?.checked, selector);
  if (state !== desired) throw new Error(`checkbox ${selector} did not reach state ${desired}`);
}

const dollars = (cents) => (cents / 100).toFixed(2);

// ---------- create one product ----------
async function createProduct(page, product) {
  await goto(page, `${ADMIN}/products/create`);
  await page.fill("#Title", product.title);
  await fillTrix(page, product.description);
  await page.selectOption("#ProductType", { label: product.type === "MAIN" ? "Main Product" : "Add-on Product" });

  if (product.variants && product.variants.length > 0) {
    // N variants => click "Add Variant" (N-1) times; base price block becomes variant 1
    for (let i = 1; i < product.variants.length; i++) {
      await page.getByRole("button", { name: "Add Variant" }).click();
      await page.waitForTimeout(600);
    }
    for (let i = 0; i < product.variants.length; i++) {
      const v = product.variants[i];
      await page.locator('input[id="title"]').nth(i).fill(v.title); // variant titles are id="title" (main Title is id="Title")
      await page.locator("#price_amount").nth(i).fill(dollars(v.price));
      await page.locator("#duration").nth(i).fill(String(v.duration));
    }
  } else {
    if (product.duration === 0) {
      await setCheckbox(page, "#is_serviceable", false); // digital product: no appointment, duration field hides
    }
    await page.fill("#price_amount", dollars(product.price));
    if (product.duration > 0) {
      await page.fill("#duration", String(product.duration));
    }
  }

  await page.getByRole("button", { name: "Create Product" }).click();
  await page.waitForURL(/\/admin\/products\/[0-9a-f-]+\/edit/, { timeout: 45000 }).catch(() => {});
  if (!/\/admin\/products\/[0-9a-f-]+\/edit/.test(page.url())) {
    // Give a slow submit one last chance to land before declaring failure
    await page.waitForTimeout(10000);
  }
  if (!/\/admin\/products\/[0-9a-f-]+\/edit/.test(page.url())) {
    const errors = await page.evaluate(() =>
      [...document.querySelectorAll('[class*="danger"], [class*="bg-red"]')]
        .map((e) => (e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 200))
        .filter(Boolean)
    );
    throw new Error(`create failed, still on ${page.url()} — errors: ${JSON.stringify(errors)}`);
  }
  return page.url();
}

// ---------- attach category tag (via public API — verified working) ----------
// The dashboard's Add Tag panel is unreliable: its default chip list is a
// 12-item subset, and searching "Commercial" returns only
// "Residential/Commercial" (the exact "Commercial" chip never renders —
// likely a slug collision with the Order-type "COMMERCIAL" tag). The admin
// SPA itself calls POST api.aryeo.com/v1/products/{id}/tags {tag_id}, and
// that endpoint accepts our API key, so tag attach goes through the API.
async function attachTag(productId, tagTitle, tagMap) {
  const tagId = tagMap.get(tagTitle);
  if (!tagId) throw new Error(`no product tag named "${tagTitle}" (create it in Settings → Tags first)`);
  const r = await fetch(`https://api.aryeo.com/v1/products/${productId}/tags`, {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ tag_id: tagId }),
  });
  if (!r.ok) throw new Error(`tag attach failed: ${r.status} for "${tagTitle}" on ${productId}`);
  const j = await r.json();
  const cats = (j.data?.categories || []).map((c) => c.title);
  if (!cats.includes(tagTitle)) throw new Error(`tag "${tagTitle}" did not attach (categories: ${cats.join(",")})`);
}

// ---------- activate on the edit page ----------
async function activate(page, editUrl) {
  if (!page.url().startsWith(editUrl.replace(/\/edit$/, ""))) await goto(page, editUrl);
  await page.locator("button").filter({ hasText: "Product Details" }).first().click();
  await page.waitForTimeout(1200);
  await setCheckbox(page, "#active", true);
  await page.getByRole("button", { name: "Update Product Details" }).click();
  await page.waitForTimeout(3000);
}

// ---------- main ----------
const existing = await apiTitles();
console.log(`API currently has ${existing.size} active products`);
const tagMap = await apiProductTagMap();
for (const title of Object.values(CATEGORY_TITLES)) {
  if (!tagMap.has(title)) console.warn(`WARNING: product tag "${title}" does not exist yet — create it in Settings → Tags before products that need it`);
}

const todo = manifest.products.filter((p) => !existing.has(p.title));
console.log(`${manifest.products.length} in manifest, ${manifest.products.length - todo.length} already live, ${todo.length} to create`);
if (DRY_RUN) {
  for (const p of todo) console.log(`WOULD CREATE: ${p.title} [${p.type}] cats=${p.categories.join(",")}`);
  process.exit(0);
}

const context = await chromium.launchPersistentContext(PROFILE, {
  headless: true,
  viewport: { width: 1280, height: 900 },
});
const page = await context.newPage();

const results = { created: [], failed: [] };
let count = 0;

try {
  for (const product of todo) {
    if (count >= LIMIT) break;
    count++;
    const label = `[${count}/${Math.min(todo.length, LIMIT)}] ${product.title}`;
    try {
      let entry = progress[product.title];
      if (entry?.editUrl) {
        console.log(`${label} — resuming from progress (${entry.editUrl})`);
        await goto(page, entry.editUrl);
      } else {
        const editUrl = await createProduct(page, product);
        entry = progress[product.title] = { editUrl, createdAt: new Date().toISOString() };
        saveProgress();
        console.log(`${label} — created (${editUrl})`);
      }
      const productId = (entry.editUrl.match(/products(?:\/addons)?\/([0-9a-f-]{36})/) || [])[1];
      if (!productId) throw new Error(`could not parse product id from ${entry.editUrl}`);
      for (const key of product.categories) {
        const tagTitle = CATEGORY_TITLES[key];
        if (!tagTitle) throw new Error(`unknown category key: ${key}`);
        await attachTag(productId, tagTitle, tagMap);
      }
      entry.tagged = true;
      saveProgress();
      await activate(page, entry.editUrl);
      entry.activated = true;
      saveProgress();
      console.log(`${label} — tagged + activated`);
      results.created.push(product.title);
    } catch (err) {
      console.error(`${label} — FAILED: ${err.message.split("\n")[0]}`);
      const slug = product.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 50);
      await page.screenshot({ path: join(HERE, `fail-${slug}.png`), fullPage: true }).catch(() => {});
      results.failed.push({ title: product.title, error: err.message.split("\n")[0] });
    }
    await page.waitForTimeout(1500);
  }
} finally {
  await context.close();
}

// ---------- final verification ----------
const after = await apiTitles();
console.log("\n===== FINAL VERIFICATION (API) =====");
let verified = 0;
for (const p of manifest.products) {
  const ok = after.has(p.title);
  if (ok) verified++;
  else console.log(`MISSING FROM API: ${p.title}`);
}
console.log(`${verified}/${manifest.products.length} manifest products verified in API`);
console.log(`created this run: ${results.created.length}, failed: ${results.failed.length}`);
if (results.failed.length) console.log("FAILURES:", JSON.stringify(results.failed, null, 2));
