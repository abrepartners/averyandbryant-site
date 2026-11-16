import { NextResponse } from "next/server";
import {
  upsertContact,
  addContactNote,
  addTags,
  setCustomFieldByKey,
} from "@/lib/ghl";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string; // honeypot: real users never fill this
  /** Which form sent this. Only known values change anything. */
  origin?: string;
  quote?: {
    vertical?: string;
    goal?: string;
    scope?: string;
    package?: string;
    price?: string;
  };
};

/**
 * The contact field a CRM workflow reads into the alert email. It has to
 * exist in the CRM under this key; until it does, the write below fails
 * quietly and the same text is still on the contact as a note.
 */
const SUMMARY_FIELD_KEY = "site_quote_summary";

export async function POST(req: Request) {
  let payload: LeadPayload;
  try {
    payload = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without creating anything
  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const firstName = payload.firstName?.trim();
  const email = payload.email?.trim();
  const phone = payload.phone?.trim();

  if (!firstName || (!email && !phone)) {
    return NextResponse.json(
      { error: "Name and an email or phone are required" },
      { status: 400 },
    );
  }

  // The form never names its own tags. It says where it came from and the
  // tags are chosen here.
  const fromBuilders = payload.origin === "builders";
  const tags = fromBuilders
    ? ["quote-request", "builder-quote"]
    : ["quote-request"];

  try {
    // No tags on the upsert: the CRM replaces every tag a contact already
    // has with the list sent here. Tags are added in their own call below.
    const result = await upsertContact({
      firstName,
      lastName: payload.lastName?.trim() || undefined,
      email: email || undefined,
      phone: phone || undefined,
      source: fromBuilders ? "site-builders-quote" : "site-quote-popup",
    });

    const contactId = result.contact?.id;
    if (!contactId) throw new Error("upsert returned no contact id");

    const q = payload.quote;
    if (q) {
      const lines = [
        fromBuilders
          ? "Quote request from the builders page"
          : "Quote request from site popup",
        q.vertical ? `Vertical: ${q.vertical}` : null,
        q.package ? `Recommended package: ${q.package}` : null,
        q.price ? `Quoted price: ${q.price}` : null,
        q.goal ? `Goal: ${q.goal}` : null,
        q.scope ? `Scope: ${q.scope}` : null,
      ].filter(Boolean);
      const summary = lines.join("\n");
      // Neither of these should fail the lead: the contact is already saved.
      try {
        await addContactNote(contactId, summary);
      } catch (err) {
        console.error("lead note failed", err);
      }
      try {
        await setCustomFieldByKey(contactId, SUMMARY_FIELD_KEY, summary);
      } catch (err) {
        console.error("lead summary field failed", err);
      }
    }

    // Last, because the tag is what starts the alert workflow, and the
    // alert reads the summary written above. If the tag does not land
    // nobody is told, so that is a failure the visitor should see.
    await addTags(contactId, tags);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lead capture failed", err);
    return NextResponse.json(
      { error: "Could not save your request" },
      { status: 502 },
    );
  }
}
