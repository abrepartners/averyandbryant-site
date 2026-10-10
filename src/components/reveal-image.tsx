"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// A photo that opens from a circle into the full frame as it scrolls up the
// screen, fully open by the time its top is near the top of the view. No
// scroll lock: the page keeps moving at its normal pace.

export function RevealImage({
  src,
  alt,
  aspect = "aspect-[16/9]",
  sizes = "(min-width: 1280px) 1184px, 100vw",
}: {
  src: string;
  alt: string;
  aspect?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the frame's top enters at the bottom, 1 when it reaches 15% from the top.
      const progress = (vh - rect.top) / (vh * 0.85);
      setP(Math.max(0, Math.min(1, progress)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const eased = 1 - Math.pow(1 - p, 3);
  const radius = 18 + eased * 58; // 76% of the frame covers its corners
  const scale = 1.12 - eased * 0.12;

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${aspect}`}
      style={{ clipPath: `circle(${radius}% at 50% 50%)` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
}
