"use client";

import { useEffect, useState } from "react";

/**
 * The last word of the builders headline, in its own window. The window
 * rolls backward like one face of a cube and the next word comes up from
 * below. The first render is the plain word "build", so the headline reads
 * correctly with no script and for anyone who asks for reduced motion.
 */

const WORDS = ["build", "plan", "frame", "finish", "deliver"];
const HOLD_MS = 2300;

export function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((i) => {
        setPrev(i);
        return (i + 1) % WORDS.length;
      });
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span
      aria-hidden="true"
      className="relative inline-grid overflow-hidden rounded-[0.14em] border border-white/20 bg-white/[0.05] px-[0.2em] pb-[0.1em] pt-[0.02em] align-baseline [perspective:600px]"
    >
      {/* sizer: the widest word sets the window, so nothing shifts */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
        deliver.
      </span>
      {WORDS.map((word, i) => {
        const state = i === index ? "now" : i === prev ? "gone" : "wait";
        return (
          <span
            key={word}
            className="col-start-1 row-start-1 whitespace-nowrap [backface-visibility:hidden] [transform-origin:50%_50%_-0.55em]"
            style={{
              transform:
                state === "now"
                  ? "rotateX(0deg)"
                  : state === "gone"
                    ? "rotateX(90deg)"
                    : "rotateX(-90deg)",
              opacity: state === "now" ? 1 : 0,
              transition:
                state === "wait"
                  ? "none"
                  : "transform 700ms cubic-bezier(0.2,0.7,0.2,1), opacity 450ms ease",
            }}
          >
            {word}
            <span className="text-crimson">.</span>
          </span>
        );
      })}
    </span>
  );
}
