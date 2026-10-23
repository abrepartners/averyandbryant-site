"use client";

import { useState } from "react";

// Click-to-play video tiles. Only the poster loads until someone taps, so a
// row of reels costs one small image each instead of megabytes of video.

export type VideoSample = { src: string; poster: string; alt: string };

function Tile({ video, aspect }: { video: VideoSample; aspect: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[#111] ${aspect}`}>
      {playing ? (
        <video
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${video.alt}`}
          className="group absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/70 bg-black/40 backdrop-blur-sm"
          >
            <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
          </span>
        </button>
      )}
    </div>
  );
}

export function VideoSamples({
  videos,
  vertical = false,
  className,
}: {
  videos: VideoSample[];
  vertical?: boolean;
  /** Replaces the default grid classes, for rows that are not three across. */
  className?: string;
}) {
  return (
    <div
      className={
        className ??
        (vertical
          ? "grid grid-cols-3 gap-3 md:gap-4 lg:mx-auto lg:max-w-[880px]"
          : "grid gap-3 md:grid-cols-3 md:gap-4")
      }
    >
      {videos.map((v) => (
        <Tile key={v.src} video={v} aspect={vertical ? "aspect-[9/16]" : "aspect-video"} />
      ))}
    </div>
  );
}
