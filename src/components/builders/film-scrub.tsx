"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { FILM, captionAt, frameAt, positionAt, type Film, type FilmCut, type Fit } from "./film-data";

type Props = {
  /** The tall scroll track the film is pinned inside. Progress through it
   * (0 to 1) is measured here on every frame, so the picture can never lag
   * behind the scroll position. */
  trackRef: RefObject<HTMLElement | null>;
  /** Which cut of the film to play. Defaults to the first one built. */
  film?: Film;
  className?: string;
};

const AHEAD = 30; // frames kept warm in front of the playhead
const BEHIND = 10;
const SPARSE = 12; // every Nth frame of the whole film loads early
const KEEP = 72; // frames farther than this from the playhead are dropped
const MAX_PENDING = 6;

/**
 * Scroll-scrubbed film on a canvas. Frames load in a small window around the
 * playhead and decode off the main thread. If the exact frame is not ready
 * the nearest loaded one is drawn, so the picture never blanks or jumps.
 */
export function FilmScrub({ trackRef, film = FILM, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // The first frame ships as a plain image so the page paints before any
  // script runs; the canvas fades in over it once it has drawn.
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cut: FilmCut = film.landscape;
    let portrait = false;
    let cache = new Map<number, HTMLImageElement>();
    let pending = new Set<number>();
    let tries = new Map<number, number>();
    let generation = 0;
    let w = 0;
    let h = 0;
    let cur = -1; // smoothed stage position
    let lastDrawn = "";
    let dirty = true;
    let visible = true;
    let raf = 0;
    let last = 0;
    let dir = 1;
    // Until the visitor scrolls (or the page has been idle a few seconds)
    // only the frames at the playhead load, so the first paint is not
    // competing with sixty frame downloads.
    let warm = false;
    let painted = false;

    const pickCut = () => {
      const next = w / Math.max(1, h) < 0.8;
      if (next === portrait && cache.size + pending.size > 0) return;
      portrait = next;
      cut = portrait ? film.portrait : film.landscape;
      generation++;
      cache = new Map();
      pending = new Set();
      tries = new Map();
      dirty = true;
    };

    const load = (i: number) => {
      if (i < 0 || i >= cut.count || cache.has(i) || pending.has(i)) return;
      if ((tries.get(i) ?? 0) > 2) return;
      const gen = generation;
      pending.add(i);
      const img = new Image();
      img.decoding = "async";
      img.src = cut.url(i);
      const ready = img.decode
        ? img.decode()
        : new Promise<void>((res, rej) => {
            img.onload = () => res();
            img.onerror = () => rej();
          });
      ready
        .then(() => {
          if (gen !== generation) return;
          pending.delete(i);
          cache.set(i, img);
          dirty = true;
          pump();
          kick();
        })
        .catch(() => {
          if (gen !== generation) return;
          pending.delete(i);
          tries.set(i, (tries.get(i) ?? 0) + 1);
        });
    };

    const pump = () => {
      const f = Math.round(frameAt(Math.max(0, cur), cut));
      const want: number[] = [f];
      const ahead = warm ? AHEAD : 2;
      for (let k = 1; k <= ahead; k++) {
        want.push(f + k * dir);
        if (warm && k <= BEHIND) want.push(f - k * dir);
      }
      for (const i of want) {
        if (pending.size >= MAX_PENDING) return;
        load(i);
      }
      if (!warm) return;
      for (let i = 0; i < cut.count; i += SPARSE) {
        if (pending.size >= MAX_PENDING) return;
        load(i);
      }
      if (pending.size < MAX_PENDING) load(cut.count - 1);
      if (cache.size > KEEP * 2) {
        for (const i of cache.keys()) {
          if (Math.abs(i - f) > KEEP && i % SPARSE !== 0) cache.delete(i);
        }
      }
    };

    const nearest = (i: number) => {
      if (cache.has(i)) return i;
      for (let d = 1; d < cut.count; d++) {
        if (cache.has(i - d)) return i - d;
        if (cache.has(i + d)) return i + d;
      }
      return -1;
    };

    const fitAt = (pos: number): Fit => {
      if (!portrait) return film.fitLandscape;
      const fits = film.fitPortrait;
      const i = Math.min(fits.length - 2, Math.floor(pos));
      const t = pos - i;
      const a = fits[i];
      const b = fits[i + 1];
      return {
        zoom: a.zoom + (b.zoom - a.zoom) * t,
        ax: a.ax + (b.ax - a.ax) * t,
        ay: a.ay + (b.ay - a.ay) * t,
      };
    };

    const place = (img: HTMLImageElement, fit: Fit, alpha: number) => {
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight) * fit.zoom;
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (w - dw) * fit.ax, (h - dh) * fit.ay, dw, dh);
    };

    const draw = () => {
      const pos = Math.max(0, cur);
      const f = frameAt(pos, cut);
      const i0 = Math.floor(f);
      const frac = f - i0;
      const a = nearest(frac > 0.5 ? Math.min(cut.count - 1, i0 + 1) : i0);
      if (a < 0) return;
      const exact = cache.has(i0) && cache.has(i0 + 1) && frac > 0.02 && frac < 0.98;
      const key = exact ? `${i0}:${frac.toFixed(2)}:${w}x${h}` : `${a}:${w}x${h}:${pos.toFixed(3)}`;
      if (key === lastDrawn) return;
      lastDrawn = key;
      const fit = fitAt(pos);
      if (exact) {
        place(cache.get(i0)!, fit, 1);
        place(cache.get(i0 + 1)!, fit, frac);
      } else {
        place(cache.get(a)!, fit, 1);
      }
      ctx.globalAlpha = 1;
      if (!painted) {
        painted = true;
        setDrawn(true);
      }
    };

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min(64, now - (last || now));
      last = now;
      const track = trackRef.current;
      let p = 0;
      if (track) {
        const r = track.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      }
      const target = reduce.matches ? captionAt(film, p) : positionAt(film, p);
      if (cur < 0) cur = target;
      const before = cur;
      const k = reduce.matches ? 1 : 1 - Math.exp(-dt / 110);
      cur += (target - cur) * k;
      if (Math.abs(target - cur) < 0.0004) cur = target;
      if (cur !== before) {
        dir = cur > before ? 1 : -1;
        dirty = true;
      }
      if (dirty) {
        dirty = false;
        pump();
        draw();
      }
      if (visible && cur !== target) kick();
    };

    function kick() {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2, 1920 / r.width);
      w = Math.round(r.width * dpr);
      h = Math.round(r.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      pickCut();
      lastDrawn = "";
      dirty = true;
      kick();
    };

    const warmUp = () => {
      if (warm) return;
      warm = true;
      dirty = true;
      kick();
    };
    const onScroll = () => {
      warmUp();
      kick();
    };
    let warmTimer = 0;
    const afterLoad = () => {
      warmTimer = window.setTimeout(warmUp, 3500);
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    window.addEventListener("pointerdown", warmUp, { passive: true, once: true });
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        last = 0;
        dirty = true;
        kick();
      }
    });
    io.observe(canvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    reduce.addEventListener("change", onScroll);
    resize();

    return () => {
      generation++;
      cancelAnimationFrame(raf);
      window.clearTimeout(warmTimer);
      window.removeEventListener("load", afterLoad);
      window.removeEventListener("pointerdown", warmUp);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      reduce.removeEventListener("change", onScroll);
    };
  }, [trackRef, film]);

  return (
    <>
      <picture>
        <source media="(max-aspect-ratio: 4/5)" srcSet={film.portrait.url(0)} />
        <img
          src={film.landscape.url(0)}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className={`${className} object-cover [object-position:var(--film-x)_var(--film-y)]`}
          style={
            {
              "--film-x": `${film.fitLandscape.ax * 100}%`,
              "--film-y": `${film.fitLandscape.ay * 100}%`,
            } as React.CSSProperties
          }
        />
      </picture>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`${className} transition-opacity duration-300 ${drawn ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
