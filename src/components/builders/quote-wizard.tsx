"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/track";
import {
  CADENCES,
  PURPOSES,
  SERVICES,
  SITES,
  MONTHLY_VISIT,
  internalFit,
  money,
  rangeFor,
  type CadenceId,
  type PurposeId,
  type ServiceId,
  type SiteId,
} from "./quote-data";

/**
 * Get a quote: one question at a time, then a list-price range and two ways
 * to finish (pick a call time, or send the request). The request posts to
 * /api/lead, which saves the contact in the CRM with what they picked.
 */

type Step = "purpose" | "services" | "sites" | "cadence" | "result";

const optionBase =
  "flex min-h-[56px] w-full items-center gap-4 rounded border px-4 py-3 text-left transition-colors duration-200";
const optionIdle = "border-white/10 bg-white/[0.02] hover:border-white/30";
const optionOn = "border-crimson/70 bg-crimson/10";
const inputBase =
  "w-full rounded border border-white/15 bg-[rgba(17,17,17,0.6)] px-4 py-3 text-sm text-white placeholder:text-fg-secondary focus:border-crimson/60 focus:outline-none";

export function QuoteWizard({ consultHref }: { consultHref: string }) {
  const [step, setStep] = useState<Step>("purpose");
  const [purpose, setPurpose] = useState<PurposeId | null>(null);
  const [picked, setPicked] = useState<ServiceId[]>([]);
  const [sites, setSites] = useState<SiteId | null>(null);
  const [cadence, setCadence] = useState<CadenceId>("once");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  // On a phone the questions stay folded behind one button, so the page is
  // not a long scroll. On a wide screen they are always open.
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#quote") setOpen(true);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href="#quote"]');
      if (a) setOpen(true);
    };
    check();
    window.addEventListener("hashchange", check);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", check);
      document.removeEventListener("click", onClick);
    };
  }, []);

  // Move focus to the new question, but never on first load.
  const headRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headRef.current?.focus({ preventScroll: true });
  }, [step]);

  const selling = purpose === "sell";
  const order: Step[] = selling
    ? ["purpose", "sites", "result"]
    : ["purpose", "services", "sites", "cadence", "result"];
  const at = order.indexOf(step);
  const questions = order.length - 1;

  const back = () => setStep(order[Math.max(0, at - 1)]);

  const choosePurpose = (id: PurposeId) => {
    setPurpose(id);
    setPicked(PURPOSES.find((p) => p.id === id)?.suggests ?? []);
    setStep(id === "sell" ? "sites" : "services");
  };
  const toggle = (id: ServiceId) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const purposeLabel = PURPOSES.find((p) => p.id === purpose)?.label ?? "";
  const sitesLabel = SITES.find((s) => s.id === sites)?.label ?? "";
  const cadenceRow = CADENCES.find((c) => c.id === cadence) ?? CADENCES[0];

  const { low, high } = rangeFor(picked, cadence);
  const rangeText = selling
    ? "$1,395 to $1,895"
    : low === 0
      ? ""
      : low === high
        ? money(low)
        : `${money(low)} to ${money(high)}`;
  const unit = selling ? "per home" : cadenceRow.unit;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    setStatus("sending");
    try {
      const [firstName, ...rest] = name.trim().split(/\s+/);
      const pickedLabels = SERVICES.filter((s) => picked.includes(s.id)).map(
        (s) => s.label,
      );
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" ") || undefined,
          email: email || undefined,
          phone: phone || undefined,
          company,
          origin: "builders",
          quote: {
            vertical: "Builders (quote questions on the builders page)",
            goal: purposeLabel,
            scope: [
              sitesLabel,
              selling ? null : cadenceRow.label,
              pickedLabels.length
                ? `Picked: ${pickedLabels.join(", ")}`
                : "Picked: nothing yet, wants a suggestion",
            ]
              .filter(Boolean)
              .join(". "),
            package: purpose
              ? `Our fit: ${internalFit(purpose, picked, cadence)}`
              : undefined,
            price: rangeText
              ? `${rangeText} ${unit} at list prices (shown to them)`
              : "No range shown",
          },
        }),
      });
      if (res.ok) {
        // A quote request is a lead. Only the picks are sent, never who.
        track(
          "generate_lead",
          { lead_source: "builders_quote", lead_goal: purposeLabel || undefined },
          { standard: "Lead" },
        );
      }
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      id="quote"
      className="flex min-w-0 scroll-mt-24 flex-col rounded border border-white/10 bg-[rgba(17,17,17,0.6)] p-6 md:p-8"
    >
      {/* folded state, phones only */}
      <div className={open ? "hidden" : "lg:hidden"}>
        <div className="flex min-h-[22px] items-center justify-between gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-fg-secondary">
            02
          </span>
          <span className="rounded-sm border border-white/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-fg-strong">
            4 quick questions
          </span>
        </div>
        <h3 className="mt-6 font-display text-[26px] font-normal leading-tight tracking-tight text-fg">
          Get a quote
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-strong">
          Tell us the goal, tap through a few questions and see a price range
          before you talk to anyone.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="quote-questions"
          className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded border border-crimson/70 bg-crimson/10 px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-crimson/20"
        >
          Start my quote <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <div
        id="quote-questions"
        className={
          open
            ? "flex flex-1 flex-col"
            : "hidden lg:flex lg:flex-1 lg:flex-col"
        }
      >
      <div className="flex min-h-[22px] items-center justify-between gap-3">
        <span className="font-mono text-[11px] tracking-[0.2em] text-fg-secondary">
          02
        </span>
        <span className="rounded-sm border border-white/15 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-fg-strong">
          {step === "result"
            ? "Your range"
            : `Question ${at + 1} of ${questions}`}
        </span>
      </div>

      {/* progress */}
      <div aria-hidden="true" className="mt-4 flex gap-1.5">
        {order.slice(0, -1).map((s, i) => (
          <span
            key={s}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
              i < at || step === "result" ? "bg-crimson" : i === at ? "bg-white/60" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      {step === "purpose" && (
        <>
          <h3
            ref={headRef}
            tabIndex={-1}
            className="mt-6 font-display text-[26px] font-normal leading-tight tracking-tight text-fg outline-none"
          >
            Get a quote. What are you trying to do?
          </h3>
          <p className="mt-2 text-sm text-fg-secondary">
            A few taps, then a price range. No form until the end.
          </p>
          <div className="mt-5 grid gap-2">
            {PURPOSES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => choosePurpose(p.id)}
                className={`${optionBase} ${purpose === p.id ? optionOn : optionIdle}`}
              >
                <span className="min-w-0">
                  <span className="block text-[15px] text-fg">{p.label}</span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-fg-secondary">
                    {p.blurb}
                  </span>
                </span>
                <span aria-hidden="true" className="ml-auto text-fg-secondary">
                  &rarr;
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === "services" && (
        <>
          <h3
            ref={headRef}
            tabIndex={-1}
            className="mt-6 font-display text-[26px] font-normal leading-tight tracking-tight text-fg outline-none"
          >
            What do you want made?
          </h3>
          <p className="mt-2 text-sm text-fg-secondary">
            {picked.length
              ? "We checked what usually fits. Change anything."
              : "Pick anything that sounds right, or skip it."}
          </p>
          <div className="mt-5 grid gap-2">
            {SERVICES.map((s) => {
              const on = picked.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s.id)}
                  className={`${optionBase} ${on ? optionOn : optionIdle}`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border text-[12px] leading-none ${
                      on
                        ? "border-crimson bg-crimson text-white"
                        : "border-white/30 text-transparent"
                    }`}
                  >
                    &#10003;
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] text-fg">{s.label}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-fg-secondary">
                      {s.blurb}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setStep("sites")}
            className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center rounded bg-crimson px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-crimson-dark"
          >
            {picked.length ? "Next" : "Skip, suggest for me"}
          </button>
        </>
      )}

      {step === "sites" && (
        <>
          <h3
            ref={headRef}
            tabIndex={-1}
            className="mt-6 font-display text-[26px] font-normal leading-tight tracking-tight text-fg outline-none"
          >
            How many homes?
          </h3>
          <div className="mt-5 grid gap-2">
            {SITES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setSites(s.id);
                  setStep(selling ? "result" : "cadence");
                }}
                className={`${optionBase} ${sites === s.id ? optionOn : optionIdle}`}
              >
                <span className="text-[15px] text-fg">{s.label}</span>
                <span aria-hidden="true" className="ml-auto text-fg-secondary">
                  &rarr;
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === "cadence" && (
        <>
          <h3
            ref={headRef}
            tabIndex={-1}
            className="mt-6 font-display text-[26px] font-normal leading-tight tracking-tight text-fg outline-none"
          >
            How often?
          </h3>
          <div className="mt-5 grid gap-2">
            {CADENCES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCadence(c.id);
                  setStep("result");
                }}
                className={`${optionBase} ${optionIdle}`}
              >
                <span className="text-[15px] text-fg">{c.label}</span>
                <span aria-hidden="true" className="ml-auto text-fg-secondary">
                  &rarr;
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === "result" && (
        <>
          <h3
            ref={headRef}
            tabIndex={-1}
            className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-fg-secondary outline-none"
          >
            {rangeText ? "What you picked, at list price" : "Let us suggest it"}
          </h3>
          {rangeText ? (
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-[clamp(34px,9vw,44px)] font-extralight leading-none tracking-[-0.03em] text-crimson">
                {rangeText}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
                {unit}
              </span>
            </div>
          ) : (
            <p className="mt-3 font-display text-[26px] font-light leading-tight tracking-tight text-fg">
              Tell us the goal and we will build the plan around it.
            </p>
          )}

          {selling ? (
            <p className="mt-4 text-sm leading-relaxed text-fg-strong">
              That is our two finished-home packages, Builder Marketing System
              and Model Home Launch Blueprint.{" "}
              <a
                href="#fixed-packages"
                className="text-fg underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                See what is in each
              </a>
              .
            </p>
          ) : (
            rangeText && (
              <ul className="mt-5 border-t border-white/10">
                {SERVICES.filter((s) => picked.includes(s.id)).map((s) => (
                  <li
                    key={s.id}
                    className="flex items-baseline justify-between gap-4 border-b border-white/5 py-2.5 text-[13px]"
                  >
                    <span className="min-w-0 text-fg-strong">{s.label}</span>
                    <span className="shrink-0 text-right font-mono tabular-nums text-fg-secondary">
                      {s.id === "visits" && cadence === "monthly"
                        ? `${money(MONTHLY_VISIT)} a month`
                        : s.priced}
                    </span>
                  </li>
                ))}
              </ul>
            )
          )}

          {!selling && (
            <p className="mt-4 text-sm leading-relaxed text-fg-strong">
              {rangeText
                ? "That is each piece on its own. Send it over and we will put it together as one plan for your company"
                : "Send your details and we will come back with a plan"}
              {sites && sites !== "one" ? ", priced across all of your homes." : "."}
            </p>
          )}

          {status === "sent" ? (
            <div className="mt-6 rounded border border-crimson/30 bg-crimson/5 p-5">
              <p className="text-sm font-medium text-fg">
                Got it. We have what you picked and will reply with a plan.
              </p>
              <a
                href={consultHref}
                className="mt-3 inline-flex min-h-[44px] items-center text-[11px] uppercase tracking-[0.2em] text-fg-strong underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                Or pick a call time now
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 border-t border-white/10 pt-6">
              <div className="grid gap-2.5">
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                  className={inputBase}
                />
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <input
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    aria-label="Phone"
                    className={inputBase}
                  />
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    aria-label="Email"
                    className={inputBase}
                  />
                </div>
                {/* honeypot, hidden from real users */}
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                  name="company"
                />
              </div>
              {status === "error" && (
                <p className="mt-3 text-xs text-crimson-text">
                  That did not go through. Try again, or call (501) 502-2925.
                </p>
              )}
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                <button
                  type="submit"
                  disabled={status === "sending" || (!email && !phone)}
                  className="inline-flex min-h-[48px] items-center justify-center rounded bg-crimson px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {status === "sending" ? "Sending" : "Send my request"}
                </button>
                <a
                  href={consultHref}
                  className="inline-flex min-h-[48px] items-center justify-center rounded border border-white/15 px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:border-white/40"
                >
                  Pick a call time
                </a>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-fg-secondary">
                A phone number or an email is enough.
              </p>
            </form>
          )}
        </>
      )}

      {at > 0 && status !== "sent" && (
        <button
          type="button"
          onClick={back}
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 self-start text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-fg"
        >
          <span aria-hidden="true">&larr;</span> Back
        </button>
      )}
      </div>
    </div>
  );
}
