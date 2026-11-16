"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { VideoSamples, type VideoSample } from "@/components/video-samples";
import { portfolioVideos } from "@/lib/portfolio-videos";

/**
 * The work, in five tabs so only one kind shows at a time. All of it is real
 * delivered media.
 *
 *   The build       one home on three visits, framing to finished, reels
 *   You on camera   one builder's film series, a builder presenting a home
 *   The craft       detail frames from custom homes, finished home films
 *   Renovations     before and after photos and films
 *   Previews        our photo beside an AI preview of the finish; the preview
 *                   half is always labeled "Preview, AI"
 *
 * No street, house number or home name goes in a file name, caption or alt
 * text. City is fine. Every film and photo was read for on-screen addresses
 * before it was added (see ~/ab/tools/builders-content).
 */

const IMG = "/images/builders";

type Frame = { src: string; alt: string; label: string };
type ComparePair = { before: string; after: string; alt: string };

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

/** One home in Cabot: the same two views, mid build and finished. */
const FRAMING_PAIRS: (ComparePair & { what: string; labels: [string, string] })[] = [
  {
    what: "Entry hall",
    labels: ["Framing", "Finished"],
    before: `${IMG}/progress/cabot-framing-1.jpg`,
    after: `${IMG}/progress/cabot-hall-finished.jpg`,
    alt: "Entry hall of a new construction home in Cabot, Arkansas",
  },
  {
    what: "From the drive",
    labels: ["Dried in", "Finished"],
    before: `${IMG}/progress/cabot-dried-in.jpg`,
    after: `${IMG}/progress/cabot-finished.jpg`,
    alt: "A new construction home in Cabot, Arkansas, seen from the drive",
  },
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

/** Detail-forward frames from two custom homes: the standard, not the listing. */
const CRAFT_PHOTOS = [
  { src: `${IMG}/craft/little-rock-entry-arch.jpg`, alt: "Arched brick entry with a hanging lantern on a custom home in Little Rock, Arkansas" },
  { src: `${IMG}/craft/hot-springs-village-entry-timber.jpg`, alt: "Timber framed entry porch at dusk on a custom home in Hot Springs Village, Arkansas" },
  { src: `${IMG}/craft/little-rock-window-wall.jpg`, alt: "Two story window wall with an arched door and wood columns in a custom home in Little Rock, Arkansas" },
  { src: `${IMG}/craft/hot-springs-village-green-kitchen.jpg`, alt: "Kitchen with green cabinets, a wood island and a wood range hood in a custom home in Hot Springs Village, Arkansas" },
  { src: `${IMG}/craft/little-rock-beams-fireplace.jpg`, alt: "Living room with wood ceiling beams and a stone fireplace in a custom home in Little Rock, Arkansas" },
  { src: `${IMG}/craft/little-rock-kitchen-lanterns.jpg`, alt: "Kitchen with lantern pendants and a wood island in a custom home in Little Rock, Arkansas" },
  { src: `${IMG}/craft/hot-springs-village-sunroom.jpg`, alt: "Sunroom with a wood plank ceiling in a custom home in Hot Springs Village, Arkansas" },
  { src: `${IMG}/craft/little-rock-bath.jpg`, alt: "Primary bath with a glass shower, brass fixtures and timber posts in a custom home in Little Rock, Arkansas" },
];

const CRAFT_FILMS = portfolioVideos.builders.films;

type Titled = {
  title: string;
  video: VideoSample;
  vertical?: boolean;
  link?: { href: string; label: string };
};

const HOST_FILMS: Titled[] = [
  { title: "The builder, on his latest build", video: vid("film-builder-walks-the-home", "Builder film: the builder presents a newly finished custom home in Arkansas") },
];

const RENOVATION_FILMS: Titled[] = [
  {
    title: "Walked before, shown after",
    video: vid("film-renovation-told-on-site", "Renovation film: the house walked and explained before the rebuild, then shown finished, Bryant"),
  },
  {
    title: "The builder explains the idea",
    vertical: true,
    video: vid("reel-renovation-builder-on-site", "Renovation reel: a builder explains a bathroom design mid build, then the finished room"),
    link: {
      href: "https://www.instagram.com/reel/DUHmhtkDBS3/",
      label: "One of our most watched reels. See it on Instagram",
    },
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

function SubHead({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-10">
      <h3 className="font-display text-[clamp(22px,3.4vw,30px)] font-light tracking-tight text-fg">
        {title}
      </h3>
      <p className="max-w-[46ch] text-sm leading-relaxed text-fg-secondary md:text-right">
        {children}
      </p>
    </div>
  );
}

function Captioned({ title, n, children }: { title: string; n?: number; children: React.ReactNode }) {
  return (
    <figure>
      {children}
      <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="text-fg-strong">{title}</span>
        {n ? <span className="text-fg-secondary">0{n}</span> : null}
      </figcaption>
    </figure>
  );
}

function ProgressPanel() {
  return (
    <div className="grid gap-16 md:gap-20">
      <div>
        <SubHead title="One home, three visits">
          Same views, every visit. Your buyers, lenders and owners watch
          the home move without driving to the site.
        </SubHead>
        <div className="mt-8 grid gap-8 md:gap-10">
          {VISIT_ROWS.map((row) => (
            <div key={row.room}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
                {row.room}
                <span className="ml-3 text-fg-secondary md:hidden">Swipe</span>
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
      </div>

      <div>
        <SubHead title="Framing to finished">
          Open studs to the finished home, from the same spot. The record
          you keep and the story a buyer wants.
        </SubHead>
        <div className="mt-8 grid gap-x-4 gap-y-8 lg:grid-cols-2">
          {FRAMING_PAIRS.map((p) => (
            <Captioned key={p.before} title={p.what}>
              <Pair pair={p} labels={p.labels} />
            </Captioned>
          ))}
        </div>
      </div>

      <div>
        <SubHead title="Progress reels">
          The same home cut for the phone: an early visit, a reel that
          walks it across the visits, and the finished house.
        </SubHead>
        <div className="mt-8">
          <VideoSamples videos={PROGRESS_REELS} vertical />
        </div>
      </div>
    </div>
  );
}

function CameraPanel() {
  return (
    <div className="grid gap-16 md:gap-20">
      <div>
        <SubHead title="One builder, first footing to move-in">
          A custom builder brought us in at the footing and kept the
          cameras rolling through the welcome home. Their name is on every
          frame, because it was made to be theirs.
        </SubHead>
        <div className="mt-8 grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {SERIES.map((s, i) => (
            <Captioned key={s.video.src} title={s.title} n={i + 1}>
              <VideoSamples videos={[s.video]} className="grid" />
            </Captioned>
          ))}
        </div>
      </div>
      {HOST_FILMS.length > 0 && (
        <div>
          <SubHead title="The builder walks the home">
            Nobody explains a build like the person who built it. We put
            the builder in front of the lens and let the house back them up.
          </SubHead>
          <div className="mt-8 grid gap-x-4 gap-y-8 md:grid-cols-2">
            {HOST_FILMS.map((s) => (
              <Captioned key={s.video.src} title={s.title}>
                <VideoSamples videos={[s.video]} className="grid" />
              </Captioned>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CraftPanel() {
  return (
    <div className="grid gap-16 md:gap-20">
      <div>
        <SubHead title="The details you fought for">
          Masonry, millwork, tile, light. Shot so a future client sees the
          standard you build to, not just a house for sale.
        </SubHead>
        <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {CRAFT_PHOTOS.map((shot) => (
            <figure
              key={shot.src}
              className="relative aspect-[4/3] overflow-hidden rounded border border-white/10 bg-black-deep"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(min-width: 1024px) 300px, 50vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
      {CRAFT_FILMS.length > 0 && (
        <div>
          <SubHead title="Finished home films">
            The piece that shows the whole home at its best. Tap one to play.
          </SubHead>
          <div className="mt-8">
            <VideoSamples videos={CRAFT_FILMS} className="grid gap-3 md:grid-cols-2 md:gap-4" />
          </div>
        </div>
      )}
    </div>
  );
}

function RenovationPanel() {
  return (
    <div className="grid gap-16 md:gap-20">
      <div>
        <SubHead title="Before and after">
          We shoot the house the day the work starts and again the day it
          is done. Drag the line.
        </SubHead>
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
      {RENOVATION_FILMS.length > 0 && (
        <div>
          <SubHead title="The rebuild, on film">
            The before told on site, the after shown finished.
          </SubHead>
          <div className="mt-8 grid items-start gap-x-4 gap-y-8 md:grid-cols-2">
            {RENOVATION_FILMS.map((s) => (
              <Captioned key={s.video.src} title={s.title}>
                <VideoSamples
                  videos={[s.video]}
                  vertical={s.vertical}
                  className={s.vertical ? "mx-auto grid w-3/5 md:w-1/2" : "grid"}
                />
                {s.link ? (
                  <a
                    href={s.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-[44px] items-center text-sm text-fg-strong underline decoration-white/30 underline-offset-4 hover:text-white"
                  >
                    {s.link.label}
                  </a>
                ) : null}
              </Captioned>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PreviewPanel() {
  return (
    <div>
      <SubHead title="Show the finish before it is finished">
        Yard still dirt, rooms still empty? We add a preview of the sod,
        the staging or the pool to our own photo of the home. The photo is
        real. The preview is always labeled.
      </SubHead>
      <div className="mt-8 grid gap-x-4 gap-y-8 lg:grid-cols-2">
        {PREVIEWS.map((p) => (
          <Captioned key={p.before} title={p.what}>
            <Pair pair={p} labels={["Photo", "Preview, AI"]} />
          </Captioned>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { id: "progress", label: "The build", Panel: ProgressPanel },
  { id: "camera", label: "You on camera", Panel: CameraPanel },
  { id: "craft", label: "The craft", Panel: CraftPanel },
  { id: "renovation", label: "Renovations", Panel: RenovationPanel },
  { id: "preview", label: "Previews", Panel: PreviewPanel },
] as const;

export function ProofSlots() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("progress");
  const topRef = useRef<HTMLDivElement>(null);
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];
  const Panel = active.Panel;

  const pick = (id: (typeof TABS)[number]["id"]) => {
    setTab(id);
    // Keep the tab row in view when a long panel is swapped for a short one.
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) topRef.current?.scrollIntoView({ block: "start" });
  };

  return (
    <section id="work" className="border-t border-white/5 py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
              The work
            </span>
          </div>
          <h2 className="mt-5 font-display text-[clamp(32px,6vw,64px)] font-light leading-[1.04] tracking-[-0.025em] text-fg">
            The work that makes the case.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-strong md:text-lg">
            This is not listing media for one house. It is the work that
            shows what your company can do. Everything here is real, made
            for Central Arkansas builders. Pick a tab.
          </p>
        </div>

        <div ref={topRef} className="scroll-mt-20 md:scroll-mt-28" />
        <div
          role="tablist"
          aria-label="Kinds of builder work"
          className="sticky top-[60px] z-20 -mx-6 mt-10 flex gap-2 overflow-x-auto border-y border-white/10 bg-[rgba(10,10,10,0.92)] px-6 py-3 backdrop-blur-xl md:top-[76px] md:mx-0 md:mt-14 md:px-0"
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`work-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="work-panel"
              onClick={() => pick(t.id)}
              className={`inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-full border px-5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                tab === t.id
                  ? "border-crimson bg-crimson text-white"
                  : "border-white/15 text-fg-strong hover:border-white/40"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          id="work-panel"
          role="tabpanel"
          aria-labelledby={`work-tab-${tab}`}
          className="mt-12 md:mt-16"
        >
          <Panel />
        </div>
      </div>
    </section>
  );
}
