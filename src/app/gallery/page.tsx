import { GalleryGrid, type GalleryItem } from "@/components/gallery-grid";
import curated from "../../../data/gallery-curated.json";

export const metadata = {
  title:
    "Portfolio & Gallery | Real Estate Photography Arkansas | Avery & Bryant",
  description:
    "Browse real work from Avery & Bryant — real estate, new construction, land, short-term rental, and commercial media across Central Arkansas. Every image is a real client listing.",
};

const items = curated as GalleryItem[];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-crimson/5 blur-[150px]" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
              The Portfolio
            </span>
          </div>
          <h1 className="font-display text-[clamp(32px,6vw,64px)] font-extralight leading-[1.1] tracking-tight text-white-90">
            Real listings.
            <br />
            <span className="text-white-40">Real results.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white-50">
            Every frame below was shot and delivered for an actual Arkansas
            listing. Filter by property type, then tap any image to see the full
            property tour.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <GalleryGrid items={items} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <h2 className="font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-white-90">
            Your listing, shot like this.
          </h2>
          <a
            href="/book"
            className="mt-8 inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
          >
            Book a Shoot
          </a>
        </div>
      </section>
    </>
  );
}
