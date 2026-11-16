"use client";

import { useState } from "react";
import type { Package } from "@/lib/pricing";
import { PackageCard } from "./builder-package-card";

/**
 * The packages, laid out in build order instead of behind a stage picker:
 * one program that runs while the home goes up, two single shoots for the
 * finished home. Names, prices and line values come from src/lib/pricing.ts.
 */

const PHASES = [
  "During the build",
  "At the finish",
  "At the finish, model home or community",
];

export function PhasePackages({ packages }: { packages: Package[] }) {
  const [opened, setOpened] = useState<Record<string, boolean>>({});

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
              Packages
            </span>
          </div>
          <h2 className="mt-5 font-display text-[clamp(32px,6vw,64px)] font-light leading-[1.04] tracking-[-0.025em] text-fg">
            Start during the build. Launch at the finish.
          </h2>
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-fg-strong">
            One program runs every month while the home goes up. Two single
            shoots cover the finished home. Prices are fixed.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:mt-20 lg:grid-cols-3 lg:gap-6">
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
      </div>
    </section>
  );
}
