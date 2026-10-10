import Link from "next/link";
import { GalleryGrid, type GalleryItem } from "@/components/gallery-grid";
import { GALLERY_VERTICALS, tileFor } from "@/lib/gallery";
import curated from "../../../data/gallery-curated.json";
import drone from "../../../data/drone-showcase.json";
import { Eyebrow } from "@/components/eyebrow";

export const metadata = {
  alternates: { canonical: "/gallery" },
  title:
    "Portfolio & Gallery | Real Estate Photography Arkansas | Avery & Bryant",
  description:
    "Browse real work from Avery & Bryant: real estate, Airbnb / Rentals, multi-family, commercial, land and new construction media across Central Arkansas. Every image is a real client listing.",
};

const items = curated as GalleryItem[];
type ShotItem = { url: string; thumb: string; city: string; label: string };
const droneShots = drone as ShotItem[];

const TILE_SIZES = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw";

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <Eyebrow className="mb-6">The Portfolio</Eyebrow>
          <h1 className="font-display text-[clamp(32px,6vw,64px)] font-extralight leading-[1.1] tracking-tight text-fg">
            Real listings.
            <br />
            <span className="text-fg-secondary">Real results.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fg-secondary">
            Every frame was shot and delivered for an actual Arkansas client.
            Pick a property type to see full shoots and projects for it.
          </p>
        </div>
      </section>

      {/* One tile per vertical */}
      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY_VERTICALS.map((v, i) => {
              const tile = tileFor(v);
              return (
                <Link
                  key={v.slug}
                  href={`/gallery/${v.slug}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/5 bg-[#111] transition-all hover:border-crimson/40"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tile.src}
                    srcSet={tile.srcSet}
                    sizes={TILE_SIZES}
                    alt={tile.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
                    <p className="font-display text-xl font-light text-white">
                      {v.title}
                    </p>
                    <span
                      aria-hidden="true"
                      className="text-fg-strong transition-transform group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Aerial & drone, across every property type */}
      {droneShots.length > 0 && (
        <section className="border-t border-border py-16 md:py-20">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="mb-8">
              <h2 className="font-display text-[clamp(20px,3vw,32px)] font-extralight tracking-tight text-fg">
                Aerial &amp; drone
              </h2>
              <p className="mt-2 max-w-xl text-sm text-fg-secondary">
                FAA-licensed drone photography: lot context, acreage, and
                neighborhood scale that ground-level shots can&apos;t show.
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
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full portfolio grid, collapsed */}
      <section className="border-t border-border pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <details className="group/all">
            <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 rounded-lg border border-white/10 bg-[rgba(17,17,17,0.5)] px-6 py-4 transition-colors hover:border-crimson/40 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block font-display text-[clamp(20px,3vw,28px)] font-extralight tracking-tight text-fg">
                  Browse everything
                </span>
                <span className="mt-1 block text-sm text-fg-secondary">
                  Every project in one grid, filter by property type.
                </span>
              </span>
              <span className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-crimson/80 group-open/all:hidden">
                Open
              </span>
              <span className="hidden shrink-0 text-[11px] uppercase tracking-[0.2em] text-fg-secondary group-open/all:inline">
                Close
              </span>
            </summary>
            <div className="mt-10">
              <GalleryGrid items={items} />
            </div>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <h2 className="font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-fg">
            Your listing, shot like this.
          </h2>
          <Link
            href="/book"
            className="mt-8 inline-flex min-h-[44px] items-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
          >
            Book a shoot
          </Link>
        </div>
      </section>
    </>
  );
}
