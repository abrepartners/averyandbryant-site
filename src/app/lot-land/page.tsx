import { HeroLotLand } from "@/components/heroes/hero-lot-land";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { AddOnsGrid } from "@/components/pricing/add-ons-grid";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { lotLandPricing } from "@/lib/pricing";

export const metadata = {
  alternates: { canonical: "/lot-land" },
  title:
    "Lot & Land Media — Aerial Survey Kit, Land Marketing System & Vision Blueprint | Avery & Bryant",
  description:
    "Professional aerial drone photography, ground-level photos, and video flyovers for lots, land, and development sites across Arkansas. Packages from $249 with AI home rendering.",
};

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
  {
    number: "01",
    title: "Book Online",
    description: "Pick your date and services in under 2 minutes.",
  },
  {
    number: "02",
    title: "We Shoot",
    description: "Our team arrives on site and captures everything.",
  },
  {
    number: "03",
    title: "Get Your Media",
    description: "Edited photos and video delivered within 48 hours.",
  },
];

const faqs = [
  {
    question: "How much does land photography cost in Arkansas?",
    answer:
      "Pricing depends on acreage and the package you choose. Every land package and add-on is listed on this page, and you can compare pricing across all property types on our pricing page. You will see your exact total when you book online.",
  },
  {
    question: "How fast do we get our media?",
    answer:
      "Standard delivery is within 48 hours of the shoot, and most land shoots arrive sooner. Rush delivery is available if your listing needs to go live fast.",
  },
  {
    question: "Do you shoot land in Little Rock and Central Arkansas?",
    answer:
      "Yes. We're based in Little Rock at (501) 502-2925 and cover Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas. Rural parcels are part of the job.",
  },
  {
    question: "Are your drone pilots FAA certified?",
    answer:
      "Yes. Every flight is operated by an FAA Part 107 certified pilot with full insurance coverage. Professional, compliant aerial work is the foundation of every land shoot we do.",
  },
  {
    question: "Can you show property boundary lines on aerial photos?",
    answer:
      "Yes. Boundary overlays are available as a land add-on. We mark lot lines and lot shape directly on the aerial images so buyers understand exactly what they are looking at.",
  },
  {
    question: "What if I am not happy with the media?",
    answer:
      "Every shoot is backed by our Satisfaction Reshoot Guarantee. Report an issue with our work within 7 days of delivery and we will reshoot it free.",
  },
];

export default function LotLandPage() {
  const { packages, addOns, guarantee } = lotLandPricing;

  return (
    <>
      <HeroLotLand />

      {/* ── PACKAGES ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Packages
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Land doesn&apos;t sell itself.{" "}
            <span className="text-white-40">But great media helps.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} vertical="lot-land" />
            ))}
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={guarantee} />
          </div>
        </div>
      </section>

      {/* ── À LA CARTE ── */}
      <AddOnsGrid addOns={addOns} vertical="lot-land" />

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
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Three steps. <span className="text-white-40">That&apos;s it.</span>
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
                <h3 className="mt-4 font-display text-lg font-medium text-white-90">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-fg-faint">
            Serving Arkansas land agents and developers.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      <ConsultCTA
        interest="lot-land"
        headline="Land shoot questions before booking?"
        subhead="Acreage, boundaries, access, timing — tell us about the property on a quick call and we'll scope the right aerial package in minutes."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get Started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            Ready to move that listing?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-fg-secondary md:text-lg">
            Book a shoot in under 2 minutes. Aerial media that helps buyers see
            what you already know.
          </p>
          <div className="mt-10">
            <OrderLink
              vertical="lot-land"
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
