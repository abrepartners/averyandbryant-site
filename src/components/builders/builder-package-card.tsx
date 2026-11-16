"use client";

import type { Package } from "@/lib/pricing";
import { OrderLink } from "@/components/order-link";
import { BUILDER_CALL_PATH } from "@/lib/consult";

/**
 * One builder package with its full stack. Names, prices and line values all
 * come from src/lib/pricing.ts.
 */

export function displayPrice(pkg: Package) {
  return pkg.priceBasis === "per month" && pkg.price.endsWith("/mo")
    ? pkg.price.slice(0, -3)
    : pkg.price;
}

export function PackageCard({
  pkg,
  index,
  state,
  open,
  onToggle,
  badge = "Fits your stage",
}: {
  pkg: Package;
  index: number;
  state: "match" | "next" | "rest";
  open: boolean;
  onToggle: () => void;
  /** Label on the highlighted card. */
  badge?: string;
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
            {badge}
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
            href={BUILDER_CALL_PATH}
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
