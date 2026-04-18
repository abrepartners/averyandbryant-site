"use client";

import Link from "next/link";

export function HeroRealEstateV3() {
  return (
    <section
      aria-label="Real Estate Media hero"
      className="relative isolate flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#0a0a0a] md:min-h-screen"
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-drone-2.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/images/demo-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay with text cutout — SVG mask reveals video through letters */}
      <svg
        aria-hidden
        className="absolute inset-0 z-[1] h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 900"
      >
        <defs>
          <mask id="hero-v3-mask" x="0" y="0" width="1600" height="900">
            {/* White = visible overlay, Black = transparent (reveals video) */}
            <rect x="0" y="0" width="1600" height="900" fill="white" />
            <text
              x="800"
              y="500"
              textAnchor="middle"
              fontFamily="var(--font-display, 'Space Grotesk', system-ui, sans-serif)"
              fontSize="260"
              fontWeight="700"
              fill="black"
              letterSpacing="-8"
              className="hero-v3-text-top"
            >
              REAL ESTATE
            </text>
            <text
              x="800"
              y="700"
              textAnchor="middle"
              fontFamily="var(--font-display, 'Space Grotesk', system-ui, sans-serif)"
              fontSize="260"
              fontWeight="700"
              fill="black"
              letterSpacing="-8"
              className="hero-v3-text-bottom"
            >
              MEDIA
            </text>
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="1600"
          height="900"
          fill="#0a0a0a"
          fillOpacity="0.88"
          mask="url(#hero-v3-mask)"
        />
      </svg>

      {/* Subtle vignette for depth */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.8)_100%)]"
      />

      {/* Content */}
      <div className="relative z-[3] mx-auto w-full max-w-[1280px] px-6 text-center md:px-12">
        {/* Top tag */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-black/40 px-4 py-1.5 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-crimson">
            Core Service · Arkansas
          </span>
        </div>

        {/* Spacer for the masked heading that lives in the SVG behind */}
        <div aria-hidden className="h-[clamp(180px,40vh,440px)]" />

        <p className="mx-auto max-w-xl text-[clamp(14px,1.6vw,18px)] leading-relaxed text-white/70">
          <span className="font-display italic text-crimson">
            That closes deals.
          </span>{" "}
          HDR photography, cinematic video, aerial drone, 3D tours, and floor
          plans — built for Arkansas listings.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/order/real-estate"
            className="inline-flex items-center justify-center rounded bg-crimson px-10 py-4 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.35)]"
          >
            Book a Shoot
          </Link>
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center rounded border border-white/25 bg-black/30 px-10 py-4 text-[11px] uppercase tracking-[0.2em] text-white-80 backdrop-blur-md transition-all hover:border-white/50 hover:text-white"
          >
            View Gallery
          </Link>
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-white/30">
          ★★★★★ &nbsp; 200+ agents · BBB A+ · Arkansas-native
        </p>
      </div>

      <style>{`
        .hero-v3-text-top {
          opacity: 0;
          animation: heroV3TextIn 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) 200ms both;
        }
        .hero-v3-text-bottom {
          opacity: 0;
          animation: heroV3TextIn 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) 600ms both;
        }
        @keyframes heroV3TextIn {
          0%   { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
