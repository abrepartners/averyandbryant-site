import Link from "next/link";

// Free Consultation calendar in GHL (30-min slots, published).
// We deep-link with ?prefill=<interest> so Thomas sees context before the call.
const CONSULT_BASE =
  "https://api.leadconnectorhq.com/widget/booking/FYjHtkIcX1ebCSfCxQVc";

type ConsultCTAProps = {
  /**
   * Short label for the vertical — e.g. "real-estate", "multi-family",
   * "studio", "branding". Prefills into the consult form.
   */
  interest: string;
  /**
   * Optional headline override. Default copy adapts to a generic case.
   */
  headline?: string;
  /**
   * Optional subhead override.
   */
  subhead?: string;
};

export function ConsultCTA({ interest, headline, subhead }: ConsultCTAProps) {
  const url = `${CONSULT_BASE}?interest=${encodeURIComponent(interest)}`;

  return (
    <section
      aria-label="Book a free consultation"
      className="border-t border-white/5 bg-[rgba(17,17,17,0.35)] py-20 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid items-center gap-10 rounded-lg border border-white/5 bg-[rgba(10,10,10,0.6)] p-8 md:grid-cols-[1.4fr_1fr] md:gap-12 md:p-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-200/90">
                Free 30-min consult
              </span>
            </div>
            <h2 className="mt-5 font-display text-[clamp(24px,4vw,36px)] font-light tracking-tight text-white-90">
              {headline ?? "Not sure which service fits?"}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/55">
              {subhead ??
                "Book a free 30-minute call with Thomas. We'll walk through what you're trying to do, what it costs, and which package actually fits — no pressure, no pitch deck."}
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-white/45 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-crimson" />
                <span>Compare packages across verticals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-crimson" />
                <span>Get real-time pricing for your scope</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-crimson" />
                <span>Talk studio membership vs. one-off</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-crimson" />
                <span>Walk away with a written next-step</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Free Consult
            </a>
            <Link
              href="/pricing"
              className="text-[11px] uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white md:text-right"
            >
              Or compare all services &rarr;
            </Link>
            <p className="text-xs text-white/30 md:text-right">
              30 minutes · Google Meet · (501) 502-2925 if you'd rather call
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
