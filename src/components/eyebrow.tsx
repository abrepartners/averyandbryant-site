// The small label above a headline: a short crimson rule, then the text.
// Replaces the rounded pill with a pulsing dot, which reads as an AI template.
// Crimson is the rule only; small crimson text can't pass contrast on #0a0a0a.
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-px w-8 bg-crimson" />
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-fg-strong">
        {children}
      </span>
    </div>
  );
}
