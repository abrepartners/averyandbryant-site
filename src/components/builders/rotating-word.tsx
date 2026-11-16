"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The last word of the builders headline, in its own window. The window
 * rolls backward like one face of a cube and the next word comes up from
 * below, and the window itself closes in or opens out to fit the word it is
 * holding. The first render is the plain word "build", so the headline reads
 * correctly with no script and for anyone who asks for reduced motion.
 */

const WORDS = ["build", "plan", "frame", "finish", "deliver"];
const HOLD_MS = 2300;
const EASE = "cubic-bezier(0.2,0.7,0.2,1)";

export function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  // Each word's width in em, so the numbers hold when the headline resizes.
  const [widths, setWidths] = useState<number[] | null>(null);
  const faces = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const measure = () => {
      const first = faces.current[0];
      if (!first) return;
      const size = parseFloat(getComputedStyle(first).fontSize) || 16;
      setWidths(
        WORDS.map((_, i) => (faces.current[i]?.offsetWidth ?? 0) / size),
      );
    };
    measure();
    // Measure again once the headline font is in.
    document.fonts?.ready.then(measure).catch(() => {});
  }, []);

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

  const w = widths?.[index];

  return (
    <span
      aria-hidden="true"
      className="relative inline-grid overflow-hidden rounded-[0.14em] border border-white/20 bg-white/[0.05] px-[0.2em] pb-[0.1em] pt-[0.02em] align-baseline"
      style={
        w
          ? {
              // word + side padding + border, with a hair of slack
              width: `calc(${(w + 0.42).toFixed(3)}em + 2px)`,
              transition: `width 600ms ${EASE}`,
            }
          : undefined
      }
    >
      <span className="relative col-start-1 row-start-1 [perspective:600px]">
        {/* in-flow copy of the current word: sets the height, the baseline
            and the width before anything has been measured */}
        <span className="invisible whitespace-nowrap">{WORDS[index]}.</span>
        {WORDS.map((word, i) => {
          const state = i === index ? "now" : i === prev ? "gone" : "wait";
          return (
            <span
              key={word}
              ref={(el) => {
                faces.current[i] = el;
              }}
              className="absolute left-0 top-0 whitespace-nowrap [backface-visibility:hidden] [transform-origin:50%_50%_-0.55em]"
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
                    : `transform 700ms ${EASE}, opacity 450ms ease`,
              }}
            >
              {word}
              <span className="text-crimson">.</span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
