"use client";

import { useEffect, useRef, useState } from "react";
import { FilmScrub } from "./film-scrub";
import { stageIndex } from "./film-data";

/**
 * The opening scene. One continuous film of a home going from layout lines on
 * bare dirt to sold, scrubbed by the visitor's scroll. The picture holds at
 * each stage and names the media we capture there, so the story and the
 * offer are the same thing.
 *
 * The film is an illustration (not a client build) and is labeled as one.
 * Frames and timing live in film-data.ts.
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

  const active = STAGES[stage];
  const gutter = "max(48px, calc((100vw - 1280px) / 2 + 48px))";

  return (
    <section
      ref={trackRef}
      id="plan-to-sold"
      aria-label="From plan to sold"
      className="relative h-[560svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black-deep">
        <FilmScrub progressRef={progressRef} className="absolute inset-0 h-full w-full" />

        {/* ── scrims: keep the type readable over the film ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[26%] bg-[linear-gradient(to_bottom,rgba(10,10,10,0.72),rgba(10,10,10,0))]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-[linear-gradient(to_top,#0a0a0a_0%,rgba(10,10,10,0.93)_34%,rgba(10,10,10,0.6)_62%,rgba(10,10,10,0)_100%)] lg:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.84)_26%,rgba(10,10,10,0.35)_46%,rgba(10,10,10,0)_62%)] lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-44 bg-[linear-gradient(to_top,#0a0a0a_8%,rgba(10,10,10,0))] lg:block"
        />

        {/* ── hero copy (the Plan stage) ── */}
        <div
          ref={heroRef}
          style={{ ["--gutter" as string]: gutter }}
          className="absolute inset-x-0 bottom-0 px-6 pb-[92px] will-change-transform md:px-12 md:pb-[120px] lg:inset-y-0 lg:flex lg:w-[50%] lg:items-center lg:pb-0 lg:pl-[var(--gutter)]"
        >
          <div className="max-w-[560px]">
            <div className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-crimson" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
                For Central Arkansas builders
              </span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(48px,13vw,104px)] font-light leading-[0.98] tracking-[-0.035em] text-fg md:mt-6">
              From plan
              <br />
              to sold<span className="text-crimson">.</span>
            </h1>
            <p className="mt-4 max-w-[32ch] text-[15px] leading-relaxed text-fg-strong md:mt-7 md:max-w-[40ch] md:text-lg">
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
                className="group inline-flex min-h-[44px] items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-colors hover:text-white max-lg:[@media(max-height:720px)]:hidden"
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
          style={{ ["--gutter" as string]: gutter }}
          className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-[92px] md:px-12 md:pb-[120px] lg:inset-y-0 lg:flex lg:w-[42%] lg:items-center lg:py-0 lg:pl-[var(--gutter)]"
        >
          <div className="grid w-full max-w-[460px]">
            {STAGES.slice(1).map((s, i) => {
              const on = stage === i + 1;
              return (
                <div
                  key={s.name}
                  aria-hidden={!on}
                  className={`self-end [grid-area:1/1] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:self-auto ${
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
                  <p className="mt-4 border-l border-white/15 pl-3 text-xs leading-relaxed text-fg-secondary md:mt-6 max-lg:[@media(max-height:720px)]:hidden">
                    {s.from}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── sheet tag, top right ── */}
        <div className="pointer-events-none absolute right-6 top-[84px] hidden text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-fg-secondary md:right-12 md:top-[104px] md:block">
          <p>Sheet {active.sheet}</p>
          <p>{active.name}</p>
          <p className="text-fg-faint">Illustration</p>
        </div>

        {/* ── stage rail ── */}
        <div
          style={{ ["--gutter" as string]: gutter }}
          className="absolute inset-x-6 bottom-5 md:inset-x-12 md:bottom-8 lg:inset-x-[var(--gutter)]"
        >
          <div className="mb-3 flex items-center justify-between md:mb-4">
            <div
              ref={hintRef}
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-fg-secondary"
            >
              <span>Scroll to build</span>
              <span aria-hidden="true" className="h-px w-10 bg-white/25" />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-fg-secondary md:hidden">
              Illustration
            </p>
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
