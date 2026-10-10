"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// Full-screen phone menu. The panel slides in from the right with a curved
// leading edge that flattens as it lands, then the big numbered links settle in.
// It lives outside <nav> on purpose: the nav gets backdrop-blur once scrolled,
// and a blurred ancestor traps position:fixed children inside its own box.

type Item = { label: string; href: string; external?: boolean };

const SLIDE = "cubic-bezier(0.76, 0, 0.24, 1)";
const CURVE_MS = 900;

export function MobileMenu({
  open,
  onClose,
  primary,
  services,
  products,
  consultHref,
}: {
  open: boolean;
  onClose: () => void;
  primary: Item[];
  services: Item[];
  products: Item[];
  consultHref: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Animate the curve's control point: bulged while moving, flat at rest.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const h = window.innerHeight;
    const draw = (x: number) =>
      path.setAttribute("d", `M100 0 L100 ${h} L100 ${h} Q${x} ${h / 2} 100 0`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      draw(100);
      return;
    }
    const from = open ? -100 : 100;
    const to = open ? 100 : -100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / CURVE_MS);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      draw(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Lock the page behind, close on Escape, and move focus into the menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const focus = setTimeout(() => firstLinkRef.current?.focus(), 300);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(focus);
    };
  }, [open, onClose]);

  const settle = (i: number) => ({
    transition: `transform 0.8s ${SLIDE} ${open ? 0.15 + i * 0.05 : 0}s, opacity 0.6s ease ${open ? 0.15 + i * 0.05 : 0}s`,
    transform: open ? "translateX(0)" : "translateX(48px)",
    opacity: open ? 1 : 0,
  });

  return (
    <div
      id="mobile-menu"
      inert={!open}
      aria-hidden={!open}
      className="fixed inset-0 z-40 md:hidden"
      style={{ visibility: open ? "visible" : "hidden", transition: `visibility 0s ${open ? "0s" : "0.8s"}` }}
    >
      <div
        className="absolute inset-0 bg-black/60"
        style={{ opacity: open ? 1 : 0, transition: "opacity 0.5s ease" }}
        onClick={onClose}
      />
      <div
        className="absolute inset-y-0 right-0 w-full bg-background"
        style={{ transform: open ? "translateX(0)" : "translateX(calc(100% + 100px))", transition: `transform 0.8s ${SLIDE}` }}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute top-0 -left-[99px] h-full w-[100px] fill-background"
        >
          <path ref={pathRef} />
        </svg>

        <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-24">
          <p className="border-b border-border pb-3 text-[10px] uppercase tracking-[0.25em] text-fg-muted">
            Menu
          </p>

          <ul>
            {primary.map((item, i) => (
              <li key={item.href} style={settle(i)} className="border-b border-border">
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-baseline gap-4 py-5 font-display text-[28px] font-light uppercase leading-none tracking-[0.02em] text-fg"
                >
                  <span className="w-6 text-[11px] font-normal tracking-[0.15em] text-fg-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={settle(primary.length)} className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-fg-muted">More services</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    onClick={onClose}
                    className="block min-h-[44px] py-3 text-[13px] uppercase tracking-[0.12em] text-fg-secondary"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div style={settle(primary.length + 1)} className="mt-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-fg-muted">Products</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6">
              {products.map((p) => (
                <li key={p.href}>
                  {p.external ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="block min-h-[44px] py-3 text-[13px] uppercase tracking-[0.12em] text-fg-secondary"
                    >
                      {p.label}
                    </a>
                  ) : (
                    <Link
                      href={p.href}
                      onClick={onClose}
                      className="block min-h-[44px] py-3 text-[13px] uppercase tracking-[0.12em] text-fg-secondary"
                    >
                      {p.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div style={settle(primary.length + 2)} className="mt-auto pt-8">
            <Link
              href="/book"
              onClick={onClose}
              className="block w-full rounded bg-crimson py-4 text-center text-sm uppercase tracking-[0.15em] text-white"
            >
              Book Now
            </Link>
            <a
              href={consultHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="mt-2 block min-h-[44px] py-3 text-center text-[13px] uppercase tracking-[0.15em] text-amber-200/80"
            >
              Free Consult
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
