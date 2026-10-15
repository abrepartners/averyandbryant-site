"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Pinned media beside scrolling steps. On wide screens the frame on the left
// holds still while the steps scroll past on the right, and the frame swaps
// to each step's media as that step reaches the middle of the screen. On
// phones there is no pinning: each step carries its own media above its text.
// Videos only play while their step is showing; reduced motion shows posters.

export type StepMedia =
  | { kind: "image"; src: string; alt: string; fit?: "cover" | "contain" }
  | { kind: "video"; src: string; poster: string; alt: string };

export type ScrollStep = {
  number: string;
  title: string;
  body: React.ReactNode;
  media: StepMedia;
};

function Media({
  media,
  active,
  sizes,
}: {
  media: StepMedia;
  active: boolean;
  sizes: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // offsetParent is null when the copy is hidden (phone copy on desktop).
    if (active && !still && video.offsetParent !== null) video.play().catch(() => {});
    else video.pause();
  }, [active]);

  if (media.kind === "video") {
    return (
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }
  const contain = media.fit === "contain";
  return (
    <div className={`absolute inset-0 ${contain ? "bg-white p-6 md:p-10" : ""}`}>
      <div className="relative h-full w-full">
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          className={contain ? "object-contain" : "object-cover"}
        />
      </div>
    </div>
  );
}

export function ScrollSteps({ steps }: { steps: ScrollStep[] }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    // A step counts as showing once it crosses the middle band of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="md:grid md:grid-cols-2 md:gap-16 lg:gap-24">
      {/* Pinned frame, wide screens only */}
      <div className="hidden md:block">
        <div className="sticky top-24 h-[min(78vh,720px)] w-full overflow-hidden bg-[#111]">
          {steps.map((step, i) => (
            <div
              key={step.number}
              aria-hidden={i !== active}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Media
                media={step.media}
                active={i === active}
                sizes="(min-width: 1280px) 560px, 45vw"
              />
            </div>
          ))}
        </div>
      </div>

      <ol className="flex flex-col gap-14 md:gap-0">
        {steps.map((step, i) => (
          <li key={step.number}>
            <div
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-index={i}
              className="md:flex md:min-h-[72vh] md:items-center"
            >
              <div>
                {/* Phone: the step's own media */}
                <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-[#111] md:hidden">
                  <Media media={step.media} active={i === active} sizes="100vw" />
                </div>
                <span
                  className={`font-display text-sm tracking-[0.2em] transition-colors duration-500 ${
                    i === active ? "text-crimson" : "text-fg-faint"
                  }`}
                >
                  {step.number}
                </span>
                <h3
                  className={`mt-3 font-display text-[clamp(24px,3vw,36px)] font-extralight tracking-tight transition-colors duration-500 ${
                    i === active ? "text-fg" : "text-fg-muted"
                  }`}
                >
                  {step.title}
                </h3>
                <div
                  className={`mt-4 max-w-md leading-relaxed transition-colors duration-500 ${
                    i === active ? "text-fg-secondary" : "text-fg-faint"
                  }`}
                >
                  {step.body}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
