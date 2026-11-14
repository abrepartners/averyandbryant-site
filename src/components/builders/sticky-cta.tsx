"use client";

import { useEffect, useState } from "react";

/**
 * Phone-only action bar. Shows once the visitor is past the opening scene
 * and steps aside when the closing call to action is on screen.
 */
export function StickyCta({ consultHref }: { consultHref: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const end = document.getElementById("builders-close");
      const nearEnd = end
        ? end.getBoundingClientRect().top < window.innerHeight * 0.9
        : false;
      const scene = document.getElementById("plan-to-sold");
      const pastScene = scene
        ? scene.getBoundingClientRect().bottom < window.innerHeight * 0.75
        : window.scrollY > window.innerHeight;
      setShow(pastScene && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[rgba(10,10,10,0.92)] px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
    >
      <div className="flex gap-2">
        <a
          href={consultHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="inline-flex min-h-[46px] flex-1 items-center justify-center rounded bg-crimson px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white"
        >
          Book a builder call
        </a>
        <a
          href="#packages"
          tabIndex={show ? 0 : -1}
          className="inline-flex min-h-[46px] items-center justify-center rounded border border-white/15 px-5 text-[11px] font-medium uppercase tracking-[0.18em] text-fg"
        >
          Packages
        </a>
      </div>
    </div>
  );
}
