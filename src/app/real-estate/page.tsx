import { HeroRealEstate } from "@/components/heroes/hero-real-estate";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { EnhancementPacks } from "@/components/pricing/enhancement-packs";
import { AddOnsGrid } from "@/components/pricing/add-ons-grid";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { ScarcityBar } from "@/components/pricing/scarcity-bar";
import { realEstatePricing } from "@/lib/pricing";

export const metadata = {
  alternates: { canonical: "/real-estate" },
  title:
    "Real Estate Media — Listing Launch Kit, Domination System & Market Takeover | Avery & Bryant",
  description:
    "Professional HDR photography, cinematic video tours, aerial drone, 3D virtual tours, and floor plans for real estate listings across Arkansas. Packages from $299 with 48-hour delivery guarantee.",
};

const faqs = [
  {
    question: "How much does real estate photography cost in Arkansas?",
    answer:
      "Pricing scales with the size of the property and the package you choose. Every package and add-on is listed on this page, and you can compare pricing across all property types on our pricing page. You will see your exact total when you book online, before you confirm anything.",
  },
  {
    question: "How fast do we get our media?",
    answer:
      "Standard delivery is within 48 hours of the shoot, and most listing media arrives sooner. If you are working against a tight deadline, rush delivery is available as an add-on.",
  },
  {
    question: "Do you serve Little Rock and Central Arkansas?",
    answer:
      "Yes. We're based in Little Rock at (501) 502-2925 and cover Central Arkansas, including Little Rock, Benton, Conway, Hot Springs, and surrounding areas. One team, one standard.",
  },
  {
    question: "Are your drone pilots licensed and insured?",
    answer:
      "Yes. Every aerial shoot is flown by an FAA Part 107 certified pilot, and we carry full insurance coverage. Your brokerage and your sellers are protected on every flight.",
  },
  {
    question: "Do you offer virtual staging and twilight photography?",
    answer:
      "Yes. Virtual staging, virtual twilight conversions, and real golden hour twilight shoots are all available as add-ons to any listing package.",
  },
  {
    question: "What if I am not happy with my listing photos?",
    answer:
      "Every shoot is backed by our Satisfaction Reshoot Guarantee. Report an issue with our work within 7 days of delivery and we will reshoot it free. That standard is why more than 200 Arkansas agents shoot with us and why we hold an A+ rating with the Better Business Bureau.",
  },
];

export default function RealEstatePage() {
  const { packages, enhancementPacks, addOns, guarantee, scarcity } =
    realEstatePricing;

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

          {scarcity && (
            <div className="mt-8">
              <ScarcityBar text={scarcity} />
            </div>
          )}

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <PackageCard key={pkg.name} pkg={pkg} vertical="real-estate" />
            ))}
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={guarantee} />
          </div>
        </div>
      </section>

      {/* ── ENHANCEMENT PACKS ── */}
      {enhancementPacks && enhancementPacks.length > 0 && (
        <EnhancementPacks packs={enhancementPacks} />
      )}

      {/* ── À LA CARTE ── */}
      <AddOnsGrid addOns={addOns} vertical="real-estate" />

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      <ConsultCTA
        interest="real-estate"
        headline="Not sure which package fits your listing?"
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
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-fg-secondary md:text-lg">
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
