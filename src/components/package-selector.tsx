"use client";

import { useState } from "react";
import Link from "next/link";
import {
  realEstatePricing,
  buildersPricing,
  airbnbPricing,
  lotLandPricing,
  multiFamilyPricing,
  type VerticalPricing,
  type Package,
} from "@/lib/pricing";
import { orderFormUrl, type Vertical } from "@/lib/order-forms";
import { QuoteLeadForm } from "@/components/quote-lead-form";

/**
 * Guided "recommend my package" selector — buyer-enablement tool.
 * 3 questions (what / goal / scope) → recommends the right package and routes
 * the agent straight to the correct Aryeo order form (or a consult for the
 * verticals that don't self-serve). Removes the cross-vertical guesswork.
 */

type Route =
  | { kind: "order"; vertical: Vertical }
  | { kind: "consult"; href: string; verticalPage: string };

type TypeOption = {
  id: string;
  label: string;
  blurb: string;
  pricing?: VerticalPricing; // present when the vertical self-serves via Aryeo
  route: Route;
  verticalPage: string;
};

const TYPES: TypeOption[] = [
  {
    id: "real-estate",
    label: "A home for sale",
    blurb: "Residential resale listing",
    pricing: realEstatePricing,
    route: { kind: "order", vertical: "real-estate" },
    verticalPage: "/real-estate",
  },
  {
    id: "airbnb",
    label: "A short-term rental",
    blurb: "Airbnb / VRBO / direct booking",
    pricing: airbnbPricing,
    route: { kind: "order", vertical: "airbnb-rentals" },
    verticalPage: "/airbnb-rentals",
  },
  {
    id: "multi-family",
    label: "An apartment / multi-unit",
    blurb: "Communities & student housing",
    pricing: multiFamilyPricing,
    route: { kind: "order", vertical: "multi-family" },
    verticalPage: "/multi-family",
  },
  {
    id: "lot-land",
    label: "Land or a lot",
    blurb: "Aerials, boundaries, parcels",
    pricing: lotLandPricing,
    route: { kind: "order", vertical: "lot-land" },
    verticalPage: "/lot-land",
  },
  {
    id: "builders",
    label: "New construction",
    blurb: "Builders, GCs, model homes",
    pricing: buildersPricing,
    route: { kind: "order", vertical: "builders" },
    verticalPage: "/builders",
  },
  {
    id: "commercial",
    label: "A commercial property",
    blurb: "Office, retail, industrial",
    route: { kind: "consult", href: "/book", verticalPage: "/commercial" },
    verticalPage: "/commercial",
  },
  {
    id: "branding",
    label: "My personal brand",
    blurb: "Headshots & agent content",
    route: { kind: "consult", href: "/book", verticalPage: "/branding" },
    verticalPage: "/branding",
  },
];

type Goal = "fast" | "exposure" | "premium" | "budget";
const GOALS: { id: Goal; label: string; blurb: string }[] = [
  { id: "fast", label: "Sell / book it fast", blurb: "Speed and momentum" },
  { id: "exposure", label: "Maximum exposure", blurb: "Every channel covered" },
  {
    id: "premium",
    label: "Premium, high-end feel",
    blurb: "Luxury positioning",
  },
  {
    id: "budget",
    label: "Keep it budget-friendly",
    blurb: "Essentials done right",
  },
];

type Scope = "single" | "multiple" | "ongoing";
const SCOPES: { id: Scope; label: string; blurb: string }[] = [
  { id: "single", label: "Just this one", blurb: "A single property / shoot" },
  {
    id: "multiple",
    label: "A few coming up",
    blurb: "Several in the pipeline",
  },
  { id: "ongoing", label: "Ongoing volume", blurb: "Regular, repeat work" },
];

// Pick the package: budget → entry tier; premium/exposure → top tier; else the
// recommended mid-tier. Ongoing/multiple nudges up one toward exposure.
function pickPackage(
  pricing: VerticalPricing,
  goal: Goal,
  scope: Scope,
): Package {
  const pkgs = pricing.packages;
  const recommended =
    pkgs.find((p) => p.recommended) ?? pkgs[Math.min(1, pkgs.length - 1)];
  const top = pkgs[pkgs.length - 1];
  const entry = pkgs[0];
  let choice = recommended;
  if (goal === "budget") choice = entry;
  else if (goal === "premium" || goal === "exposure") choice = top;
  if ((scope === "ongoing" || scope === "multiple") && choice === entry)
    choice = recommended;
  return choice;
}

const cardBase =
  "group flex flex-col items-start rounded-lg border border-white/10 bg-[rgba(17,17,17,0.5)] p-5 text-left transition-all duration-300 hover:border-crimson/40 hover:bg-[rgba(17,17,17,0.8)]";

export function PackageSelector({
  leadCapture = false,
}: {
  /** Show an inline "send me this quote" form on the result step (popup use). */
  leadCapture?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<TypeOption | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [scope, setScope] = useState<Scope | null>(null);

  const total = 3;
  const reset = () => {
    setStep(0);
    setType(null);
    setGoal(null);
    setScope(null);
  };

  return (
    <div className="mx-auto max-w-[900px]">
      {/* progress */}
      {step < total && (
        <div className="mb-10 flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-crimson" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      )}

      {/* Q1 — what are you marketing */}
      {step === 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Step 1 of 3
          </p>
          <h2 className="mt-3 font-display text-[clamp(24px,4vw,40px)] font-light tracking-tight text-white-90">
            What are you marketing?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={cardBase}
                onClick={() => {
                  setType(t);
                  setStep(t.pricing ? 1 : total); // consult verticals skip to result
                  if (!t.pricing) {
                    setGoal(null);
                    setScope(null);
                  }
                }}
              >
                <span className="text-base font-medium text-white-90 group-hover:text-white">
                  {t.label}
                </span>
                <span className="mt-1 text-sm text-white/45">{t.blurb}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Q2 — goal */}
      {step === 1 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Step 2 of 3
          </p>
          <h2 className="mt-3 font-display text-[clamp(24px,4vw,40px)] font-light tracking-tight text-white-90">
            What matters most?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {GOALS.map((g) => (
              <button
                key={g.id}
                type="button"
                className={cardBase}
                onClick={() => {
                  setGoal(g.id);
                  setStep(2);
                }}
              >
                <span className="text-base font-medium text-white-90 group-hover:text-white">
                  {g.label}
                </span>
                <span className="mt-1 text-sm text-white/45">{g.blurb}</span>
              </button>
            ))}
          </div>
          <BackButton onClick={() => setStep(0)} />
        </div>
      )}

      {/* Q3 — scope */}
      {step === 2 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Step 3 of 3
          </p>
          <h2 className="mt-3 font-display text-[clamp(24px,4vw,40px)] font-light tracking-tight text-white-90">
            How much is on your plate?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {SCOPES.map((s) => (
              <button
                key={s.id}
                type="button"
                className={cardBase}
                onClick={() => {
                  setScope(s.id);
                  setStep(total);
                }}
              >
                <span className="text-base font-medium text-white-90 group-hover:text-white">
                  {s.label}
                </span>
                <span className="mt-1 text-sm text-white/45">{s.blurb}</span>
              </button>
            ))}
          </div>
          <BackButton onClick={() => setStep(1)} />
        </div>
      )}

      {/* Result */}
      {step === total && type && (
        <Result
          type={type}
          goal={goal}
          scope={scope}
          onReset={reset}
          leadCapture={leadCapture}
        />
      )}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-8 text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/70"
    >
      &larr; Back
    </button>
  );
}

function Result({
  type,
  goal,
  scope,
  onReset,
  leadCapture,
}: {
  type: TypeOption;
  goal: Goal | null;
  scope: Scope | null;
  onReset: () => void;
  leadCapture?: boolean;
}) {
  // Consult verticals (commercial / branding) — no self-serve form
  if (!type.pricing || type.route.kind === "consult") {
    const href = type.route.kind === "consult" ? type.route.href : "/book";
    return (
      <div className="rounded-lg border border-crimson/30 bg-[rgba(17,17,17,0.6)] p-8 md:p-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
          Your recommendation
        </p>
        <h2 className="mt-3 font-display text-[clamp(24px,4vw,36px)] font-light tracking-tight text-white-90">
          Let&apos;s scope it on a quick call.
        </h2>
        <p className="mt-4 max-w-xl text-base text-white/55">
          {type.label} projects are custom — we&apos;ll build the right package
          live in a free 30-minute consult, no pressure.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded bg-crimson px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark"
          >
            Book a Free Consult
          </Link>
          <Link
            href={type.verticalPage}
            className="inline-flex items-center justify-center rounded border border-white/15 px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            See what we do
          </Link>
        </div>
        {leadCapture && (
          <QuoteLeadForm
            quote={{
              vertical: type.label,
              package: "Custom — consult requested",
              goal: goal ?? undefined,
              scope: scope ?? undefined,
            }}
          />
        )}
        <ResetLink onReset={onReset} />
      </div>
    );
  }

  const pkg = pickPackage(type.pricing, goal ?? "fast", scope ?? "single");
  const orderHref = orderFormUrl(type.route.vertical);

  return (
    <div className="rounded-lg border border-crimson/30 bg-[rgba(17,17,17,0.6)] p-8 md:p-10">
      <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
        Recommended for you
      </p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-[clamp(26px,4vw,40px)] font-light tracking-tight text-white-90">
          {pkg.name}
        </h2>
        <span className="font-display text-2xl font-light text-crimson">
          {pkg.price}
        </span>
      </div>
      {pkg.tag && (
        <span className="mt-3 inline-block rounded-full border border-crimson/30 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-crimson/80">
          {pkg.tag}
        </span>
      )}

      <ul className="mt-6 space-y-2">
        {pkg.valueItems.slice(0, 4).map((v, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-white/60">
            <span className="mt-1 text-crimson">&#10003;</span>
            <span>{v.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href={orderHref}
          className="inline-flex items-center justify-center rounded bg-crimson px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark"
        >
          Start your order &rarr;
        </a>
        <Link
          href={type.verticalPage}
          className="inline-flex items-center justify-center rounded border border-white/15 px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          Compare all packages
        </Link>
      </div>
      <p className="mt-6 text-xs text-white/30">
        Not sure? Every package is backed by our {type.pricing.guarantee.name}.
        Prefer to talk it through?{" "}
        <Link href="/book" className="text-white/50 underline hover:text-white">
          Book a free consult.
        </Link>
      </p>
      {leadCapture && (
        <QuoteLeadForm
          quote={{
            vertical: type.label,
            package: pkg.name,
            price: pkg.price,
            goal: goal ?? undefined,
            scope: scope ?? undefined,
          }}
        />
      )}
      <ResetLink onReset={onReset} />
    </div>
  );
}

function ResetLink({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="mt-8 block text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/70"
    >
      Start over
    </button>
  );
}
