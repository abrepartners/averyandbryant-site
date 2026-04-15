import Link from "next/link";
import { Hero } from "@/components/hero";

export const metadata = {
  title: "Lot & Land Photography | Aerial Drone | Arkansas | Avery & Bryant",
  description:
    "Professional aerial drone photography, ground-level photos, and video flyovers for lots, land, and development sites across Arkansas.",
};

const services = [
  {
    title: "Drone / Aerial",
    price: "$80",
    description:
      "High-resolution aerial photography showing boundaries, topography, access roads, and surrounding context.",
  },
  {
    title: "Photos",
    price: "$162",
    description:
      "Ground-level photography capturing terrain, tree coverage, road frontage, and key features buyers need to see.",
  },
  {
    title: "Video Flyover",
    price: "$250",
    description:
      "Cinematic aerial video that walks buyers through the entire parcel from above — the next best thing to visiting.",
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
        primaryCta={{ label: "Book Now", href: "/book" }}
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

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)]"
              >
                <span className="font-display text-3xl font-light text-crimson">
                  {service.price}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-white-90">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {service.description}
                </p>
                <Link
                  href="/book"
                  className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
                >
                  Book Now &rarr;
                </Link>
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
            <Link
              href="/book"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
