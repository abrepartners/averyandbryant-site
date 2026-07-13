import { NextResponse } from "next/server";
import Stripe from "stripe";
import { upsertContact, enrollInWorkflow, setCustomField } from "@/lib/ghl";

// GHL custom field id for "Studio Schedule URL" (created 2026-04-20).
const STUDIO_SCHEDULE_URL_FIELD_ID = "MeyPRVtDcNwSFyoh89ma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = STRIPE_SECRET ? new Stripe(STRIPE_SECRET) : null;

// Map Stripe metadata.tier or metadata.product → GHL tags applied to the contact.
// When you build GHL workflows, trigger them on these tags.
// Keys verified against LIVE Stripe payment-link metadata (2026-07-08):
//   creator-lite = Creator Lite Membership $60/mo (plink_1TOIZVH4bUQUJwBsVyNa3EKK)
//   creator      = Creator Membership $100/mo     (plink_1TOIZWH4bUQUJwBsMjg6Amnk)
//   pro          = Pro Membership $180/mo         (plink_1TOIZYH4bUQUJwBsPnbjPZ87)
// Payment-link metadata is copied onto the Checkout Session, so
// checkout.session.completed arrives with session.metadata.tier set to one
// of these keys. Display names live in src/lib/pricing.ts studioMemberships.
const TIER_TAGS: Record<string, string[]> = {
  "creator-lite": [
    "vertical:studio",
    "studio:member",
    "studio:tier-creator-lite",
  ],
  creator: ["vertical:studio", "studio:member", "studio:tier-creator"],
  pro: ["vertical:studio", "studio:member", "studio:tier-pro"],
  // Production monthly plans (2026-07-12).
  "creator-audio": [
    "vertical:studio",
    "studio:monthly",
    "studio:creator-audio",
  ],
  "creator-video": [
    "vertical:studio",
    "studio:monthly",
    "studio:creator-video",
  ],
  "studio-audio": ["vertical:studio", "studio:monthly", "studio:studio-audio"],
  "studio-video": ["vertical:studio", "studio:monthly", "studio:studio-video"],
};

const PRODUCT_TAGS: Record<string, string[]> = {
  "podcast-1hr": ["vertical:studio", "studio:booking", "studio:podcast-1hr"],
  "podcast-2hr": ["vertical:studio", "studio:booking", "studio:podcast-2hr"],
  "podcast-half-day": [
    "vertical:studio",
    "studio:booking",
    "studio:podcast-half",
  ],
  "alternate-set": [
    "vertical:studio",
    "studio:booking",
    "studio:alternate-set",
  ],
  "multi-set-day": [
    "vertical:studio",
    "studio:booking",
    "studio:multi-set-day",
  ],
  // 2-lane model (2026-07-12): rental + production entry.
  "studio-rental-1hr": [
    "vertical:studio",
    "studio:booking",
    "studio:rental-1hr",
  ],
  "studio-rental-half": [
    "vertical:studio",
    "studio:booking",
    "studio:rental-half",
  ],
  "studio-rental-full": [
    "vertical:studio",
    "studio:booking",
    "studio:rental-full",
  ],
  "audio-podcast": [
    "vertical:studio",
    "studio:production",
    "studio:audio-podcast",
  ],
  "video-podcast": [
    "vertical:studio",
    "studio:production",
    "studio:video-podcast",
  ],
};

// Existing GHL workflows to auto-enroll contacts in (IDs captured 2026-04-20).
// These need to be PUBLISHED in GHL UI before enrollment will fire actions.
const TIER_WORKFLOWS: Record<string, string> = {
  "creator-lite": "8185e8b3-b5a8-4501-a0b7-a3ca5f15dcff", // Assign Credits Creator Lite
  creator: "f30f7796-155a-4667-88e6-34e471bcffa5", // Assign Credits Creator
  pro: "bf3324aa-5189-4a1e-82db-fbef73da39e9", // Assign Credits Pro
};

// Fires for any one-time studio booking (currently routes to "Aryeo → New Booking"
// which covers the same shoot-fulfillment steps — swap to a dedicated Spot flow later).
const BOOKING_WORKFLOW_ID = "5a1c01c0-8380-4790-8a3c-e405ac503a87";

// Map Stripe product metadata → the GHL calendar widget URL the customer
// should land on after payment. Saved into the contact's
// `studio_schedule_url` field so the post-payment email can deep-link them.
const GHL_WIDGET = "https://api.leadconnectorhq.com/widget/booking";
const PRODUCT_SCHEDULE_URL: Record<string, string> = {
  "podcast-1hr": `${GHL_WIDGET}/7ITuyoouCVIHPpd9g7BX`,
  "podcast-2hr": `${GHL_WIDGET}/9g4b8uFBR4KmJNWJwv9a`,
  "podcast-half-day": `${GHL_WIDGET}/J0gqnGTQFA8eD4EoFHwl`,
  "alternate-set": `${GHL_WIDGET}/gZIylqnwF2olLvPrqWqR`,
  "multi-set-day": `${GHL_WIDGET}/oaOY7LqfIC87tAy881wE`,
  // 2-lane model (2026-07-12): route all new rental + production bookings to the
  // existing studio calendar for now. TODO(Thomas): a dedicated all-access Spot
  // calendar so half/full-day availability is accurate (the "calendar pickup").
  "studio-rental-1hr": `${GHL_WIDGET}/7ITuyoouCVIHPpd9g7BX`,
  "studio-rental-half": `${GHL_WIDGET}/7ITuyoouCVIHPpd9g7BX`,
  "studio-rental-full": `${GHL_WIDGET}/7ITuyoouCVIHPpd9g7BX`,
  "audio-podcast": `${GHL_WIDGET}/7ITuyoouCVIHPpd9g7BX`,
  "video-podcast": `${GHL_WIDGET}/7ITuyoouCVIHPpd9g7BX`,
};

export async function POST(req: Request) {
  if (!stripe || !WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Stripe webhook env not configured" },
      { status: 500 },
    );
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  // Only act on completed checkout sessions for now (covers both one-time
  // payments and subscription start). Additional events can be added later.
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const email =
    session.customer_details?.email ?? session.customer_email ?? undefined;
  const name = session.customer_details?.name ?? "";
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ").trim() || undefined;
  const phone = session.customer_details?.phone ?? undefined;

  const meta = session.metadata ?? {};
  const tier = meta.tier;
  const product = meta.product;

  const tags: string[] = [];
  if (tier && TIER_TAGS[tier]) tags.push(...TIER_TAGS[tier]);
  if (product && PRODUCT_TAGS[product]) tags.push(...PRODUCT_TAGS[product]);
  if (!tags.length) tags.push("vertical:studio", "studio:other");

  if (!email) {
    console.warn("[stripe-webhook] no email on session", session.id);
    return NextResponse.json({ received: true, warning: "no email" });
  }

  let contactId: string | undefined;
  try {
    const result = await upsertContact({
      firstName: firstName || undefined,
      lastName,
      email,
      phone,
      source: "stripe-checkout",
      tags,
    });
    contactId = result.contact?.id;
    console.info("[stripe-webhook] upserted contact", contactId, "tags", tags);
  } catch (err) {
    console.error("[stripe-webhook] GHL upsert failed", err);
    return NextResponse.json({ error: "ghl upsert failed" }, { status: 500 });
  }

  // For one-time bookings: stash the matching GHL calendar widget URL on
  // the contact so the post-payment email can deep-link to scheduling.
  if (contactId && product && PRODUCT_SCHEDULE_URL[product]) {
    try {
      await setCustomField(
        contactId,
        STUDIO_SCHEDULE_URL_FIELD_ID,
        PRODUCT_SCHEDULE_URL[product],
      );
    } catch (err) {
      console.error("[stripe-webhook] schedule URL write failed", err);
    }
  }

  // Enroll in the corresponding GHL workflow so published drip sequences fire.
  // Workflows must be PUBLISHED in GHL UI first; enrollment on draft workflows
  // succeeds silently but no actions run.
  if (contactId) {
    const workflowId = tier
      ? TIER_WORKFLOWS[tier]
      : product
        ? BOOKING_WORKFLOW_ID
        : undefined;
    if (workflowId) {
      try {
        await enrollInWorkflow(contactId, workflowId);
        console.info(
          "[stripe-webhook] enrolled",
          contactId,
          "in workflow",
          workflowId,
        );
      } catch (err) {
        // Non-fatal — contact still exists, tags still applied.
        console.error(
          "[stripe-webhook] workflow enrollment failed",
          workflowId,
          err,
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
