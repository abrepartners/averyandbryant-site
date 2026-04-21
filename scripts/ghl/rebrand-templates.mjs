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
// Scope: only the AB Studio set. StudioAI templates use a different
// (blue) sub-brand; the April-15 batch has a different header structure
// and will be handled separately.
// Membership Welcome (first in list) was restored in a one-off earlier.
const TEMPLATE_IDS = [
  "69e6403673be3901eefae5bb", // Booking Confirmation (Pay First)
  "69e640489fa06c1c17d2e49e", // Day-Before Reminder
  "69e64058ba2aaa590cc37195", // Post-Shoot Follow-Up
  "69e6406bb81c38b59ea9a57d", // Credit Redemption Details
  "69e6407db9bf9139fd4ad9e5", // Scheduling Link After Payment
  "69e65acd79eb79452b993ebd", // Files Ready to Review
];

// Replacement of the "A&B" text-in-red-box placeholder with the real mark.
// White PNG for dark-themed templates (all of ours). Width/height sized
// for retina — displays at ~32px/34px.
const LOGO_IMG = `<img src="{{ custom_values.brand_logo_white_raster_url }}" width="64" height="38" alt="A&amp;B" style="display:inline-block;vertical-align:middle;border:0;outline:none;max-width:64px;height:auto"/>`;

// Old header pattern — the inline "A&B" crimson badge span.
const A_B_BADGE_RE = /<span\s+style="[^"]*background:\s*#C41230[^"]*"\s*>\s*A&amp;B\s*<\/span>/gi;

// Refactor rules (order-sensitive — run specific first, general last).
// Each entry: [regex or literal, replacement]. Replacements use GHL merge
// tags — these evaluate at send time.
const RULES = [
  // 1. Replace the "A&B" logo badge with the real mark image
  [A_B_BADGE_RE, LOGO_IMG],

  // 2. Header "Avery & Bryant" text (after the logo) — route through
  //    custom value so rebranding the biz name is a single edit later
  [/>Avery &amp; Bryant<\/span>/g, ">{{ custom_values.brand_business_name }}</span>"],

  // 3. Footer address line
  [/Avery &amp; Bryant · 12521 Kanis Rd, Little Rock, AR 72211/g,
   "{{ custom_values.brand_business_name }} · {{ custom_values.brand_address }}"],

  // 4. Footer phone display (keep tel: href, swap display text)
  [/>\(501\) 502-2925</g, ">{{ custom_values.brand_phone }}<"],

  // 5. Footer email display (keep mailto: href, swap display text)
  [/>hello@averyandbryant\.com</g, ">{{ custom_values.brand_email }}<"],

  // 6. Footer website display
  [/>averyandbryant\.com</g, ">{{ custom_values.brand_website_url }}<"],
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
