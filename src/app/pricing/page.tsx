import Link from "next/link";
import { OrderLink } from "@/components/order-link";

export const metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing — Real Estate Media Packages | Avery & Bryant",
  description:
    "Transparent pricing for real estate photography, drone, video, virtual tours, and branding across all property types. Central Arkansas.",
};

const verticals = [
  {
    slug: "real-estate",
    label: "Real Estate",
    tag: "Most Requested",
    headline: "Listing Media",
    range: "From $299",
    description:
      "HDR photos, aerial drone, cinematic video, virtual tours, floor plans, and social reels. 48-hour delivery guarantee.",
    packages: [
      { name: "Listing Launch Kit", price: "From $299" },
      { name: "Listing Domination System", price: "From $499" },
      { name: "Market Takeover Blueprint", price: "From $849" },
    ],
    orderFormId: "01918da6-2d38-7375-8fe1-96d7d74f812a",
  },
  {
    slug: "airbnb-rentals",
    label: "Airbnb & Rentals",
    tag: "Short-Term Rentals",
    headline: "STR Media",
    range: "From $449",
    description:
      "Booking-optimized photography, drone, video tours, and social reels built to maximize nightly rate and occupancy.",
    packages: [
      { name: "Revenue Ready Kit", price: "From $449" },
      { name: "Revenue Boost System", price: "$695" },
      { name: "5-Star Showcase Blueprint", price: "$1,095" },
    ],
    orderFormId: "01918dcc-0824-72a8-abbe-61a9c9d9edb1",
  },
  {
    slug: "multi-family",
    label: "Multi-Family",
    tag: "Apartment Communities",
    headline: "Leasing Media",
    range: "From $995",
    description:
      "Model unit photography, campus aerials, 3D tours, cinematic drone video, and leasing content that drives tour requests.",
    packages: [
      { name: "Leasing Launch Kit", price: "$995" },
      { name: "Full Property Command", price: "$1,695" },
      { name: "Leasing Domination Suite", price: "From $2,995" },
    ],
    orderFormId: "01914ab7-5488-710c-b2c9-62a929eed936",
  },
  {
    slug: "lot-land",
    label: "Lot & Land",
    tag: "Vacant Land",
    headline: "Land Media",
    range: "From $249",
    description:
      "Aerial photography, boundary overlays, flyover video, and AI-rendered home visualizations on the lot.",
    packages: [
      { name: "Aerial Survey Kit", price: "$249" },
      { name: "Land Marketing System", price: "$399" },
      { name: "Vision Blueprint", price: "$649" },
      { name: "Dream Home Vision", price: "$995" },
    ],
    orderFormId: "d6f632d8-1b59-4163-a63a-aeff8decce83",
  },
  {
    slug: "builders",
    label: "Builders",
    tag: "New Construction",
    headline: "Builder Media",
    range: "From $325/mo",
    description:
      "Monthly construction documentation, model home launches, and builder marketing systems.",
    packages: [
      { name: "Build Tracker", price: "$325/mo" },
      { name: "Builder Marketing System", price: "$1,395" },
      { name: "Model Home Launch Blueprint", price: "$1,895" },
    ],
    orderFormId: "01914ab4-8713-72aa-b503-63ed6d4a11a5",
  },
  {
    slug: "commercial",
    label: "Commercial",
    tag: "CRE & Specialty",
    headline: "Commercial Media",
    range: "From $995",
    description:
      "Commercial listing packages, dealership programs, hospitality photography, and industrial media.",
    packages: [
      { name: "CRE Launch Package", price: "$995" },
      { name: "CRE Command System", price: "$1,695" },
      { name: "Lot Command (Dealership)", price: "$995/mo" },
      { name: "Guest Experience Package", price: "$1,495" },
    ],
    orderFormId: null,
  },
  {
    slug: "branding",
    label: "Branding",
    tag: "Agent & Team Media",
    headline: "Branding",
    range: "From $299",
    description:
      "Headshots, brand sessions, content days, and team photography for agents who lead with their image.",
    packages: [
      { name: "First Impression Kit", price: "$299" },
      { name: "Brand Identity System", price: "$549" },
      { name: "Content Command Day", price: "$1,695" },
      { name: "Team Brand Blueprint", price: "From $2,195" },
    ],
    orderFormId: null,
  },
];

const addOns = [
  { name: "Cinematic Video (60-90s)", note: "per shoot" },
  { name: "Social Reel (single)", note: "15-30s" },
  { name: "4-Reel Social Pack", note: "bundle" },
  { name: "Aerial Drone Photos + Video", note: "add-on" },
  { name: "3D Virtual Tour", note: "Matterport" },
  { name: "2D Floor Plan", note: "add-on" },
  { name: "3D Floor Plan", note: "rendered" },
  { name: "Virtual Staging", note: "per room" },
  { name: "Real Twilight Shoot", note: "golden hour" },
  { name: "Virtual Twilight", note: "day-to-dusk AI" },
  { name: "Boundary Overlays", note: "land listings" },
  { name: "AI Home Rendering", note: "Vellum" },
  { name: "Rush Delivery (6hr)", note: "add-on" },
];

export default function PricingPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-32 pb-20 border-b border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Transparent Pricing
          </p>
          <h1 className="mt-4 font-display text-[clamp(36px,6vw,64px)] font-light tracking-tight text-white/90 leading-none">
            Every vertical.{" "}
            <span className="text-white/30">Every package.</span>
          </h1>
          <p className="mt-6 text-[15px] text-white/50 max-w-xl leading-relaxed">
            Select your property type below to see full package details and book
            online. All packages include our delivery guarantee.
          </p>
          <Link
            href="/get-started"
            className="mt-6 inline-flex items-center gap-2 rounded border border-crimson/30 px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-crimson/90 transition-colors hover:border-crimson/60 hover:text-white"
          >
            Not sure which? Find your package &rarr;
          </Link>
        </div>
      </section>

      {/* ── VERTICAL CARDS ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {verticals.map((v) => (
              <Link
                key={v.slug}
                href={`/${v.slug}`}
                className="group block bg-white/[0.03] border border-white/5 rounded-lg p-6 hover:border-crimson/40 transition-all duration-200"
              >
                <p className="text-[9px] uppercase tracking-[0.25em] text-white/25 mb-3">
                  {v.tag}
                </p>
                <h2 className="font-display text-xl font-bold text-white/90 mb-1">
                  {v.label}
                </h2>
                <p className="font-display text-2xl font-extrabold text-crimson mb-4 tracking-tight">
                  {v.range}
                </p>
                <p className="text-[13px] text-white/45 leading-relaxed mb-5">
                  {v.description}
                </p>

                {/* Package list */}
                <ul className="space-y-2 mb-6">
                  {v.packages.map((pkg) => (
                    <li
                      key={pkg.name}
                      className="flex items-center justify-between text-[12px]"
                    >
                      <span className="text-white/50">{pkg.name}</span>
                      <span className="text-white/80 font-semibold tabular-nums">
                        {pkg.price}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-[11px] text-crimson font-medium group-hover:gap-3 transition-all">
                  View full packages
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADD-ONS REFERENCE ── */}
      <section className="py-16 border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60 mb-6">
            À La Carte Add-Ons
          </p>
          <p className="text-[13px] text-white/40 mb-8 max-w-md">
            Available across most verticals. Pricing varies by package — see
            each vertical page for exact rates.
          </p>
          <div className="flex flex-wrap gap-2">
            {addOns.map((a) => (
              <div
                key={a.name}
                className="flex items-center gap-2 bg-white/[0.04] border border-white/5 rounded px-3 py-2"
              >
                <span className="text-[12px] text-white/50">{a.name}</span>
                <span className="text-[10px] text-white/25 italic">
                  {a.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE STRIP ── */}
      <section className="py-10 border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-crimson/[0.06] border border-crimson/20 rounded-lg px-6 py-5">
            <span className="text-crimson text-lg">★</span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-crimson mb-1">
                Satisfaction Reshoot Guarantee
              </p>
              <p className="text-[13px] text-white/50 leading-relaxed">
                Not happy with your media? Tell us within 7 days of delivery and
                we&apos;ll reshoot it free. &ldquo;Not happy&rdquo; means an
                issue with our work — exposure, color, composition, or a missed
                shot from your agreed shot list. It doesn&apos;t cover property
                condition, weather, or changes made after the shoot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/25 mb-4">
            Ready to book?
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] font-light tracking-tight text-white/90 mb-6">
            Order online in{" "}
            <span className="text-white/40">under 2 minutes.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <OrderLink
              vertical="real-estate"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Shoot
            </OrderLink>
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded border border-white/15 px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              Book a Free Consult
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
