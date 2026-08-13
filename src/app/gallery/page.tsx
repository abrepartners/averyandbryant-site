import { GalleryGrid, type GalleryItem } from "@/components/gallery-grid";
import { FeaturedHomes, type FeaturedHome } from "@/components/featured-homes";
import curated from "../../../data/gallery-curated.json";
import featured from "../../../data/featured-homes.json";
import drone from "../../../data/drone-showcase.json";
import boundary from "../../../data/boundary-showcase.json";

export const metadata = {
  alternates: { canonical: "/gallery" },
  title:
    "Portfolio & Gallery | Real Estate Photography Arkansas | Avery & Bryant",
  description:
    "Browse real work from Avery & Bryant — real estate, new construction, land, short-term rental, and commercial media across Central Arkansas. Every image is a real client listing.",
};

const items = curated as GalleryItem[];
const featuredHomes = featured as FeaturedHome[];
type ShotItem = { url: string; thumb: string; city: string; label: string };
const droneShots = drone as ShotItem[];
const boundaryShots = boundary as ShotItem[];

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
          <h1 className="font-display text-[clamp(32px,6vw,64px)] font-extralight leading-[1.1] tracking-tight text-fg">
            Real listings.
            <br />
            <span className="text-fg-secondary">Real results.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fg-secondary">
            Every frame below was shot and delivered for an actual Arkansas
            listing. Filter by property type, then tap any image to see the full
            property tour.
          </p>
        </div>
      </section>

      {/* Featured Work */}
      {featuredHomes.length > 0 && (
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="mb-8">
              <h2 className="font-display text-[clamp(20px,3vw,32px)] font-extralight tracking-tight text-fg">
                Featured work
              </h2>
              <p className="mt-2 text-sm text-fg-secondary">
                A closer look at a few recent listings — tap any home to browse
                the full shoot.
              </p>
            </div>
            <FeaturedHomes homes={featuredHomes} />
          </div>
        </section>
      )}

      {/* Aerial & Drone add-on showcase */}
      {droneShots.length > 0 && (
        <section className="border-t border-border py-16 md:py-20">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
                Add-on
              </p>
              <h2 className="mt-3 font-display text-[clamp(20px,3vw,32px)] font-extralight tracking-tight text-fg">
                Aerial &amp; drone
              </h2>
              <p className="mt-2 max-w-xl text-sm text-fg-secondary">
                FAA-licensed drone photography — lot context, acreage, and
                neighborhood scale that ground-level shots can&apos;t show. Adds
                to any listing.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {droneShots.map((shot, i) => (
                <div
                  key={i}
                  className="group relative aspect-[3/2] overflow-hidden rounded-lg border border-white/5 bg-[#111]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.thumb || shot.url}
                    alt={`Aerial drone photography of ${shot.city}, Arkansas by Avery & Bryant`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.2em] text-white/0 transition-colors group-hover:text-fg-strong">
                    {shot.city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lot lines & site plans add-on */}
      {boundaryShots.length > 0 && (
        <section className="border-t border-border py-16 md:py-20">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">
                Add-on
              </p>
              <h2 className="mt-3 font-display text-[clamp(20px,3vw,32px)] font-extralight tracking-tight text-fg">
                Lot lines &amp; site plans
              </h2>
              <p className="mt-2 max-w-xl text-sm text-fg-secondary">
                Drone aerials with property boundaries mapped in — buyers see
                exactly what they&apos;re getting. Built for land, acreage, and
                new development.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {boundaryShots.map((shot, i) => (
                <div
                  key={i}
                  className="group relative aspect-[3/2] overflow-hidden rounded-lg border border-white/5 bg-[#111]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.thumb || shot.url}
                    alt={`Property lot-line and boundary map of ${shot.city}, Arkansas by Avery & Bryant`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.2em] text-white/0 transition-colors group-hover:text-fg-strong">
                    {shot.city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full portfolio grid */}
      <section className="border-t border-border pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-8">
            <h2 className="font-display text-[clamp(20px,3vw,32px)] font-extralight tracking-tight text-fg">
              Browse the portfolio
            </h2>
            <p className="mt-2 text-sm text-fg-secondary">
              Filter by property type.
            </p>
          </div>
          <GalleryGrid items={items} />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <h2 className="font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-fg">
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
