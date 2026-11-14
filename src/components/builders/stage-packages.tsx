"use client";

import { useState } from "react";
import type { Package } from "@/lib/pricing";
import { OrderLink } from "@/components/order-link";
import { consultUrl } from "@/lib/consult";
import { HouseCanvas } from "./house-canvas";
import { STAGE_AT } from "./house-model";

/**
 * "Where's your build?" The builder picks a stage, the house model moves to
 * that stage, and the package that fits it steps forward with its full stack.
 * Package names, prices and line values all come from src/lib/pricing.ts.
 */

type StageId = "foundation" | "framing" | "rough-in" | "finished";

const STAGES: {
  id: StageId;
  label: string;
  at: number;
  line: string;
}[] = [
  {
    id: "foundation",
    label: "Foundation",
    at: STAGE_AT.foundation,
    line: "The best moment to start. Every month from here is something a buyer can follow.",
  },
  {
    id: "framing",
    label: "Framing",
    at: STAGE_AT.framing,
    line: "Still early. Start the record now and the finished home launches with a story behind it.",
  },
  {
    id: "rough-in",
    label: "Rough-in",
    at: STAGE_AT.roughIn,
    line: "The last good window for progress media. Start now, and put your finished home shoot on the calendar.",
  },
  {
    id: "finished",
    label: "Finished",
    at: STAGE_AT.finished,
    line: "One shoot, everything the listing needs, delivered within 48 hours.",
  },
];

function displayPrice(pkg: Package) {
  return pkg.priceBasis === "per month" && pkg.price.endsWith("/mo")
    ? pkg.price.slice(0, -3)
    : pkg.price;
}

function PackageCard({
  pkg,
  index,
  state,
  open,
  onToggle,
}: {
  pkg: Package;
  index: number;
  state: "match" | "next" | "rest";
  open: boolean;
  onToggle: () => void;
}) {
  const isCall = pkg.ctaMode === "call";
  const label =
    pkg.ctaLabel ?? (pkg.name.length > 16 ? "Book this package" : `Book ${pkg.name}`);
  const ctaClass =
    state === "match"
      ? "inline-flex min-h-[48px] w-full items-center justify-center rounded bg-crimson px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
      : "inline-flex min-h-[48px] w-full items-center justify-center rounded border border-white/15 px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-white/40";

  return (
    <article
      className={`relative flex min-w-0 flex-col rounded border p-6 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:p-8 ${
        state === "match"
          ? "order-first border-crimson/60 bg-[rgba(17,17,17,0.85)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] lg:order-none lg:-translate-y-3"
          : "border-white/5 bg-[rgba(17,17,17,0.4)]"
      }`}
    >
      <div className="flex min-h-[22px] items-center justify-between gap-3">
        <span className="font-mono text-[11px] tracking-[0.2em] text-fg-secondary">
          0{index + 1}
        </span>
        {state === "match" && (
          <span className="rounded-sm bg-crimson px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            Fits your stage
          </span>
        )}
        {state === "next" && (
          <span className="rounded-sm border border-white/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-fg-strong">
            Then, at finish
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-[26px] font-normal leading-tight tracking-tight text-fg">
        {pkg.name}
      </h3>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-display text-[44px] font-extralight leading-none tracking-[-0.03em] text-crimson">
          {displayPrice(pkg)}
        </span>
        {pkg.priceBasis && (
          <span className="text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
            {pkg.priceBasis}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-fg-strong">
        {pkg.bestFor}
      </p>

      {/* the stack */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="mt-6 border-t border-white/10">
            {pkg.valueItems.map((item) => (
              <li
                key={item.label}
                className="flex items-baseline justify-between gap-4 border-b border-white/5 py-2.5 text-[13px]"
              >
                <span className="min-w-0 text-fg-strong">
                  {item.isBonus && (
                    <span className="mr-2 text-[10px] font-medium uppercase tracking-[0.18em] text-amber-200/80">
                      Bonus
                    </span>
                  )}
                  {item.label}
                </span>
                <span className="shrink-0 font-mono tabular-nums text-fg-secondary">
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1.5 text-[13px]">
            <div className="flex justify-between gap-4">
              <dt className="text-fg-secondary">Bought separately</dt>
              <dd className="font-mono tabular-nums text-fg-secondary line-through decoration-white/30">
                {pkg.totalValue}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-fg">As a package</dt>
              <dd className="font-mono tabular-nums text-fg">{pkg.price}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-amber-200/80">You keep</dt>
              <dd className="font-mono tabular-nums text-amber-200/80">
                {pkg.savings.replace(/^Save\s+/, "")}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="mt-4 inline-flex min-h-[44px] items-center gap-2 self-start text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-fg"
      >
        <span
          aria-hidden="true"
          className={`inline-block transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
        {open ? "Hide the stack" : "See everything in it"}
      </button>

      <div className="mt-auto pt-4">
        {isCall ? (
          <a
            href={consultUrl("builders")}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClass}
          >
            {label}
          </a>
        ) : (
          <OrderLink
            vertical="builders"
            params={{ package: pkg.name }}
            className={ctaClass}
          >
            {label}
          </OrderLink>
        )}
        <p className="mt-3 min-h-[32px] text-xs leading-relaxed text-fg-secondary">
          {isCall
            ? "Set up on a free 30 minute call. Scope, sites and cadence are yours to set."
            : pkg.stepUp}
        </p>
      </div>
    </article>
  );
}

export function StagePackages({ packages }: { packages: Package[] }) {
  const [stage, setStage] = useState<StageId>("foundation");
  const [model, setModel] = useState(false);
  const [opened, setOpened] = useState<Record<string, boolean>>({});

  const current = STAGES.find((s) => s.id === stage) ?? STAGES[0];
  const matchIdx = stage === "finished" ? (model ? 2 : 1) : 0;
  const nextIdx = stage === "finished" ? -1 : 1;

  return (
    <section
      id="packages"
      className="scroll-mt-20 border-t border-white/5 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:items-center lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-crimson" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
                Where&apos;s your build
              </span>
            </div>
            <h2 className="mt-5 font-display text-[clamp(32px,6vw,64px)] font-light leading-[1.04] tracking-[-0.025em] text-fg">
              Pick the stage. See the fit.
            </h2>

            <div
              role="radiogroup"
              aria-label="Build stage"
              className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {STAGES.map((s, i) => {
                const on = s.id === stage;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setStage(s.id)}
                    className={`group flex min-h-[64px] flex-col items-start justify-between rounded border px-4 py-3 text-left transition-all duration-300 ${
                      on
                        ? "border-white/70 bg-white/[0.06]"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.2em] ${on ? "text-crimson-text" : "text-fg-secondary"}`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`text-sm ${on ? "text-fg" : "text-fg-strong"}`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 min-h-[72px] max-w-[46ch] text-base leading-relaxed text-fg-strong sm:min-h-[52px]">
              {current.line}
            </p>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                stage === "finished"
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  role="radiogroup"
                  aria-label="Kind of home"
                  className="mt-2 inline-flex rounded border border-white/10 p-1"
                >
                  {[
                    { v: false, label: "One spec or custom home" },
                    { v: true, label: "Model home or community" },
                  ].map((o) => (
                    <button
                      key={o.label}
                      type="button"
                      role="radio"
                      aria-checked={model === o.v}
                      tabIndex={stage === "finished" ? 0 : -1}
                      onClick={() => setModel(o.v)}
                      className={`min-h-[40px] rounded-sm px-3 text-xs transition-colors ${
                        model === o.v
                          ? "bg-white/10 text-fg"
                          : "text-fg-secondary hover:text-fg"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-white/5 bg-black-deep lg:aspect-[5/4]">
            <HouseCanvas
              progress={current.at}
              opts={{ annotate: false, zoom: 1.12, originY: 0.56 }}
              className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_55%,transparent_100%)]"
            />
            <p className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
              Stage / {current.label}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:mt-20 lg:grid-cols-3 lg:gap-6">
          {packages.map((pkg, i) => {
            const state =
              i === matchIdx ? "match" : i === nextIdx ? "next" : "rest";
            return (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                index={i}
                state={state}
                open={opened[pkg.name] ?? state === "match"}
                onToggle={() =>
                  setOpened((o) => ({
                    ...o,
                    [pkg.name]: !(o[pkg.name] ?? state === "match"),
                  }))
                }
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
