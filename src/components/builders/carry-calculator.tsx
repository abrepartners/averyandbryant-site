"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Carrying cost calculator. Every figure on screen comes from the numbers
 * the builder types in. Nothing here is an industry average.
 *
 *   daily interest = balance x rate / 365
 *   daily carry    = monthly carry x 12 / 365
 */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function useTween(value: number) {
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);
  useEffect(() => {
    const from = fromRef.current;
    if (from === value) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fromRef.current = value;
      setShown(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 320);
      const v = from + (value - from) * (1 - Math.pow(1 - t, 3));
      fromRef.current = v;
      setShown(v);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return shown;
}

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  onChange: (v: number) => void;
};

function Field({
  id,
  label,
  hint,
  value,
  min,
  max,
  step,
  prefix,
  suffix,
  onChange,
}: FieldProps) {
  const [text, setText] = useState<string | null>(null);
  const display =
    text ?? (prefix === "$" ? value.toLocaleString("en-US") : String(value));

  return (
    <div className="border-t border-white/10 py-5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-fg-strong">
          {label}
        </label>
        <div className="flex items-baseline gap-1 font-display text-[22px] font-light text-fg">
          {prefix && <span className="text-fg-secondary">{prefix}</span>}
          <input
            id={id}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={display}
            onFocus={(e) => {
              setText(String(value));
              requestAnimationFrame(() => e.target.select());
            }}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9.]/g, "");
              setText(raw);
              const n = parseFloat(raw);
              if (Number.isFinite(n)) onChange(Math.min(max * 4, Math.max(0, n)));
            }}
            onBlur={() => setText(null)}
            className="w-[7.5ch] min-w-0 rounded-sm border-b border-white/15 bg-transparent py-1 text-right tabular-nums outline-none transition-colors focus:border-crimson"
            style={{ width: `${Math.max(3, display.length + 1)}ch` }}
          />
          {suffix && <span className="text-fg-secondary">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="ab-range mt-4 w-full"
        style={
          {
            "--fill": `${((Math.min(max, Math.max(min, value)) - min) / (max - min)) * 100}%`,
          } as React.CSSProperties
        }
      />
      {hint && <p className="mt-2 text-xs text-fg-secondary">{hint}</p>}
    </div>
  );
}

const CUTS = [1, 2, 3, 5];

export function CarryCalculator({
  packageName,
  packagePrice,
}: {
  packageName: string;
  packagePrice: number;
}) {
  const [balance, setBalance] = useState(425000);
  const [rate, setRate] = useState(8.5);
  const [monthly, setMonthly] = useState(650);
  const [days, setDays] = useState(90);
  const [cut, setCut] = useState(2);

  const daily = (balance * (rate / 100)) / 365 + (monthly * 12) / 365;
  const total = daily * days;
  const breakeven = daily > 0 ? packagePrice / daily : 0;
  const cutCost = balance * (cut / 100);
  const cutDays = daily > 0 ? cutCost / daily : 0;

  const dailyShown = useTween(daily);
  const totalShown = useTween(total);

  // chart geometry
  const W = 600;
  const Hh = 200;
  const padL = 4;
  const padR = 4;
  const padT = 30;
  const padB = 22;
  const span = Math.max(days, 1);
  const top = Math.max(total, packagePrice * 1.25, 1);
  const x = (d: number) => padL + (d / span) * (W - padL - padR);
  const y = (v: number) => Hh - padB - (v / top) * (Hh - padT - padB);
  const showMark = breakeven > 0 && breakeven <= span;

  return (
    <section
      id="carry"
      className="scroll-mt-20 border-t border-white/5 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
              The carry
            </span>
          </div>
          <h2 className="mt-5 font-display text-[clamp(32px,6vw,64px)] font-light leading-[1.04] tracking-[-0.025em] text-fg">
            What does one unsold day cost you?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-strong md:text-lg">
            Your loan, your carry, your days. Change the example numbers to
            yours and watch the meter.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* inputs */}
          <div>
            <Field
              id="carry-balance"
              label="Home price or loan balance"
              prefix="$"
              value={balance}
              min={150000}
              max={1500000}
              step={5000}
              onChange={setBalance}
              hint="Interest is figured on this full number. Enter your loan balance for a tighter read."
            />
            <Field
              id="carry-rate"
              label="Interest rate"
              suffix="%"
              value={rate}
              min={3}
              max={14}
              step={0.125}
              onChange={setRate}
            />
            <Field
              id="carry-monthly"
              label="Other monthly carry"
              prefix="$"
              value={monthly}
              min={0}
              max={5000}
              step={50}
              onChange={setMonthly}
              hint="Taxes, insurance, utilities, lawn, HOA."
            />
            <Field
              id="carry-days"
              label="Days on market"
              value={days}
              min={1}
              max={365}
              step={1}
              onChange={(v) => setDays(Math.round(v))}
            />
            <p className="border-t border-white/10 pt-4 text-xs leading-relaxed text-fg-secondary">
              Starting values are an example, not a market average. The math:
              balance times rate, divided by 365, plus your monthly carry per
              day.
            </p>
          </div>

          {/* result */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded border border-white/10 bg-[rgba(17,17,17,0.5)] p-6 md:p-10">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-secondary">
                This home costs you
              </p>
              <p
                className="mt-2 font-display font-extralight leading-none tracking-[-0.04em] text-fg"
                aria-live="polite"
              >
                <span className="text-[clamp(64px,17vw,132px)] tabular-nums text-crimson">
                  {usd.format(Math.round(dailyShown))}
                </span>
                <span className="ml-3 text-lg text-fg-secondary md:text-2xl">
                  a day
                </span>
              </p>

              <div className="relative mt-8">
              <p
                className="pointer-events-none absolute right-0 -translate-y-full pb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-secondary md:text-[11px]"
                style={{ top: `${(y(packagePrice) / Hh) * 100}%` }}
              >
                Launch media {usd.format(packagePrice)}
              </p>
              <svg
                viewBox={`0 0 ${W} ${Hh}`}
                className="w-full overflow-visible"
                role="img"
                aria-label={`Carrying cost climbing to ${usd.format(Math.round(total))} over ${days} days`}
              >
                <line
                  x1={padL}
                  x2={W - padR}
                  y1={y(0)}
                  y2={y(0)}
                  stroke="rgba(255,255,255,0.14)"
                />
                <polygon
                  points={`${x(0)},${y(0)} ${x(span)},${y(total)} ${x(span)},${y(0)}`}
                  fill="rgba(196,18,48,0.1)"
                />
                <line
                  x1={x(0)}
                  y1={y(0)}
                  x2={x(span)}
                  y2={y(total)}
                  stroke="#c41230"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1={padL}
                  x2={W - padR}
                  y1={y(packagePrice)}
                  y2={y(packagePrice)}
                  stroke="rgba(255,255,255,0.35)"
                  strokeDasharray="3 6"
                />
                {showMark && (
                  <g>
                    <line
                      x1={x(breakeven)}
                      x2={x(breakeven)}
                      y1={y(0)}
                      y2={y(packagePrice)}
                      stroke="rgba(255,255,255,0.35)"
                    />
                    <circle
                      cx={x(breakeven)}
                      cy={y(packagePrice)}
                      r="5"
                      fill="#0a0a0a"
                      stroke="#fff"
                      strokeWidth="1.5"
                    />
                  </g>
                )}
              </svg>
              <div className="-mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-fg-secondary md:text-[11px]">
                <span>Day 0</span>
                {showMark && breakeven / span > 0.12 && breakeven / span < 0.85 && (
                  <span className="text-fg-strong">
                    Day {Math.round(breakeven)}: carry passes the media
                  </span>
                )}
                <span>Day {days}</span>
              </div>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-6">
                <div>
                  <dt className="text-xs text-fg-secondary">Every 30 days</dt>
                  <dd className="mt-1 font-display text-2xl font-light tabular-nums text-fg md:text-3xl">
                    {usd.format(Math.round(daily * 30))}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-fg-secondary">
                    Over {days} days
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-light tabular-nums text-fg md:text-3xl">
                    {usd.format(Math.round(totalShown))}
                  </dd>
                </div>
              </dl>

              <p className="mt-6 border-t border-white/10 pt-6 text-[15px] leading-relaxed text-fg-strong md:text-base">
                <span className="text-fg">
                  {packageName} is {usd.format(packagePrice)}.
                </span>{" "}
                On these numbers that is{" "}
                <span className="text-fg">
                  {breakeven < 1.5
                    ? "about one day"
                    : `${Math.round(breakeven)} days`}{" "}
                  of carry
                </span>
                . If the media brings your buyer that much sooner, it paid for
                itself. Every day after that is yours.
              </p>
            </div>

            {/* the price cut */}
            <div className="mt-4 rounded border border-white/5 px-6 py-5 md:px-10">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <p className="text-sm text-fg-strong">
                  Thinking about a price cut instead?
                </p>
                <div
                  role="group"
                  aria-label="Price cut percent"
                  className="flex gap-1.5"
                >
                  {CUTS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={cut === c}
                      onClick={() => setCut(c)}
                      className={`min-h-[36px] min-w-[44px] rounded-sm border px-2 font-mono text-xs transition-colors ${
                        cut === c
                          ? "border-white/60 text-fg"
                          : "border-white/10 text-fg-secondary hover:border-white/30"
                      }`}
                    >
                      {c}%
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                A {cut}% cut on this home is{" "}
                <span className="tabular-nums text-fg">
                  {usd.format(Math.round(cutCost))}
                </span>
                . That is{" "}
                <span className="tabular-nums text-fg">
                  {Math.round(cutDays).toLocaleString("en-US")} days
                </span>{" "}
                of carry, gone with one signature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
