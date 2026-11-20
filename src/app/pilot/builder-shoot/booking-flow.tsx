"use client";

import { useMemo, useState, useTransition } from "react";
import {
  BUILD_STAGES,
  depositSplit,
  money,
  selectionToItems,
  itemsTotal,
  validateAnswers,
  type Answers,
  type CatalogItem,
  type PilotCatalog,
  type Slot,
} from "@/lib/pilot-booking/core";
import { loadDates, loadDay, prepareBooking, type DayResult, type PrepareResult } from "./actions";

const STEPS = ["The shoot", "Five questions", "Time", "Review", "Confirm"] as const;

const card = "rounded border border-white/10 bg-[rgba(17,17,17,0.6)] p-6 md:p-8";
const eyebrow = "font-mono text-[11px] tracking-[0.2em] text-fg-secondary";
const heading = "mt-4 font-display text-[26px] font-normal leading-tight tracking-tight text-fg";
const label = "mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-fg-secondary";
const inputBase =
  "w-full rounded border border-white/15 bg-[rgba(17,17,17,0.6)] px-4 py-3 text-sm text-white placeholder:text-fg-secondary focus:border-crimson/60 focus:outline-none";
const optionBase =
  "flex min-h-[48px] w-full items-center gap-3 rounded border px-4 py-3 text-left transition-colors duration-200";
const optionIdle = "border-white/10 bg-white/[0.02] hover:border-white/30";
const optionOn = "border-crimson/70 bg-crimson/10";
const primaryBtn =
  "inline-flex min-h-[48px] w-full items-center justify-center rounded bg-crimson px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-40";
const ghostBtn =
  "inline-flex min-h-[48px] items-center justify-center rounded border border-white/15 px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-white/40";

const EMPTY: Answers = {
  street: "",
  city: "",
  state: "AR",
  zip: "",
  sqft: "",
  siteContactName: "",
  siteContactPhone: "",
  company: "",
  buildStage: "",
  bookerName: "",
  bookerEmail: "",
  bookerPhone: "",
};

const FIELD_LABELS: Record<keyof Answers, string> = {
  street: "Street address",
  city: "City",
  state: "State",
  zip: "ZIP",
  sqft: "Square footage",
  siteContactName: "On-site contact name",
  siteContactPhone: "On-site contact phone",
  company: "Builder or company",
  buildStage: "Build stage",
  bookerName: "Your name",
  bookerEmail: "Your email",
  bookerPhone: "Your phone",
};

function itemLabel(i: CatalogItem) {
  return i.option ? `${i.name}, ${i.option}` : i.name;
}

function dayLabel(ymd: string) {
  const d = new Date(`${ymd}T12:00:00Z`);
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
    day: d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
    long: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" }),
  };
}

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
  });
}

function Progress({ step }: { step: number }) {
  return (
    <ol className="mb-6 flex gap-1.5" aria-label="Booking steps">
      {STEPS.map((s, i) => (
        <li key={s} className="min-w-0 flex-1">
          <span
            aria-hidden="true"
            className={`block h-[3px] rounded-full ${i <= step ? "bg-crimson" : "bg-white/10"}`}
          />
          <span
            className={`mt-2 hidden text-[10px] uppercase tracking-[0.18em] sm:block ${
              i === step ? "text-fg" : "text-fg-secondary"
            }`}
          >
            {s}
          </span>
        </li>
      ))}
      <li className="sr-only">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </li>
    </ol>
  );
}

function TotalRow({ total }: { total: number }) {
  return (
    <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-white/10 pt-4">
      <span className="text-[11px] uppercase tracking-[0.2em] text-fg-secondary">Running total</span>
      <span className="font-mono text-lg tabular-nums text-fg">{money(total)}</span>
    </div>
  );
}

export function BookingFlow({ catalog, live }: { catalog: PilotCatalog | null; live: boolean }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [touched, setTouched] = useState(false);
  const [dates, setDates] = useState<string[] | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [day, setDay] = useState<DayResult | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PrepareResult | null>(null);
  const [pending, startTransition] = useTransition();

  const items = useMemo(() => (catalog ? selectionToItems(catalog, picked) : []), [catalog, picked]);
  const total = itemsTotal(items);
  const split = depositSplit(total);
  const missing = validateAnswers(answers);

  if (!catalog) {
    return (
      <div className={card}>
        <p className={eyebrow}>PREVIEW</p>
        <h1 className={heading}>The shoot list could not be read from Aryeo.</h1>
        <p className="mt-3 text-sm text-fg-strong">Reload in a minute. Nothing has been booked.</p>
      </div>
    );
  }

  function toggle(it: CatalogItem) {
    setPicked((prev) => {
      if (prev.includes(it.variantId)) return prev.filter((v) => v !== it.variantId);
      // One option per product: picking 90 to 120 seconds replaces 60 seconds.
      const sameProduct = catalog!.addons.filter((a) => a.productId === it.productId).map((a) => a.variantId);
      return [...prev.filter((v) => !sameProduct.includes(v)), it.variantId];
    });
    setDates(null);
    setDate(null);
    setDay(null);
    setSlot(null);
  }

  function set<K extends keyof Answers>(k: K, v: Answers[K]) {
    setAnswers((a) => ({ ...a, [k]: v }));
    if (k === "bookerEmail") {
      setDates(null);
      setDate(null);
      setDay(null);
      setSlot(null);
    }
  }

  function goToTimes() {
    setTouched(true);
    if (missing.length) return;
    setStep(2);
    setError(null);
    if (dates) return;
    startTransition(async () => {
      const r = await loadDates({ email: answers.bookerEmail, variantIds: picked });
      if (r.ok) setDates(r.dates);
      else setError(r.error);
    });
  }

  function chooseDate(d: string) {
    setDate(d);
    setSlot(null);
    setDay(null);
    setError(null);
    startTransition(async () => {
      const r = await loadDay({ email: answers.bookerEmail, variantIds: picked, date: d });
      setDay(r);
      if (!r.ok) setError(r.error);
    });
  }

  function confirm() {
    if (!date || !slot) return;
    setError(null);
    startTransition(async () => {
      const r = await prepareBooking({ answers, variantIds: picked, date, startAt: slot.start_at });
      setResult(r);
      if (r.ok) setStep(4);
      else setError(r.error);
    });
  }

  const field = (k: keyof Answers, opts: { type?: string; placeholder?: string; inputMode?: "numeric" | "tel" | "email" } = {}) => (
    <div>
      <label htmlFor={`f-${k}`} className={label}>
        {FIELD_LABELS[k]}
      </label>
      <input
        id={`f-${k}`}
        type={opts.type ?? "text"}
        inputMode={opts.inputMode}
        placeholder={opts.placeholder}
        value={answers[k]}
        onChange={(e) => set(k, e.target.value)}
        aria-invalid={touched && missing.includes(k)}
        className={`${inputBase} ${touched && missing.includes(k) ? "border-crimson/70" : ""}`}
      />
    </div>
  );

  return (
    <div>
      <div className="mb-8 rounded border border-amber-200/30 bg-amber-200/[0.06] px-4 py-3 text-[13px] leading-relaxed text-amber-100/90">
        {live
          ? "Preview. LIVE CREATE IS ON: confirming writes to Aryeo."
          : "Preview, dry run. Nothing is booked, charged or sent to Aryeo."}
      </div>

      <p className={eyebrow}>BOOK A BUILDER SHOOT</p>
      <h1 className="mt-3 font-display text-[clamp(32px,7vw,48px)] font-extralight leading-[1.05] tracking-[-0.02em] text-fg">
        Market Your Build
      </h1>
      <div className="mt-6">
        <Progress step={step} />
      </div>

      {error && (
        <p role="alert" className="mb-4 rounded border border-crimson/50 bg-crimson/10 px-4 py-3 text-sm text-fg">
          {error}
        </p>
      )}

      {step === 0 && (
        <section className={card} aria-labelledby="s1">
          <div className="flex items-center justify-between gap-3">
            <span className={eyebrow}>01</span>
            <span className="rounded-sm bg-crimson px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
              Your shoot
            </span>
          </div>
          <h2 id="s1" className={heading}>
            {catalog.main.name}
          </h2>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-[44px] font-extralight leading-none tracking-[-0.03em] text-crimson">
              {money(catalog.main.price)}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-fg-secondary">per shoot</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-fg-strong">
            25 finished marketing photos, back within 48 hours.
          </p>

          <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.2em] text-fg-secondary">Add to it (optional)</p>
          <div className="mt-3 grid gap-2">
            {catalog.addons.map((a) => {
              const on = picked.includes(a.variantId);
              return (
                <button
                  key={a.variantId}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(a)}
                  className={`${optionBase} ${on ? optionOn : optionIdle}`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border text-[12px] ${
                      on ? "border-crimson bg-crimson text-white" : "border-white/25"
                    }`}
                  >
                    {on ? "✓" : ""}
                  </span>
                  <span className="min-w-0 flex-1 text-[15px] text-fg">{itemLabel(a)}</span>
                  <span className="shrink-0 font-mono text-[13px] tabular-nums text-fg-secondary">+{money(a.price)}</span>
                </button>
              );
            })}
          </div>
          <TotalRow total={total} />
          <button type="button" className={`${primaryBtn} mt-6`} onClick={() => setStep(1)}>
            Continue
          </button>
        </section>
      )}

      {step === 1 && (
        <section className={card} aria-labelledby="s2">
          <span className={eyebrow}>02</span>
          <h2 id="s2" className={heading}>
            Five questions
          </h2>
          <p className="mt-2 text-sm text-fg-secondary">So we arrive at the right house, ready for the right stage.</p>

          <fieldset className="mt-6 grid gap-4">
            <legend className="mb-3 text-[11px] uppercase tracking-[0.2em] text-fg-strong">1. Property address</legend>
            {field("street", { placeholder: "123 Main St" })}
            <div className="grid grid-cols-[1fr_72px_96px] gap-3">
              {field("city", { placeholder: "Little Rock" })}
              {field("state")}
              {field("zip", { inputMode: "numeric", placeholder: "72201" })}
            </div>
          </fieldset>

          <div className="mt-6">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-fg-strong">2. Size</p>
            {field("sqft", { inputMode: "numeric", placeholder: "2400" })}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-fg-strong sm:col-span-2">3. Who lets us in</p>
            {field("siteContactName")}
            {field("siteContactPhone", { type: "tel", inputMode: "tel" })}
          </div>

          <div className="mt-6">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-fg-strong">4. Builder or company</p>
            {field("company")}
          </div>

          <div className="mt-6">
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-fg-strong">5. Build stage</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {BUILD_STAGES.map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={answers.buildStage === s}
                  onClick={() => set("buildStage", s)}
                  className={`${optionBase} justify-center text-center text-[14px] text-fg ${
                    answers.buildStage === s ? optionOn : optionIdle
                  } ${touched && missing.includes("buildStage") && !answers.buildStage ? "border-crimson/70" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-fg-strong sm:col-span-2">Who is booking</p>
            {field("bookerName")}
            {field("bookerEmail", { type: "email", inputMode: "email" })}
            {field("bookerPhone", { type: "tel", inputMode: "tel" })}
          </div>

          {touched && missing.length > 0 && (
            <p className="mt-4 text-sm text-crimson-text">
              Check: {missing.map((k) => FIELD_LABELS[k]).join(", ")}.
            </p>
          )}

          <div className="mt-6 grid grid-cols-[auto_1fr] gap-3">
            <button type="button" className={ghostBtn} onClick={() => setStep(0)}>
              Back
            </button>
            <button type="button" className={primaryBtn} onClick={goToTimes}>
              See times
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className={card} aria-labelledby="s3">
          <span className={eyebrow}>03</span>
          <h2 id="s3" className={heading}>
            Pick a time
          </h2>
          <p className="mt-2 text-[12px] text-amber-100/80">Preview: times not yet address-checked.</p>

          {!dates && pending && <p className="mt-6 text-sm text-fg-secondary">Reading the schedule...</p>}
          {dates && dates.length === 0 && (
            <p className="mt-6 text-sm text-fg-strong">No open days in the next three weeks. Call (501) 502-2925.</p>
          )}
          {dates && dates.length > 0 && (
            <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2" role="listbox" aria-label="Dates">
              {dates.map((d) => {
                const l = dayLabel(d);
                const on = d === date;
                return (
                  <button
                    key={d}
                    type="button"
                    role="option"
                    aria-selected={on}
                    onClick={() => chooseDate(d)}
                    className={`flex min-h-[64px] w-[72px] shrink-0 flex-col items-center justify-center rounded border ${
                      on ? optionOn : optionIdle
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-[0.18em] text-fg-secondary">{l.weekday}</span>
                    <span className="mt-1 text-[14px] text-fg">{l.day}</span>
                  </button>
                );
              })}
            </div>
          )}

          {date && pending && <p className="mt-6 text-sm text-fg-secondary">Reading times...</p>}
          {date && day?.ok && !pending && (
            <div className="mt-6">
              <p className="text-[13px] text-fg-strong">{dayLabel(date).long}</p>
              {day.slots.length > 0 ? (
                <>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-fg-secondary">
                    With {day.shooterName}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {day.slots.map((s) => {
                      const on = slot?.start_at === s.start_at;
                      return (
                        <button
                          key={s.start_at}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setSlot(s)}
                          className={`min-h-[44px] rounded border text-[14px] tabular-nums text-fg ${on ? optionOn : optionIdle}`}
                        >
                          {timeLabel(s.start_at)}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="mt-3">
                  <p className="text-sm text-fg-strong">No times that day. The closest open days:</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {day.suggestions.map((d) => (
                      <button key={d} type="button" onClick={() => chooseDate(d)} className={`${ghostBtn} min-h-[44px]`}>
                        {dayLabel(d).weekday} {dayLabel(d).day}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 grid grid-cols-[auto_1fr] gap-3">
            <button type="button" className={ghostBtn} onClick={() => setStep(1)}>
              Back
            </button>
            <button type="button" className={primaryBtn} disabled={!slot} onClick={() => setStep(3)}>
              Review
            </button>
          </div>
        </section>
      )}

      {step === 3 && date && slot && (
        <section className={card} aria-labelledby="s4">
          <span className={eyebrow}>04</span>
          <h2 id="s4" className={heading}>
            Review and deposit
          </h2>
          <p className="mt-2 text-sm text-fg-strong">
            {dayLabel(date).long} at {timeLabel(slot.start_at)}
            {day?.ok && day.shooterName ? `, with ${day.shooterName}` : ""}
          </p>
          <p className="mt-1 text-sm text-fg-secondary">
            {answers.street}, {answers.city}, {answers.state} {answers.zip}
          </p>

          <ul className="mt-6 border-t border-white/10">
            {items.map((i) => (
              <li key={i.variantId} className="flex items-baseline justify-between gap-4 border-b border-white/5 py-2.5 text-[13px]">
                <span className="min-w-0 text-fg-strong">{itemLabel(i)}</span>
                <span className="shrink-0 font-mono tabular-nums text-fg-secondary">{money(i.price)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 text-[13px]">
            <div className="flex justify-between gap-4">
              <dt className="text-fg-secondary">Arkansas sales tax</dt>
              <dd className="text-fg-secondary">Added at confirmation</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-fg">Total before tax</dt>
              <dd className="font-mono tabular-nums text-fg">{money(split.total)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
              <dt className="text-[15px] text-fg">Due today</dt>
              <dd className="font-mono text-[15px] tabular-nums text-crimson-text">{money(split.dueToday)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-fg-secondary">Balance after the shoot</dt>
              <dd className="font-mono tabular-nums text-fg-secondary">{money(split.balance)}</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs leading-relaxed text-fg-secondary">A 50 percent deposit is charged when you book.</p>

          <div className="mt-6 grid grid-cols-[auto_1fr] gap-3">
            <button type="button" className={ghostBtn} onClick={() => setStep(2)}>
              Back
            </button>
            <button type="button" className={primaryBtn} disabled={pending} onClick={confirm}>
              {pending ? "Checking..." : live ? `Book and pay ${money(split.dueToday)}` : `Book and pay ${money(split.dueToday)} (dry run)`}
            </button>
          </div>
        </section>
      )}

      {step === 4 && result?.ok && (
        <section className={card} aria-labelledby="s5">
          <span className={eyebrow}>05</span>
          <h2 id="s5" className={heading}>
            {result.mode === "DRY_RUN" ? "Dry run: nothing was sent" : result.runOk ? "Booked" : "Stopped part way"}
          </h2>
          <p className="mt-2 text-sm text-fg-strong">
            {result.mode === "DRY_RUN"
              ? `With the switch off, these are the ${result.results.length} requests a real booking would send, in order. ${result.sent} were sent.`
              : `${result.sent} requests sent.`}
          </p>

          <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-fg-secondary">What would be sent</p>
          <ol className="mt-3 grid gap-3">
            {result.results.map((r, i) => (
              <li key={i} className="min-w-0 rounded border border-white/10 bg-black/30 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] text-fg-secondary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[14px] text-fg">{r.step}</span>
                  <span className="ml-auto rounded-sm border border-white/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-fg-secondary">
                    {r.status}
                  </span>
                </div>
                <p className="mt-2 break-all font-mono text-[12px] text-crimson-text">
                  {r.method} {r.path}
                  {r.query ? `?${new URLSearchParams(Object.entries(r.query).map(([k, v]) => [k, String(v)])).toString()}` : ""}
                </p>
                {r.body && (
                  <pre className="mt-2 max-w-full overflow-x-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-fg-strong">
                    {JSON.stringify(r.body, null, 2)}
                  </pre>
                )}
                {(r.note || r.detail) && (
                  <p className="mt-2 text-[12px] leading-relaxed text-fg-secondary">{r.detail ?? r.note}</p>
                )}
              </li>
            ))}
          </ol>
          <button type="button" className={`${ghostBtn} mt-6 w-full`} onClick={() => setStep(3)}>
            Back to review
          </button>
        </section>
      )}
    </div>
  );
}
