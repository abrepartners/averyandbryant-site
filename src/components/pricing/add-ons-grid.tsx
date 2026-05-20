import type { AddOn } from "@/lib/pricing";
import type { Vertical } from "@/lib/order-forms";
import { OrderLink } from "@/components/order-link";

export function AddOnsGrid({
  addOns,
  vertical,
}: {
  addOns: AddOn[];
  vertical: Vertical;
}) {
  return (
    <section className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
          À La Carte
        </p>
        <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
          Build your own.{" "}
          <span className="text-white-40">Pick what you need.</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {addOns.map((item) => (
            <div
              key={item.title}
              className="pricing-card flex items-center justify-between rounded border border-white/5 bg-[rgba(17,17,17,0.5)] px-6 py-4 transition-all duration-500 hover:border-crimson/20"
            >
              <span className="text-sm font-medium text-white/60">
                {item.title}
              </span>
              <span className="text-sm font-semibold text-crimson">
                {item.price}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <OrderLink
            vertical={vertical}
            className="inline-block text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
          >
            Book À La Carte &rarr;
          </OrderLink>
        </div>
      </div>
    </section>
  );
}
