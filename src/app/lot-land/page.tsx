import { Hero } from "@/components/hero";
import { OrderLink } from "@/components/order-link";

export const metadata = {
  title: "Lot & Land Photography | Aerial Drone | Arkansas | Avery & Bryant",
  description:
    "Professional aerial drone photography, ground-level photos, and video flyovers for lots, land, and development sites across Arkansas.",
};

const packages = [
  {
    name: "BASE",
    price: "$175",
    tag: "Essential aerials",
    features: [
      "6 aerial photos",
    ],
  },
  {
    name: "PRO",
    price: "$275",
    tag: "Boundaries + context",
    features: [
      "8 aerial photos",
      "2 boundary overlays",
      "Proximity highlights",
    ],
  },
  {
    name: "PRO+",
    price: "$450",
    tag: "Full aerial coverage",
    features: [
      "10 aerial photos",
      "Drone video",
      "Boundary overlays",
      "Proximity highlights",
    ],
  },
  {
    name: "Vision Package",
    price: "$750+",
    tag: "See what could be built",
    features: [
      "Everything in PRO+",
      "AI rendering of potential build",
      "Powered by StudioAI",
    ],
  },
];

const sellingPoints = [
  {
    title: "Aerial Boundary Shots",
    description:
      "Drone photography that clearly shows property lines, lot shape, and total acreage from a perspective buyers can't get on foot.",
  },
  {
    title: "Neighboring Features",
    description:
      "We capture what's around the property — roads, utilities, water features, schools, and shopping. Context sells land.",
  },
  {
    title: "Development Potential",
    description:
      "Aerial views that help buyers and developers visualize buildable areas, drainage patterns, and subdivision possibilities.",
  },
  {
    title: "FAA-Licensed Pilots",
    description:
      "Every flight is operated by FAA Part 107 certified pilots with full insurance coverage. Professional and compliant.",
  },
];

const steps = [
  { number: "01", title: "Book Online", description: "Pick your date and services in under 2 minutes." },
  { number: "02", title: "We Shoot", description: "Our team arrives on site and captures everything." },
  { number: "03", title: "Get Your Media", description: "Edited photos and video delivered within 24 hours." },
];

export default function LotLandPage() {
  return (
    <>
      {/* ── HERO ── */}
      <Hero
        tag="Lot & Land Media"
        title="Sell the vision,"
        titleAccent="not just the dirt."
        subtitle="Professional aerial drone photography, ground-level coverage, and cinematic flyover video for lots, land, and development sites across Arkansas."
        primaryCta={{ label: "Book Now", vertical: "lot-land" }}
        secondaryCta={{ label: "View Portfolio", href: "https://homes.averyandbryant.com", external: true }}
        backgroundImage="/images/portfolio-drone-3.jpg"
      />

      {/* ── SERVICES & PRICING ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Services & Pricing
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Land doesn&apos;t sell itself.{" "}
            <span className="text-white-40">But great media helps.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="pricing-card group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                  {pkg.tag}
                </span>
                <h3 className="mt-4 font-display text-2xl font-medium text-white-90">
                  {pkg.name}
                </h3>
                <span className="pricing-price mt-2 block font-display text-4xl font-light text-crimson">
                  {pkg.price}
                </span>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/50">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <OrderLink
                  vertical="lot-land"
                  className="mt-8 inline-block rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
                >
                  Book Now
                </OrderLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY A&B ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Why Avery & Bryant
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Buyers need to see the potential.{" "}
            <span className="text-white-40">We show it.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {sellingPoints.map((point) => (
              <div key={point.title} className="flex gap-6">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-crimson" />
                <div>
                  <h3 className="font-display text-lg font-medium text-white-90">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            How It Works
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Three steps.{" "}
            <span className="text-white-40">That&apos;s it.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20"
              >
                <span className="font-display text-4xl font-extralight text-crimson/30">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-white-90">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-white/30">
            Serving Arkansas land agents and developers since 2018.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Ready to move that listing?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Book a shoot in under 2 minutes. Aerial media that helps buyers see what you already know.
          </p>
          <div className="mt-10">
            <OrderLink
              vertical="lot-land"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book Now
            </OrderLink>
          </div>
        </div>
      </section>
    </>
  );
}
