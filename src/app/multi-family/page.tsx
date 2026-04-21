import { HeroMultiFamily } from "@/components/heroes/hero-multi-family";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";

export const metadata = {
  title: "Multi-Family & Apartment Photography | Arkansas | Avery & Bryant",
  description:
    "Professional photography, drone aerials, video tours, and virtual staging for apartment complexes and multi-family properties across Arkansas.",
};

// May 1 pricing. Anchor columns reflect à-la-carte equivalent.
const packages = [
  {
    name: "Leasing Essentials",
    price: "$895",
    anchor: "$1,297 à la carte",
    savings: "Save $402",
    tag: "Get leasing assets fast",
    features: [
      "Model unit photos (HDR)",
      "Drone aerial",
      "Amenity coverage (up to 5 zones)",
      "3D virtual tour",
    ],
  },
  {
    name: "Full Property",
    price: "$1,495",
    anchor: "$2,486 à la carte",
    savings: "Save $991",
    tag: "Complete media coverage",
    features: [
      "40+ MLS-grade photos",
      "Drone video (60-90 sec)",
      "3D tour (model unit)",
      "Floor plans (per unit type)",
      "Reels pack (4 reels)",
    ],
  },
  {
    name: "Marketing Suite",
    price: "Custom",
    anchor: "Scope-dependent",
    savings: "Starts at $2,495",
    tag: "Ongoing content program",
    features: [
      "Everything in Full Property",
      "Ongoing monthly content",
      "Multiple model units",
      "Full amenity showcase video",
    ],
  },
];

const sellingPoints = [
  {
    title: "Model Unit Showcase",
    description:
      "We photograph your best unit like it's a luxury listing — because to your next tenant, it is.",
  },
  {
    title: "Amenity Photography",
    description:
      "Pool, gym, dog park, clubhouse, laundry — every amenity gets dedicated coverage that sells the lifestyle.",
  },
  {
    title: "Aerial Complex Overview",
    description:
      "Drone shots that show the full property, proximity to highways, shopping, and schools. Context matters.",
  },
  {
    title: "Leasing-Ready Assets",
    description:
      "Every photo and video is formatted for ILS platforms, your website, social media, and print collateral.",
  },
];

const steps = [
  { number: "01", title: "Book Online", description: "Pick your date and services in under 2 minutes." },
  { number: "02", title: "We Shoot", description: "Our team arrives on time and captures everything." },
  { number: "03", title: "Get Your Media", description: "Edited photos and video delivered within 24 hours." },
];

export default function MultiFamilyPage() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroMultiFamily />

      {/* ── SERVICES & PRICING ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Services & Pricing
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Media built for leasing teams.{" "}
            <span className="text-white-40">Not just agents.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
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
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[11px]">
                  <span className="text-white/30 line-through">
                    {pkg.anchor}
                  </span>
                  <span className="font-medium uppercase tracking-[0.15em] text-amber-200/80">
                    {pkg.savings}
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/50">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/50" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <OrderLink
                  vertical="multi-family"
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
            Your property is the product.{" "}
            <span className="text-white-40">Market it like one.</span>
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
            Serving Arkansas property managers and leasing teams since 2018.
          </p>
        </div>
      </section>

      <ConsultCTA
        interest="multi-family"
        headline="Planning a lease-up or refresh?"
        subhead="Multi-family scope varies a lot by property size, amenity count, and timeline. Free 30-min call to right-size the package and talk recurring content programs."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Ready to reduce vacancy rates?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Book a shoot in under 2 minutes. Professional media that fills units faster.
          </p>
          <div className="mt-10">
            <OrderLink
              vertical="multi-family"
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
