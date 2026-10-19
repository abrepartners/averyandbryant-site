"use client";

import { useActionState, useState } from "react";
import { startHomeBooking, type HomeBookingState } from "@/app/book/home/actions";
import { dollars, tierFor, type SizeTier } from "@/lib/size-tiers";

export type BookingPackage = {
  name: string;
  bestFor: string;
  inclusions: string[];
  recommended: boolean;
  tiers: SizeTier[];
};

const MIN_SQFT = 500;
const SLIDER_MAX = 10000;
const START_SQFT = 2000;

const initialState: HomeBookingState = {};

const inputClass =
  "w-full rounded border border-white/10 bg-[rgba(17,17,17,0.6)] px-4 py-3 text-sm text-fg placeholder:text-fg-secondary transition-colors focus:border-crimson/50 focus:outline-none focus:ring-0";
const labelClass =
  "block text-[10px] font-medium uppercase tracking-[0.2em] text-fg-secondary";

function StepLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-display text-sm tabular-nums text-fg-secondary">{n}</span>
      <h2 className="font-display text-[clamp(22px,3vw,32px)] font-extralight tracking-tight text-fg">
        {children}
      </h2>
    </div>
  );
}

function rangeLabel(t: SizeTier): string {
  return t.min === 0
    ? `homes up to ${t.max.toLocaleString("en-US")} sq ft`
    : `${t.min.toLocaleString("en-US")} to ${t.max.toLocaleString("en-US")} sq ft`;
}

export function HomeBooking({
  packages,
  zillowTiers,
}: {
  packages: BookingPackage[];
  zillowTiers: SizeTier[];
}) {
  const [state, formAction, pending] = useActionState(startHomeBooking, initialState);
  const [typed, setTyped] = useState(String(START_SQFT));
  const [chosen, setChosen] = useState(
    packages.find((p) => p.recommended)?.name ?? packages[0]?.name ?? "",
  );

  const sqft = Number(typed.replace(/[^\d]/g, "")) || 0;
  const tooSmall = sqft > 0 && sqft < MIN_SQFT;
  const largest = Math.max(...packages.map((p) => p.tiers.at(-1)?.max ?? 0));
  const tooBig = sqft > largest;
  const sized = sqft >= MIN_SQFT && !tooBig;

  const chosenPkg = packages.find((p) => p.name === chosen);
  const chosenTier = chosenPkg ? tierFor(chosenPkg.tiers, sqft) : null;
  const zillowTier = tierFor(zillowTiers, sqft);

  return (
    <form action={formAction} className="space-y-20">
      <input type="hidden" name="sqft" value={sqft} />

      {/* 01 Size */}
      <div>
        <StepLabel n="01">How big is the home?</StepLabel>
        <div className="mt-8 rounded-lg border border-white/5 bg-card p-6 md:p-10">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
            <label htmlFor="sqft-input" className="sr-only">
              Home size in square feet
            </label>
            <div className="flex items-baseline gap-3">
              <input
                id="sqft-input"
                inputMode="numeric"
                value={sqft > 0 ? sqft.toLocaleString("en-US") : typed}
                onChange={(e) => setTyped(e.target.value.replace(/[^\d]/g, "").slice(0, 6))}
                style={{ width: `${Math.max(String(sqft || "").length, 3) + 1}ch` }}
                className="bg-transparent font-display text-[clamp(44px,7vw,72px)] font-extralight tabular-nums leading-none text-fg focus:outline-none"
                aria-describedby="sqft-help"
              />
              <span className="text-sm uppercase tracking-[0.2em] text-fg-secondary">sq ft</span>
            </div>
          </div>
          <input
            type="range"
            min={MIN_SQFT}
            max={SLIDER_MAX}
            step={50}
            value={Math.min(Math.max(sqft, MIN_SQFT), SLIDER_MAX)}
            onChange={(e) => setTyped(e.target.value)}
            aria-label="Home size slider"
            className="mt-8 w-full accent-crimson"
          />
          <p id="sqft-help" className="mt-4 text-sm text-fg-secondary">
            Heated square feet, as listed on the MLS or the county record. A
            close guess is fine.
          </p>
          {tooSmall ? (
            <p className="mt-3 text-sm text-fg-strong">Enter at least {MIN_SQFT} sq ft.</p>
          ) : null}
          {tooBig ? (
            <p className="mt-3 text-sm text-fg-strong">
              Homes over {largest.toLocaleString("en-US")} sq ft get a custom
              quote. Call{" "}
              <a href="tel:+15015022925" className="underline hover:text-crimson">
                (501) 502-2925
              </a>{" "}
              and we&apos;ll price it with you.
            </p>
          ) : null}
        </div>
      </div>

      {/* 02 Package */}
      <fieldset>
        <legend className="contents">
          <StepLabel n="02">Pick your package</StepLabel>
        </legend>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {packages.map((p) => {
            const tier = tierFor(p.tiers, sqft);
            const selected = p.name === chosen;
            return (
              <label
                key={p.name}
                className={`relative flex cursor-pointer flex-col rounded-lg border bg-card p-6 transition-colors md:p-8 ${
                  selected ? "border-crimson/60" : "border-white/5 hover:border-white/20"
                }`}
              >
                <input
                  type="radio"
                  name="package"
                  value={p.name}
                  checked={selected}
                  onChange={() => setChosen(p.name)}
                  className="sr-only"
                />
                {p.recommended ? (
                  <span className="mb-4 inline-flex items-center gap-3">
                    <span aria-hidden="true" className="h-px w-6 bg-crimson" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
                      Recommended
                    </span>
                  </span>
                ) : null}
                <h3 className="font-display text-xl font-light text-fg">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">{p.bestFor}</p>
                <div className="mt-6 border-t border-white/5 pt-6">
                  {sized && tier ? (
                    <>
                      <p className="font-display text-4xl font-extralight tabular-nums text-fg">
                        {dollars(tier.price)}
                      </p>
                      <p className="mt-1 text-xs text-fg-secondary">for {rangeLabel(tier)}</p>
                    </>
                  ) : (
                    <p className="text-sm text-fg-secondary">
                      {tooBig ? "Custom quote" : "Enter the home size"}
                    </p>
                  )}
                </div>
                <ul className="mt-6 space-y-2">
                  {p.inclusions.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-fg-secondary">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-white/30" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <span
                  className={`mt-8 inline-flex items-center justify-center rounded border px-6 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    selected
                      ? "border-crimson bg-crimson text-white"
                      : "border-white/15 text-fg-strong"
                  }`}
                >
                  {selected ? "Selected" : "Choose"}
                </span>
              </label>
            );
          })}
        </div>
        {sized && zillowTier ? (
          <p className="mt-6 text-sm text-fg-secondary">
            Just need the Zillow 3D tour and interactive floor plan?{" "}
            <span className="text-fg-strong">{dollars(zillowTier.price)}</span> for
            this size. Add it on the next step.
          </p>
        ) : null}
      </fieldset>

      {/* 03 Contact */}
      <fieldset disabled={pending || !sized}>
        <legend className="contents">
          <StepLabel n="03">Who&apos;s booking</StepLabel>
        </legend>
        <div className="mt-8 grid gap-10 rounded-lg border border-white/5 bg-card p-6 md:grid-cols-[1fr_320px] md:p-10">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="first_name" className={labelClass}>
                  First name
                </label>
                <input id="first_name" name="first_name" autoComplete="given-name" className={inputClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="last_name" className={labelClass}>
                  Last name
                </label>
                <input id="last_name" name="last_name" autoComplete="family-name" className={inputClass} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="email" className={labelClass}>
                  Email <span className="text-crimson">*</span>
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className={labelClass}>
                  Phone <span className="text-crimson">*</span>
                </label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 border-t border-white/5 pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <div>
              <p className={labelClass}>Your pick</p>
              <p className="mt-3 font-display text-lg font-light text-fg">{chosenPkg?.name}</p>
              {sized && chosenTier ? (
                <p className="mt-1 text-sm text-fg-secondary">
                  <span className="tabular-nums text-fg-strong">{dollars(chosenTier.price)}</span> for{" "}
                  {sqft.toLocaleString("en-US")} sq ft
                </p>
              ) : null}
            </div>
            <div>
              {state.error ? (
                <p
                  role="alert"
                  className="mb-4 rounded border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson"
                >
                  {state.error}
                </p>
              ) : null}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded bg-crimson px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Starting your order" : "Continue to scheduling"}
              </button>
              <p className="mt-4 text-xs leading-relaxed text-fg-secondary">
                Next you&apos;ll enter the address and home size, pick this
                package and choose your date. The prices there match these.
              </p>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
