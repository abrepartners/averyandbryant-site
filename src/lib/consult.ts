/**
 * Every consultation, discovery and demo action on the site routes to a real,
 * published GHL calendar. /book is the shoot order form and must never be
 * labeled as a consultation or a demo.
 *
 * Calendars (widget URL = https://api.leadconnectorhq.com/widget/booking/<id>):
 *   consult   Free Consultation, 30 min. Commercial, multi-family, builders
 *             and land programs, pricing questions. ?interest=<vertical> is a
 *             deep-link prefill so the team sees context before the call.
 *   branding  Agent Branding Discovery, 30 min. Any branding conversation.
 *   headshot  Headshot Session, 30 min. Books the $95 session itself.
 *   demo      AI Demo Call, 15 min. Vellum and Answr demos.
 * The Spot rooms are booked on gettothespot.com (link out, never embedded).
 * No other service calendars exist; do not invent any.
 */
export type CalendarService = "consult" | "branding" | "headshot" | "demo";

const WIDGET = "https://api.leadconnectorhq.com/widget/booking/";

export const CALENDARS: Record<
  CalendarService,
  { id: string; name: string; minutes: number; label: string }
> = {
  consult: {
    id: "FYjHtkIcX1ebCSfCxQVc",
    name: "Free Consultation",
    minutes: 30,
    label: "Book a free 30-min call",
  },
  branding: {
    id: "tNt0kfl0lxd9Ijm1hecR",
    name: "Agent Branding Discovery",
    minutes: 30,
    label: "Book a branding discovery call",
  },
  headshot: {
    id: "aVdEBx1EGu91cOjXFgfb",
    name: "Headshot Session",
    minutes: 30,
    label: "Book a headshot session",
  },
  demo: {
    id: "WVAt2apw8OvHjLQpKoZh",
    name: "AI Demo Call",
    minutes: 15,
    label: "Book a 15-minute demo",
  },
};

export function calendarUrlFor(
  service: CalendarService,
  interest?: string,
): string {
  const base = `${WIDGET}${CALENDARS[service].id}`;
  return interest ? `${base}?interest=${encodeURIComponent(interest)}` : base;
}

export const CONSULT_BASE = `${WIDGET}${CALENDARS.consult.id}`;

/** Free Consultation calendar, optionally prefilled with the vertical. */
export function consultUrl(interest?: string): string {
  return calendarUrlFor("consult", interest);
}

/** The Spot studio rooms are booked on their own site. */
export const STUDIO_BOOKING_URL = "https://www.gettothespot.com";

/** Consult request by email for anything the calendar does not cover. */
export const CONSULT_EMAIL = "book@averyandbryant.com";

export function requestUrl(subject: string): string {
  return `mailto:${CONSULT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
