"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Pinned media beside scrolling steps. On wide screens the frame on the left
// holds still while the steps scroll past on the right, and the frame swaps
// to each step's media as that step reaches the middle of the screen. On
// phones there is no pinning: each step carries its own media above its text,
// and that media animates when it scrolls into view. Videos only play while
// showing; reduced motion shows everything still.

type Photo = { src: string; alt: string };

export type StepMedia =
  | { kind: "image"; src: string; alt: string; fit?: "cover" | "contain" }
  // framed: shown inside a plain screen frame so the whole tour reads as a
  // tour instead of a cropped close-up.
  | { kind: "video"; src: string; poster: string; alt: string; framed?: boolean }
  // Photos that build in one after another: one large, the rest in a grid.
  | { kind: "gallery"; photos: Photo[]; caption?: string }
  // Numbered path that lights up line by line.
  | { kind: "path"; label: string; items: string[] };

export type ScrollStep = {
  number: string;
  title: string;
  body: React.ReactNode;
  media: StepMedia;
};

function useInView<T extends HTMLElement>(threshold = 0.4) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function useReducedMotion() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return still;
}

function Gallery({ photos, caption, play, sizes }: { photos: Photo[]; caption?: string; play: boolean; sizes: string }) {
  const still = useReducedMotion();
  const show = play || still;
  return (
    <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1.5 p-1.5">
      {photos.slice(0, 5).map((photo, i) => (
        <div
          key={photo.src}
          className={`relative overflow-hidden bg-[#1a1a1a] transition-all duration-700 ease-out ${
            i === 0 ? "col-span-2 row-span-2" : ""
          } ${show ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.97] opacity-0"}`}
          style={{ transitionDelay: show && !still ? `${i * 220}ms` : "0ms" }}
        >
          <Image src={photo.src} alt={photo.alt} fill sizes={i === 0 ? sizes : "20vw"} className="object-cover" />
        </div>
      ))}
      {caption && (
        <span
          className={`absolute bottom-4 left-4 bg-black/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white transition-opacity duration-500 ${
            show ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: show && !still ? `${photos.length * 220}ms` : "0ms" }}
        >
          {caption}
        </span>
      )}
    </div>
  );
}

// flow: sits in normal layout (phones) instead of filling a fixed frame.
function Path({ label, items, play, flow }: { label: string; items: string[]; play: boolean; flow?: boolean }) {
  const still = useReducedMotion();
  const show = play || still;
  return (
    <div className={`${flow ? "relative" : "absolute inset-0"} flex items-center justify-center bg-[#111] p-6 md:p-12`}>
      <div className="w-full max-w-md">
        <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/70">{label}</p>
        <ol className="mt-5 flex flex-col gap-3 md:gap-4">
          {items.map((item, i) => (
            <li
              key={item}
              className={`flex items-center gap-4 border px-4 py-3 transition-all duration-500 md:py-4 ${
                show ? "border-white/15 bg-white/[0.04] opacity-100" : "border-white/5 opacity-30"
              }`}
              style={{ transitionDelay: show && !still ? `${i * 350}ms` : "0ms" }}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display text-xs transition-colors duration-500 ${
                  show ? "bg-crimson text-white" : "bg-white/10 text-fg-faint"
                }`}
                style={{ transitionDelay: show && !still ? `${i * 350}ms` : "0ms" }}
              >
                {i + 1}
              </span>
              <span className="text-sm leading-snug text-fg md:text-[15px]">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Media({
  media,
  play,
  sizes,
  flow,
}: {
  media: StepMedia;
  play: boolean;
  sizes: string;
  flow?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // offsetParent is null when the copy is hidden (the other screen size's copy).
    if (play && !still && video.offsetParent !== null) video.play().catch(() => {});
    else video.pause();
  }, [play]);

  if (media.kind === "gallery") {
    return <Gallery photos={media.photos} caption={media.caption} play={play} sizes={sizes} />;
  }
  if (media.kind === "path") {
    return <Path label={media.label} items={media.items} play={play} flow={flow} />;
  }
  if (media.kind === "video") {
    const video = (
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className={media.framed ? "block aspect-[4/3] w-full object-cover" : "absolute inset-0 h-full w-full object-cover"}
      />
    );
    if (!media.framed) return video;
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
        <div className="w-[78%] overflow-hidden rounded-md border border-white/10 bg-black shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
          <div className="flex h-6 items-center gap-1.5 border-b border-white/10 bg-[#1c1c1c] px-3 md:h-7">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
          </div>
          {video}
        </div>
      </div>
    );
  }
  const contain = media.fit === "contain";
  return (
    <div className={`absolute inset-0 ${contain ? "bg-white p-5 md:p-10" : ""}`}>
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

// Phone copy: plays when it is on screen, not when its step is "active".
function PhoneMedia({ media }: { media: StepMedia }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.45);
  const flow = media.kind === "path";
  return (
    <div ref={ref} className={`relative mb-6 overflow-hidden bg-[#111] md:hidden ${flow ? "" : "aspect-[4/3]"}`}>
      <Media media={media} play={inView} sizes="100vw" flow={flow} />
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
    <div className="md:grid md:grid-cols-[1.25fr_1fr] md:gap-14 lg:gap-20">
      {/* Pinned frame, wide screens only */}
      <div className="hidden md:block">
        <div className="sticky top-[max(6rem,calc(50vh-22vw))] aspect-[4/3] w-full overflow-hidden bg-[#111]">
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
                play={i === active}
                sizes="(min-width: 1280px) 680px, 55vw"
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
                <PhoneMedia media={step.media} />
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
