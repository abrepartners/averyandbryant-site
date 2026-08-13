"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type ServicePreviewItem = {
  src: string;
  poster?: string;
  label?: string;
};

export type ServicePreview = {
  kind: "images" | "videos";
  orientation?: "vertical" | "horizontal";
  items: ServicePreviewItem[];
};

export type Service = {
  title: string;
  price: string;
  description: string;
  image: string;
  preview?: ServicePreview;
};

export function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const hasPreview = !!service.preview?.items.length;

  return (
    <>
      <div className="pricing-card group overflow-hidden rounded border border-white/5 bg-[rgba(17,17,17,0.5)] transition-all duration-500 hover:border-white/10">
        <button
          type="button"
          onClick={() => hasPreview && setOpen(true)}
          disabled={!hasPreview}
          aria-label={
            hasPreview ? `See real examples of ${service.title}` : undefined
          }
          className="image-loading relative block h-48 w-full overflow-hidden text-left disabled:cursor-default"
        >
          <Image
            src={service.image}
            alt={`Avery & Bryant ${service.title} — Arkansas real estate media`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          {hasPreview && (
            <span className="absolute bottom-3 right-3 rounded border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-fg-strong backdrop-blur-sm transition-colors group-hover:border-crimson/50 group-hover:text-white">
              See Examples
            </span>
          )}
        </button>

        <div className="p-6 md:p-8">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-lg font-medium text-fg">
              {service.title}
            </h3>
            <span className="pricing-price text-sm font-semibold text-crimson">
              {service.price}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
            {service.description}
          </p>
          <div className="mt-4 flex items-center gap-6">
            <Link
              href="/book"
              className="inline-block text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
            >
              Book Now &rarr;
            </Link>
            {hasPreview && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-block text-[11px] uppercase tracking-[0.2em] text-fg-secondary transition-colors hover:text-white"
              >
                See Examples
              </button>
            )}
          </div>
        </div>
      </div>

      {open && service.preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${service.title} examples`}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <div
            className="relative max-h-full w-full max-w-5xl overflow-y-auto rounded border border-white/10 bg-[#0d0d0d] p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
                  Real Client Work
                </p>
                <h3 className="mt-2 font-display text-2xl font-light text-fg">
                  {service.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="rounded border border-white/15 px-3 py-1.5 text-xs text-fg-strong transition-colors hover:border-white/40 hover:text-white"
              >
                Esc ✕
              </button>
            </div>

            <div
              className={`mt-8 grid gap-4 ${
                service.preview.orientation === "vertical"
                  ? "grid-cols-1 sm:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-3"
              }`}
            >
              {service.preview.items.map((item) => (
                <figure key={item.src} className="min-w-0">
                  <div
                    className={`relative overflow-hidden rounded border border-white/10 bg-[#111] ${
                      service.preview!.orientation === "vertical"
                        ? "aspect-[9/16]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    {service.preview!.kind === "videos" ? (
                      <video
                        src={item.src}
                        poster={item.poster}
                        muted
                        loop
                        autoPlay
                        playsInline
                        controls
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.label || `${service.title} example`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  {item.label && (
                    <figcaption className="mt-2 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                      {item.label}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/5 pt-6 sm:flex-row sm:justify-between">
              <p className="text-xs text-fg-secondary">
                Every example above was shot and delivered for a real Arkansas
                listing.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center rounded bg-crimson px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark"
              >
                Book This Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
