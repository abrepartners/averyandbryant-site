import type { EnhancementPack } from "@/lib/pricing";

export function EnhancementPacks({ packs }: { packs: EnhancementPack[] }) {
  return (
    <section className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
          Enhancement Packs
        </p>
        <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
          Add what your package is missing.{" "}
          <span className="text-fg-secondary">Nothing it already has.</span>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {packs.map((pack) => (
            <div
              key={pack.name}
              className="pricing-card group min-w-0 rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-6 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-medium text-fg">
                    {pack.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-fg-secondary">
                    Pairs with {pack.pairsWith}
                  </p>
                </div>
                <div className="text-right">
                  <span className="pricing-price font-display text-2xl font-light text-crimson">
                    {pack.price}
                  </span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.15em] text-fg-secondary">
                    one-time
                  </span>
                </div>
              </div>

              <ul className="mt-5 space-y-2">
                {pack.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-fg-secondary"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/50" />
                    {item}
                  </li>
                ))}
              </ul>

              {pack.note && (
                <p className="mt-4 rounded border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-[12px] leading-relaxed text-amber-100/80">
                  {pack.note}
                </p>
              )}

              {pack.savedAmount && (
                <p className="mt-4 text-[11px] text-fg-secondary/70">
                  Saves {pack.savedAmount} against buying the items separately.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
