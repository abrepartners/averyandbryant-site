import { HeroCommercial } from "@/components/heroes/hero-commercial";
import { ConsultCTA } from "@/components/consult-cta";

export const metadata = {
  title: "Commercial Photography | Dealerships, Offices, Retail | Arkansas | Avery & Bryant",
  description:
    "Professional commercial photography, drone, and video for dealerships, offices, retail, restaurants, industrial, and hospitality properties across Arkansas.",
};

const categories = [
  {
    name: "CRE Listings",
    price: "From $895",
    anchor: "$1,400+ à la carte",
    savings: "Save $505+",
    tag: "For commercial brokers",
    features: [
      "Facade + drone overview",
      "Proximity & demographic context",
      "Interior walkthroughs + floor plans",
      "Fast-turn for new listings",
    ],
  },
  {
    name: "Dealerships",
    price: "$895/mo",
    anchor: "$1,500+ per single visit",
    savings: "Save every month",
    tag: "Ongoing programs · inventory + brand",
    features: [
      "Lot drone overviews",
      "Vehicle inventory photography",
      "Showroom + service bay interiors",
      "Monthly refresh options",
    ],
  },
  {
    name: "Offices & Retail",
    price: "From $1,295",
    anchor: "$1,800+ à la carte",
    savings: "Save $505+",
    tag: "Exterior + interior + team",
    features: [
      "Facade + signage",
      "Interior workspace coverage",
      "Team & leadership portraits",
      "Drone context shots",
    ],
  },
  {
    name: "Hospitality & Specialty",
    price: "From $1,295",
    anchor: "Custom scope",
    savings: "Priced to fit",
    tag: "Restaurants, venues, industrial, other",
    features: [
      "Ambience + lifestyle styling",
      "Food + beverage photography",
      "Industrial facility tours",
      "Event-ready galleries",
    ],
  },
];

const sellingPoints = [
  {
    title: "Custom-Scope, Not Package Math",
    description:
      "Every commercial project is different. We build the shoot around your property, your brand, and how the media will be used — not around pre-packaged SKUs.",
  },
  {
    title: "Ongoing Content Programs",
    description:
      "Monthly retainer options for dealerships and properties that need fresh content — seasonal refreshes, new inventory, updated interiors, team changes.",
  },
  {
    title: "FAA-Licensed Aerials",
    description:
      "Part 107 certified pilots with full insurance coverage. Properly permitted for commercial airspace — not hobby drones over a parking lot.",
  },
  {
    title: "Same Media Team, Built-In Scale",
    description:
      "The same team that shoots residential listings handles your commercial work. Consistent aesthetic, predictable turnaround, one point of contact.",
  },
];

const steps = [
  {
    number: "01",
    title: "Scope Call",
    description: "15 minutes to align on property, use cases, and deliverables.",
  },
  {
    number: "02",
    title: "Quote & Schedule",
    description: "Written quote within 24 hours. Pick a shoot window.",
  },
  {
    number: "03",
    title: "Get Your Media",
    description: "Edited photos and video delivered within 72 hours of the shoot.",
  },
];

export default function CommercialPage() {
  return (
    <>
      <HeroCommercial />

      {/* ── CATEGORIES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            What we cover
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            One media team.{" "}
            <span className="text-white-40">Every commercial category.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-sky-400/20 hover:bg-[rgba(17,17,17,0.8)] md:p-10"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sky-300/70">
                  {cat.tag}
                </span>
                <h3 className="mt-4 font-display text-2xl font-medium text-white-90">
                  {cat.name}
                </h3>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-2xl font-light text-crimson">
                    {cat.price}
                  </span>
                  <span className="text-[11px] text-white/30 line-through">
                    {cat.anchor}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-amber-200/80">
                    {cat.savings}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {cat.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-white/50"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/60" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-white/35">
            Don&apos;t see your category? It probably still fits.{" "}
            <a
              href="mailto:book@averyandbryant.com?subject=Commercial%20Media%20Quote"
              className="text-crimson transition-colors hover:text-white"
            >
              Let&apos;s talk.
            </a>
          </p>
        </div>
      </section>

      {/* ── WHY A&B ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Why Avery & Bryant
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Commercial-grade output.{" "}
            <span className="text-white-40">Without the agency markup.</span>
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
            Quote in 24 hours.{" "}
            <span className="text-white-40">Shoot within the week.</span>
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
            Serving Arkansas commercial property owners, operators, and
            marketing teams.
          </p>
        </div>
      </section>

      <ConsultCTA
        interest="commercial"
        headline="Commercial work is always custom."
        subhead="Dealership, office, retail, hospitality — every property has a different story to tell. Free 30-min scoping call to get a real quote, not a guess."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Tell us about your property.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Send a quick note with your property type and goals. We&apos;ll
            follow up within 24 hours with a written quote.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:book@averyandbryant.com?subject=Commercial%20Media%20Quote"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Request a Quote
            </a>
            <a
              href="tel:+15015022925"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-70 transition-all hover:border-white/40 hover:text-white"
            >
              Call (501) 502-2925
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
