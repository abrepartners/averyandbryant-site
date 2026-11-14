"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HouseCanvas } from "./house-canvas";
import { stageIndex, type HouseOpts } from "./house-model";

/**
 * The opening scene. A floor plan drafts itself on a blueprint grid, then the
 * visitor's scroll raises it into a finished, sold home. Each stage names the
 * media we capture there, so the story and the offer are the same thing.
 */

const STAGES = [
  {
    name: "Plan",
    sheet: "A-101",
  },
  {
    name: "Foundation",
    sheet: "A-201",
    headline: "Start the record at the slab.",
    body: "Drone and ground photos from the first pour. Your coming soon post goes out while the concrete cures.",
    from: "Build Tracker: monthly photo set, drone and ground",
  },
  {
    name: "Framing",
    sheet: "A-301",
    headline: "Give buyers something to watch.",
    body: "A 30 second aerial update every month. Proof the home is real, moving, and worth a call before it is ever listed.",
    from: "Build Tracker: monthly aerial update video",
  },
  {
    name: "Rough-in",
    sheet: "A-401",
    headline: "Show what the drywall hides.",
    body: "Before and after graphics and a dated progress report. The work behind your walls becomes a reason to buy from you.",
    from: "Build Tracker: comparison graphics and PDF report",
  },
  {
    name: "Finished",
    sheet: "A-501",
    headline: "Launch with everything, in 48 hours.",
    body: "40+ photos, drone, a 60 to 90 second film, four reels and a floor plan, delivered within 48 hours of the shoot.",
    from: "Builder Marketing System",
  },
  {
    name: "Sold",
    sheet: "A-601",
    headline: "Fewer days carried. More margin kept.",
    body: "That is the whole job. Keep scrolling and put your own numbers on it.",
    from: "The point of all of it",
  },
];

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const sm = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function PlanToSold({ consultHref }: { consultHref: string }) {
  const trackRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const r = track.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? clamp(-r.top / total) : 0;
      progressRef.current = p;

      const idx = stageIndex(p);
      setStage((prev) => (prev === idx ? prev : idx));

      const hero = heroRef.current;
      if (hero) {
        const o = 1 - sm(0.03, 0.085, p);
        hero.style.opacity = String(o);
        hero.style.transform = `translate3d(0,${-p * 320}px,0)`;
        hero.style.pointerEvents = o < 0.4 ? "none" : "auto";
        hero.style.visibility = o < 0.01 ? "hidden" : "visible";
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (hintRef.current) {
        hintRef.current.style.opacity = String(1 - sm(0.005, 0.03, p));
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Phones: the plan sits under the headline, then rises to the top half as
  // the captions take the bottom. Desktop: the model holds the right side.
  const getOpts = useCallback((p: number, w: number, h: number): HouseOpts => {
    const settle = sm(0.03, 0.14, p);
    if (w < 1024) {
      const from = h > 700 ? 0.74 : 0.77;
      return {
        originY: from + (0.4 - from) * settle,
        zoom: (w < 640 ? 0.86 : 0.7) + 0.1 * settle,
      };
    }
    // Fit the model into the space right of the copy column.
    const left = w * 0.43;
    const right = w - 32;
    const base = Math.min(w / 62, h / 48);
    const zoom = Math.min(0.98, (right - left) / (56 * base), (h * 0.7) / (36 * base));
    return {
      originX: (left + right) / 2 / w,
      originY: 0.52 + 0.02 * settle,
      zoom,
    };
  }, []);

  const active = STAGES[stage];

  return (
    <section
      ref={trackRef}
      id="plan-to-sold"
      aria-label="From plan to sold"
      className="relative h-[520svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <HouseCanvas
          progressRef={progressRef}
          playIntro
          getOpts={getOpts}
          className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_78%_70%_at_50%_52%,#000_52%,transparent_100%)] lg:[mask-image:radial-gradient(ellipse_52%_78%_at_70%_52%,#000_55%,transparent_100%)]"
        />

        {/* ── hero copy (the Plan stage) ── */}
        <div
          ref={heroRef}
          className="absolute inset-x-0 top-0 px-6 pt-[92px] will-change-transform md:px-12 md:pt-[120px] lg:inset-y-0 lg:flex lg:w-[50%] lg:items-center lg:pt-0 lg:pl-[max(48px,calc((100vw-1280px)/2+48px))]"
        >
          <div className="max-w-[560px]">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-crimson" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
                For Central Arkansas builders
              </span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(50px,13.4vw,104px)] font-light leading-[0.98] tracking-[-0.035em] text-fg md:mt-6">
              From plan
              <br />
              to sold<span className="text-crimson">.</span>
            </h1>
            <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-fg-strong md:mt-7 md:max-w-[40ch] md:text-lg">
              Every day a finished home sits, it costs you. We start at the
              slab, so buyers are watching long before the keys.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 md:mt-9">
              <a
                href={consultHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded bg-crimson px-7 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
              >
                Book a builder call
              </a>
              <a
                href="#carry"
                className="group inline-flex min-h-[44px] items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-colors hover:text-white"
              >
                What does a day cost you
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  &darr;
                </span>
              </a>
            </div>
            <p className="mt-3 hidden text-xs text-fg-secondary md:block">
              Free 30 minutes. No pitch deck.
            </p>
          </div>
        </div>

        {/* ── stage captions ── */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-[52%] bg-[linear-gradient(to_top,#0a0a0a_62%,rgba(10,10,10,0))] transition-opacity duration-500 lg:hidden ${
            stage > 0 ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-[76px] md:px-12 md:pb-[104px] lg:inset-y-0 lg:flex lg:w-[42%] lg:items-center lg:py-0 lg:pl-[max(48px,calc((100vw-1280px)/2+48px))]">
          <div className="grid w-full max-w-[460px]">
            {STAGES.slice(1).map((s, i) => {
              const on = stage === i + 1;
              return (
                <div
                  key={s.name}
                  aria-hidden={!on}
                  className={`[grid-area:1/1] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    on
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
                    <span className="text-crimson-text">0{i + 2}</span>
                    <span className="mx-2 text-fg-faint">/</span>
                    {s.name}
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(26px,6.6vw,48px)] font-light leading-[1.08] tracking-tight text-fg">
                    {s.headline}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-strong md:mt-5 md:text-base">
                    {s.body}
                  </p>
                  <p className="mt-4 border-l border-white/15 pl-3 text-xs leading-relaxed text-fg-secondary md:mt-6">
                    {s.from}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── sheet tag, top right ── */}
        <div className="pointer-events-none absolute right-6 top-[84px] hidden text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-fg-faint md:right-12 md:top-[104px] md:block">
          <p>Sheet {active.sheet}</p>
          <p>{active.name}</p>
        </div>

        {/* ── stage rail ── */}
        <div className="absolute inset-x-6 bottom-5 md:inset-x-12 md:bottom-8 lg:inset-x-[max(48px,calc((100vw-1280px)/2+48px))]">
          <div
            ref={hintRef}
            className="mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-fg-secondary md:mb-4"
          >
            <span>Scroll to build</span>
            <span aria-hidden="true" className="h-px w-10 bg-white/25" />
          </div>
          <div className="relative h-px w-full bg-white/10">
            <span
              ref={barRef}
              className="absolute inset-0 origin-left scale-x-0 bg-crimson"
            />
          </div>
          <ol className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em]">
            {STAGES.map((s, i) => (
              <li
                key={s.name}
                className={`transition-colors duration-300 ${
                  i === stage
                    ? "text-fg"
                    : i < stage
                      ? "text-fg-secondary"
                      : "text-fg-faint"
                } ${i === stage ? "" : "max-sm:hidden"}`}
              >
                <span className="sm:hidden">
                  0{i + 1} / 06{"  "}
                </span>
                {s.name}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
