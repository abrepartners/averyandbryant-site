import { HeroRealEstate } from "@/components/heroes/hero-real-estate";
import { HeroLotLand } from "@/components/heroes/hero-lot-land";
import { HeroMultiFamily } from "@/components/heroes/hero-multi-family";
import { HeroBuilders } from "@/components/heroes/hero-builders";
import { HeroCommercial } from "@/components/heroes/hero-commercial";
import { HeroAirbnbRentals } from "@/components/heroes/hero-airbnb-rentals";
import { HeroBranding } from "@/components/heroes/hero-branding";

export const metadata = {
  title: "Hero variants preview — all verticals | Avery & Bryant",
  robots: { index: false, follow: false },
};

type HeroEntry = {
  vertical: string;
  template: string;
  psychology: string;
  Component: () => React.ReactNode;
};

const heroes: HeroEntry[] = [
  {
    vertical: "Real Estate",
    template: "V1 · Cinematic Drone",
    psychology: "Agents want prestige association — property as product",
    Component: HeroRealEstate,
  },
  {
    vertical: "Lot & Land",
    template: "V1-variant · Aerial-pushed",
    psychology: "Aerial IS the sell — FAA trust line matters",
    Component: HeroLotLand,
  },
  {
    vertical: "Multi-Family",
    template: "V2 · Editorial + stats",
    psychology: "B2B property managers — credibility + turnaround speed",
    Component: HeroMultiFamily,
  },
  {
    vertical: "Builders",
    template: "V2-variant · Documentary timeline",
    psychology: "Proof-of-work + premium marketing framing",
    Component: HeroBuilders,
  },
  {
    vertical: "Commercial",
    template: "Mosaic · 2x2 category grid",
    psychology:
      "Commercial = category of categories; mosaic welcomes CRE brokers AND owners/operators in one hero",
    Component: HeroCommercial,
  },
  {
    vertical: "Airbnb & Rentals",
    template: "Lifestyle Warm · amber palette",
    psychology: "Revenue-driven hosts — lifestyle + 40% booking stat",
    Component: HeroAirbnbRentals,
  },
  {
    vertical: "Personal Branding",
    template: "Content Engine · reel stack",
    psychology:
      "Motion sells branding — 3 phone-framed reels prove we make scroll-worthy content, not just headshots",
    Component: HeroBranding,
  },
];

function Label({
  num,
  vertical,
  template,
  psychology,
}: {
  num: string;
  vertical: string;
  template: string;
  psychology: string;
}) {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 px-6 py-4 backdrop-blur-xl md:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-baseline gap-4">
        <span className="rounded bg-crimson/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-crimson">
          {num}
        </span>
        <span className="font-display text-lg text-white-90">{vertical}</span>
        <span className="text-sm text-white/40">· {template}</span>
        <span className="hidden basis-full text-xs text-white/30 md:inline-block md:basis-auto">
          {psychology}
        </span>
      </div>
    </div>
  );
}

export default function HeroesPreviewPage() {
  return (
    <>
      {heroes.map(({ vertical, template, psychology, Component }, i) => (
        <div key={vertical}>
          <Label
            num={String(i + 1).padStart(2, "0")}
            vertical={vertical}
            template={template}
            psychology={psychology}
          />
          <Component />
        </div>
      ))}
    </>
  );
}
