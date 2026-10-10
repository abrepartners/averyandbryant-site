"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

// Drag-to-compare frame. The "after" photo sits on top and is clipped from the
// left edge to the handle, so dragging right reveals more of the "before".
// With several pairs, a quiet row of text tabs swaps which pair is loaded.

export type BeforeAfterPair = {
  label: string;
  before: string;
  after: string;
  alt: string;
};

export function BeforeAfter({
  pairs,
  sizes = "(min-width: 1280px) 1184px, 100vw",
}: {
  pairs: BeforeAfterPair[];
  sizes?: string;
}) {
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const pair = pairs[active];

  const moveTo = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  return (
    <div>
      <div
        ref={frameRef}
        className="relative aspect-[3/2] w-full touch-pan-y select-none overflow-hidden bg-black"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Image
          src={pair.before}
          alt={`${pair.alt}, before`}
          fill
          sizes={sizes}
          className="pointer-events-none object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <Image
            src={pair.after}
            alt={`${pair.alt}, after`}
            fill
            sizes={sizes}
            className="pointer-events-none object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 bg-black/50 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-fg-strong">
          Before
        </span>
        <span className="pointer-events-none absolute right-3 top-3 bg-black/50 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-fg-strong">
          After
        </span>

        <div
          role="slider"
          tabIndex={0}
          aria-label={`${pair.label}: drag to compare before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
          }}
          className="absolute inset-y-0 -ml-5 flex w-10 cursor-ew-resize items-center justify-center focus-visible:outline-none [&:focus-visible>span]:ring-2 [&:focus-visible>span]:ring-white"
          style={{ left: `${pos}%` }}
        >
          <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px bg-white/80" />
          <span
            aria-hidden="true"
            className="relative flex h-9 w-9 items-center justify-center border border-white/80 bg-black/60 text-[11px] text-white backdrop-blur-sm"
          >
            &lsaquo;&rsaquo;
          </span>
        </div>
      </div>

      {pairs.length > 1 && (
        <div role="tablist" className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-2">
          {pairs.map((p, i) => (
            <button
              key={p.label}
              role="tab"
              aria-selected={i === active}
              onClick={() => {
                setActive(i);
                setPos(50);
              }}
              className={`min-h-[44px] border-b py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                i === active
                  ? "border-crimson text-fg"
                  : "border-transparent text-fg-muted hover:text-fg-secondary"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
