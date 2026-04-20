import { NextResponse } from "next/server";
import Stripe from "stripe";
import { upsertContact, enrollInWorkflow } from "@/lib/ghl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = STRIPE_SECRET ? new Stripe(STRIPE_SECRET) : null;

// Map Stripe metadata.tier or metadata.product → GHL tags applied to the contact.
// When you build GHL workflows, trigger them on these tags.
const TIER_TAGS: Record<string, string[]> = {
  "creator-lite": ["vertical:studio", "studio:member", "studio:tier-creator-lite"],
  creator: ["vertical:studio", "studio:member", "studio:tier-creator"],
  pro: ["vertical:studio", "studio:member", "studio:tier-pro"],
};

const PRODUCT_TAGS: Record<string, string[]> = {
  "podcast-1hr": ["vertical:studio", "studio:booking", "studio:podcast-1hr"],
  "podcast-2hr": ["vertical:studio", "studio:booking", "studio:podcast-2hr"],
  "podcast-half-day": ["vertical:studio", "studio:booking", "studio:podcast-half"],
  "alternate-set": ["vertical:studio", "studio:booking", "studio:alternate-set"],
  "multi-set-day": ["vertical:studio", "studio:booking", "studio:multi-set-day"],
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

  const email = session.customer_details?.email ?? session.customer_email ?? undefined;
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
    console.info(
      "[stripe-webhook] upserted contact",
      contactId,
      "tags",
      tags,
    );
  } catch (err) {
    console.error("[stripe-webhook] GHL upsert failed", err);
    return NextResponse.json({ error: "ghl upsert failed" }, { status: 500 });
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
