"use client";

import { useEffect, useRef } from "react";

// A video that plays forward as you scroll and backward as you scroll up.
// The section is taller than the screen; the frame stays pinned while the
// scroll distance is mapped onto the clip's timeline. The clip must be encoded
// with short keyframe gaps (ffmpeg -g 6) or seeking stutters.
// Reduced motion: the clip just loops quietly instead.

export function ScrollVideo({
  src,
  poster,
  label,
  children,
}: {
  src: string;
  poster: string;
  label: string;
  children: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.loop = true;
      video.play().catch(() => {});
      return;
    }

    let target = 0;
    let current = 0;
    let raf = 0;

    const measure = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.max(0, Math.min(1, -rect.top / travel)) : 0;
      target = p * (video.duration || 0);
    };

    const tick = () => {
      // Ease toward the scroll position so fast flicks don't jump frames.
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.01) current = target;
      if (video.readyState >= 1 && Math.abs(video.currentTime - current) > 0.02) {
        video.currentTime = current;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => measure();
    const start = () => {
      measure();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    // iOS only allows seeking after the video has been touched by play().
    video.play().then(() => video.pause()).catch(() => {});
    if (video.readyState >= 1) start();
    else video.addEventListener("loadedmetadata", start, { once: true });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", start);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} aria-label={label} className="relative h-[220vh] bg-[#0a0a0a]">
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/35 to-transparent"
        />
        <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-14 md:px-12 md:pb-20">
          {children}
        </div>
      </div>
    </section>
  );
}
