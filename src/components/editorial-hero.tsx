import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/eyebrow";

// Full-bleed page top: one real A&B photo edge to edge, a calm headline set
// low on it, one short line, and the two actions. Nothing printed on the photo
// beyond that: no captions, badges or stats.

type Action = { label: string; href: string };

function ActionLink({ action, primary }: { action: Action; primary?: boolean }) {
  const external = /^(https?:|mailto:|tel:)/.test(action.href);
  const className = primary
    ? "inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-crimson-dark"
    : "inline-flex min-h-[44px] items-center justify-center rounded border border-white/25 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-fg-strong backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white";
  return external ? (
    <a href={action.href} className={className}>
      {action.label}
    </a>
  ) : (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

export function EditorialHero({
  label,
  eyebrow,
  title,
  sub,
  image,
  alt,
  objectPosition = "center",
  primary,
  secondary,
}: {
  label: string;
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
  image: string;
  alt: string;
  objectPosition?: string;
  primary: Action;
  secondary?: Action;
}) {
  return (
    <section
      aria-label={label}
      className="relative flex min-h-[100svh] items-end overflow-hidden border-b border-white/5 bg-[#0a0a0a] md:min-h-[92vh]"
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a]/10"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-14 pt-32 md:px-12 md:pb-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(40px,7vw,96px)] font-extralight leading-[0.95] tracking-tight text-fg">
          {title}
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-fg-strong md:text-lg">
          {sub}
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ActionLink action={primary} primary />
          {secondary && <ActionLink action={secondary} />}
        </div>
      </div>
    </section>
  );
}
