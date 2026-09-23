import type { ReactNode } from "react";
import Link from "next/link";
import type { Package } from "@/lib/pricing";
import type { Vertical } from "@/lib/order-forms";
import { OrderLink } from "@/components/order-link";
import { consultUrl } from "@/lib/consult";

/**
 * Shared package card anatomy (UX handoff 2026-09-21), in this order:
 *   1. plain-language "Best for" fit line
 *   2. package name
 *   3. price with its basis ("per shoot", "one-time", "starting at", "per month")
 *   4. three or four decisive inclusions
 *   5. one line on the meaningful difference from the next smaller option
 *   6. full deliverables, expandable
 *   7. one CTA that keeps this offer selected
 * Bundle-value arithmetic and bonus badges are de-emphasized: they live at the
 * bottom of the expandable list, never at the top of the card. "Most popular"
 * only appears where the catalog already marks a package recommended.
 */

type PackageCardProps = {
  pkg: Package;
  vertical?: Vertical;
  /** Consult-calendar interest tag for call-based cards without an order vertical. */
  interest?: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  children?: ReactNode;
};

/** Plain names for the "See <vertical> samples" link; every key is a /gallery/<vertical> page. */
const SAMPLE_NAMES: Record<Vertical, string> = {
  "real-estate": "real estate",
  builders: "new construction",
  "airbnb-rentals": "Airbnb / Rentals",
  "lot-land": "lot and land",
  "multi-family": "multi-family",
};

const ctaClass =
  "mt-8 inline-flex min-h-[44px] items-center justify-center rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]";

/** "From $499" reads as "$499 starting at": strip the prefix when the basis says it. */
function displayPrice(pkg: Package) {
  if (pkg.priceBasis === "starting at" && pkg.price.startsWith("From ")) {
    return pkg.price.slice(5);
  }
  if (pkg.priceBasis === "per month" && pkg.price.endsWith("/mo")) {
    return pkg.price.slice(0, -3);
  }
  return pkg.price;
}

function shortName(name: string) {
  return name.length > 28 ? "this package" : name;
}

export function PackageCard({
  pkg,
  vertical,
  interest,
  ctaHref,
  ctaLabel,
  ctaTarget,
  children,
}: PackageCardProps) {
  const inclusions =
    pkg.keyInclusions ?? pkg.valueItems.slice(0, 4).map((v) => v.label);
  const isCall = pkg.ctaMode === "call";
  const label = ctaLabel ?? pkg.ctaLabel ?? `Book ${shortName(pkg.name)}`;
  const badge =
    pkg.recommended && /popular/i.test(pkg.tag) ? "Most popular" : null;

  return (
    <div
      className={`pricing-card group relative flex min-w-0 flex-col rounded border bg-[rgba(17,17,17,0.5)] p-6 transition-all duration-500 hover:bg-[rgba(17,17,17,0.8)] md:p-8 ${
        pkg.recommended
          ? "border-crimson/30 hover:border-crimson/50"
          : "border-white/5 hover:border-crimson/20"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-6 rounded-full bg-crimson px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
          {badge}
        </div>
      )}

      {/* 1. fit line */}
      <p className="text-[11px] leading-relaxed text-fg-secondary">
        <span className="font-medium uppercase tracking-[0.2em] text-amber-200/80">
          Best for
        </span>{" "}
        <span className="text-fg-strong">{pkg.bestFor ?? pkg.tag}</span>
      </p>

      {/* 2. name */}
      <h3 className="mt-3 font-display text-2xl font-medium text-fg">
        {pkg.name}
      </h3>

      {/* 3. price + basis */}
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="pricing-price block font-display text-4xl font-light text-crimson">
          {displayPrice(pkg)}
        </span>
        {pkg.priceBasis && (
          <span className="text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
            {pkg.priceBasis}
          </span>
        )}
      </div>

      {/* 4. decisive inclusions */}
      <ul className="mt-6 space-y-2.5">
        {inclusions.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-fg-strong"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/60" />
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>

      {/* 5. difference from the next smaller option */}
      {pkg.stepUp && (
        <p className="mt-5 border-l-2 border-white/10 pl-3 text-[13px] leading-relaxed text-fg-secondary">
          {pkg.stepUp}
        </p>
      )}

      {/* 6. full deliverables, expandable */}
      <details className="group/details mt-5 flex-1">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-fg-strong [&::-webkit-details-marker]:hidden">
          <span className="transition-transform group-open/details:rotate-90">
            &rsaquo;
          </span>
          Full deliverables
        </summary>
        <ul className="mt-2 space-y-2 border-t border-white/5 pt-4">
          {pkg.valueItems.map((item) => (
            <li
              key={item.label}
              className="flex items-start gap-3 text-[13px] text-fg-secondary"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
              <span className="min-w-0">{item.label}</span>
            </li>
          ))}
        </ul>
        {pkg.savings ? (
          <p className="mt-4 text-[11px] text-fg-secondary/70">
            Bought separately: {pkg.totalValue}. {pkg.savings} as a package.
          </p>
        ) : null}
      </details>

      {/* 7. one CTA that keeps this offer selected */}
      {children ? (
        <div className="mt-8">{children}</div>
      ) : isCall ? (
        <a
          href={consultUrl(interest ?? vertical ?? "program")}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaClass}
        >
          {label}
        </a>
      ) : vertical ? (
        <OrderLink
          vertical={vertical}
          params={{ package: pkg.name }}
          className={ctaClass}
        >
          {label}
        </OrderLink>
      ) : ctaHref ? (
        <a
          href={ctaHref}
          target={ctaTarget}
          rel={ctaTarget === "_blank" ? "noopener noreferrer" : undefined}
          className={ctaClass}
        >
          {label}
        </a>
      ) : null}
      {isCall && (
        <p className="mt-3 text-[11px] text-fg-secondary">
          Programs are set up on a free 30-minute call, not booked online.
        </p>
      )}
      {vertical && (
        <Link
          href={`/gallery/${vertical}`}
          className="mt-4 inline-flex min-h-[44px] items-center text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-white"
        >
          See {SAMPLE_NAMES[vertical]} samples
        </Link>
      )}
    </div>
  );
}
