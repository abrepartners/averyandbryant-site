import { Hero } from "@/components/hero";

export const metadata = {
  title: "Builder & Construction Photography | Arkansas | Avery & Bryant",
  description:
    "Professional photography, drone aerials, and video tours for builders, construction projects, and model homes across Arkansas. Document the build. Market the result.",
};

const packages = [
  {
    name: "Single Visit",
    price: "$400",
    tag: "One-time documentation",
    features: [
      "Progress photos",
      "Drone",
    ],
  },
  {
    name: "Marketing Package",
    price: "$950",
    tag: "For completed or model homes",
    features: [
      "Photos (HDR)",
      "Drone video",
      "Reels pack (4 reels)",
    ],
  },
  {
    name: "Progress Program",
    price: "$599/mo",
    tag: "Track the build",
    features: [
      "Monthly visits",
      "Documentation",
      "Aerial updates",
    ],
  },
  {
    name: "Model Home Launch",
    price: "$1,200+",
    tag: "The finished product",
    features: [
      "Full media package",
      "Photos + drone + video",
      "Reels + floor plan",
    ],
  },
];

const sellingPoints = [
  {
    title: "Construction Progress Tracking",
    description:
      "Consistent photo documentation at every stage. Use it for investor updates, warranty records, and marketing content.",
  },
  {
    title: "Model Home Marketing",
    description:
      "We shoot your model homes like luxury listings — because that's how buyers shop. Premium media that justifies premium pricing.",
  },
  {
    title: "Development Aerial Overviews",
    description:
      "Drone photography and video that show the full scope of your development — completed lots, infrastructure, and available parcels.",
  },
  {
    title: "Consistent Brand Quality",
    description:
      "Every home you build gets the same premium media treatment. Your brand looks professional from listing to listing.",
  },
];

const steps = [
  { number: "01", title: "Book Online", description: "Pick your date and services in under 2 minutes." },
  { number: "02", title: "We Shoot", description: "Our team arrives on site and captures everything." },
  { number: "03", title: "Get Your Media", description: "Edited photos and video delivered within 24 hours." },
];

export default function BuildersPage() {
  return (
    <>
      {/* ── HERO ── */}
      <Hero
        tag="Builder & Business Media"
        title="Document the build."
        titleAccent="Market the result."
        subtitle="Professional photography, drone aerials, and cinematic video for builders, developers, and construction companies across Arkansas."
        primaryCta={{ label: "Book Now", href: "https://homes.averyandbryant.com/order-forms/01914ab4-8713-72aa-b503-63ed6d4a11a5", external: true }}
        secondaryCta={{ label: "View Portfolio", href: "https://homes.averyandbryant.com", external: true }}
        backgroundImage="/images/portfolio-exterior-1.jpg"
      />

      {/* ── SERVICES & PRICING ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Services & Pricing
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            From foundation to finished.{" "}
            <span className="text-white-40">We cover every stage.</span>
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
                <a
                  href="https://homes.averyandbryant.com/order-forms/01914ab4-8713-72aa-b503-63ed6d4a11a5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
                >
                  Book Now
                </a>
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
            You build great homes.{" "}
            <span className="text-white-40">We make sure people see them.</span>
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
            Serving Arkansas builders and developers since 2018.
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
            Ready to showcase your work?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Book a shoot in under 2 minutes. Professional media that sells homes before the sign goes up.
          </p>
          <div className="mt-10">
            <a
              href="https://homes.averyandbryant.com/order-forms/01914ab4-8713-72aa-b503-63ed6d4a11a5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
