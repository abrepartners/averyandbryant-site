"use client";

import { useEffect, useRef, type RefObject } from "react";
import { drawHouse, type HouseOpts } from "./house-model";

type Props = {
  /** Target progress, 0 to 1. The canvas eases toward it. */
  progress?: number;
  /** Live progress source (scroll). Wins over `progress`. */
  progressRef?: RefObject<number>;
  /** Draw the floor plan in on first view. */
  playIntro?: boolean;
  /** Per-frame options, e.g. to move the model as the scene changes. */
  getOpts?: (p: number, w: number, h: number) => HouseOpts;
  opts?: HouseOpts;
  className?: string;
};

/**
 * Canvas wrapper for the house model. Draws only when something changed and
 * only while on screen, so several of these can sit on one page.
 */
export function HouseCanvas({
  progress = 0,
  progressRef,
  playIntro = false,
  getOpts,
  opts,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef(progress);
  const kickRef = useRef<() => void>(() => {});
  const optsRef = useRef({ getOpts, opts });
  optsRef.current = { getOpts, opts };

  useEffect(() => {
    targetRef.current = progress;
    kickRef.current();
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font = getComputedStyle(canvas).fontFamily;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = false;
    let dirty = true;
    let last = 0;
    let cur = progressRef ? (progressRef.current ?? 0) : targetRef.current;
    let intro = playIntro && !reduced ? 0 : 1;
    let introStart = 0;

    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;

      const target = progressRef ? (progressRef.current ?? 0) : targetRef.current;
      const d = target - cur;
      if (Math.abs(d) > 0.0003) {
        cur += reduced ? d : d * (1 - Math.exp(-dt / (progressRef ? 85 : 260)));
        dirty = true;
      } else if (cur !== target) {
        cur = target;
        dirty = true;
      }

      if (intro < 1) {
        if (!introStart) introStart = now + 250;
        const t = Math.min(1, Math.max(0, (now - introStart) / 2400));
        intro = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        if (t >= 1) intro = 1;
        dirty = true;
      }

      if (dirty && w > 0) {
        const { getOpts: g, opts: o } = optsRef.current;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        drawHouse(ctx, w, h, cur, { ...(g ? g(cur, w, h) : o), intro, font });
        dirty = false;
      }

      const moving = Math.abs(target - cur) > 0.0003 || intro < 1;
      if (visible && (moving || progressRef)) {
        raf = requestAnimationFrame(frame);
      } else {
        last = 0;
      }
    };

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };
    kickRef.current = kick;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      dirty = true;
      kick();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          dirty = true;
          kick();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(canvas);
    resize();

    return () => {
      ro.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      kickRef.current = () => {};
    };
  }, [progressRef, playIntro]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block font-mono ${className}`}
    />
  );
}
