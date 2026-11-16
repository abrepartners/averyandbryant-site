"use client";

import { useEffect, useState } from "react";
import type { Package } from "@/lib/pricing";
import { PackageCard } from "./builder-package-card";
import { QuoteWizard } from "./quote-wizard";
import { SERVICES, money } from "./quote-data";

/**
 * Two ways in, side by side: one shoot a builder can book without a long
 * talk, and a short set of questions that ends in a price range. The three
 * fixed packages from src/lib/pricing.ts sit folded underneath for a builder
 * who is also selling or leasing the home.
 *
 * Market Your Build is priced from live Aryeo products only (the 25 image
 * photo set, with the regular add-ons). The name and the shot list are
 * proposals until Thomas signs off.
 */

const price = (id: string) => SERVICES.find((s) => s.id === id)?.low ?? 0;

const STACK = [
  { label: "Marketing photo set, 25 finished images", value: money(price("photos")), add: false },
  { label: "Aerial photos and video", value: money(price("aerial")), add: true },
  { label: "A short reel", value: money(price("reels")), add: true },
  { label: "A 60 second film", value: money(price("film")), add: true },
  { label: "Twilight exterior", value: money(price("twilight")), add: true },
];

const SHOT_LIST = [
  "Front elevation",
  "Entry",
  "Kitchen",
  "Great room",
  "Primary bath",
  "Trim and millwork",
  "Ceilings and beams",
  "Built-ins and tile",
  "Outdoor living",
];

const PHASES = [
  "During the build",
  "At the finish",
  "At the finish, model home or community",
];

function MarketYourBuild({ consultHref }: { consultHref: string }) {
  return (
    <article className="relative flex min-w-0 flex-col rounded border border-crimson/60 bg-[rgba(17,17,17,0.85)] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:p-8">
      <div className="flex min-h-[22px] items-center justify-between gap-3">
        <span className="font-mono text-[11px] tracking-[0.2em] text-fg-secondary">
          01
        </span>
        <span className="rounded-sm bg-crimson px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
          One shoot, in and out
        </span>
      </div>

      <h3 className="mt-6 font-display text-[26px] font-normal leading-tight tracking-tight text-fg">
        Market Your Build
      </h3>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-[44px] font-extralight leading-none tracking-[-0.03em] text-crimson">
          {money(price("photos"))}
        </span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
          per shoot
        </span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-fg-strong">
        One home you just finished, shot for your marketing and not for a
        listing. We go after the rooms and details that show your work, in
        wide frames for your site or tall frames for social.
      </p>

      <ul className="mt-6 border-t border-white/10">
        {STACK.map((item) => (
          <li
            key={item.label}
            className="flex items-baseline justify-between gap-4 border-b border-white/5 py-2.5 text-[13px]"
          >
            <span className="min-w-0 text-fg-strong">
              {item.add && (
                <span className="mr-2 text-[10px] font-medium uppercase tracking-[0.18em] text-amber-200/80">
                  Add
                </span>
              )}
              {item.label}
            </span>
            <span className="shrink-0 font-mono tabular-nums text-fg-secondary">
              {item.add ? `+${item.value}` : item.value}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-fg-secondary">
        The builder shot list
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {SHOT_LIST.map((shot) => (
          <li
            key={shot}
            className="rounded-sm border border-white/10 px-2.5 py-1.5 text-[12px] text-fg-strong"
          >
            {shot}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-fg-secondary">
        We skip the spare bedrooms and closets unless you are listing the home.
      </p>

      <div className="mt-auto pt-6">
        <a
          href={consultHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[48px] w-full items-center justify-center rounded bg-crimson px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
        >
          Book this shoot
        </a>
        <p className="mt-3 text-xs leading-relaxed text-fg-secondary">
          Give us the home and a date. Photos are back within 48 hours.
        </p>
      </div>
    </article>
  );
}

function FixedPackages({ packages }: { packages: Package[] }) {
  const [show, setShow] = useState(false);
  const [opened, setOpened] = useState<Record<string, boolean>>({});

  // A link to #fixed-packages from anywhere on the page unfolds the row.
  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#fixed-packages") setShow(true);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.(
        'a[href="#fixed-packages"]',
      );
      if (a) setShow(true);
    };
    check();
    window.addEventListener("hashchange", check);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", check);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div id="fixed-packages" className="mt-8 scroll-mt-24 md:mt-10">
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-expanded={show}
        aria-controls="fixed-packages-panel"
        className="flex min-h-[64px] w-full items-center gap-4 rounded border border-white/10 bg-white/[0.02] px-5 py-4 text-left transition-colors duration-200 hover:border-white/30 md:px-8"
      >
        <span className="min-w-0">
          <span className="block text-[15px] text-fg">
            Building every month, or selling the home too?
          </span>
          <span className="mt-0.5 block text-[13px] leading-snug text-fg-secondary">
            Three fixed packages: monthly progress from $325, finished-home
            launches from $1,395.
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`ml-auto shrink-0 text-xl leading-none text-fg-secondary transition-transform duration-300 ${show ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>

      {show && (
        <div
          id="fixed-packages-panel"
          className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-3 lg:gap-6"
        >
          {packages.map((pkg, i) => {
            const state = pkg.recommended ? "match" : "rest";
            return (
              <div key={pkg.name} className="flex min-w-0 flex-col">
                <p className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-secondary lg:mb-6">
                  <span aria-hidden="true" className="h-px w-5 bg-white/25" />
                  {PHASES[i] ?? "At the finish"}
                </p>
                <div className="flex flex-1 flex-col [&>article]:flex-1">
                  <PackageCard
                    pkg={pkg}
                    index={i}
                    state={state}
                    badge={pkg.tag}
                    open={opened[pkg.name] ?? state === "match"}
                    onToggle={() =>
                      setOpened((o) => ({
                        ...o,
                        [pkg.name]: !(o[pkg.name] ?? state === "match"),
                      }))
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function BuilderOffers({
  packages,
  consultHref,
}: {
  packages: Package[];
  consultHref: string;
}) {
  return (
    <section
      id="packages"
      className="scroll-mt-20 border-t border-white/5 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
              Two ways in
            </span>
          </div>
          <h2 className="mt-5 font-display text-[clamp(32px,6vw,64px)] font-light leading-[1.04] tracking-[-0.025em] text-fg">
            Book one shoot. Or tell us the goal.
          </h2>
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-fg-strong">
            If you just finished a home, the first one is all you need. If you
            want more than that, answer a few questions and see a price range
            before you talk to anyone.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-2 lg:gap-6">
          <MarketYourBuild consultHref={consultHref} />
          <QuoteWizard consultHref={consultHref} />
        </div>

        <FixedPackages packages={packages} />
      </div>
    </section>
  );
}
