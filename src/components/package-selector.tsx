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
import {
  CALENDARS,
  STUDIO_BOOKING_URL,
  calendarUrlFor,
  consultUrl,
} from "@/lib/consult";
import { QuoteLeadForm } from "@/components/quote-lead-form";

/**
 * Guided "find the right service" chooser: a buyer-enablement tool.
 *
 * Step 0 asks what the visitor is working on, four jobs wide:
 *   Market a property      reveals the six property types, then the 3-question
 *                          quiz (what / goal / scope) recommends a package and
 *                          routes to the right order form or consult calendar.
 *   Build my brand         goes straight to the branding result: the Agent
 *                          Branding Discovery calendar.
 *   Record or create       links out to The Spot (gettothespot.com).
 *   Edit or stage myself   links to Vellum with the AI Demo Call calendar.
 *
 * Consult routes go to real GHL calendars, never to /book: /book is the shoot
 * order form.
 */

type Route =
  | { kind: "order"; vertical: Vertical }
  | {
      kind: "consult";
      href: string;
      verticalPage: string;
      /** What the button opens, said plainly. */
      ctaLabel: string;
      note?: string;
    };

type TypeOption = {
  id: string;
  /** The answer text on the property-type card. Never glue this into a sentence. */
  label: string;
  /**
   * Plural subject used when result copy talks about this vertical. Written
   * out per vertical on purpose: the consult result used to be assembled as
   * `{type.label} projects`, which welded the answer onto a hard-coded word
   * and shipped "A commercial property projects". Copy is never built by
   * concatenating an answer label.
   */
  subject: string;
  blurb: string;
  pricing?: VerticalPricing; // present when the vertical self-serves via Aryeo
  route: Route;
  verticalPage: string;
};

const PROPERTY_TYPES: TypeOption[] = [
  {
    id: "real-estate",
    label: "A home for sale",
    subject: "Residential listings",
    blurb: "Residential resale listing",
    pricing: realEstatePricing,
    route: { kind: "order", vertical: "real-estate" },
    verticalPage: "/real-estate",
  },
  {
    id: "airbnb",
    label: "An Airbnb / rental",
    subject: "Airbnb / rentals",
    blurb: "Airbnb / VRBO / direct booking",
    pricing: airbnbPricing,
    route: { kind: "order", vertical: "airbnb-rentals" },
    verticalPage: "/airbnb-rentals",
  },
  {
    id: "multi-family",
    label: "An apartment / multi-unit",
    subject: "Multi-family communities",
    blurb: "Communities & student housing",
    pricing: multiFamilyPricing,
    route: { kind: "order", vertical: "multi-family" },
    verticalPage: "/multi-family",
  },
  {
    id: "lot-land",
    label: "Land or a lot",
    subject: "Land and lot shoots",
    blurb: "Aerials, boundaries, parcels",
    pricing: lotLandPricing,
    route: { kind: "order", vertical: "lot-land" },
    verticalPage: "/lot-land",
  },
  {
    id: "builders",
    label: "New construction",
    subject: "New construction shoots",
    blurb: "Builders, GCs, model homes",
    pricing: buildersPricing,
    route: { kind: "order", vertical: "builders" },
    verticalPage: "/builders",
  },
  {
    id: "commercial",
    label: "A commercial property",
    subject: "Commercial shoots",
    blurb: "Office, retail, industrial",
    route: {
      kind: "consult",
      href: consultUrl("commercial"),
      verticalPage: "/commercial",
      ctaLabel: CALENDARS.consult.label,
      note: "One-off commercial photography starts at $295 and is sized to your square footage on the call. Monthly programs are scoped the same way.",
    },
    verticalPage: "/commercial",
  },
];

const BRANDING: TypeOption = {
  id: "branding",
  label: "My personal or team brand",
  subject: "Personal brand shoots",
  blurb: "Headshots & agent content",
  route: {
    kind: "consult",
    href: calendarUrlFor("branding"),
    verticalPage: "/branding",
    ctaLabel: CALENDARS.branding.label,
    note: "Two sessions carry a fixed price: Headshot Session $95 (on a scheduled studio day) and Brand Session $299. The discovery call books your date. Content days, team days and ongoing content are scoped on the same call.",
  },
  verticalPage: "/branding",
};

type Job = {
  id: "property" | "brand" | "content" | "edit";
  title: string;
  blurb: string;
  cta: string;
};

const JOBS: Job[] = [
  {
    id: "property",
    title: "Market a property",
    blurb:
      "Photos, drone, video, tours and plans for a listing, rental, community or site.",
    cta: "Choose a property type",
  },
  {
    id: "brand",
    title: "Build my personal or team brand",
    blurb: "Headshots, brand sessions, content days and team days.",
    cta: CALENDARS.branding.label,
  },
  {
    id: "content",
    title: "Record or create content",
    blurb: "Rent The Spot podcast studio, or have an episode produced for you.",
    cta: "Book a room at The Spot",
  },
  {
    id: "edit",
    title: "Edit or stage my photos myself",
    blurb: "Vellum edits and stages your own listing photos.",
    cta: "See Vellum",
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

// Pick the package: budget -> entry tier; premium/exposure -> top tier; else
// the recommended mid-tier. Ongoing/multiple nudges up one toward exposure.
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
  "group flex min-h-[44px] flex-col items-start rounded-lg border border-white/10 bg-[rgba(17,17,17,0.5)] p-5 text-left transition-all duration-300 hover:border-crimson/40 hover:bg-[rgba(17,17,17,0.8)]";
const cardActive =
  "group flex min-h-[44px] flex-col items-start rounded-lg border border-crimson/50 bg-[rgba(17,17,17,0.9)] p-5 text-left transition-all duration-300";

export function PackageSelector({
  leadCapture = false,
}: {
  /** Show an inline "send me this quote" form on the result step (popup use). */
  leadCapture?: boolean;
}) {
  const [job, setJob] = useState<Job["id"] | null>(null);
  const [step, setStep] = useState(0);
  const [type, setType] = useState<TypeOption | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [scope, setScope] = useState<Scope | null>(null);

  const total = 3;
  const reset = () => {
    setJob(null);
    setStep(0);
    setType(null);
    setGoal(null);
    setScope(null);
  };

  const chooseType = (t: TypeOption) => {
    setType(t);
    setStep(t.pricing ? 1 : total); // consult verticals skip to result
    if (!t.pricing) {
      setGoal(null);
      setScope(null);
    }
  };

  const showQuiz = job === "property" && type != null && type.pricing;

  return (
    <div className="mx-auto max-w-[900px]">
      {/* progress, only once a property type with packages is chosen */}
      {showQuiz && step < total && (
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

      {/* Step 0: what are you working on */}
      {step === 0 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Start here
          </p>
          <h2 className="mt-3 font-display text-[clamp(24px,4vw,40px)] font-light tracking-tight text-fg">
            What are you working on?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {JOBS.map((j) => {
              const body = (
                <>
                  <span className="text-base font-medium text-fg group-hover:text-white">
                    {j.title}
                  </span>
                  <span className="mt-1 text-sm text-fg-secondary">
                    {j.blurb}
                  </span>
                  <span className="mt-4 text-[11px] uppercase tracking-[0.2em] text-crimson/80">
                    {j.cta}
                  </span>
                </>
              );
              if (j.id === "property") {
                const active = job === "property";
                return (
                  <button
                    key={j.id}
                    type="button"
                    aria-expanded={active}
                    aria-controls="chooser-property-types"
                    className={active ? cardActive : cardBase}
                    onClick={() => setJob(active ? null : "property")}
                  >
                    {body}
                  </button>
                );
              }
              if (j.id === "brand") {
                return (
                  <button
                    key={j.id}
                    type="button"
                    className={cardBase}
                    onClick={() => {
                      setJob("brand");
                      chooseType(BRANDING);
                    }}
                  >
                    {body}
                  </button>
                );
              }
              if (j.id === "content") {
                return (
                  <a
                    key={j.id}
                    href={STUDIO_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardBase}
                  >
                    {body}
                  </a>
                );
              }
              return (
                <Link key={j.id} href="/vellum" className={cardBase}>
                  {body}
                </Link>
              );
            })}
          </div>

          {/* The Vellum job also carries the demo calendar, said plainly. */}
          <p className="mt-4 text-xs text-fg-secondary">
            Editing your own photos?{" "}
            <a
              href={calendarUrlFor("demo", "vellum")}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              {CALENDARS.demo.label} of Vellum.
            </a>
          </p>

          {/* Property types reveal only after "Market a property" */}
          {job === "property" && (
            <div
              id="chooser-property-types"
              className="mt-6 rounded-lg border border-crimson/20 bg-[rgba(17,17,17,0.6)] p-6 md:p-8"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
                Step 1 of 3
              </p>
              <h3 className="mt-3 font-display text-[clamp(20px,3vw,28px)] font-light tracking-tight text-fg">
                What are you marketing?
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PROPERTY_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={cardBase}
                    onClick={() => chooseType(t)}
                  >
                    <span className="text-sm font-medium text-fg group-hover:text-white">
                      {t.label}
                    </span>
                    <span className="mt-1 text-xs text-fg-secondary">
                      {t.blurb}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Q2: goal */}
      {step === 1 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Step 2 of 3
          </p>
          <h2 className="mt-3 font-display text-[clamp(24px,4vw,40px)] font-light tracking-tight text-fg">
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
                <span className="text-base font-medium text-fg group-hover:text-white">
                  {g.label}
                </span>
                <span className="mt-1 text-sm text-fg-secondary">{g.blurb}</span>
              </button>
            ))}
          </div>
          <BackButton onClick={() => setStep(0)} />
        </div>
      )}

      {/* Q3: scope */}
      {step === 2 && (
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Step 3 of 3
          </p>
          <h2 className="mt-3 font-display text-[clamp(24px,4vw,40px)] font-light tracking-tight text-fg">
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
                <span className="text-base font-medium text-fg group-hover:text-white">
                  {s.label}
                </span>
                <span className="mt-1 text-sm text-fg-secondary">{s.blurb}</span>
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
      className="mt-8 min-h-[44px] text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-fg-strong"
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
  // Consult verticals (commercial / branding): no self-serve form
  if (!type.pricing || type.route.kind === "consult") {
    const href =
      type.route.kind === "consult" ? type.route.href : consultUrl(type.id);
    const note = type.route.kind === "consult" ? type.route.note : undefined;
    const ctaLabel =
      type.route.kind === "consult"
        ? type.route.ctaLabel
        : CALENDARS.consult.label;
    return (
      <div className="rounded-lg border border-crimson/30 bg-[rgba(17,17,17,0.6)] p-8 md:p-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
          Your recommendation
        </p>
        <h2 className="mt-3 font-display text-[clamp(24px,4vw,36px)] font-light tracking-tight text-fg">
          Let&apos;s scope it on a quick call.
        </h2>
        {/*
          One template literal on purpose. This toolchain (Next 16 / SWC) drops
          the leading space of a JSX text child that follows an expression when
          that text contains an HTML entity, which is how "Commercial
          shootsare custom" shipped. Holding the whole sentence inside a single
          expression makes the spacing impossible to collapse.
        */}
        <p className="mt-4 max-w-xl text-base text-fg-strong">
          {`${type.subject} are scoped on a free 30-minute call, so we'll build the right package with you live. No pressure.`}
        </p>
        {note && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-secondary">
            {note}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded bg-crimson px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark"
          >
            {ctaLabel}
          </a>
          <Link
            href={type.verticalPage}
            className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/15 px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-colors hover:border-white/30 hover:text-white"
          >
            See what we do
          </Link>
        </div>
        {leadCapture && (
          <QuoteLeadForm
            quote={{
              vertical: type.label,
              package: "Custom, consult requested",
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
        <h2 className="font-display text-[clamp(26px,4vw,40px)] font-light tracking-tight text-fg">
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
          <li key={i} className="flex items-start gap-3 text-sm text-fg-strong">
            <span className="mt-1 text-crimson">&#10003;</span>
            <span>{v.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href={orderHref}
          className="inline-flex min-h-[44px] items-center justify-center rounded bg-crimson px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark"
        >
          Start your order &rarr;
        </a>
        <Link
          href={type.verticalPage}
          className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/15 px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-colors hover:border-white/30 hover:text-white"
        >
          Compare all packages
        </Link>
      </div>
      <p className="mt-6 text-xs text-fg-secondary">
        Not sure? Every package is backed by our {type.pricing.guarantee.name}.
        Prefer to talk it through?{" "}
        <a
          href={consultUrl(type.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg-secondary underline hover:text-white"
        >
          Book a free 30-minute call.
        </a>
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
      className="mt-8 block min-h-[44px] text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-fg-strong"
    >
      Start over
    </button>
  );
}
