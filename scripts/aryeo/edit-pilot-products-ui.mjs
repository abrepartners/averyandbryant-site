#!/usr/bin/env node
/**
 * edit-pilot-products-ui.mjs — Rewrite the three pilot packages in place (title,
 * description, price) and rewire the pilot order form's add-on list, through the
 * admin dashboard UI (the public API is READ-ONLY for products and forms).
 *
 * Manifest: scripts/aryeo/pilot-2026-products.json (ids are explicit: this script
 * only ever opens the edit pages named in the manifest).
 *
 * Steps per product (edit page /admin/products/{id}/edit):
 *   1. Product Details: #Title + Trix description, "Update Product Details".
 *   2. Pricing accordion: open variant chip, #price_amount, "Update Product Serviceable Details".
 * Then the order form (/admin/order-forms/{form_id}/edit), Add-on Products tab:
 *   3. Manage add-ons: search each title, check/uncheck, Update.
 *
 * --dry-run: reads everything, reports what would change, submits nothing.
 *
 * Usage:
 *   rsync -a --exclude 'Singleton*' ~/autohdr-bridge/browser-data/ <profile-copy>/
 *   node scripts/aryeo/edit-pilot-products-ui.mjs --profile <profile-copy> [--dry-run] [--only products|form]
 * Requires Playwright from ~/autohdr-bridge/node_modules.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PLAYWRIGHT = process.env.PLAYWRIGHT_PATH ?? `${process.env.HOME}/autohdr-bridge/node_modules/playwright/index.mjs`;
const ADMIN = "https://avery-bryant.aryeo.com/admin";
const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const argValue = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : null; };
const PROFILE = argValue("--profile");
const DRY_RUN = args.includes("--dry-run");
const ONLY = argValue("--only");
const SHOTS = argValue("--shots");
if (!PROFILE) { console.error("--profile <copied chromium profile> is required"); process.exit(2); }
const manifest = JSON.parse(readFileSync(join(HERE, "pilot-2026-products.json"), "utf8"));

const { chromium } = await import(PLAYWRIGHT);
const ctx = await chromium.launchPersistentContext(PROFILE, { headless: true, viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const sleep = (ms) => page.waitForTimeout(ms);
let shotN = 0;
async function shot(name) { if (SHOTS) await page.screenshot({ path: `${SHOTS}/${String(++shotN).padStart(2, "0")}-${name}.png`, fullPage: true }); }

async function goto(url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await sleep(2500);
  if (await page.$('a[href*="login"]')) throw new Error("auth_required: Aryeo session expired in profile copy.");
}
async function setChecked(locator, want) {
  const cur = await locator.isChecked();
  if (cur !== want) { await locator.click(); await sleep(400); }
  if ((await locator.isChecked()) !== want) throw new Error("checkbox did not reach wanted state");
}
async function accordion(text) {
  await page.locator("button").filter({ hasText: text }).first().click();
  await sleep(1000);
}
/** Titles listed in the open "Product Addons" section (rows that carry a Remove button). */
async function attachedAddonTitles() {
  return page.evaluate(() => {
    const out = [];
    for (const b of document.querySelectorAll("button")) {
      if ((b.textContent || "").trim() !== "Remove") continue;
      let row = b.closest("li, tr, div");
      for (let k = 0; k < 4 && row && (row.textContent || "").trim().replace(/\s+/g, " ").length < 12; k++) row = row.parentElement;
      out.push((row?.textContent || "").trim().replace(/\s+/g, " ").replace(/\s*Remove\s*$/, "").slice(0, 90));
    }
    return out;
  });
}

// ---------- products ----------
if (ONLY !== "form") {
  for (const p of manifest.products) {
    await goto(`${ADMIN}/products/${p.id}/edit`);
    const curTitle = await page.inputValue("#Title");
    if (curTitle !== p.old_title && curTitle !== p.title) throw new Error(`refusing: ${p.id} title is "${curTitle}", expected "${p.old_title}"`);
    if (DRY_RUN) {
      await accordion("Product Pricing & Serviceable Details");
      const chip = page.locator("button").filter({ hasText: /\$\d+\.\d\d/ }).first();
      const chipText = (await chip.textContent()).trim().replace(/\s+/g, " ");
      await chip.click(); await sleep(800);
      const curPrice = await page.locator("#price_amount").first().inputValue();
      console.log(`${p.old_title} -> ${p.title}: title now "${curTitle}", variant "${chipText}", price_amount ${curPrice} -> ${p.price}`);
      continue;
    }
    console.log(`${p.old_title} -> ${p.title}: editing`);
    // 1. details (accordions start collapsed; only one stays open at a time)
    await accordion("Product Details");
    await page.fill("#Title", p.title);
    await page.waitForSelector("trix-editor");
    await page.evaluate((t) => { const trix = document.querySelector("trix-editor"); trix.editor.loadHTML(""); trix.editor.insertString(t); }, p.description);
    await shot(`${p.title}-details-filled`);
    await page.getByRole("button", { name: "Update Product Details" }).click();
    await sleep(3500);
    // 2. price (page may have reloaded after the details update; reopen the accordion)
    await goto(`${ADMIN}/products/${p.id}/edit`);
    const t2 = await page.inputValue("#Title");
    if (t2 !== p.title) throw new Error(`details update did not stick for ${p.id}: title is "${t2}"`);
    await accordion("Product Pricing & Serviceable Details");
    await page.locator("button").filter({ hasText: /\$\d+\.\d\d/ }).first().click(); await sleep(800);
    await page.locator("#price_amount").first().fill(String(p.price));
    await shot(`${p.title}-price-filled`);
    await page.getByRole("button", { name: "Update Product Serviceable Details" }).click();
    await sleep(3500);
    await goto(`${ADMIN}/products/${p.id}/edit`);
    await accordion("Product Pricing & Serviceable Details");
    const chip2 = (await page.locator("button").filter({ hasText: /\$\d+\.\d\d/ }).first().textContent()).trim().replace(/\s+/g, " ");
    if (!chip2.includes(`$${p.price}.00`)) throw new Error(`price update did not stick for ${p.id}: chip "${chip2}"`);
    console.log(`  OK ${p.title}: "${t2}", ${chip2}`);
    await shot(`${p.title}-done`);
  }
}

// ---------- order form add-ons ----------
if (ONLY !== "products") {
  await goto(`${ADMIN}/order-forms/${manifest.form_id}/edit`);
  const formTitle = await page.inputValue("#title");
  console.log(`form: "${formTitle}"`);
  await page.locator("button").filter({ hasText: /^Add-on Products$/ }).first().click(); await sleep(1200);
  await shot("form-addons-tab");
  const visibleText = await page.evaluate(() => document.body.innerText);
  const listed = (t) => visibleText.includes(t);
  for (const t of manifest.form_addons_add) console.log(`  add    ${t}: ${listed(t) ? "already listed" : "not listed"}`);
  for (const t of manifest.form_addons_remove) console.log(`  remove ${t}: ${listed(t) ? "listed" : "not listed"}`);
  const manage = page.locator("button").filter({ hasText: /Manage Add-?on Products/i }).first();
  if (!(await manage.count())) {
    const btns = await page.evaluate(() => [...document.querySelectorAll("button")].map((b) => b.textContent.trim().replace(/\s+/g, " ")).filter(Boolean));
    throw new Error(`no manage add-ons button; buttons: ${JSON.stringify(btns)}`);
  }
  await manage.click(); await sleep(1500);
  await shot("form-addons-manager");
  async function findRow(title) {
    const modal = (await page.getByRole("dialog").count()) ? page.getByRole("dialog").last() : page;
    const search = modal.getByPlaceholder(/Search/).last();
    await search.fill(title.replace(/^2026 — /, ""));
    await modal.getByRole("button", { name: "Search", exact: true }).last().click(); await sleep(1500);
    const rows = modal.locator("tr, li").filter({ hasText: title });
    const n = await rows.count();
    let hit = null;
    for (let i = 0; i < n; i++) {
      const r = rows.nth(i);
      const txt = (await r.innerText()).trim().split("\n")[0].trim();
      if (txt === title && (await r.locator('input[type="checkbox"]').count())) { hit = r; break; }
    }
    return hit;
  }
  const changes = [...manifest.form_addons_add.map((t) => [t, true]), ...manifest.form_addons_remove.map((t) => [t, false])];
  for (const [title, want] of changes) {
    const row = await findRow(title);
    if (!row) { console.log(`  ${want ? "add" : "remove"} ${title}: NOT FOUND in manager`); continue; }
    const box = row.locator('input[type="checkbox"]').first();
    const cur = await box.isChecked();
    console.log(`  ${want ? "add" : "remove"} ${title}: checked=${cur} -> ${want}`);
    if (!DRY_RUN && cur !== want) await setChecked(box, want);
  }
  await shot("form-addons-manager-after");
  if (!DRY_RUN) {
    await page.getByRole("button", { name: "Update", exact: true }).click(); await sleep(3000);
    await goto(`${ADMIN}/order-forms/${manifest.form_id}/edit`);
    await page.locator("button").filter({ hasText: /^Add-on Products$/ }).first().click(); await sleep(1200);
    const after = await page.evaluate(() => document.body.innerText);
    for (const t of manifest.form_addons_add) console.log(`  verify add    ${t}: ${after.includes(t) ? "listed" : "MISSING"}`);
    for (const t of manifest.form_addons_remove) console.log(`  verify remove ${t}: ${after.includes(t + "\n") || after.includes(t + " ") ? "STILL LISTED?" : "gone"}`);
    await shot("form-addons-after");
  }
}
await ctx.close();
