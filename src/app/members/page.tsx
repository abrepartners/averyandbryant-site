import Link from "next/link";

export const metadata = {
  title: "Member Account | The Spot · Avery & Bryant",
  description:
    "Member hub for The Spot Creative Studios. Manage your subscription, book sessions, and access your credits.",
  robots: { index: false, follow: false },
};

const STRIPE_PORTAL_URL =
  process.env.NEXT_PUBLIC_STRIPE_PORTAL_URL ??
  "https://billing.stripe.com/p/login/test-activate-portal";

const CALENDAR_BOOKING_URL = "https://averyandbryant.com/studio#sets";

const cards = [
  {
    key: "billing",
    tag: "Billing",
    title: "Manage your subscription",
    description:
      "Update payment method, view invoices, upgrade or pause your plan — all in Stripe's secure portal.",
    cta: { label: "Open Billing Portal", href: STRIPE_PORTAL_URL, external: true },
    accent: "crimson",
  },
  {
    key: "booking",
    tag: "Sessions",
    title: "Book a studio slot",
    description:
      "Your member discount applies automatically at checkout. Pick a room, pick a time, show up ready to record.",
    cta: { label: "Browse Rooms", href: CALENDAR_BOOKING_URL, external: false },
    accent: "amber",
  },
  {
    key: "credits",
    tag: "Credits & Add-Ons",
    title: "Spend monthly credits",
    description:
      "Redeem your credits on editing rounds, engineer assist, equipment access, extra 30-min blocks, or rush delivery. Reply to any confirmation email to redeem.",
    cta: {
      label: "Request a credit redemption",
      href: "mailto:book@averyandbryant.com?subject=Credit%20Redemption%20Request",
      external: true,
    },
    accent: "sky",
  },
  {
    key: "support",
    tag: "Support",
    title: "Need a hand?",
    description:
      "Reply to any confirmation email, or reach Thomas directly — we answer fast during studio hours.",
    cta: {
      label: "Contact support",
      href: "mailto:book@averyandbryant.com?subject=Member%20Support",
      external: true,
    },
    accent: "rose",
  },
];

const accentMap: Record<string, { border: string; pill: string }> = {
  crimson: {
    border: "border-crimson/30 hover:border-crimson/60",
    pill: "text-crimson",
  },
  amber: {
    border: "border-amber-400/20 hover:border-amber-400/50",
    pill: "text-amber-200/90",
  },
  sky: {
    border: "border-sky-400/20 hover:border-sky-400/50",
    pill: "text-sky-200/90",
  },
  rose: {
    border: "border-rose-400/20 hover:border-rose-400/50",
    pill: "text-rose-200/90",
  },
};

export default function MembersPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-white/5 bg-[#0a0a0a]">
        <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-crimson/6 blur-[180px]" />
        <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-amber-400/6 blur-[160px]" />

        <div className="relative mx-auto max-w-[1280px] px-6 py-24 md:px-12 md:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
              The Spot · Member Account
            </span>
          </div>

          <h1 className="mt-8 font-display text-[clamp(36px,6vw,72px)] font-extralight leading-[0.98] tracking-tight text-white-90">
            Welcome back.
            <br />
            <span className="text-white-40 italic">
              Manage your studio membership.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 md:text-lg">
            Your hub for The Spot. Manage billing, book your next session, or
            redeem monthly credits. Sign in with the email you subscribed with
            — no extra password to remember.
          </p>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/35">
            Looking for your real estate media instead?{" "}
            <a
              href="https://homes.averyandbryant.com/portal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson hover:text-white"
            >
              That&apos;s a separate portal — open it here
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── CARDS GRID ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => {
              const accent = accentMap[card.accent] ?? accentMap.crimson;
              return (
                <article
                  key={card.key}
                  className={`rounded-lg border bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 md:p-10 ${accent.border}`}
                >
                  <p
                    className={`text-[10px] font-medium uppercase tracking-[0.25em] ${accent.pill}`}
                  >
                    {card.tag}
                  </p>
                  <h2 className="mt-4 font-display text-2xl font-medium text-white-90">
                    {card.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">
                    {card.description}
                  </p>
                  {card.cta.external ? (
                    <a
                      href={card.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white/70 transition-all hover:border-white/40 hover:text-white"
                    >
                      {card.cta.label}
                      <span aria-hidden>&rarr;</span>
                    </a>
                  ) : (
                    <Link
                      href={card.cta.href}
                      className="mt-8 inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white/70 transition-all hover:border-white/40 hover:text-white"
                    >
                      {card.cta.label}
                      <span aria-hidden>&rarr;</span>
                    </Link>
                  )}
                </article>
              );
            })}
          </div>

          <p className="mt-12 text-center text-sm text-white/35">
            Not a member yet?{" "}
            <Link href="/studio" className="text-crimson hover:text-white">
              See membership options
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── HOW THE LOGIN WORKS ── */}
      <section className="border-t border-white/5 bg-[rgba(17,17,17,0.3)] py-16 md:py-20">
        <div className="mx-auto max-w-[960px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            How login works
          </p>
          <h2 className="mt-4 font-display text-[clamp(22px,3.5vw,32px)] font-light tracking-tight text-white-90">
            Email-based. No passwords to remember.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Tap Billing Portal",
                d: "Enter the email you subscribed with.",
              },
              {
                n: "02",
                t: "Get a magic link",
                d: "Stripe sends a one-time code within seconds.",
              },
              {
                n: "03",
                t: "Manage everything",
                d: "Update card, change tier, download invoices, cancel.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded border border-white/5 bg-[rgba(10,10,10,0.6)] p-6"
              >
                <span className="font-display text-3xl font-extralight text-crimson/40">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-base font-medium text-white-90">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
