import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Canonical host: non-www → www (existing Google rankings live on www) ──
      {
        source: "/:path*",
        has: [{ type: "host", value: "averyandbryant.com" }],
        destination: "https://www.averyandbryant.com/:path*",
        permanent: true,
      },

      // ── Squarespace → new-site 301 map (docs/seo-migration-checklist.md) ──
      // NOTE: Next.js redirect `source` matching is case-INSENSITIVE, so a
      // "/Gallery" → "/gallery" rule also catches "/gallery" and self-loops
      // (308 → /gallery forever). Don't re-add it. "/gallery" is a real page.
      { source: "/photos", destination: "/gallery", permanent: true },
      { source: "/videos", destination: "/gallery", permanent: true },
      { source: "/book-services", destination: "/book", permanent: true },
      { source: "/services-pricing", destination: "/pricing", permanent: true },
      { source: "/agent-branding", destination: "/branding", permanent: true },
      { source: "/drone-photos", destination: "/real-estate", permanent: true },
      {
        source: "/twilight-photography",
        destination: "/real-estate",
        permanent: true,
      },
      {
        source: "/virtual-staging",
        destination: "/real-estate",
        permanent: true,
      },

      // ── Product rebrand: StudioAI → Vellum ──
      { source: "/studioai", destination: "/vellum", permanent: true },

      // ── The Spot: gettothespot.com is the front door (Thomas, 2026-09-05) ──
      {
        source: "/studio",
        destination: "https://gettothespot.com",
        permanent: true,
      },
      {
        source: "/studio/:path*",
        destination: "https://gettothespot.com",
        permanent: true,
      },

      // ── Remaining Squarespace legacy paths (docs/ab-knowledge-base.md §9) ──
      { source: "/home-nwa", destination: "/", permanent: true },
      { source: "/home-ca", destination: "/", permanent: true },
      { source: "/book-services-1", destination: "/book", permanent: true },
      {
        source: "/agent-branding-faq",
        destination: "/branding",
        permanent: true,
      },
      {
        source: "/implement-weather-policy",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
