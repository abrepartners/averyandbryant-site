#!/usr/bin/env node
// Refactor A&B-branded GHL email templates to reference brand custom values
// instead of hardcoded logo box + contact strings. One-shot migration —
// re-runnable (replacements are idempotent via regex).
//
// Run: node scripts/ghl/rebrand-templates.mjs

const TOKEN = process.env.GHL_API_TOKEN || "pit-99cf08f1-8dea-4fd9-a792-b8566961caf3";
const LOC = process.env.GHL_LOCATION_ID || "iXhH37718q9nZnf4tkgF";
const API = "https://services.leadconnectorhq.com";

// Every A&B-branded template currently in the location. Stock/default GHL
// templates are intentionally excluded — they'll be handled separately
// (either rebranded or deleted).
// Two sets of templates handled here:
//   1. AB Studio — custom-built for the pay-first flow (Apr 20 batch).
//      Uses the "A&B" text badge header. Done in first migration.
//   2. GHL stock + Apr 15 marketing batch — auto-generated templates
//      with a centered "AVERY & BRYANT" wordmark and a text-only footer
//      that uses Thomas's personal contact info.
// StudioAI templates use a separate blue sub-brand and stay as-is.
const TEMPLATE_IDS = [
  // GHL "Default - *" auto-fire transactional templates
  "6939c454f1d210e3813e1ec9", // Default - Document Sent
  "6939c5fded5d4c666b36c03a", // Default - Estimate Received
  "695ed70297316d1d00ce1e2f", // Default - Abandoned Cart
  "69698be170923e2194e56449", // Default - Invoice payment successful
  // GHL stock marketing templates (agency boilerplate)
  "69180d96f18e1f4ed1e8c85b", // Content Marketing
  "69180d96f18e1f3daee8c85d", // Social Media Management
  "69180d96f18e1fe690e8c855", // Digital Marketing Services
  "69180d96f18e1f392ce8c859", // Marketing Campaign
  "69180d96f18e1f041ce8c857", // Search Engine Optimization
];

// Replacement of the "A&B" text-in-red-box placeholder with the real mark.
// White PNG for dark-themed templates (all of ours). Width/height sized
// for retina — displays at ~32px/34px.
const LOGO_IMG = `<img src="{{ custom_values.brand_logo_white_raster_url }}" width="64" height="38" alt="A&amp;B" style="display:inline-block;vertical-align:middle;border:0;outline:none;max-width:64px;height:auto"/>`;

// Old header pattern — the inline "A&B" crimson badge span.
const A_B_BADGE_RE = /<span\s+style="[^"]*background:\s*#C41230[^"]*"\s*>\s*A&amp;B\s*<\/span>/gi;

// Stock + Apr 15 batch header — centered crimson "AVERY & BRYANT"
// wordmark inside a <p> tag. Replace with the real mark + business name.
const STOCK_HEADER_RE = /<p\s+style="margin:0;font-size:16px;font-weight:600;letter-spacing:0\.15em;color:#C41230;">\s*AVERY &amp; BRYANT\s*<\/p>/gi;
const STOCK_HEADER_NEW = `<img src="{{ custom_values.brand_logo_raster_url }}" width="44" height="48" alt="{{ custom_values.brand_business_name }}" style="display:block;margin:0 auto 10px;border:0;outline:none;max-width:44px;height:auto"/><p style="margin:0;font-size:14px;font-weight:600;letter-spacing:0.15em;color:rgba(255,255,255,0.6);">{{ custom_values.brand_business_name }}</p>`;

// Stock footer — three-line plain text with Thomas's personal contact.
// Website line may already have been swapped to the URL merge tag by the
// earlier rule; match both forms for idempotency.
const STOCK_FOOTER_RE = /Avery &amp; Bryant<br\s*\/?>\(479\) 502-6949\s*&nbsp;\|&nbsp;\s*book@averyandbryant\.com<br\s*\/?>(?:averyandbryant\.com|\{\{\s*custom_values\.brand_website_url\s*\}\})/gi;
const STOCK_FOOTER_NEW = `{{ custom_values.brand_business_name }}<br>{{ custom_values.brand_phone }} &nbsp;|&nbsp; {{ custom_values.brand_email }}<br>{{ custom_values.brand_website_display }}`;

// Refactor rules (order-sensitive — multi-field patterns first so the
// more generic single-field rules don't strip them partially).
const RULES = [
  // --- GHL stock + Apr 15 marketing batch (must run first — their
  //     footers contain strings the generic rules below would also match) ---
  [STOCK_HEADER_RE, STOCK_HEADER_NEW],
  [STOCK_FOOTER_RE, STOCK_FOOTER_NEW],

  // --- AB Studio set (original custom-built templates) ---
  [A_B_BADGE_RE, LOGO_IMG],
  [/>Avery &amp; Bryant<\/span>/g, ">{{ custom_values.brand_business_name }}</span>"],
  [/Avery &amp; Bryant · 12521 Kanis Rd, Little Rock, AR 72211/g,
   "{{ custom_values.brand_business_name }} · {{ custom_values.brand_address }}"],
  [/>\(501\) 502-2925</g, ">{{ custom_values.brand_phone }}<"],
  [/>hello@averyandbryant\.com</g, ">{{ custom_values.brand_email }}<"],
  [/>averyandbryant\.com</g, ">{{ custom_values.brand_website_url }}<"],
  // mailto + tel hrefs — keep links functional when the custom value
  // changes (previously hardcoded to hello@ which was the wrong address)
  [/mailto:hello@averyandbryant\.com/g, "mailto:{{ custom_values.brand_email }}"],
];

async function fetchPreviewHtml(templateId) {
  // Each template's baked HTML sits in Firebase. Fetch via the GHL API
  // first to get the current preview URL (in case the token has rotated),
  // then pull the HTML itself.
  const listRes = await fetch(
    `${API}/emails/builder?locationId=${LOC}&limit=100`,
    { headers: { Authorization: `Bearer ${TOKEN}`, Version: "2021-07-28", Accept: "application/json" } }
  );
  if (!listRes.ok) throw new Error(`list: ${listRes.status} ${await listRes.text()}`);
  const list = await listRes.json();
  const items = list.builders ?? list.items ?? [];
  const hit = items.find((t) => t.id === templateId);
  if (!hit?.previewUrl) throw new Error(`no previewUrl for ${templateId}`);
  const html = await fetch(hit.previewUrl).then((r) => r.text());
  return { html, name: hit.name };
}

function refactor(html) {
  let out = html;
  for (const [pattern, replacement] of RULES) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

const UPDATED_BY = process.env.GHL_USER_ID || "04czRth8fAzACUnc0EAg"; // Thomas

async function updateTemplate(templateId, html) {
  const res = await fetch(`${API}/emails/builder/data`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      locationId: LOC,
      templateId,
      html,
      editorType: "html",
      updatedBy: UPDATED_BY,
    }),
  });
  if (!res.ok) throw new Error(`update ${templateId}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  let ok = 0, unchanged = 0, err = 0;
  for (const id of TEMPLATE_IDS) {
    try {
      const { html, name } = await fetchPreviewHtml(id);
      const next = refactor(html);
      if (next === html) {
        console.log(`-  ${id} ${name} (no replacements)`);
        unchanged++;
        continue;
      }
      await updateTemplate(id, next);
      console.log(`✓  ${id} ${name}`);
      ok++;
    } catch (e) {
      console.log(`✗  ${id} ${e.message}`);
      err++;
    }
  }
  console.log(`\nDone. ${ok} updated · ${unchanged} unchanged · ${err} errors.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
