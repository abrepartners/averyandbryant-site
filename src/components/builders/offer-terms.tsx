import type { Guarantee } from "@/lib/pricing";
import { requestUrl } from "@/lib/consult";

/**
 * The offer around the packages: guarantee, speed, effort, capacity, and the
 * free first step. Anything not already live in the business carries a
 * "Proposal" flag so it reads as a suggestion until Thomas approves it.
 * Set SHOW_PROPOSAL_FLAGS to false once the terms are decided.
 */
const SHOW_PROPOSAL_FLAGS = true;

export function ProposalFlag({ children = "Proposal" }: { children?: string }) {
  if (!SHOW_PROPOSAL_FLAGS) return null;
  return (
    <span className="inline-flex items-center rounded-sm border border-dashed border-white/25 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-secondary">
      {children}
    </span>
  );
}

const PHONE_DISPLAY = "(501) 502-2925";
const PHONE_E164 = "+15015022925";

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

        <div className="mt-12 grid gap-px overflow-hidden rounded border border-white/10 bg-white/10 md:mt-16 md:grid-cols-2">
          {/* guarantee: live */}
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
            <p className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5 text-sm leading-relaxed text-fg-strong">
              <ProposalFlag />
              <span>Late on our end, and that shoot is free.</span>
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
            <p className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5 text-sm leading-relaxed text-fg-strong">
              <ProposalFlag />
              <span>
                Priority Launch Slot: start before framing ends and your
                finished home shoot goes to the front of the calendar.
              </span>
            </p>
          </div>

          {/* capacity */}
          <div className="bg-background p-6 md:p-10">
            <p className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-fg-secondary">
              Capacity
              <ProposalFlag />
            </p>
            <h3 className="mt-4 font-display text-2xl font-light tracking-tight text-fg md:text-[28px]">
              A set number of active build sites.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
              Build Tracker is a visit to every active site, every month. We
              keep the list a size where each site gets its visit on schedule.
            </p>
            <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-relaxed text-fg-strong">
              The real cap and the open spots get published here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Free first step. A proposal: the name and the offer are both new. */
export function SpecReview() {
  const subject = "Sitting Spec Review";
  const sms = `sms:${PHONE_E164}?&body=${encodeURIComponent("Sitting Spec Review. Address: ")}`;

  return (
    <section
      id="review"
      className="scroll-mt-20 border-t border-white/5 bg-[rgba(17,17,17,0.35)] py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-20">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-amber-300" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-amber-200/90">
              Free, no call needed
            </span>
            <ProposalFlag />
          </div>
          <h2 className="mt-5 font-display text-[clamp(32px,6vw,64px)] font-light leading-[1.04] tracking-[-0.025em] text-fg">
            Got a finished home that is sitting?
          </h2>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-fg-strong md:text-lg">
            Send us the address. We will send back a Sitting Spec Review: a
            short screen recording of what the listing&apos;s photos and video
            are doing to it, and the three things we would reshoot first.
          </p>
          <ul className="mt-8 grid gap-3 text-sm text-fg-strong sm:grid-cols-3">
            {[
              ["01", "Text or email one address"],
              ["02", "We review the live listing"],
              ["03", "You get the recording"],
            ].map(([n, t]) => (
              <li key={n} className="border-t border-white/10 pt-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-fg-secondary">
                  {n}
                </span>
                <p className="mt-1">{t}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href={sms}
            className="inline-flex min-h-[52px] items-center justify-center rounded bg-crimson px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
          >
            Text the address
          </a>
          <a
            href={requestUrl(subject)}
            className="inline-flex min-h-[52px] items-center justify-center rounded border border-white/15 px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-white/40"
          >
            Email it instead
          </a>
          <p className="text-xs leading-relaxed text-fg-secondary">
            Texts go to {PHONE_DISPLAY}. Yours to keep whether or not we ever
            shoot the home.
          </p>
        </div>
      </div>
    </section>
  );
}
