import { HeroRealEstateV1 } from "@/components/heroes/hero-real-estate-v1";
import { HeroRealEstateV2 } from "@/components/heroes/hero-real-estate-v2";
import { HeroRealEstateV3 } from "@/components/heroes/hero-real-estate-v3";

export const metadata = {
  title: "Hero variants preview — Real Estate | Avery & Bryant",
  robots: { index: false, follow: false },
};

function Label({
  num,
  name,
  tagline,
}: {
  num: string;
  name: string;
  tagline: string;
}) {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 px-6 py-4 backdrop-blur-xl md:px-12">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4">
        <span className="rounded bg-crimson/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-crimson">
          V{num}
        </span>
        <span className="font-display text-lg text-white-90">{name}</span>
        <span className="hidden text-sm text-white/40 md:inline">
          · {tagline}
        </span>
      </div>
    </div>
  );
}

export default function HeroRealEstatePreviewPage() {
  return (
    <>
      <Label
        num="1"
        name="Cinematic Drone Reveal"
        tagline="Full-bleed video · word-by-word stagger · corner brackets"
      />
      <HeroRealEstateV1 />

      <Label
        num="2"
        name="Editorial Split-Frame"
        tagline="Magazine split · Ken Burns image · stats row · thumb strip"
      />
      <HeroRealEstateV2 />

      <Label
        num="3"
        name="Kinetic Type Mask"
        tagline="Video through letters · SVG mask · centered · vignette"
      />
      <HeroRealEstateV3 />
    </>
  );
}
