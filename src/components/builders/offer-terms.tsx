import type { Guarantee } from "@/lib/pricing";

/**
 * The offer around the packages: guarantee, speed and effort. Every term here
 * is live in the business. The late delivery term ("Late on our end, and that
 * shoot is free") was approved by Thomas on 2026-11-14.
 */
export function OfferTerms({ guarantee }: { guarantee: Guarantee }) {
  return (
    <section className="border-t border-white/5 py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
              The terms
            </span>
          </div>
          <h2 className="mt-5 font-display text-[clamp(32px,6vw,64px)] font-light leading-[1.04] tracking-[-0.025em] text-fg">
            You carry the house. We carry the risk on the media.
          </h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded border border-white/10 bg-white/10 md:mt-16 lg:grid-cols-3">
          {/* guarantee */}
          <div className="bg-background p-6 md:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-300/80">
              Guarantee
            </p>
            <h3 className="mt-4 font-display text-2xl font-light tracking-tight text-fg md:text-[28px]">
              {guarantee.name}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
              {guarantee.text}
            </p>
          </div>

          {/* speed */}
          <div className="bg-background p-6 md:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-fg-secondary">
              Speed
            </p>
            <h3 className="mt-4 font-display text-2xl font-light tracking-tight text-fg md:text-[28px]">
              Delivered within 48 hours.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
              Edited photos and video land within 48 hours of the shoot. Rush
              is available when a launch or a lender meeting is on the
              calendar.
            </p>
            <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-fg-strong">
              Late on our end, and that shoot is free.
            </p>
          </div>

          {/* effort */}
          <div className="bg-background p-6 md:p-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-fg-secondary">
              Your time
            </p>
            <h3 className="mt-4 font-display text-2xl font-light tracking-tight text-fg md:text-[28px]">
              One call. Then we work around the build.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
              Scope, sites and cadence are set on a free 30 minute call. After
              that, one finished home takes about two minutes to book online.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
