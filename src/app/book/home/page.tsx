import type { Metadata } from "next";
import { Eyebrow } from "@/components/eyebrow";
import { HomeBooking, type BookingPackage } from "@/components/home-booking";
import { getLiveProducts, sizeTiers, type ProductKey } from "@/lib/live-prices";
import { realEstatePricing } from "@/lib/pricing";
import type { SingleService } from "@/lib/size-tiers";

// Draft front door for home listings: size first, live prices, then the
// Aryeo form pre-filled. Kept out of search and the nav until Thomas signs off.
export const metadata: Metadata = {
  title: "Book a Listing Shoot | Avery & Bryant",
  description:
    "Enter the home's size, see your exact price, and book your listing shoot.",
  robots: { index: false, follow: false },
};

export const revalidate = 600;

const PACKAGES: { key: ProductKey; name: string }[] = [
  { key: "launch", name: "Listing Launch Kit" },
  { key: "domination", name: "Listing Domination System" },
  { key: "takeover", name: "Market Takeover Blueprint" },
];

// Single services, in the order agents ask for them. upgradeTo names the
// smallest package that already includes the service, shown as the better deal.
const SINGLES: { key: ProductKey; label: string; upgradeTo?: string }[] = [
  { key: "photos", label: "HDR photos", upgradeTo: "Listing Launch Kit" },
  { key: "video", label: "Cinematic property video", upgradeTo: "Market Takeover Blueprint" },
  { key: "drone", label: "Aerial drone photos and video", upgradeTo: "Listing Launch Kit" },
  { key: "zillow3d", label: "Zillow 3D tour and interactive floor plan", upgradeTo: "Listing Domination System" },
  { key: "floorPlan", label: "2D floor plan", upgradeTo: "Listing Launch Kit" },
  { key: "reel", label: "Social reel", upgradeTo: "Listing Domination System" },
  { key: "twilight", label: "Real twilight shoot" },
];

/** "Small Shoot - 25 Photos" reads as "25 photos"; "90–120 seconds" as "90 to 120 seconds". */
function optionLabel(title: string): string {
  const photos = title.match(/(\d+)\s*photos/i);
  if (photos) return `${photos[1]} photos`;
  return title.replace(/\s*–\s*/g, " to ");
}

export default async function BookHomePage() {
  const live = await getLiveProducts();

  const packages: BookingPackage[] = PACKAGES.flatMap(({ key, name }) => {
    const p = realEstatePricing.packages.find((x) => x.name === name);
    const tiers = sizeTiers(live[key]);
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

  const singles: SingleService[] = SINGLES.flatMap(({ key, label, upgradeTo }) => {
    const variants = live[key];
    if (!variants) return [];
    const tiers = sizeTiers(variants);
    return [
      {
        key,
        label,
        tiers,
        options: tiers ? [] : variants.map((v) => ({ label: optionLabel(v.title), price: v.price })),
        upgradeTo,
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
            <HomeBooking packages={packages} singles={singles} />
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
