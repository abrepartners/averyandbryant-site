import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { HomeBooking, type BookingPackage } from "@/components/home-booking";
import { getSizedPrices } from "@/lib/live-prices";
import { realEstatePricing } from "@/lib/pricing";

// Draft front door for home listings: size first, live prices, then the
// Aryeo form pre-filled. Kept out of search and the nav until Thomas signs off.
export const metadata: Metadata = {
  title: "Book a Listing Shoot | Avery & Bryant",
  description:
    "Enter the home's size, see your exact price, and book your listing shoot.",
  robots: { index: false, follow: false },
};

export const revalidate = 600;

const PACKAGE_NAMES = [
  "Listing Launch Kit",
  "Listing Domination System",
  "Market Takeover Blueprint",
] as const;

export default async function BookHomePage() {
  const prices = await getSizedPrices();

  const packages: BookingPackage[] = PACKAGE_NAMES.flatMap((name) => {
    const p = realEstatePricing.packages.find((x) => x.name === name);
    const tiers = prices[name];
    if (!p || !tiers) return [];
    return [
      {
        name,
        bestFor: p.bestFor ?? "",
        inclusions: p.keyInclusions ?? [],
        recommended: Boolean(p.recommended),
        tiers,
      },
    ];
  });

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1120px] px-4 md:px-12">
        <Eyebrow>Book a listing shoot</Eyebrow>
        <h1 className="mt-6 max-w-[720px] font-display text-[clamp(30px,5vw,56px)] font-extralight leading-[1.1] tracking-tight text-fg">
          Your price, before you book.
        </h1>
        <p className="mt-5 max-w-[560px] text-base leading-relaxed text-fg-secondary md:text-lg">
          Tell us how big the home is. Every package shows its real price for
          that size, the same price you&apos;ll see at checkout.
        </p>

        <div className="mt-14">
          {packages.length > 0 ? (
            <HomeBooking
              packages={packages}
              zillowTiers={prices["Zillow 3D Tour + Interactive Floor Plan"] ?? []}
            />
          ) : (
            <p className="rounded-lg border border-white/5 bg-card p-8 text-fg-secondary">
              Live prices are not loading right now. Call{" "}
              <a href="tel:+15015022925" className="text-fg-strong hover:text-crimson">
                (501) 502-2925
              </a>{" "}
              and we&apos;ll book it with you.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
