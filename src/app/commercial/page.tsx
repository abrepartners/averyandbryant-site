import Image from "next/image";
import { HeroCommercial } from "@/components/heroes/hero-commercial";
import { ConsultCTA } from "@/components/consult-cta";
import { commercialGroups, commercialHeroFrame } from "@/lib/commercial-work";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import {
  commercialPackages,
  commercialSpecialty,
  commercialGuarantee,
} from "@/lib/pricing";
import { consultUrl } from "@/lib/consult";

export const metadata = {
  alternates: { canonical: "/commercial" },
  title:
    "Commercial Media: CRE Launch, Command System, Dealership & Hospitality | Avery & Bryant",
  description:
    "Professional commercial photography, drone, and video for dealerships, offices, retail, restaurants, industrial, and hospitality properties across Arkansas. Photos from $295, sized to your square footage; listing packages from $995.",
};

const QUOTE_EMAIL =
  "mailto:book@averyandbryant.com?subject=Commercial%20Media%20Quote";

const heroFrame = commercialHeroFrame;
const portfolioGroups = commercialGroups;

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
      "A free 30-minute call to align on property, square footage, use cases, and deliverables.",
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
      "One-off commercial photography is sized to your square footage: photos start at $295 for a single suite or small building, and a free 30-minute scope call produces the exact number. The listing packages and hospitality package on this page are fixed prices; the dealership program is monthly and set up on a call.",
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

      {/* ── ONE-OFF PHOTOGRAPHY, SIZED TO SQUARE FOOTAGE ── */}
      <section className="border-t border-white/5 py-20 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid items-center gap-8 rounded-lg border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 md:grid-cols-[1.4fr_auto] md:p-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
                Just need photos of a building or suite?
              </p>
              <h2 className="mt-4 font-display text-[clamp(24px,4vw,36px)] font-light tracking-tight text-fg">
                Photos from $295, sized to your square footage.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-secondary">
                HDR interior and exterior photography in one visit, delivered
                in 48 hours. A free 30-minute call sizes the shoot to your
                property and produces the exact quote.
              </p>
            </div>
            <a
              href={consultUrl("commercial")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center rounded bg-crimson px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)] md:justify-self-end"
            >
              Book a free 30-min call
            </a>
          </div>
        </div>
      </section>

      {/* ── CRE PACKAGES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Listing or selling a commercial property
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            CRE listing media.{" "}
            <span className="text-fg-secondary">Built for brokers.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-secondary">
            Fixed-price, one-time packages for a property you are listing or
            selling. Request a quote by email and we confirm scope and date.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {commercialPackages.map((pkg) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                ctaHref={QUOTE_EMAIL}
                ctaLabel="Request a quote by email"
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
            A commercial business that needs content
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Dealerships. Hospitality.{" "}
            <span className="text-fg-secondary">Monthly programs.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-secondary">
            Different job from listing a property. The dealership program is
            monthly and set up on a call; the hospitality package is a one-time
            shoot.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {commercialSpecialty.map((pkg) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                interest="commercial"
                ctaHref={QUOTE_EMAIL}
                ctaLabel={pkg.ctaMode === "call" ? undefined : "Request a quote by email"}
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
        headline="Not sure which track you are on?"
        subhead="Listing a property, or a business that needs content every month: the free 30-minute call sorts that out, sizes any one-off photography to your square footage, and ends with a written quote."
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
