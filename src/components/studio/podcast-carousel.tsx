"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/images/studio/spot-1.jpg",
    alt: "Two podcasters mid-conversation in The Spot",
    caption: "Live podcast recording · The Podcast Room",
  },
  {
    src: "/images/studio/spot-2.jpg",
    alt: "Solo podcaster on mic in The Spot",
    caption: "Solo episode · The Podcast Room",
  },
  {
    src: "/images/studio/spot-3.jpg",
    alt: "Podcaster animated on mic in The Spot",
    caption: "Real Arkansas creators · in studio",
  },
];

export function PodcastCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-[#111] shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          sizes="(max-width: 768px) 100vw, 45vw"
          className={`object-cover transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Top-left "live" badge */}
      <div className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-black/50 px-3 py-1.5 backdrop-blur-md">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
          On Air · Recently Recorded
        </span>
      </div>

      {/* Bottom gradient + caption */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 z-10">
        {slides.map((slide, i) => (
          <p
            key={i}
            className={`absolute bottom-0 left-0 right-0 text-sm font-medium text-white-90 transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="block text-[10px] uppercase tracking-[0.25em] text-amber-200/70">
              {`0${i + 1} / 0${slides.length}`}
            </span>
            <span className="mt-1 block">{slide.caption}</span>
          </p>
        ))}
        {/* Spacer so the absolutely-positioned captions have stack height */}
        <div className="h-12" />

        {/* Slide indicators */}
        <div className="mt-4 flex items-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                i === active ? "bg-amber-200" : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
