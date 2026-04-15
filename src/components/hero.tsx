import Link from "next/link";

interface HeroProps {
  tag?: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundImage?: string;
}

export function Hero({
  tag,
  title,
  titleAccent,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage = "/images/staging-twilight.jpg",
}: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Crimson glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/5 blur-[150px]" />

      {/* Corner accents */}
      <div className="absolute left-8 top-24 h-20 w-20 border-l border-t border-crimson/20" />
      <div className="absolute bottom-24 right-8 h-20 w-20 border-b border-r border-crimson/20" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center md:px-12">
        {tag && (
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
              {tag}
            </span>
          </div>
        )}

        <h1 className="font-display text-[clamp(32px,6vw,72px)] font-extralight leading-[1.1] tracking-tight text-white-90">
          {title}
          {titleAccent && (
            <>
              <br />
              <span className="text-white-40">{titleAccent}</span>
            </>
          )}
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white-50 md:text-lg">
          {subtitle}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-block rounded border border-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-60 transition-all hover:border-white/30 hover:text-white"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
