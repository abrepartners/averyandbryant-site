import { HeroRealEstate } from "@/components/heroes/hero-real-estate";
import { OrderLink } from "@/components/order-link";
import { ConsultCTA } from "@/components/consult-cta";
import { PackageCard } from "@/components/pricing/package-card";
import { EnhancementPacks } from "@/components/pricing/enhancement-packs";
import { AddOnsGrid } from "@/components/pricing/add-ons-grid";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { ScarcityBar } from "@/components/pricing/scarcity-bar";
import { realEstatePricing } from "@/lib/pricing";

export const metadata = {
  title:
    "Real Estate Media — Listing Launch Kit, Domination System & Market Takeover | Avery & Bryant",
  description:
    "Professional HDR photography, cinematic video tours, aerial drone, 3D virtual tours, and floor plans for real estate listings across Arkansas. Packages from $299 with 24-hour delivery guarantee.",
};

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
