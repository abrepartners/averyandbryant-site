import { Hero } from "@/components/hero";

export const metadata = {
  alternates: { canonical: "/referral" },
  title: "Referral Program | Earn Cash for Every Referral | Avery & Bryant",
  description:
    "Refer an agent or property owner to Avery & Bryant and earn cash for every booking. No cap, no expiration. Real money, not gift cards.",
};

const steps = [
  {
    number: "01",
    title: "Share Our Name",
    description:
      "Tell a colleague about A&B, share our number (501-502-2925), or forward them our booking link.",
  },
  {
    number: "02",
    title: "They Book a Shoot",
    description:
      "When they place their order, they mention your name. That's it. No codes, no tracking links, no hoops.",
  },
  {
    number: "03",
    title: "You Get Paid",
    description:
      "After their shoot is complete, we send you cash. Every single time. No cap, no expiration.",
  },
];

const whoCanRefer = [
  "Real estate agents",
  "Property managers",
  "Airbnb/rental owners",
  "Builders & contractors",
  "Interior designers & stagers",
  "Anyone who knows someone who needs professional media",
];

const faqs = [
  {
    question: "How do I refer someone?",
    answer:
      'Just tell them about us. When they book, they\'ll see a "How\'d you hear about us?" field. They select "Referral" and type your name. That\'s it.',
  },
  {
    question: "When do I get paid?",
    answer:
      "After the referred client's shoot is complete and media is delivered. Usually within a week of the shoot.",
  },
  {
    question: "Is there a limit?",
    answer:
      "No. Refer as many people as you want. Every booking from your referral earns you cash.",
  },
  {
    question: "Do they get a discount?",
    answer:
      "First-time clients get 10% off with code FIRST. So yes, you're hooking them up too.",
  },
];

export default function ReferralPage() {
  return (
    <>
      <Hero
        tag="Referral Program"
        title="Know an agent?"
        titleAccent="Get paid."
        subtitle="Every agent or property owner you refer who books a shoot earns you cash. Not a gift card. Not a thank you email. Actual money."
        primaryCta={{ label: "Start Referring", href: "#how-it-works" }}
        secondaryCta={{ label: "Call Us", href: "tel:+15015022925" }}
        backgroundImage="/images/portfolio-exterior-1.jpg"
      />

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            How It Works
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Three steps. <span className="text-white-40">That&apos;s it.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10"
              >
                <span className="font-display text-5xl font-bold text-crimson/30 transition-colors group-hover:text-crimson/60">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-xl font-medium text-white-90">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY WE DO THIS ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Why We Do This
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Your trust is worth more than any ad.
          </h2>
          <div className="mt-10 max-w-3xl space-y-6">
            <p className="text-base leading-relaxed text-white/50 md:text-lg">
              Word of mouth built this company. Every referral you send us is
              worth more than any ad we could run. So we put our money where our
              mouth is.
            </p>
            <p className="text-base leading-relaxed text-white/50 md:text-lg">
              We don&apos;t do $25 Starbucks gift cards. We don&apos;t do
              &ldquo;credits toward your next shoot.&rdquo; We do cash. Because
              your time and trust deserve real compensation.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU EARN ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            What You Earn
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Real cash. <span className="text-white-40">No limits.</span>
          </h2>
          <div className="mt-10 max-w-3xl space-y-6">
            <div className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/50" />
              <p className="text-base leading-relaxed text-white/50 md:text-lg">
                Referral payouts are based on the booking value. The bigger the
                shoot, the bigger your payout.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/50" />
              <p className="text-base leading-relaxed text-white/50 md:text-lg">
                There&apos;s no cap. Refer 1 agent or 50. Every booking counts.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/50" />
              <p className="text-base leading-relaxed text-white/50 md:text-lg">
                Payouts are sent after the shoot is completed and delivered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO CAN REFER ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Who Can Refer
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            If you know someone, you qualify.
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whoCanRefer.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded border border-white/5 bg-[rgba(17,17,17,0.5)] px-6 py-4 transition-all duration-500 hover:border-crimson/20"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/50" />
                <span className="text-sm font-medium text-white/60">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Common questions.
          </h2>

          <div className="mt-12 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] transition-all duration-500 hover:border-crimson/20 [&[open]]:border-crimson/20"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-medium text-white-90 transition-colors hover:text-white list-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="shrink-0 text-white-30 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-sm leading-relaxed text-white/50">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Ready to start referring?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Call us at (501) 502-2925 or email book@averyandbryant.com to get
            set up.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+15015022925"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Call Now
            </a>
            <a
              href="mailto:book@averyandbryant.com?subject=Referral%20Program"
              className="inline-block rounded border border-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-60 transition-all hover:border-white/30 hover:text-white"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
