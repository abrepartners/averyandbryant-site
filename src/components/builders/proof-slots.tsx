"use client";

import { useRef, useState } from "react";
import { HouseCanvas } from "./house-canvas";
import { STAGE_AT } from "./house-model";

/**
 * Slots for the real work: build progress photos, the before and after
 * video, and finished home films. Until that footage is in, each slot holds
 * a drawn stand-in from the house model, labeled as a placeholder so nobody
 * mistakes it for delivered media.
 *
 * To fill a slot, swap the <HouseCanvas> inside its frame for an <Image> or
 * <video>. The frames already carry the right aspect ratios.
 */

const VIEW = { yaw: 40, pitch: 24 };

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
  wide = false,
  children,
}: {
  n: string;
  title: string;
  spec: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-3 ${wide ? "md:flex-row md:items-end md:justify-between md:gap-10" : ""}`}
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
          <span className="text-crimson-text">Slot {n}</span>
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

const PROGRESS_FRAMES = [
  { label: "Foundation", at: STAGE_AT.foundation },
  { label: "Framing", at: STAGE_AT.framing },
  { label: "Rough-in", at: STAGE_AT.roughIn },
  { label: "Finished", at: STAGE_AT.finished },
];

function BeforeAfter() {
  const [pos, setPos] = useState(52);
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
      className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden rounded border border-white/10 bg-black-deep sm:aspect-video"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <HouseCanvas
        progress={STAGE_AT.finished}
        opts={{ view: VIEW, zoom: 1.18, originY: 0.56 }}
        className="absolute inset-0 h-full w-full"
      />
      <div
        className="absolute inset-0 bg-black-deep"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <HouseCanvas
          progress={STAGE_AT.framing}
          opts={{ view: VIEW, zoom: 1.18, originY: 0.56 }}
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <Ticks />
      <p className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-strong">
        Before
      </p>
      <p className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-strong">
        After
      </p>
      <div
        aria-hidden="true"
        className="absolute inset-y-0 w-px bg-white/80"
        style={{ left: `${pos}%` }}
      >
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
            Three kinds of media, one home. The frames below are drawn
            placeholders. Real footage from Arkansas builds drops into each
            one.
          </p>
        </div>

        {/* Slot 01 */}
        <div className="mt-16 md:mt-24">
          <SlotHead n="01" title="Build progress photos" spec="Photo set, 4 frames" wide>
            Same angles, every visit. Buyers and lenders see the home move
            from dirt to done.
          </SlotHead>
          <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
            {PROGRESS_FRAMES.map((f, i) => (
              <figure key={f.label}>
                <div className="relative aspect-[4/3] overflow-hidden rounded border border-white/10 bg-black-deep">
                  <HouseCanvas
                    progress={f.at}
                    opts={{ view: VIEW, zoom: 1.2, originY: 0.57, grid: true }}
                    className="absolute inset-0 h-full w-full"
                  />
                  <Ticks />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="text-fg-strong">{f.label}</span>
                  <span className="text-fg-secondary">0{i + 1}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Slot 02 + 03 */}
        <div className="mt-20 grid gap-20 md:mt-28 lg:grid-cols-2 lg:gap-10">
          <div>
            <SlotHead n="02" title="Before and after video" spec="Video, drag to compare">
              Raw frame to finished home in one move. Drag the line.
            </SlotHead>
            <div className="mt-8">
              <BeforeAfter />
            </div>
          </div>

          <div>
            <SlotHead n="03" title="Finished home film" spec="Film, 60 to 90 seconds">
              The piece that sells it. Shot within days of the final clean.
            </SlotHead>
            <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded border border-white/10 bg-black-deep sm:aspect-video">
              <HouseCanvas
                progress={1}
                opts={{ view: { yaw: 44, pitch: 22 }, zoom: 1.12, originY: 0.56 }}
                className="absolute inset-0 h-full w-full"
              />
              <Ticks />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-[rgba(10,10,10,0.55)] backdrop-blur-sm"
              >
                <span className="ml-1 h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-white" />
              </span>
              <p className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-strong">
                Film slot
              </p>
              <p className="absolute bottom-4 right-4 font-mono text-[10px] tracking-[0.2em] text-fg-secondary">
                00:00 / 01:30
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
