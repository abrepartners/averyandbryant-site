import { HeroAirbnbRentals } from "@/components/heroes/hero-airbnb-rentals";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";

export const metadata = {
  title: "Airbnb & Rental Property Photography | Arkansas | Avery & Bryant",
  description:
    "Professional photography, video tours, drone, and twilight media for Airbnb and short-term rental properties across Arkansas. More bookings start with better photos.",
};

// May 1 pricing with à-la-carte anchor.
const packages = [
  {
    name: "Starter",
    price: "$399",
    anchor: "$498 à la carte",
    savings: "Save $99",
    tag: "Get your listing live fast",
    features: ["25 photos (HDR)", "2D floor plan"],
  },
  {
    name: "Revenue Boost",
    price: "$595",
    anchor: "$843 à la carte",
    savings: "Save $248",
    tag: "Optimized for bookings",
    features: [
      "40 photos (HDR)",
      "Drone aerial",
      "Social reel",
      "2D floor plan",
    ],
  },
  {
    name: "Full Showcase",
    price: "$995",
    anchor: "$1,838 à la carte",
    savings: "Save $843",
    tag: "Maximum occupancy",
    features: [
      "40 photos (HDR)",
      "Drone photos + video",
      "Cinematic video tour",
      "Reels pack (4 reels)",
      "2D floor plan",
      "Virtual staging (3 rooms)",
    ],
  },
];

const standaloneServices = [
  { title: "Photos Only", price: "From $249" },
  { title: "Single Reel", price: "$195" },
  { title: "Drone", price: "$149" },
];

const sellingPoints = [
  {
    title: "40% More Bookings",
    description:
      "Properties with professional photography consistently see 40% more bookings than those with phone photos.",
  },
  {
    title: "Amenity Showcase",
    description:
      "We highlight the details guests search for — hot tubs, kitchens, outdoor spaces, unique decor, and views.",
  },
  {
    title: "Interior Styling Guidance",
    description:
      "We advise on simple staging tweaks that photograph well and help your listing compete at higher nightly rates.",
  },
  {
    title: "Fast Turnaround",
    description:
      "Photos delivered within 24 hours. Your listing goes live faster, and you start earning sooner.",
  },
];

const steps = [
  { number: "01", title: "Book Online", description: "Pick your date and services in under 2 minutes." },
  { number: "02", title: "We Shoot", description: "Our team arrives on time and captures everything." },
  { number: "03", title: "Get Your Media", description: "Edited photos and video delivered within 24 hours." },
];

export default function AirbnbRentalsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroAirbnbRentals />

      {/* ── PACKAGES ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Packages
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Everything your rental needs.{" "}
            <span className="text-white-40">One shoot.</span>
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
                  vertical="airbnb-rentals"
                  className="mt-8 inline-block rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
                >
                  Book Now
                </OrderLink>
              </div>
            ))}
          </div>

          {/* Standalone options */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {standaloneServices.map((service) => (
              <div
                key={service.title}
                className="pricing-card flex items-center justify-between rounded border border-white/5 bg-[rgba(17,17,17,0.5)] px-6 py-4 transition-all duration-500 hover:border-crimson/20"
              >
                <span className="text-sm font-medium text-white/60">
                  {service.title}
                </span>
                <span className="text-sm font-semibold text-crimson">
                  {service.price}
                </span>
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
            Your listing is your storefront.{" "}
            <span className="text-white-40">Make it count.</span>
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
            Serving Arkansas short-term rental hosts since 2018.
          </p>
        </div>
      </section>

      <ConsultCTA
        interest="airbnb-rentals"
        headline="Running multiple rentals or a whole portfolio?"
        subhead="One property is easy — ten is a content program. Free 30-min call to talk batch shoots, seasonal refreshes, and recurring rates."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Ready to fill your calendar?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Book a shoot in under 2 minutes. Professional media that pays for itself in one booking.
          </p>
          <div className="mt-10">
            <OrderLink
              vertical="airbnb-rentals"
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
