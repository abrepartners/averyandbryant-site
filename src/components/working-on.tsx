"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Home page section 3, "What are you working on?": four client jobs. The
 * property job reveals the six property verticals in place; the other three
 * link straight to their page. Every control is a real link or a 44px button,
 * no hover-only behavior, no horizontal scroll at phone width.
 */

type Job = {
  id: string;
  title: string;
  blurb: string;
  href?: string;
  cta?: string;
  reveals?: { title: string; blurb: string; href: string }[];
};

const propertyVerticals = [
  { title: "Home for sale", blurb: "Residential listings", href: "/real-estate" },
  { title: "Short-term rental", blurb: "Airbnb, VRBO, direct booking", href: "/airbnb-rentals" },
  { title: "Apartment community", blurb: "Multi-family and student housing", href: "/multi-family" },
  { title: "Lot or land", blurb: "Parcels, acreage, development sites", href: "/lot-land" },
  { title: "New construction", blurb: "Builders, progress, model homes", href: "/builders" },
  { title: "Commercial property", blurb: "Office, retail, industrial, hospitality", href: "/commercial" },
];

const jobs: Job[] = [
  {
    id: "property",
    title: "Market a property",
    blurb: "Photos, drone, video, tours and plans for a listing, rental, community or site.",
    reveals: propertyVerticals,
  },
  {
    id: "brand",
    title: "Build my personal or team brand",
    blurb: "Headshots, brand sessions, content days and team days.",
    href: "/branding",
    cta: "See the two sessions",
  },
  {
    id: "content",
    title: "Record or create content",
    blurb: "Rent The Spot podcast studio, or have an episode produced for you.",
    href: "/studio",
    cta: "See The Spot",
  },
  {
    id: "software",
    title: "Edit media or handle inquiries myself",
    blurb: "Vellum edits your own listing photos. Answr answers and routes inquiries.",
    reveals: [
      { title: "Vellum", blurb: "Self-service photo editing and staging", href: "/vellum" },
      { title: "Answr", blurb: "Inquiry handling for agents and offices", href: "/answr" },
    ],
  },
];

const cardClass =
  "group flex min-h-[44px] w-full flex-col items-start rounded-lg border p-6 text-left transition-all duration-300";

export function WorkingOn() {
  const [open, setOpen] = useState<string | null>(null);
  const openJob = jobs.find((j) => j.id === open);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {jobs.map((job) => {
          const active = open === job.id;
          const className = `${cardClass} ${
            active
              ? "border-crimson/50 bg-[rgba(17,17,17,0.9)]"
              : "border-white/10 bg-[rgba(17,17,17,0.5)] hover:border-crimson/40 hover:bg-[rgba(17,17,17,0.8)]"
          }`;
          const body = (
            <>
              <span className="text-base font-medium text-fg group-hover:text-white">
                {job.title}
              </span>
              <span className="mt-2 text-sm leading-relaxed text-fg-secondary">
                {job.blurb}
              </span>
              <span className="mt-4 text-[11px] uppercase tracking-[0.2em] text-crimson/80">
                {job.reveals
                  ? active
                    ? "Choose below"
                    : "Choose a property type"
                  : job.cta}
              </span>
            </>
          );
          return job.reveals ? (
            <button
              key={job.id}
              type="button"
              aria-expanded={active}
              aria-controls={`working-on-${job.id}`}
              onClick={() => setOpen(active ? null : job.id)}
              className={className}
            >
              {body}
            </button>
          ) : (
            <Link key={job.id} href={job.href ?? "/"} className={className}>
              {body}
            </Link>
          );
        })}
      </div>

      {openJob?.reveals && (
        <div
          id={`working-on-${openJob.id}`}
          className="mt-6 rounded-lg border border-crimson/20 bg-[rgba(17,17,17,0.6)] p-6 md:p-8"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            {openJob.title}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {openJob.reveals.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[44px] flex-col rounded border border-white/10 p-4 transition-colors hover:border-crimson/40"
              >
                <span className="text-sm font-medium text-fg group-hover:text-white">
                  {item.title}
                </span>
                <span className="mt-1 text-xs text-fg-secondary">{item.blurb}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
