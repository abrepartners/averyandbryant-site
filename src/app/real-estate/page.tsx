import { HeroRealEstate } from "@/components/heroes/hero-real-estate";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";

export const metadata = {
  title: "Real Estate Media | Avery & Bryant",
  description:
    "Professional HDR photography, cinematic video tours, aerial drone, 3D virtual tours, and floor plans for real estate listings across Arkansas.",
};

// May 1 pricing. À-la-carte value column shows what the same components
// would cost if bought individually — the "anchor" that makes the package
// price feel like the deal it is.
const packages = [
  {
    name: "BASE",
    price: "From $249",
    anchor: "$348 à la carte",
    savings: "Save $99",
    tag: "Best for condos and smaller listings",
    features: ["25 photos (HDR)", "Schematic floor plan"],
  },
  {
    name: "PRO",
    price: "From $395",
    anchor: "$846 à la carte",
    savings: "Save $451",
    tag: "Most popular",
    features: [
      "40 photos (HDR)",
      "Floor plan",
      "Drone stills + video",
      "3D virtual tour",
    ],
  },
  {
    name: "PRO+",
    price: "From $749",
    anchor: "$1,936 à la carte",
    savings: "Save $1,187",
    tag: "The full experience",
    features: [
      "40 photos (HDR)",
      "Cinematic video",
      "Reels pack (4 reels)",
      "Floor plan",
      "Drone photos + video",
      "3D virtual tour",
    ],
  },
];

const standaloneServices = [
  {
    title: "Photos Only",
    price: "From $249",
    description:
      "Sqft tiers: <2k=$249 · 2-3k=$299 · 3-4k=$359 · 4-5k=$429 · 5k+=$549",
  },
  {
    title: "Reels Pack",
    price: "$595",
    description: "4 reels: Listing, Virality, Trailer, Teaser",
  },
  {
    title: "Cinematic Video",
    price: "$495",
    description: "Full cinematic walkthrough video",
  },
  {
    title: "Social Media Reel",
    price: "$195",
    description: "Short-form social content reel",
  },
  {
    title: "Drone Stills + Video",
    price: "$149",
    description: "Aerial photography and video",
  },
  {
    title: "2D Floor Plan",
    price: "$99",
    description: "Schematic floor plan layout",
  },
  {
    title: "3D Virtual Tour",
    price: "From $299",
    description: "Tiered by sqft · Matterport-style interactive walkthrough",
  },
];

const addOns = [
  { title: "Virtual Staging", price: "$49/image" },
  { title: "Virtual Twilight", price: "$49/image" },
  { title: "Twilight Shoot", price: "$295" },
  { title: "Speed Ramp Reel", price: "$100" },
  { title: "3D Floor Plan", price: "$149" },
  { title: "Proximity Map", price: "$39" },
  { title: "Rush Delivery (6hr)", price: "$100" },
];

export default function RealEstatePage() {
  return (
    <>
      <HeroRealEstate />

      {/* ── PACKAGES ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Packages
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Everything your listing needs.{" "}
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
                  vertical="real-estate"
                  className="mt-8 inline-block rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
                >
                  Book Now
                </OrderLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STANDALONE SERVICES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Standalone Services
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Build your own.{" "}
            <span className="text-white-40">Pick what you need.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {standaloneServices.map((service) => (
              <div
                key={service.title}
                className="pricing-card group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-6 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)]"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg font-medium text-white-90">
                    {service.title}
                  </h3>
                  <span className="pricing-price text-lg font-semibold text-crimson">
                    {service.price}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {service.description}
                </p>
                <OrderLink
                  vertical="real-estate"
                  className="mt-4 inline-block text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
                >
                  Book Now &rarr;
                </OrderLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Add-Ons
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Extras that elevate.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {addOns.map((item) => (
              <div
                key={item.title}
                className="pricing-card flex items-center justify-between rounded border border-white/5 bg-[rgba(17,17,17,0.5)] px-6 py-4 transition-all duration-500 hover:border-crimson/20"
              >
                <span className="text-sm font-medium text-white/60">
                  {item.title}
                </span>
                <span className="text-sm font-semibold text-crimson">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultCTA
        interest="real-estate"
        headline="Still comparing BASE / PRO / PRO+?"
        subhead="Book a free 30-minute call. Describe the listing — we'll tell you exactly which package fits and what it'll cost. No pitch, just a clear answer."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Ready to elevate your listings?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/40 md:text-lg">
            Book a shoot in under 2 minutes. Choose your area to get started.
          </p>
          <div className="mt-10">
            <OrderLink
              vertical="real-estate"
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
