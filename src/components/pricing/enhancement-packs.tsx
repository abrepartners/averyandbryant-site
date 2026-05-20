import type { EnhancementPack } from "@/lib/pricing";

export function EnhancementPacks({ packs }: { packs: EnhancementPack[] }) {
  return (
    <section className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
          Enhancement Packs
        </p>
        <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
          Bundle &amp; save.{" "}
          <span className="text-white-40">Add to any package.</span>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {packs.map((pack) => (
            <div
              key={pack.name}
              className="pricing-card group rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-6 transition-all duration-500 hover:border-crimson/20 hover:bg-[rgba(17,17,17,0.8)] md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-medium text-white-90">
                    {pack.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-white/30">
                    Pairs with {pack.pairsWith}
                  </p>
                </div>
                <div className="text-right">
                  <span className="pricing-price font-display text-2xl font-light text-crimson">
                    {pack.price}
                  </span>
                  <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.15em] text-amber-200/80">
                    Save {pack.savedAmount}
                  </span>
                </div>
              </div>

              <ul className="mt-5 space-y-2">
                {pack.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-white/50"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
