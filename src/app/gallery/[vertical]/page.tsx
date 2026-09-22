import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryGrid } from "@/components/gallery-grid";
import { FeaturedHomes } from "@/components/featured-homes";
import { ConsultCTA } from "@/components/consult-cta";
import {
  GALLERY_VERTICALS,
  featuredFor,
  galleryVertical,
  projectsFor,
} from "@/lib/gallery";
import { commercialGroups } from "@/lib/commercial-work";

type Params = { vertical: string };

export function generateStaticParams(): Params[] {
  return GALLERY_VERTICALS.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { vertical } = await params;
  const v = galleryVertical(vertical);
  if (!v) return {};
  return {
    title: `${v.title} Gallery | Real Estate Photography Arkansas | Avery & Bryant`,
    description: `${v.blurb} Every image is a real Avery & Bryant client shoot in Central Arkansas.`,
    alternates: { canonical: `/gallery/${v.slug}` },
    openGraph: {
      title: `${v.title} Gallery | Avery & Bryant`,
      description: v.blurb,
      url: `/gallery/${v.slug}`,
    },
  };
}

export default async function VerticalGalleryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { vertical } = await params;
  const v = galleryVertical(vertical);
  if (!v) notFound();

  const homes = featuredFor(v.cat);
  const projects = projectsFor(v.cat);
  const isCommercial = v.slug === "commercial";
  const others = GALLERY_VERTICALS.filter((o) => o.slug !== v.slug);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-crimson/5 blur-[150px]" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12">
          <Link
            href="/gallery"
            className="inline-flex min-h-[44px] items-center text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-white"
          >
            &larr; All galleries
          </Link>
          <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-crimson/70">
            Gallery
          </p>
          <h1 className="mt-3 font-display text-[clamp(32px,6vw,64px)] font-extralight leading-[1.1] tracking-tight text-fg">
            {v.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-secondary">
            {v.blurb}
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
            {homes.length > 0 ? `${homes.length} full shoots` : ""}
            {homes.length > 0 && projects.length > 0 ? ", " : ""}
            {projects.length > 0
              ? `${projects.length} ${projects.length === 1 ? "project" : "projects"}`
              : ""}
          </p>
        </div>
      </section>

      {/* Featured full shoots */}
      {homes.length > 0 && (
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="mb-8">
              <h2 className="font-display text-[clamp(20px,3vw,32px)] font-extralight tracking-tight text-fg">
                Full shoots
              </h2>
              <p className="mt-2 text-sm text-fg-secondary">
                Twelve frames from each delivered set, front exterior first.
                Tap a {v.name} shoot to browse it.
              </p>
            </div>
            <FeaturedHomes homes={homes} priorityFirst />
          </div>
        </section>
      )}

      {/* Commercial: the real commercial work from the service page */}
      {isCommercial && (
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="mb-8">
              <h2 className="font-display text-[clamp(20px,3vw,32px)] font-extralight tracking-tight text-fg">
                Commercial work
              </h2>
              <p className="mt-2 text-sm text-fg-secondary">
                Retail, hospitality, institutional and site aerials across
                Central Arkansas.
              </p>
            </div>
            <div className="space-y-14">
              {commercialGroups.map((group, gi) => (
                <div key={group.label}>
                  <h3 className="font-display text-lg font-medium text-fg">
                    {group.label}
                  </h3>
                  {group.lead && (
                    <figure className="mt-6">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
                        <Image
                          src={group.lead.src}
                          alt={group.lead.alt}
                          fill
                          priority={gi === 0}
                          sizes="(min-width: 1280px) 1216px, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                        {group.lead.caption}
                      </figcaption>
                    </figure>
                  )}
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.shots.map((shot) => (
                      <figure key={shot.src}>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/5 bg-[#111]">
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            fill
                            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                            className="object-cover"
                          />
                        </div>
                        <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                          {shot.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project grid */}
      {projects.length > 0 && (
        <section className="border-t border-border pt-16 pb-24 md:pt-20 md:pb-32">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <div className="mb-8">
              <h2 className="font-display text-[clamp(20px,3vw,32px)] font-extralight tracking-tight text-fg">
                More {v.name} projects
              </h2>
              <p className="mt-2 text-sm text-fg-secondary">
                Tap any project for its cover frame and the full property tour.
              </p>
            </div>
            <GalleryGrid
              items={projects}
              showFilter={false}
              priorityFirst={homes.length === 0 && !isCommercial}
            />
          </div>
        </section>
      )}

      <ConsultCTA
        interest={v.interest}
        headline={`Want your ${v.name} work shot like this?`}
        subhead="Book a free 30 minute call. We'll walk through the property, what it costs, and which package fits."
      />

      {/* Book + other galleries */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-[clamp(24px,4vw,44px)] font-extralight tracking-tight text-fg">
              Your listing, shot like this.
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex min-h-[44px] items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
              >
                Book a shoot
              </Link>
              <Link
                href={v.page}
                className="inline-flex min-h-[44px] items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-all hover:border-white/40 hover:text-white"
              >
                {v.title} packages
              </Link>
            </div>
          </div>
          <p className="mt-12 text-[10px] uppercase tracking-[0.3em] text-fg-secondary">
            Other galleries
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/gallery/${o.slug}`}
                className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-fg-secondary transition-colors hover:border-white/30 hover:text-white"
              >
                {o.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
