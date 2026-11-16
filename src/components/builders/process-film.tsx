"use client";

import { useEffect, useRef, useState } from "react";
import type { Package } from "@/lib/pricing";
import { FilmScrub } from "./film-scrub";
import { FILM, captionAt } from "./film-data";
import { displayPrice } from "./builder-package-card";

/**
 * The process cut of the opening scene. The page opens on a rolled blueprint.
 * Scrolling unrolls it, the drawing turns into the lot with its lines in the
 * same place, and the home is built from there to sold. Each stage carries
 * what we shoot at that point, the package that covers it and its price, so
 * the build order is the order of the page.
 *
 * Package names and prices come from src/lib/pricing.ts through `packages`.
 * The film is an illustration (not a client build) and is labeled as one.
 */

type Stage = {
  name: string;
  sheet: string;
  headline?: string;
  body?: string;
  /** What gets shot at this stage. */
  shot?: string;
  /** Index into `packages`, or "call" for the free builder call. */
  offer?: number | "call";
};

const STAGES: Stage[] = [
  { name: "Plan", sheet: "A-001" },
  {
    name: "Plan",
    sheet: "A-101",
    headline: "Put the media on the build schedule.",
    body: "One free 30 minute call sets the scope, the sites and the cadence. No pitch deck.",
    shot: "Nothing yet. This is the planning call.",
    offer: "call",
  },
  {
    name: "Lot",
    sheet: "A-102",
    headline: "Call before the first pour.",
    body: "Build Tracker documents the home from the foundation up. Set it up while the lot is still dirt and no month gets missed.",
    shot: "The program is set up here and starts at the slab.",
    offer: 0,
  },
  {
    name: "Foundation",
    sheet: "A-201",
    headline: "Start the record at the slab.",
    body: "Drone and ground photos from the first pour. Your coming soon post goes out while the concrete cures.",
    shot: "Monthly photo set, drone and ground.",
    offer: 0,
  },
  {
    name: "Framing",
    sheet: "A-301",
    headline: "Give buyers something to watch.",
    body: "A 30 second aerial update every month. Proof the home is real, moving, and worth a call before it is ever listed.",
    shot: "30 second aerial update video.",
    offer: 0,
  },
  {
    name: "Rough-in",
    sheet: "A-401",
    headline: "Show what the drywall hides.",
    body: "Before and after graphics and a dated progress report. The work behind your walls becomes a reason to buy from you.",
    shot: "Comparison graphics and a monthly PDF report.",
    offer: 0,
  },
  {
    name: "Finished",
    sheet: "A-501",
    headline: "Launch with everything, in 48 hours.",
    body: "40+ photos, drone, a 60 to 90 second film, four reels and a floor plan, delivered within 48 hours of the shoot.",
    shot: "One shoot of the finished home.",
    offer: 1,
  },
  {
    name: "Sold",
    sheet: "A-601",
    headline: "Fewer days carried. More margin kept.",
    body: "That is the whole job. Keep scrolling and put your own numbers on it.",
  },
];

/** The rail shows one label per stage; the rolled and flat blueprint share "Plan". */
const RAIL = STAGES.slice(1).map((s) => s.name);

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const sm = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export function ProcessFilm({
  consultHref,
  packages,
}: {
  consultHref: string;
  packages: Package[];
}) {
  const trackRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
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

      const idx = captionAt(FILM, p);
      setStage((prev) => (prev === idx ? prev : idx));

      const hero = heroRef.current;
      if (hero) {
        const o = 1 - sm(0.02, 0.06, p);
        hero.style.opacity = String(o);
        hero.style.transform = `translate3d(0,${-p * 420}px,0)`;
        hero.style.pointerEvents = o < 0.4 ? "none" : "auto";
        hero.style.visibility = o < 0.01 ? "hidden" : "visible";
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (hintRef.current) {
        hintRef.current.style.opacity = String(1 - sm(0.004, 0.025, p));
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
  const railIdx = Math.max(0, stage - 1);
  const gutter = "max(48px, calc((100vw - 1280px) / 2 + 48px))";

  return (
    <section
      ref={trackRef}
      id="plan-to-sold"
      aria-label="From plan to sold"
      className="relative h-[660svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black-deep">
        <FilmScrub
          trackRef={trackRef}
          film={FILM}
          className="absolute inset-0 h-full w-full"
        />

        {/* ── scrims: keep the type readable over the film ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[26%] bg-[linear-gradient(to_bottom,rgba(10,10,10,0.72),rgba(10,10,10,0))]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-[linear-gradient(to_top,#0a0a0a_0%,rgba(10,10,10,0.94)_38%,rgba(10,10,10,0.6)_64%,rgba(10,10,10,0)_100%)] lg:hidden"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.84)_26%,rgba(10,10,10,0.35)_46%,rgba(10,10,10,0)_62%)] lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-44 bg-[linear-gradient(to_top,#0a0a0a_8%,rgba(10,10,10,0))] lg:block"
        />

        {/* ── hero copy (the rolled blueprint) ── */}
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

        {/* ── stage panels: what happens, what we shoot, what covers it ── */}
        <div
          style={{ ["--gutter" as string]: gutter }}
          className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-[92px] md:px-12 md:pb-[120px] lg:inset-y-0 lg:flex lg:w-[44%] lg:items-center lg:py-0 lg:pl-[var(--gutter)]"
        >
          <div className="grid w-full max-w-[480px]">
            {STAGES.slice(1).map((s, i) => {
              const on = stage === i + 1;
              const pkg = typeof s.offer === "number" ? packages[s.offer] : null;
              return (
                <div
                  key={s.sheet}
                  aria-hidden={!on}
                  className={`self-end [grid-area:1/1] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:self-auto ${
                    on
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
                    <span className="text-crimson-text">0{i + 1}</span>
                    <span className="mx-2 text-fg-faint">/</span>
                    {s.name}
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(26px,6.6vw,48px)] font-light leading-[1.08] tracking-tight text-fg">
                    {s.headline}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg-strong md:mt-5 md:text-base">
                    {s.body}
                  </p>

                  {s.shot && (
                    <p className="mt-4 text-xs leading-relaxed text-fg-secondary md:mt-6 max-lg:[@media(max-height:760px)]:hidden">
                      <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                        We shoot
                      </span>
                      {s.shot}
                    </p>
                  )}

                  {s.offer === "call" && (
                    <a
                      href={consultHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={on ? 0 : -1}
                      className={`group mt-3 flex min-h-[56px] items-center justify-between gap-4 border-t border-white/15 pt-3 md:mt-4 lg:mt-6 lg:rounded lg:border lg:border-white/10 lg:bg-[rgba(10,10,10,0.8)] lg:px-5 lg:py-4 lg:backdrop-blur-md ${
                        on ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm text-fg">Builder call</span>
                        <span className="mt-0.5 block text-[10px] uppercase tracking-[0.2em] text-fg-secondary transition-colors group-hover:text-fg">
                          Book it &rarr;
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block font-display text-[28px] font-extralight leading-none tracking-[-0.02em] text-crimson">
                          Free
                        </span>
                        <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                          30 minutes
                        </span>
                      </span>
                    </a>
                  )}

                  {pkg && (
                    <a
                      href="#packages"
                      tabIndex={on ? 0 : -1}
                      className={`group mt-3 flex min-h-[56px] items-center justify-between gap-4 border-t border-white/15 pt-3 md:mt-4 lg:mt-6 lg:rounded lg:border lg:border-white/10 lg:bg-[rgba(10,10,10,0.8)] lg:px-5 lg:py-4 lg:backdrop-blur-md ${
                        on ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm text-fg">{pkg.name}</span>
                        <span className="mt-0.5 block text-[10px] uppercase tracking-[0.2em] text-fg-secondary transition-colors group-hover:text-fg">
                          See everything in it &rarr;
                        </span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block font-display text-[28px] font-extralight leading-none tracking-[-0.02em] text-crimson">
                          {displayPrice(pkg)}
                        </span>
                        {pkg.priceBasis && (
                          <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                            {pkg.priceBasis}
                          </span>
                        )}
                      </span>
                    </a>
                  )}

                  {!s.offer && s.offer !== 0 && (
                    <a
                      href="#carry"
                      tabIndex={on ? 0 : -1}
                      className={`group mt-3 flex min-h-[56px] items-center justify-between gap-4 border-t border-white/15 pt-3 text-sm text-fg md:mt-4 lg:mt-6 lg:rounded lg:border lg:border-white/10 lg:bg-[rgba(10,10,10,0.8)] lg:px-5 lg:py-4 lg:backdrop-blur-md ${
                        on ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                    >
                      What does a day cost you
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-y-0.5"
                      >
                        &darr;
                      </span>
                    </a>
                  )}
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
            {RAIL.map((name, i) => (
              <li
                key={name}
                className={`transition-colors duration-300 ${
                  i === railIdx
                    ? "text-fg"
                    : i < railIdx
                      ? "text-fg-secondary"
                      : "text-fg-faint"
                } ${i === railIdx ? "" : "max-sm:hidden"}`}
              >
                <span className="sm:hidden">
                  0{i + 1} / 0{RAIL.length}
                  {"  "}
                </span>
                {name}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
