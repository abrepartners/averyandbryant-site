"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { VideoRows } from "@/components/portfolio-videos";
import { VideoSamples, type VideoSample } from "@/components/video-samples";
import { portfolioVideos } from "@/lib/portfolio-videos";

/**
 * The work. Everything in this section is real delivered media.
 *
 *   01 to 03  build progress: the same homes photographed and filmed across
 *             visits (files in public/images/builders/progress, public/videos)
 *   04        one builder's film series, first footing to move-in
 *   05        renovations, before and after
 *   06        previews: our photo beside an AI preview of the finish. The
 *             preview half is always labeled "Preview, AI".
 *   07, 08    finished homes and finished home films
 *
 * No street, house number or home name goes in a file name, caption or alt
 * text. City is fine. Every film was read frame by frame for on-screen
 * addresses before it was added (see ~/ab/tools/builders-content).
 */

const IMG = "/images/builders";

const DELIVERED_PHOTOS = [
  {
    src: "/images/builders/benton-front-exterior.jpg",
    alt: "Acadian brick front elevation with dormers on a new construction home in Benton, Arkansas",
  },
  {
    src: "/images/builders/little-rock-kitchen-2.jpg",
    alt: "Kitchen with marble counters and backsplash, a wood island and a wood clad range hood in a new construction home in Little Rock, Arkansas",
  },
  {
    src: "/images/builders/little-rock-front-exterior.jpg",
    alt: "Modern white brick front elevation with black windows on a new construction home in Little Rock, Arkansas",
  },
  {
    src: "/images/builders/bryant-kitchen.jpg",
    alt: "White oak kitchen with black windows in a new construction home in Bryant, Arkansas",
  },
  {
    src: "/images/builders/little-rock-front-exterior-3.jpg",
    alt: "Finished brick and stone front elevation of a new construction home in Little Rock, Arkansas, with fresh sod, a young staked tree and a brown double garage door",
  },
  {
    src: "/images/builders/bryant-aerial.jpg",
    alt: "Aerial photo of a new construction home on a wooded lot in Bryant, Arkansas",
  },
];

const BUILDER_VIDEOS = portfolioVideos.builders;

type Frame = { src: string; alt: string; label: string };

/** One home in Benton, the same three views on three visits. */
const VISIT_ROWS: { room: string; frames: Frame[] }[] = [
  {
    room: "Exterior",
    frames: [
      { label: "Visit 1", src: `${IMG}/progress/benton-exterior-1.jpg`, alt: "Front of a new construction home in Benton, Arkansas, with stone still on pallets in the yard" },
      { label: "Visit 2", src: `${IMG}/progress/benton-exterior-2.jpg`, alt: "Front of the same Benton home with the masonry done and the yard graded" },
      { label: "Finished", src: `${IMG}/progress/benton-exterior-3.jpg`, alt: "Front of the same Benton home finished, with sod and landscaping" },
    ],
  },
  {
    room: "Kitchen",
    frames: [
      { label: "Visit 1", src: `${IMG}/progress/benton-kitchen-1.jpg`, alt: "Kitchen of a new construction home in Benton, Arkansas, with raw cabinet boxes set on the slab" },
      { label: "Visit 2", src: `${IMG}/progress/benton-kitchen-2.jpg`, alt: "The same Benton kitchen with painted cabinets and protected counters" },
      { label: "Finished", src: `${IMG}/progress/benton-kitchen-3.jpg`, alt: "The same Benton kitchen finished, with a dark island, white counters and pendant lights" },
    ],
  },
  {
    room: "Great room",
    frames: [
      { label: "Visit 1", src: `${IMG}/progress/benton-great-room-1.jpg`, alt: "Great room of a new construction home in Benton, Arkansas, with drywall up and the fireplace still framed" },
      { label: "Visit 2", src: `${IMG}/progress/benton-great-room-2.jpg`, alt: "The same Benton fireplace with the stone set and the floor still bare" },
      { label: "Finished", src: `${IMG}/progress/benton-great-room-3.jpg`, alt: "The same Benton great room finished, with a stone fireplace, a wood mantel and wood floors" },
    ],
  },
];

/** One home in Cabot, open studs to the day it listed. */
const FRAMING_TO_FINISHED: Frame[] = [
  { label: "Framing", src: `${IMG}/progress/cabot-framing-1.jpg`, alt: "Hallway of open wall studs in a new construction home in Cabot, Arkansas" },
  { label: "Framing", src: `${IMG}/progress/cabot-framing-2.jpg`, alt: "Open framed room with ceiling joists in the same Cabot home" },
  { label: "Dried in", src: `${IMG}/progress/cabot-dried-in.jpg`, alt: "The same Cabot home wrapped and roofed, seen from the gravel drive" },
  { label: "Finished", src: `${IMG}/progress/cabot-finished.jpg`, alt: "The same Cabot home finished, with stone, dark siding and a concrete drive" },
];

const vid = (slug: string, alt: string): VideoSample => ({
  src: `/videos/${slug}.mp4`,
  poster: `/videos/${slug}.jpg`,
  alt,
});

const PROGRESS_REELS: VideoSample[] = [
  vid("reel-build-progress-early", "Reel of a new construction home in Benton at an early progress visit"),
  vid("reel-build-progress-visits", "Reel walking the same Benton home across its progress visits"),
  vid("reel-new-build-finished", "Reel of the same Benton home finished"),
];

const SERIES: { title: string; video: VideoSample }[] = [
  { title: "Breaking ground", video: vid("film-builder-breaking-ground", "Builder film: breaking ground on a new home site in Arkansas") },
  { title: "Paint day", video: vid("film-builder-paint-day", "Builder film: choosing paint colors inside a home under construction") },
  { title: "Cutting trim", video: vid("film-builder-cutting-trim", "Builder film: cutting trim on site") },
  { title: "A new site", video: vid("film-builder-new-site", "Builder film: walking a new home site") },
  { title: "Welcome home", video: vid("film-builder-welcome-home", "Builder film: the finished home, with a look back at the first day on the lot") },
  { title: "The family story", video: vid("film-builder-family-story", "Builder brand film: the family behind a home building company") },
];

type ComparePair = { before: string; after: string; alt: string };

const RENOVATION_EXTERIORS: ComparePair[] = [
  {
    before: `${IMG}/renovation/little-rock-a-exterior-before.jpg`,
    after: `${IMG}/renovation/little-rock-a-exterior-after.jpg`,
    alt: "Front of a renovated home in Little Rock, Arkansas, before and after",
  },
  {
    before: `${IMG}/renovation/little-rock-b-exterior-before.jpg`,
    after: `${IMG}/renovation/little-rock-b-exterior-after.jpg`,
    alt: "Front of a second renovated home in Little Rock, Arkansas, before and after",
  },
];

const RENOVATION_KITCHENS: ComparePair[] = [
  {
    before: `${IMG}/renovation/little-rock-a-kitchen-before.jpg`,
    after: `${IMG}/renovation/little-rock-a-kitchen-after.jpg`,
    alt: "Kitchen of a renovated home in Little Rock, Arkansas",
  },
  {
    before: `${IMG}/renovation/little-rock-b-kitchen-before.jpg`,
    after: `${IMG}/renovation/little-rock-b-kitchen-after.jpg`,
    alt: "Kitchen of a second renovated home in Little Rock, Arkansas",
  },
];

/** Our photo beside an AI preview made from it. `after` is the preview. */
const PREVIEWS: (ComparePair & { what: string })[] = [
  {
    what: "Sod and landscaping",
    before: `${IMG}/preview/benton-yard-photo.jpg`,
    after: `${IMG}/preview/benton-yard-preview.jpg`,
    alt: "Front of a new construction home in Benton, Arkansas",
  },
  {
    what: "Staged kitchen",
    before: `${IMG}/preview/benton-kitchen-photo.jpg`,
    after: `${IMG}/preview/benton-kitchen-preview.jpg`,
    alt: "Kitchen of a new construction home in Benton, Arkansas",
  },
  {
    what: "Staged living room",
    before: `${IMG}/preview/benton-living-photo.jpg`,
    after: `${IMG}/preview/benton-living-preview.jpg`,
    alt: "Living room of a new construction home in Benton, Arkansas",
  },
  {
    what: "Yard and pool from the air",
    before: `${IMG}/preview/benton-aerial-photo.jpg`,
    after: `${IMG}/preview/benton-aerial-preview.jpg`,
    alt: "Aerial view of a new construction home in Benton, Arkansas",
  },
];

function Ticks() {
  const c = "absolute h-3 w-3 border-white/30";
  return (
    <span aria-hidden="true">
      <span className={`${c} left-2 top-2 border-l border-t`} />
      <span className={`${c} right-2 top-2 border-r border-t`} />
      <span className={`${c} bottom-2 left-2 border-b border-l`} />
      <span className={`${c} bottom-2 right-2 border-b border-r`} />
    </span>
  );
}

function SlotHead({
  n,
  title,
  spec,
  tag = "Slot",
  wide = false,
  children,
}: {
  n: string;
  title: string;
  spec: string;
  tag?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-3 ${wide ? "md:flex-row md:items-end md:justify-between md:gap-10" : ""}`}
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
          <span className="text-crimson-text">{tag} {n}</span>
          <span className="mx-2 text-fg-faint">/</span>
          {spec}
        </p>
        <h3 className="mt-3 font-display text-[clamp(24px,4vw,36px)] font-light tracking-tight text-fg">
          {title}
        </h3>
      </div>
      <p
        className={`max-w-[44ch] text-sm leading-relaxed text-fg-secondary ${wide ? "md:text-right" : ""}`}
      >
        {children}
      </p>
    </div>
  );
}

function Shot({ frame, sizes }: { frame: Frame; sizes: string }) {
  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded border border-white/10 bg-black-deep">
        <Image src={frame.src} alt={frame.alt} fill sizes={sizes} className="object-cover" />
        <Ticks />
      </div>
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-strong">
        {frame.label}
      </figcaption>
    </figure>
  );
}

/** Drag to compare two real photos of the same view. */
function Compare({ pair }: { pair: ComparePair }) {
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const r = frameRef.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={frameRef}
      className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded border border-white/10 bg-black-deep"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image
        src={pair.after}
        alt={`${pair.alt}: after`}
        fill
        draggable={false}
        sizes="(min-width: 1024px) 600px, 100vw"
        className="pointer-events-none object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={pair.before}
          alt={`${pair.alt}: before`}
          fill
          draggable={false}
          sizes="(min-width: 1024px) 600px, 100vw"
          className="pointer-events-none object-cover"
        />
      </div>
      <p className="absolute left-3 top-3 rounded-sm bg-[rgba(10,10,10,0.62)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg">
        Before
      </p>
      <p className="absolute right-3 top-3 rounded-sm bg-[rgba(10,10,10,0.62)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg">
        After
      </p>
      <div aria-hidden="true" className="absolute inset-y-0 w-px bg-white/80" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-[#0a0a0a] font-mono text-[11px] text-fg">
          &lsaquo;&thinsp;&rsaquo;
        </span>
      </div>
      <input
        type="range"
        min={4}
        max={96}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Slide between before and after"
        className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

/** Two photos side by side with a label on each. */
function Pair({
  pair,
  labels,
}: {
  pair: ComparePair;
  labels: [string, string];
}) {
  const srcs = [pair.before, pair.after];
  return (
    <div className="grid grid-cols-2 gap-2">
      {srcs.map((src, i) => (
        <div
          key={src}
          className="relative aspect-[4/3] overflow-hidden rounded border border-white/10 bg-black-deep"
        >
          <Image
            src={src}
            alt={`${pair.alt}: ${labels[i].toLowerCase()}`}
            fill
            sizes="(min-width: 1024px) 300px, 50vw"
            className="object-cover"
          />
          <p
            className={`absolute left-2 top-2 rounded-sm px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] ${
              i === 1 && labels[1] !== "After"
                ? "bg-crimson text-white"
                : "bg-[rgba(10,10,10,0.62)] text-fg"
            }`}
          >
            {labels[i]}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ProofSlots() {
  return (
    <section className="border-t border-white/5 py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
              The work
            </span>
          </div>
          <h2 className="mt-5 font-display text-[clamp(32px,6vw,64px)] font-light leading-[1.04] tracking-[-0.025em] text-fg">
            What buyers see while you build.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-strong md:text-lg">
            Everything below is real work for Central Arkansas builders and
            renovators: the progress visits, the films that follow a build,
            and the finished home.
          </p>
        </div>

        {/* 01: one home, three visits */}
        <div className="mt-16 md:mt-24">
          <SlotHead tag="Delivered" n="01" title="Build progress photos" spec="Photo, one home, three visits" wide>
            Same views, every visit. Buyers, lenders and owners watch the
            home move without driving to the site.
          </SlotHead>
          <div className="mt-8 grid gap-10 md:gap-12">
            {VISIT_ROWS.map((row) => (
              <div key={row.room}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
                  {row.room}
                </p>
                <div className="-mx-6 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
                  {row.frames.map((f) => (
                    <div key={f.src} className="w-[78%] shrink-0 snap-center md:w-auto">
                      <Shot frame={f} sizes="(min-width: 768px) 400px, 78vw" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-secondary md:hidden">
            Swipe each row
          </p>
        </div>

        {/* 02: framing to finished */}
        <div className="mt-20 md:mt-28">
          <SlotHead tag="Delivered" n="02" title="Framing to finished" spec="Photo, one home, 4 frames" wide>
            Open studs to the day it listed. The record a builder keeps and
            the story a buyer wants.
          </SlotHead>
          <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {FRAMING_TO_FINISHED.map((f) => (
              <Shot key={f.src} frame={f} sizes="(min-width: 1024px) 300px, 50vw" />
            ))}
          </div>
        </div>

        {/* 03: progress reels */}
        <div className="mt-20 md:mt-28">
          <SlotHead tag="Delivered" n="03" title="Progress reels" spec="Reel, cut for the phone" wide>
            The same home on film: an early visit, a reel that walks it
            across the visits, and the finished house. Tap one to play.
          </SlotHead>
          <div className="mt-8">
            <VideoSamples videos={PROGRESS_REELS} vertical />
          </div>
        </div>

        {/* 04: one builder's series */}
        <div className="mt-20 md:mt-28">
          <SlotHead tag="Delivered" n="04" title="One builder, first footing to move-in" spec="Film series, 6 films" wide>
            A custom builder brought us in at the footing and kept the
            cameras rolling through the welcome home. Their name is on every
            frame, because it was made to be theirs.
          </SlotHead>
          <div className="mt-8 grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {SERIES.map((s, i) => (
              <figure key={s.video.src}>
                <VideoSamples videos={[s.video]} className="grid" />
                <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="text-fg-strong">{s.title}</span>
                  <span className="text-fg-secondary">0{i + 1}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* 05: renovations */}
        <div className="mt-20 md:mt-28">
          <SlotHead tag="Delivered" n="05" title="Renovations, before and after" spec="Photo, drag to compare" wide>
            Flips and remodels get the same treatment. We shoot the house
            the day the work starts and again the day it lists.
          </SlotHead>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {RENOVATION_EXTERIORS.map((p) => (
              <Compare key={p.before} pair={p} />
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {RENOVATION_KITCHENS.map((p) => (
              <Pair key={p.before} pair={p} labels={["Before", "After"]} />
            ))}
          </div>
        </div>

        {/* 06: previews */}
        <div className="mt-20 md:mt-28">
          <SlotHead tag="Delivered" n="06" title="Show the finish before it is finished" spec="Photo plus AI preview" wide>
            Yard still dirt, rooms still empty? We add a preview of the sod,
            the staging or the pool to our own photo of the home. The photo
            is real. The preview is always labeled.
          </SlotHead>
          <div className="mt-8 grid gap-x-4 gap-y-8 lg:grid-cols-2">
            {PREVIEWS.map((p) => (
              <figure key={p.before}>
                <Pair pair={p} labels={["Photo", "Preview, AI"]} />
                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-strong">
                  {p.what}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* 07: finished-home photos */}
        <div className="mt-20 md:mt-28">
          <SlotHead tag="Delivered" n="07" title="Finished homes" spec="Photo, drone" wide>
            Shot like the listing a buyer wants to walk into. Every frame
            here went to a builder.
          </SlotHead>
          <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
            {DELIVERED_PHOTOS.map((shot) => (
              <figure
                key={shot.src}
                className="relative aspect-[4/3] overflow-hidden rounded border border-white/10 bg-black-deep"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 1024px) 400px, 50vw"
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </div>

        {/* 08: finished-home films and reels */}
        <div className="mt-20 md:mt-28">
          <SlotHead tag="Delivered" n="08" title="Finished home films" spec="Film, reel" wide>
            The piece that sells it. Shot within days of the final clean.
            Tap one to play.
          </SlotHead>
          <div className="mt-8">
            <VideoRows films={BUILDER_VIDEOS.films} reels={BUILDER_VIDEOS.reels} />
          </div>
        </div>
      </div>
    </section>
  );
}
