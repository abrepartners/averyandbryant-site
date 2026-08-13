import type { Guarantee } from "@/lib/pricing";

export function GuaranteeBadge({ guarantee }: { guarantee: Guarantee }) {
  return (
    <div className="mx-auto max-w-2xl rounded border border-amber-400/10 bg-amber-400/[0.03] px-8 py-6 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300/80">
        {guarantee.name}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
        {guarantee.text}
      </p>
    </div>
  );
}
