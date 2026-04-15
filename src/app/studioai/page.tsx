import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "StudioAI | AI Photo Editing for Real Estate | Avery & Bryant",
  description:
    "AI-powered listing media platform with virtual staging, smart cleanup, day to dusk, and batch processing. Stage it. Clean it. Market it. Ship it.",
};

const beforeAfterPairs = [
  {
    label: "Virtual Staging",
    before: "/images/showcase-staging-before.jpg",
    after: "/images/showcase-staging-after.jpg",
  },
  {
    label: "Smart Cleanup",
    before: "/images/showcase-cleanup-before.jpg",
    after: "/images/showcase-cleanup-after.jpg",
  },
  {
    label: "Day to Dusk",
    before: "/images/showcase-dusk-before.jpg",
    after: "/images/showcase-dusk-after.jpg",
  },
];

const features = [
  {
    title: "Virtual Staging",
    description: "12+ styles, powered by Gemini Pro",
  },
  {
    title: "Smart Cleanup",
    description: "6 auto-detect modes",
  },
  {
    title: "Day to Dusk",
    description: "Daytime to twilight in seconds",
  },
  {
    title: "Sky Replacement",
    description: "One click, perfect skies",
  },
  {
    title: "Furniture Removal",
    description: "Paint-to-remove technology",
  },
  {
    title: "Batch Processing",
    description: "25+ photos at once",
  },
  {
    title: "Reveal Videos",
    description: "Before/after wipe animations",
  },
  {
    title: "Marketing Kit",
    description: "MLS copy + social captions",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/mo",
    features: [
      "5 generations per month",
      "All tools included",
      "Gemini Flash model",
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    features: [
      "Unlimited generations",
      "Gemini Pro (photorealistic)",
      "Batch processing",
      "Reveal videos",
      "MLS export",
    ],
    featured: true,
  },
  {
    name: "Brokerage",
    price: "$299",
    period: "/mo",
    features: [
      "15 agent seats",
      "Everything in Pro",
      "Admin dashboard",
    ],
    featured: false,
  },
];

export default function StudioAIPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/5 blur-[150px]" />
        <div className="absolute left-8 top-24 h-20 w-20 border-l border-t border-crimson/20" />
        <div className="absolute bottom-24 right-8 h-20 w-20 border-b border-r border-crimson/20" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
              AI Photo Editing for Real Estate
            </span>
          </div>

          <h1 className="font-display text-[clamp(32px,6vw,72px)] font-extralight leading-[1.1] tracking-tight text-white-90">
            Stage it. Clean it.
            <br />
            <span className="text-white-40">Market it. Ship it.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white-50 md:text-lg">
            The AI-powered listing media platform that stages, enhances, and
            markets your photos in minutes, not days.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://studioai.averyandbryant.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Start Free with Google
            </a>
            <Link
              href="/book"
              className="inline-block rounded border border-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-60 transition-all hover:border-white/30 hover:text-white"
            >
              Book a Demo
            </Link>
          </div>

          <video
            className="mx-auto mt-8 w-full max-w-3xl rounded-lg border border-white/10"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/images/demo-video.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Before/After Showcase */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-display text-[clamp(24px,4vw,48px)] font-extralight tracking-tight text-white-90">
              Real Results
            </h2>
            <p className="mt-4 text-white-50">
              See what StudioAI can do with a single click.
            </p>
          </div>

          <div className="grid gap-12 md:gap-16">
            {beforeAfterPairs.map((pair) => (
              <div key={pair.label}>
                <h3 className="mb-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-crimson">
                  {pair.label}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative overflow-hidden rounded-lg border border-white/5">
                    <div className="absolute left-3 top-3 z-10 rounded bg-black/60 px-2 py-1 text-[10px] uppercase tracking-widest text-white-60">
                      Before
                    </div>
                    <Image
                      src={pair.before}
                      alt={`${pair.label} before`}
                      width={640}
                      height={427}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-lg border border-crimson/20">
                    <div className="absolute left-3 top-3 z-10 rounded bg-crimson/80 px-2 py-1 text-[10px] uppercase tracking-widest text-white">
                      After
                    </div>
                    <Image
                      src={pair.after}
                      alt={`${pair.label} after`}
                      width={640}
                      height={427}
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-display text-[clamp(24px,4vw,48px)] font-extralight tracking-tight text-white-90">
              Eight tools. One platform.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-white/5 bg-card p-6 transition-all hover:border-crimson/20"
              >
                <h3 className="text-sm font-medium text-white-90">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-white-40">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-display text-[clamp(24px,4vw,48px)] font-extralight tracking-tight text-white-90">
              Simple pricing
            </h2>
          </div>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg border p-8 ${
                  plan.featured
                    ? "border-crimson/40 bg-crimson/5"
                    : "border-white/5 bg-card"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-crimson px-3 py-0.5 text-[10px] uppercase tracking-widest text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-medium text-white-90">
                  {plan.name}
                </h3>
                <div className="mt-4">
                  <span className="text-4xl font-extralight text-white-90">
                    {plan.price}
                  </span>
                  <span className="text-white-40">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-white-50"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://studioai.averyandbryant.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 block w-full rounded py-3 text-center text-[11px] uppercase tracking-[0.2em] transition-all ${
                    plan.featured
                      ? "bg-crimson text-white hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
                      : "border border-white/10 text-white-60 hover:border-white/30 hover:text-white"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-crimson">
            First 20 users lock in Early Bird at $14/mo forever
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <h2 className="font-display text-[clamp(24px,4vw,48px)] font-extralight tracking-tight text-white-90">
            Stop paying $300 per staging.
          </h2>
          <a
            href="https://studioai.averyandbryant.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
          >
            Open StudioAI
          </a>
        </div>
      </section>
    </>
  );
}
