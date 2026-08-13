import { HeroBuilders } from "@/components/heroes/hero-builders";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { AddOnsGrid } from "@/components/pricing/add-ons-grid";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { buildersPricing } from "@/lib/pricing";

export const metadata = {
  alternates: { canonical: "/builders" },
  title:
    "Builder & Construction Media — Build Tracker, Marketing System & Model Home Launch | Avery & Bryant",
  description:
    "Professional photography, drone aerials, and video tours for builders, construction projects, and model homes across Arkansas. Packages from $325/mo with value-stack pricing.",
};

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
    question: "How much does builder photography cost in Arkansas?",
    answer:
      "It depends on the scope. One-time model home shoots and monthly progress documentation are priced differently, so every builder package is listed on this page and you can compare across property types on our pricing page.",
  },
  {
    question: "How fast do we get our media?",
    answer:
      "Standard delivery is within 48 hours of the shoot. If a model home launch or investor meeting is on the calendar, rush delivery is available.",
  },
  {
    question: "Do you work with builders in Little Rock and Central Arkansas?",
    answer:
      "Yes. We're based in Little Rock at (501) 502-2925 and cover Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas. Builders working multiple communities get the same team and standard on every project.",
  },
  {
    question: "Are your drone pilots licensed for development aerials?",
    answer:
      "Yes. Every flight is operated by an FAA Part 107 certified pilot with full insurance coverage, so development overviews, lot inventory aerials, and progress flyovers are all handled by the book.",
  },
  {
    question: "Can you document construction progress every month?",
    answer:
      "Yes. Our Build Tracker program provides consistent photo documentation at every stage of construction. Builders use it for investor updates, warranty records, and marketing content.",
  },
  {
    question: "What if we are not happy with the media?",
    answer:
      "Every shoot is backed by our Satisfaction Reshoot Guarantee. Report an issue with our work within 7 days of delivery and we will reshoot it free.",
  },
];

export default function BuildersPage() {
  const { packages, addOns, guarantee } = buildersPricing;

  return (
    <>
      <HeroBuilders />

      {/* ── PACKAGES ── */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Packages
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
            From foundation to finished.{" "}
            <span className="text-white-40">We cover every stage.</span>
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} vertical="builders" />
            ))}
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={guarantee} />
          </div>
        </div>
      </section>

      {/* ── À LA CARTE ── */}
      <AddOnsGrid addOns={addOns} vertical="builders" />

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
            Three steps. <span className="text-white-40">That&apos;s it.</span>
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
            Serving Arkansas builders and developers.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      <ConsultCTA
        interest="builders"
        headline="Building a development — not just one home?"
        subhead="Single-build vs. progress program vs. full dev portfolio — each scopes differently. Free 30-min call to map what you actually need."
      />

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
            Book a shoot in under 2 minutes. Professional media that sells homes
            before the sign goes up.
          </p>
          <div className="mt-10">
            <OrderLink
              vertical="builders"
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
