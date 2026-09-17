import Image from "next/image";
import { HeroCommercial } from "@/components/heroes/hero-commercial";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import {
  commercialPackages,
  commercialSpecialty,
  commercialGuarantee,
} from "@/lib/pricing";

export const metadata = {
  alternates: { canonical: "/commercial" },
  title:
    "Commercial Media: CRE Launch, Command System, Dealership & Hospitality | Avery & Bryant",
  description:
    "Professional commercial photography, drone, and video for dealerships, offices, retail, restaurants, industrial, and hospitality properties across Arkansas. Packages from $995.",
};

const QUOTE_EMAIL =
  "mailto:book@averyandbryant.com?subject=Commercial%20Media%20Quote";

const heroFrame = {
  src: "/images/commercial/12401-maumelle-blvd-maumelle-restaurant-exterior.jpg",
  alt: "Exterior of a newly built quick service restaurant at 12401 Maumelle Boulevard in Maumelle, Arkansas",
  caption: "Quick service restaurant, Maumelle",
};

type PortfolioShot = { src: string; alt: string; caption: string };
type PortfolioGroup = {
  label: string;
  /** Optional full-width frame that leads the group, for the strongest shot. */
  lead?: PortfolioShot;
  shots: PortfolioShot[];
};

// Rose City Center leads the portfolio: it is the strongest retail work we have,
// and the overhead site aerial and the pylon signage frame are both content types
// this page never had. The named tenants on the signage are tenants of the
// property we photographed, not clients of ours, so no copy here says otherwise.
const portfolioGroups: PortfolioGroup[] = [
  {
    label: "Retail centers",
    lead: {
      src: "/images/commercial/rose-city-center-little-rock-grocery-anchor-exterior.jpg",
      alt: "Elevated three quarter view of the grocery anchor at Rose City Center in Little Rock, Arkansas, with a tan stucco facade, green standing seam gables and a parking lot of cars and pickups under a blue sky",
      caption: "Grocery anchor, Little Rock",
    },
    shots: [
      {
        src: "/images/commercial/rose-city-center-little-rock-overhead-site-aerial.jpg",
        alt: "Overhead drone photo of Rose City Center in Little Rock, Arkansas, showing the white flat roofs of the strip and its grocery anchor, the full striped parking field, an out parcel building with a drive through lane, and a four lane highway along the bottom of the frame",
        caption: "Site aerial, Little Rock",
      },
      {
        src: "/images/commercial/rose-city-center-little-rock-pylon-sign.jpg",
        alt: "Elevated view of the Rose City Center pylon sign in Little Rock, Arkansas, with a rose logo above stacked tenant panels, beside a highway with route markers and grain silos on the horizon",
        caption: "Center signage, Little Rock",
      },
      {
        src: "/images/commercial/rose-city-center-little-rock-tenant-storefront.jpg",
        alt: "Angled ground level view along the red metal awning of the in line shops at Rose City Center in Little Rock, Arkansas, with glass storefronts, brick bulkheads and red steel canopy posts receding to the right under a blue sky",
        caption: "In line tenants, Little Rock",
      },
    ],
  },
  {
    label: "Hospitality and restaurants",
    shots: [
      {
        src: "/images/commercial/10-anglers-way-little-rock-restaurant-bar.jpg",
        alt: "Restaurant bar with a pressed tin ceiling and warm lighting at 10 Anglers Way in Little Rock, Arkansas",
        caption: "Bar, Little Rock",
      },
      {
        src: "/images/commercial/10-anglers-way-little-rock-restaurant-dining-room.jpg",
        alt: "Bar with high stools, a pressed tin ceiling and framed memorabilia on exposed brick at 10 Anglers Way in Little Rock, Arkansas",
        caption: "Bar seating, Little Rock",
      },
      {
        src: "/images/commercial/10-anglers-way-little-rock-restaurant-entrance.jpg",
        alt: "Covered entry with wood double doors and steakhouse signage etched on the glass at 10 Anglers Way in Little Rock, Arkansas",
        caption: "Entrance, Little Rock",
      },
    ],
  },
  {
    label: "Quick service and small retail",
    shots: [
      {
        src: "/images/commercial/12401-maumelle-blvd-maumelle-restaurant-dining-room.jpg",
        alt: "Dining room with gold pendant lighting and booths inside a quick service restaurant in Maumelle, Arkansas",
        caption: "Interior, Maumelle",
      },
      {
        src: "/images/commercial/12401-maumelle-blvd-maumelle-drive-thru-exterior.jpg",
        alt: "Side elevation and channel letter signage on a newly built quick service restaurant at 12401 Maumelle Boulevard in Maumelle, Arkansas",
        caption: "Exterior signage, Maumelle",
      },
      {
        src: "/images/commercial/4109-e-broadway-north-little-rock-retail-storefronts.jpg",
        alt: "Low aerial of a row of retail storefronts and the parking lot at a shopping center on East Broadway in North Little Rock, Arkansas",
        caption: "Retail center, North Little Rock",
      },
    ],
  },
  {
    label: "Historic and institutional",
    shots: [
      {
        src: "/images/commercial/2400-w-31st-ave-pine-bluff-church-sanctuary.jpg",
        alt: "Church sanctuary with warm wood and pews at 2400 West 31st Avenue in Pine Bluff, Arkansas",
        caption: "Sanctuary, Pine Bluff",
      },
      {
        src: "/images/commercial/411-7th-st-little-rock-columned-portico.jpg",
        alt: "Columned portico and front lawn of a Greek Revival mansion at 411 7th Street in Little Rock, Arkansas",
        caption: "Greek Revival mansion, Little Rock",
      },
      {
        src: "/images/commercial/2400-w-31st-ave-pine-bluff-church-exterior.jpg",
        alt: "Brick church exterior photographed under a clear sky in Pine Bluff, Arkansas",
        caption: "Church exterior, Pine Bluff",
      },
    ],
  },
  {
    label: "Aerial and site context",
    shots: [
      {
        src: "/images/commercial/111-smarthouse-way-north-little-rock-skyline-aerial.jpg",
        alt: "Aerial photo over the Arkansas River showing the Little Rock skyline and its bridges, from a commercial shoot in North Little Rock, Arkansas",
        caption: "River and skyline, North Little Rock",
      },
      {
        src: "/images/commercial/4109-e-broadway-north-little-rock-retail-center-aerial.jpg",
        alt: "Aerial photo of a retail strip center and its parking field in North Little Rock, Arkansas",
        caption: "Retail center aerial, North Little Rock",
      },
      {
        src: "/images/commercial/411-7th-st-little-rock-mansion-and-skyline.jpg",
        alt: "Aerial photo over a historic Little Rock neighborhood with the downtown skyline behind it, from a shoot at 411 7th Street",
        caption: "Downtown aerial, Little Rock",
      },
    ],
  },
];

const sellingPoints = [
  {
    title: "Custom-Scope, Not Package Math",
    description:
      "Every commercial project is different. We build the shoot around your property, your brand, and how the media will be used, not around pre-packaged SKUs.",
  },
  {
    title: "Ongoing Content Programs",
    description:
      "Monthly retainer options for dealerships and properties that need fresh content: seasonal refreshes, new inventory, updated interiors, team changes.",
  },
  {
    title: "FAA-Licensed Aerials",
    description:
      "Part 107 certified pilots with full insurance coverage. Properly permitted for commercial airspace, not hobby drones over a parking lot.",
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
    description:
      "15 minutes to align on property, use cases, and deliverables.",
  },
  {
    number: "02",
    title: "Quote & Schedule",
    description: "Written quote within 24 hours. Pick a shoot window.",
  },
  {
    number: "03",
    title: "Get Your Media",
    description:
      "Edited photos and video delivered within 72 hours of the shoot.",
  },
];

const faqs = [
  {
    question: "How much does commercial photography cost in Arkansas?",
    answer:
      "Every commercial project is scoped custom around the property, the brand, and how the media will be used. Baseline package structures are listed on this page, and a 15 minute scope call gets you a written quote within 24 hours.",
  },
  {
    question: "How fast do we get our media?",
    answer:
      "Commercial deliverables are edited and delivered within 72 hours of the shoot, and we can typically get your shoot on the calendar within the week of your quote.",
  },
  {
    question: "Do you serve Little Rock and Central Arkansas?",
    answer:
      "Yes. We're based in Little Rock at (501) 502-2925 and cover Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas.",
  },
  {
    question: "Are you licensed for commercial drone work?",
    answer:
      "Yes. Every flight is operated by an FAA Part 107 certified pilot with full insurance coverage and proper permitting for commercial airspace. This is professional aerial work, not a hobby drone over a parking lot.",
  },
  {
    question:
      "Do you offer ongoing content programs for dealerships and hospitality?",
    answer:
      "Yes. Monthly retainer programs keep dealerships and hospitality properties stocked with fresh content: seasonal refreshes, new inventory, updated interiors, and team changes.",
  },
  {
    question: "What if we are not happy with the media?",
    answer:
      "Every shoot is backed by our Satisfaction Reshoot Guarantee. Report an issue with our work within 7 days of delivery and we will reshoot it free.",
  },
];

export default function CommercialPage() {
  return (
    <>
      <HeroCommercial />

      {/* ── COMMERCIAL PORTFOLIO (REAL DELIVERED WORK) ── */}
      <section className="border-b border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Commercial Portfolio
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Properties we have already shot.{" "}
            <span className="text-fg-secondary">
              Restaurants, retail, historic, aerial.
            </span>
          </h2>

          <figure className="mt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
              <Image
                src={heroFrame.src}
                alt={heroFrame.alt}
                fill
                sizes="(min-width: 1280px) 1216px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
              {heroFrame.caption}
            </figcaption>
          </figure>

          <div className="mt-16 space-y-16">
            {portfolioGroups.map((group) => (
              <div key={group.label}>
                <h3 className="font-display text-lg font-medium text-fg">
                  {group.label}
                </h3>
                {group.lead ? (
                  <figure className="mt-6">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
                      <Image
                        src={group.lead.src}
                        alt={group.lead.alt}
                        fill
                        sizes="(min-width: 1280px) 1216px, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                      {group.lead.caption}
                    </figcaption>
                  </figure>
                ) : null}
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.shots.map((shot) => (
                    <figure key={shot.src}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                        {shot.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRE PACKAGES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Commercial Real Estate
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            CRE listing media.{" "}
            <span className="text-fg-secondary">Built for brokers.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {commercialPackages.map((pkg) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                ctaHref={QUOTE_EMAIL}
                ctaLabel="Request a Quote"
              />
            ))}
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={commercialGuarantee} />
          </div>
        </div>
      </section>

      {/* ── SPECIALTY PACKAGES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Specialty Programs
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Dealerships. Hospitality.{" "}
            <span className="text-fg-secondary">Ongoing content.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {commercialSpecialty.map((pkg) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                ctaHref={QUOTE_EMAIL}
                ctaLabel="Request a Quote"
              />
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-fg-secondary">
            Don&apos;t see your category? It probably still fits.{" "}
            <a
              href={QUOTE_EMAIL}
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
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Commercial-grade output.{" "}
            <span className="text-fg-secondary">Without the agency markup.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {sellingPoints.map((point) => (
              <div key={point.title} className="flex gap-6">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-crimson" />
                <div>
                  <h3 className="font-display text-lg font-medium text-fg">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
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
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Quote in 24 hours.{" "}
            <span className="text-fg-secondary">Shoot within the week.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20"
              >
                <span className="font-display text-4xl font-extralight text-crimson">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-fg-secondary">
            Serving Arkansas commercial property owners, operators, and
            marketing teams.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      <ConsultCTA
        interest="commercial"
        headline="Commercial work is always custom."
        subhead="Dealership, office, retail, hospitality. Every property has a different story to tell. Free 30-min scoping call to get a real quote, not a guess."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Tell us about your property.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-fg-secondary md:text-lg">
            Send a quick note with your property type and goals. We&apos;ll
            follow up within 24 hours with a written quote.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={QUOTE_EMAIL}
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Request a Quote
            </a>
            <a
              href="tel:+15015022925"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-all hover:border-white/40 hover:text-white"
            >
              Call (501) 502-2925
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
