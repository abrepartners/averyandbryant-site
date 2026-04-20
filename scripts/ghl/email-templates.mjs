#!/usr/bin/env node
// Create branded HTML email templates in GHL via direct API.
// Templates match the site's dark / crimson aesthetic but are email-safe
// (table-based layout, inline styles, no flexbox, web-safe fonts).
//
// Run: node scripts/ghl/email-templates.mjs
// Requires GHL_API_TOKEN + GHL_LOCATION_ID in env (or uses the hardcoded
// PIT if neither is set; the script is single-use for setup).

const TOKEN = process.env.GHL_API_TOKEN || "pit-99cf08f1-8dea-4fd9-a792-b8566961caf3";
const LOC = process.env.GHL_LOCATION_ID || "iXhH37718q9nZnf4tkgF";
const API = "https://services.leadconnectorhq.com";

// ────────────────────────────────────────────────────────────────
// Brand tokens (kept in one place so we can tweak all templates at once)
// ────────────────────────────────────────────────────────────────
const BG = "#0a0a0a";
const CARD = "#141414";
const BORDER = "rgba(255,255,255,0.08)";
const TEXT = "#f5f5f5";
const MUTED = "rgba(245,245,245,0.55)";
const SUBTLE = "rgba(245,245,245,0.35)";
const CRIMSON = "#C41230";
const AMBER = "#F59E0B";
const FONT =
  "'Helvetica Neue', Helvetica, Arial, -apple-system, BlinkMacSystemFont, sans-serif";

// ────────────────────────────────────────────────────────────────
// Shared layout builder — wraps body content in the A&B email shell
// ────────────────────────────────────────────────────────────────
function shell({ preheader, hero, body, cta, footerNote }) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Avery & Bryant</title>
<style>
  /* Clients that allow <style>: dark-mode nudges + readable defaults. */
  body { margin:0; padding:0; background:${BG}; }
  a { color:${CRIMSON}; text-decoration:none; }
  @media (max-width: 620px) {
    .container { width:100% !important; }
    .px-outer { padding-left:20px !important; padding-right:20px !important; }
    .hero { font-size:28px !important; line-height:1.1 !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${BG};color:${TEXT};font-family:${FONT};">
<!-- hidden preheader -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${BG};">
  ${preheader}
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BG};">
  <tr>
    <td align="center" style="padding:48px 16px;">
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${BG};border:1px solid ${BORDER};border-radius:4px;">
        <!-- brand bar -->
        <tr>
          <td class="px-outer" style="padding:28px 40px;border-bottom:1px solid ${BORDER};">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="left" style="font-family:${FONT};">
                  <span style="display:inline-block;padding:4px 10px;background:${CRIMSON};color:#fff;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border-radius:2px;">A&amp;B</span>
                  <span style="margin-left:12px;font-size:11px;font-weight:300;letter-spacing:3px;text-transform:uppercase;color:${MUTED};">Avery &amp; Bryant</span>
                </td>
                <td align="right" style="font-family:${FONT};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${SUBTLE};">
                  Little Rock · AR
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- hero -->
        <tr>
          <td class="px-outer" style="padding:48px 40px 24px;">
            <div style="color:${CRIMSON};font-family:${FONT};font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;">
              ${hero.tag || "The Spot"}
            </div>
            <h1 class="hero" style="margin:0;font-family:${FONT};font-size:32px;font-weight:300;line-height:1.15;letter-spacing:-0.5px;color:${TEXT};">
              ${hero.title}
            </h1>
            ${hero.subtitle ? `<p style="margin:16px 0 0;font-family:${FONT};font-size:15px;line-height:1.6;color:${MUTED};">${hero.subtitle}</p>` : ""}
          </td>
        </tr>

        <!-- body -->
        <tr>
          <td class="px-outer" style="padding:8px 40px 32px;font-family:${FONT};font-size:15px;line-height:1.7;color:${MUTED};">
            ${body}
          </td>
        </tr>

        ${
          cta
            ? `<!-- cta -->
        <tr>
          <td class="px-outer" align="left" style="padding:0 40px 40px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:${CRIMSON};border-radius:4px;">
                  <a href="${cta.url}" style="display:inline-block;padding:16px 28px;font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#ffffff;text-decoration:none;">${cta.label}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>`
            : ""
        }

        <!-- footer -->
        <tr>
          <td class="px-outer" style="padding:28px 40px;border-top:1px solid ${BORDER};font-family:${FONT};font-size:12px;line-height:1.7;color:${SUBTLE};">
            ${footerNote ? `<div style="margin-bottom:16px;color:${MUTED};font-size:13px;">${footerNote}</div>` : ""}
            <div>
              Avery &amp; Bryant · 12521 Kanis Rd, Little Rock, AR 72211<br/>
              <a href="tel:+15015022925" style="color:${MUTED};text-decoration:none;">(501) 502-2925</a>
              &nbsp;·&nbsp;
              <a href="mailto:hello@averyandbryant.com" style="color:${MUTED};text-decoration:none;">hello@averyandbryant.com</a>
              &nbsp;·&nbsp;
              <a href="https://averyandbryant.com" style="color:${MUTED};text-decoration:none;">averyandbryant.com</a>
            </div>
            <div style="margin-top:16px;color:${SUBTLE};">
              {{unsubscribe}} ·
              <span style="color:${SUBTLE};">You're receiving this because you booked or subscribed at averyandbryant.com.</span>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ────────────────────────────────────────────────────────────────
// Templates — each one gets created in GHL via POST /emails/builder
// ────────────────────────────────────────────────────────────────
const templates = [
  {
    title: "AB · Studio — Membership Welcome",
    preview_text:
      "Welcome to The Spot — your member discount + add-on credits are active.",
    html: shell({
      preheader:
        "Welcome to The Spot. Your member discount + add-on credits are live.",
      hero: {
        tag: "The Spot · Welcome",
        title: "Welcome to The Spot, {{contact.first_name}}.",
        subtitle:
          "Your membership is active. Two things kicked in today: a member discount on every studio booking, and a monthly bucket of add-on credits.",
      },
      body: `
        <p style="margin:0 0 16px;color:${MUTED};">Here's how each benefit works:</p>
        <ul style="margin:0 0 24px;padding-left:20px;color:${MUTED};">
          <li style="margin-bottom:10px;"><strong style="color:${TEXT};">Member discount</strong> on all studio time — podcast room, alternate sets, garage, multi-set day passes. Applied automatically at checkout.</li>
          <li style="margin-bottom:10px;"><strong style="color:${TEXT};">Add-on credits</strong> spend on edits, engineer assist, equipment access, extra 30-minute blocks, or rush delivery.</li>
          <li style="margin-bottom:10px;">Credits reset monthly on your billing date — use them.</li>
          <li style="margin-bottom:10px;">Flexible cancellation on every booking.</li>
        </ul>
        <p style="margin:0;color:${MUTED};">Ready for your first session? The button below goes straight to booking.</p>`,
      cta: {
        label: "Book your first session",
        url: "https://averyandbryant.com/studio",
      },
      footerNote:
        "Manage your membership any time — reply to this email and we'll help.",
    }),
  },

  {
    title: "AB · Studio — Booking Confirmation (Pay First)",
    preview_text: "Payment received — now pick your time slot.",
    html: shell({
      preheader:
        "Your payment is confirmed. Click through to pick your session time.",
      hero: {
        tag: "The Spot · Confirmed",
        title: "Payment received, {{contact.first_name}}.",
        subtitle:
          "Your booking is paid in full. Final step — pick the time slot that works for you.",
      },
      body: `
        <div style="margin:0 0 24px;padding:20px;background:${CARD};border:1px solid ${BORDER};border-radius:4px;">
          <div style="color:${AMBER};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">What you booked</div>
          <div style="font-size:18px;color:${TEXT};font-weight:400;">{{custom_values.booking_product}}</div>
          <div style="margin-top:8px;font-size:13px;color:${SUBTLE};">Paid via Stripe · Confirmation on file</div>
        </div>
        <p style="margin:0 0 16px;color:${MUTED};">Tap below to schedule your slot. You'll get a day-before reminder with arrival details once the time is booked.</p>`,
      cta: {
        label: "Schedule my session",
        url: "https://averyandbryant.com/studio#schedule",
      },
      footerNote:
        "Need a different time than what's shown? Reply and we'll find it.",
    }),
  },

  {
    title: "AB · Studio — Day-Before Reminder",
    preview_text: "Tomorrow at The Spot — here's what you need.",
    html: shell({
      preheader:
        "Your session is tomorrow. Address, parking, arrival details inside.",
      hero: {
        tag: "The Spot · Tomorrow",
        title: "Tomorrow. {{appointment.start_time_short}}.",
        subtitle:
          "Everything you need for a smooth arrival. Save this email for the morning.",
      },
      body: `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
          <tr>
            <td width="50%" valign="top" style="padding:0 8px 16px 0;">
              <div style="padding:16px;background:${CARD};border:1px solid ${BORDER};border-radius:4px;">
                <div style="color:${CRIMSON};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">Where</div>
                <div style="font-size:14px;color:${TEXT};line-height:1.5;">12521 Kanis Rd<br/>Little Rock, AR 72211</div>
              </div>
            </td>
            <td width="50%" valign="top" style="padding:0 0 16px 8px;">
              <div style="padding:16px;background:${CARD};border:1px solid ${BORDER};border-radius:4px;">
                <div style="color:${CRIMSON};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">When</div>
                <div style="font-size:14px;color:${TEXT};line-height:1.5;">{{appointment.start_time}}<br/>{{appointment.duration}} min session</div>
              </div>
            </td>
          </tr>
        </table>

        <div style="color:${AMBER};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Before you arrive</div>
        <ul style="margin:0 0 24px;padding-left:20px;color:${MUTED};">
          <li style="margin-bottom:8px;">Arrive 5 minutes early — we'll be set up for you.</li>
          <li style="margin-bottom:8px;">Street-level access — park out front.</li>
          <li style="margin-bottom:8px;">Bring your gear, OR use ours if you added equipment access.</li>
          <li style="margin-bottom:8px;">Questions morning-of: call <a href="tel:+15015022925" style="color:${CRIMSON};">(501) 502-2925</a>.</li>
        </ul>`,
      cta: {
        label: "Reschedule or cancel",
        url: "{{reschedule_link}}",
      },
      footerNote:
        "See you tomorrow. Reply if anything changes between now and then.",
    }),
  },

  {
    title: "AB · Studio — Post-Shoot Follow-Up",
    preview_text: "How was it? Leave us a quick review.",
    html: shell({
      preheader:
        "Your session is in the books. Thirty seconds for a review goes a long way.",
      hero: {
        tag: "The Spot · Afterward",
        title: "Hope you got what you came for.",
        subtitle:
          "Your files are processing. If you loved the session, a quick Google review helps other creators find us.",
      },
      body: `
        <p style="margin:0 0 20px;color:${MUTED};">Your session recap:</p>
        <div style="margin:0 0 24px;padding:20px;background:${CARD};border:1px solid ${BORDER};border-radius:4px;">
          <div style="color:${AMBER};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Delivered</div>
          <div style="font-size:15px;color:${TEXT};line-height:1.6;">{{custom_values.session_deliverables}}</div>
        </div>
        <p style="margin:0 0 16px;color:${MUTED};">Two quick asks:</p>
        <ul style="margin:0 0 24px;padding-left:20px;color:${MUTED};">
          <li style="margin-bottom:8px;"><strong style="color:${TEXT};">Leave a Google review</strong> — link below.</li>
          <li style="margin-bottom:8px;"><strong style="color:${TEXT};">Rebook early</strong> — members save 80% vs. pay-as-you-go.</li>
        </ul>`,
      cta: {
        label: "Leave a Google review",
        url: "https://g.page/r/averyandbryant/review",
      },
      footerNote:
        "Want to chat about a membership upgrade or custom package? Reply and we'll follow up.",
    }),
  },

  {
    title: "AB · Studio — Credit Redemption Details",
    preview_text: "Your member discount + monthly add-on credits.",
    html: shell({
      preheader:
        "Your member discount + monthly add-on credits. Here's how to use them.",
      hero: {
        tag: "The Spot · Member Benefits",
        title: "Two wins, {{contact.first_name}}.",
        subtitle:
          "Discount on studio time. Credits for everything else. Here's the full picture.",
      },
      body: `
        <div style="margin:0 0 20px;padding:20px;background:${CARD};border:1px solid ${BORDER};border-radius:4px;">
          <div style="color:${AMBER};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Your tier</div>
          <div style="font-size:22px;color:${TEXT};font-weight:300;">{{custom_values.membership_tier}}</div>
          <div style="margin-top:6px;font-size:14px;color:${MUTED};">{{custom_values.member_discount}} off all studio time · {{custom_values.monthly_credits}} add-on credits per month · resets {{custom_values.renewal_date}}</div>
        </div>

        <div style="color:${CRIMSON};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Your member discount covers</div>
        <ul style="margin:0 0 24px;padding-left:20px;color:${MUTED};">
          <li style="margin-bottom:6px;">The Podcast Room (1hr / 2hr / half day)</li>
          <li style="margin-bottom:6px;">Each Alternate Set (Set A, Set B, Intimate Set)</li>
          <li style="margin-bottom:6px;">The Garage</li>
          <li style="margin-bottom:6px;">Multi-Set Day Passes</li>
        </ul>

        <div style="color:${AMBER};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">Spend add-on credits on</div>
        <ul style="margin:0 0 24px;padding-left:20px;color:${MUTED};">
          <li style="margin-bottom:6px;">Editing rounds (podcast, video, photo)</li>
          <li style="margin-bottom:6px;">Engineer assist during your session</li>
          <li style="margin-bottom:6px;">Equipment access (lighting, cameras, audio)</li>
          <li style="margin-bottom:6px;">Extra 30-minute session blocks</li>
          <li style="margin-bottom:6px;">Rush delivery</li>
        </ul>

        <p style="margin:0;color:${MUTED};">Credits reset monthly — don't let them expire. Book a session below and your discount applies automatically at checkout.</p>`,
      cta: {
        label: "Book a session now",
        url: "https://averyandbryant.com/studio",
      },
      footerNote:
        "Need to upgrade your tier, pause, or cancel? Reply any time.",
    }),
  },

  {
    title: "AB · Studio — Files Ready to Review",
    preview_text: "Your files are ready — review, comment, and approve.",
    html: shell({
      preheader:
        "Your files are uploaded. Review them, leave comments, approve when ready.",
      hero: {
        tag: "The Spot · Review Ready",
        title: "Your files are ready, {{contact.first_name}}.",
        subtitle:
          "Edits uploaded to your private review space. Watch in the browser, drop timestamped comments, approve what works, flag what needs another pass.",
      },
      body: `
        <div style="margin:0 0 24px;padding:20px;background:${CARD};border:1px solid ${BORDER};border-radius:4px;">
          <div style="color:${AMBER};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Your review link</div>
          <div style="font-size:14px;color:${TEXT};line-height:1.6;word-break:break-all;">
            <a href="{{contact.frameio_review_url}}" style="color:${TEXT};">{{contact.frameio_review_url}}</a>
          </div>
          <div style="margin-top:10px;font-size:12px;color:${SUBTLE};">Bookmark this — it stays live until you approve everything.</div>
        </div>
        <div style="color:${CRIMSON};font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">How to use it</div>
        <ul style="margin:0 0 24px;padding-left:20px;color:${MUTED};">
          <li style="margin-bottom:8px;">Click the button below, enter your email (no account needed).</li>
          <li style="margin-bottom:8px;">Play any clip and leave timestamped comments directly on the frame.</li>
          <li style="margin-bottom:8px;">Approve clips when you're happy — we'll mark them final on our side.</li>
          <li style="margin-bottom:8px;">Heads-up: if you&apos;re requesting a revision, bundle notes into one pass so we can batch them.</li>
        </ul>`,
      cta: {
        label: "Open my review space",
        url: "{{contact.frameio_review_url}}",
      },
      footerNote:
        "Questions on the edits? Reply to this email and Thomas will jump in.",
    }),
  },

  {
    title: "AB · Studio — Scheduling Link After Payment",
    preview_text: "Last step: pick your time.",
    html: shell({
      preheader:
        "Payment confirmed. Click through to lock in your session time.",
      hero: {
        tag: "The Spot · Schedule",
        title: "One tap from locked in.",
        subtitle:
          "Your studio booking is paid. Hit the button to pick your time — availability updates in real time.",
      },
      body: `
        <p style="margin:0 0 24px;color:${MUTED};">Your payment is in. Once you pick a time, we'll send:</p>
        <ul style="margin:0 0 24px;padding-left:20px;color:${MUTED};">
          <li style="margin-bottom:6px;">An immediate confirmation</li>
          <li style="margin-bottom:6px;">A day-before reminder with arrival details</li>
          <li style="margin-bottom:6px;">The studio address, parking info, and a direct number</li>
        </ul>`,
      cta: {
        label: "Pick my time slot",
        url: "https://averyandbryant.com/studio#schedule",
      },
      footerNote:
        "Prefer to call? Reach Thomas at (501) 502-2925 weekdays 9-5.",
    }),
  },
];

// ────────────────────────────────────────────────────────────────
async function createTemplate(t) {
  const res = await fetch(`${API}/emails/builder`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      locationId: LOC,
      title: t.title,
      type: "html",
      html: t.html,
      editorType: "html",
      templateType: "html",
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`  FAIL ${t.title} → ${res.status}: ${text.slice(0, 200)}`);
    return null;
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    console.error(`  FAIL ${t.title} → unparseable response`);
    return null;
  }
  const id =
    parsed?.template?.id ||
    parsed?.data?.id ||
    parsed?.id ||
    parsed?._id ||
    "?";
  console.log(`  OK   ${t.title} → id=${id}`);
  return { title: t.title, id };
}

// When run with `--dump`, write each template's HTML to /tmp/ghl-template-N.html
// so the MCP-wired create_email_template call can consume it.
if (process.argv.includes("--dump")) {
  const fs = await import("node:fs");
  templates.forEach((t, i) => {
    const name = t.title.replace(/[^A-Za-z0-9]+/g, "_").toLowerCase();
    fs.writeFileSync(`/tmp/ghl-tpl-${i}-${name}.html`, t.html);
    console.log(`${i}\t${t.title}\t/tmp/ghl-tpl-${i}-${name}.html\t${t.preview_text}`);
  });
  process.exit(0);
}

(async () => {
  console.log(`\nCreating ${templates.length} branded email templates in GHL...\n`);
  const out = [];
  for (const t of templates) {
    const r = await createTemplate(t);
    if (r) out.push(r);
  }
  console.log(`\n${out.length}/${templates.length} created.`);
  if (out.length) {
    console.log("\nTemplate IDs (for wiring into workflows):");
    for (const r of out) console.log(`  ${r.id}  ${r.title}`);
  }
})();
