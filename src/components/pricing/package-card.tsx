import type { ReactNode } from "react";
import type { Package } from "@/lib/pricing";
import type { Vertical } from "@/lib/order-forms";
import { OrderLink } from "@/components/order-link";

type PackageCardProps = {
  pkg: Package;
  vertical?: Vertical;
  ctaHref?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  children?: ReactNode;
};

export function PackageCard({
  pkg,
  vertical,
  ctaHref,
  ctaLabel = "Book Now",
  ctaTarget,
  children,
}: PackageCardProps) {
  return (
    <div
      className={`pricing-card group relative flex flex-col rounded border bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:bg-[rgba(17,17,17,0.8)] md:p-10 ${
        pkg.recommended
          ? "border-crimson/30 hover:border-crimson/50"
          : "border-white/5 hover:border-crimson/20"
      }`}
    >
      {pkg.recommended && (
        <div className="absolute -top-3 left-8 rounded-full bg-crimson px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
          Recommended
        </div>
      )}

      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-fg-secondary">
        {pkg.tag}
      </span>

      <h3 className="mt-4 font-display text-2xl font-medium text-fg">
        {pkg.name}
      </h3>

      <span className="pricing-price mt-2 block font-display text-4xl font-light text-crimson">
        {pkg.price}
      </span>

      <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[11px]">
        <span className="text-fg-secondary line-through">
          {pkg.totalValue} value
        </span>
        <span className="font-medium uppercase tracking-[0.15em] text-amber-200/80">
          {pkg.savings}
        </span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {pkg.valueItems.map((item) => (
          <li key={item.label} className="flex items-start gap-3 text-sm">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                item.isBonus ? "bg-amber-400/70" : "bg-crimson/50"
              }`}
            />
            <span className="flex-1">
              <span
                className={item.isBonus ? "text-fg-strong" : "text-fg-secondary"}
              >
                {item.label}
              </span>
              {item.value !== "Included" && item.value !== "Custom" && (
                <span className="ml-2 text-[11px] text-fg-secondary">
                  ({item.value} value)
                </span>
              )}
              {item.isBonus && (
                <span className="ml-2 rounded bg-amber-400/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-amber-300/80">
                  Bonus
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {children ? (
        <div className="mt-8">{children}</div>
      ) : vertical ? (
        <OrderLink
          vertical={vertical}
          className="mt-8 inline-block rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
        >
          {ctaLabel}
        </OrderLink>
      ) : ctaHref ? (
        <a
          href={ctaHref}
          target={ctaTarget}
          rel={ctaTarget === "_blank" ? "noopener noreferrer" : undefined}
          className="mt-8 inline-block rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
        >
          {ctaLabel}
        </a>
      ) : null}
    </div>
  );
}
