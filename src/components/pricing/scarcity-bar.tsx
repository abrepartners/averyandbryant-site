export function ScarcityBar({ text }: { text: string }) {
  return (
    <div className="mx-auto max-w-2xl rounded border border-crimson/10 bg-crimson/[0.03] px-6 py-4 text-center">
      <p className="text-[11px] leading-relaxed text-fg-secondary">
        {text}
      </p>
    </div>
  );
}
