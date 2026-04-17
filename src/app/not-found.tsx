import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <span className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
        404
      </span>
      <h1 className="mt-4 font-display text-[clamp(36px,6vw,64px)] font-light tracking-tight text-white-90">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-white/40 md:text-lg">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
        >
          Go Home
        </Link>
        <Link
          href="/book"
          className="inline-block rounded border border-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white-60 transition-all hover:border-white/30 hover:text-white"
        >
          Book a Shoot
        </Link>
      </div>
    </section>
  );
}
