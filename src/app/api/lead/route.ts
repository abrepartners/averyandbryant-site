import { NextResponse } from "next/server";
import { upsertContact, addContactNote } from "@/lib/ghl";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string; // honeypot — real users never fill this
  quote?: {
    vertical?: string;
    goal?: string;
    scope?: string;
    package?: string;
    price?: string;
  };
};

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

  try {
    const result = await upsertContact({
      firstName,
      lastName: payload.lastName?.trim() || undefined,
      email: email || undefined,
      phone: phone || undefined,
      source: "site-quote-popup",
      tags: ["quote-request"],
    });

    const contactId = result.contact?.id;
    const q = payload.quote;
    if (contactId && q) {
      const lines = [
        "Quote request from site popup",
        q.vertical ? `Vertical: ${q.vertical}` : null,
        q.package ? `Recommended package: ${q.package}` : null,
        q.price ? `Quoted price: ${q.price}` : null,
        q.goal ? `Goal: ${q.goal}` : null,
        q.scope ? `Scope: ${q.scope}` : null,
      ].filter(Boolean);
      // Note failure shouldn't fail the lead — contact is already captured
      try {
        await addContactNote(contactId, lines.join("\n"));
      } catch (err) {
        console.error("lead note failed", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lead capture failed", err);
    return NextResponse.json(
      { error: "Could not save your request" },
      { status: 502 },
    );
  }
}
