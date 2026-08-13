"use client";

import { useActionState } from "react";
import type { Vertical } from "@/lib/order-forms";
import { submitOrder, type OrderState } from "@/app/order/[vertical]/actions";

const initialState: OrderState = {};

const inputClass =
  "w-full rounded border border-white/10 bg-[rgba(17,17,17,0.6)] px-4 py-3 text-sm text-white-90 placeholder:text-fg-faint transition-colors focus:border-crimson/50 focus:outline-none focus:ring-0";
const labelClass =
  "block text-[10px] font-medium uppercase tracking-[0.2em] text-fg-secondary";

export function OrderForm({ vertical }: { vertical: Vertical }) {
  const [state, formAction, pending] = useActionState(
    submitOrder,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="vertical" value={vertical} />

      <fieldset className="space-y-4" disabled={pending}>
        <legend className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
          Your info
        </legend>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="first_name" className={labelClass}>
              First name
            </label>
            <input
              id="first_name"
              name="first_name"
              autoComplete="given-name"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="last_name" className={labelClass}>
              Last name
            </label>
            <input
              id="last_name"
              name="last_name"
              autoComplete="family-name"
              className={inputClass}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-crimson">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </div>
      </fieldset>

      <p className="text-xs text-fg-faint">
        You&apos;ll enter the property address on the next step.
      </p>

      {state.error ? (
        <p
          role="alert"
          className="rounded border border-crimson/30 bg-crimson/10 px-4 py-3 text-sm text-crimson"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Starting your order…" : "Continue to booking"}
      </button>
    </form>
  );
}
