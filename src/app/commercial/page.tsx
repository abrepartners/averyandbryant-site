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
    "Commercial Media — CRE Launch, Command System, Dealership & Hospitality | Avery & Bryant",
  description:
    "Professional commercial photography, drone, and video for dealerships, offices, retail, restaurants, industrial, and hospitality properties across Arkansas. Packages from $995.",
};

const QUOTE_EMAIL =
  "mailto:book@averyandbryant.com?subject=Commercial%20Media%20Quote";

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

      {/* ── CRE PACKAGES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Commercial Real Estate
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            CRE listing media.{" "}
            <span className="text-white-40">Built for brokers.</span>
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
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Dealerships. Hospitality.{" "}
            <span className="text-white-40">Ongoing content.</span>
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

          <p className="mt-10 text-center text-sm text-white/35">
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

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

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
              href={QUOTE_EMAIL}
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
