/**
 * The one real consultation path on the site: the Free Consultation calendar
 * in GHL (30-minute slots, published). Every "consult", "free call" or
 * "program call" action routes here. /book is the shoot order form and must
 * never be labeled as a consultation.
 *
 * ?interest=<vertical> is a deep-link prefill so the team sees context before
 * the call.
 */
export const CONSULT_BASE =
  "https://api.leadconnectorhq.com/widget/booking/FYjHtkIcX1ebCSfCxQVc";

export function consultUrl(interest?: string): string {
  return interest
    ? `${CONSULT_BASE}?interest=${encodeURIComponent(interest)}`
    : CONSULT_BASE;
}

/** Consult request by email for anything the calendar does not cover. */
export const CONSULT_EMAIL = "book@averyandbryant.com";

export function requestUrl(subject: string): string {
  return `mailto:${CONSULT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
