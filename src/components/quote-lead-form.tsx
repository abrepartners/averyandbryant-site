"use client";

import { useState } from "react";

export type QuoteSummary = {
  vertical: string;
  goal?: string;
  scope?: string;
  package?: string;
  price?: string;
};

/**
 * Inline lead-capture form shown under a package recommendation.
 * Posts to /api/lead → GHL contact upsert + quote note.
 */
export function QuoteLeadForm({ quote }: { quote: QuoteSummary }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;
    setStatus("sending");
    try {
      const [firstName, ...rest] = name.trim().split(/\s+/);
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" ") || undefined,
          email: email || undefined,
          phone: phone || undefined,
          company,
          quote,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="mt-8 rounded-lg border border-crimson/30 bg-crimson/5 p-6">
        <p className="text-sm font-medium text-fg">
          Got it. We&apos;ll reach out shortly with your quote and next steps.
        </p>
      </div>
    );
  }

  const inputBase =
    "w-full rounded border border-white/15 bg-[rgba(17,17,17,0.6)] px-4 py-3 text-sm text-white placeholder:text-fg-secondary focus:border-crimson/60 focus:outline-none";

  return (
    <form onSubmit={submit} className="mt-8 border-t border-white/10 pt-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
        Want this quote sent to you?
      </p>
      <p className="mt-2 text-sm text-fg-strong">
        Drop your info and we&apos;ll follow up — no pressure, no spam.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className={inputBase}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
          className={inputBase}
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          aria-label="Phone"
          className={inputBase}
        />
        {/* honeypot — hidden from real users */}
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
        <p className="mt-3 text-xs text-crimson">
          Something went wrong — try again or text us at the number in the
          footer.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending" || (!email && !phone)}
        className="mt-4 inline-flex items-center justify-center rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "sending" ? "Sending…" : "Send My Quote"}
      </button>
    </form>
  );
}
