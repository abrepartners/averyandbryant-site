import { VideoSamples, type VideoSample } from "@/components/video-samples";
import { portfolioVideos, type PortfolioVertical } from "@/lib/portfolio-videos";

// Delivered films and reels for one vertical page, in the same section
// style as the photo portfolios. Posters load first; video loads on tap.

function filmGrid(n: number) {
  if (n === 1) return "grid w-full gap-3 md:gap-4 lg:mx-auto lg:max-w-[960px]";
  // Full rows only: three across when it divides, otherwise two.
  if (n % 3 !== 0 && n % 2 === 0) return "grid gap-3 md:grid-cols-2 md:gap-4";
  return "grid gap-3 md:grid-cols-3 md:gap-4";
}

function reelGrid(n: number) {
  if (n === 2) return "grid w-full grid-cols-2 gap-3 md:gap-4 lg:mx-auto lg:max-w-[600px]";
  if (n === 4) return "grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4";
  if (n === 5) return "grid grid-cols-2 gap-3 sm:grid-cols-5 md:gap-4";
  return "grid w-full grid-cols-3 gap-3 md:gap-4 lg:mx-auto lg:max-w-[880px]";
}

export function VideoRows({ films, reels }: { films: VideoSample[]; reels: VideoSample[] }) {
  if (films.length === 1 && reels.length === 1) {
    // One film and one reel: side by side at the same height (16:9 beside 9:16).
    return (
      <div className="grid items-start gap-3 md:grid-cols-[3.16fr_1fr] md:gap-4">
        <VideoSamples videos={films} className="grid" />
        <VideoSamples videos={reels} vertical className="grid w-3/5 md:w-full" />
      </div>
    );
  }
  return (
    <div className="grid gap-6 md:gap-8">
      {films.length > 0 && <VideoSamples videos={films} className={filmGrid(films.length)} />}
      {reels.length > 0 && <VideoSamples videos={reels} vertical className={reelGrid(reels.length)} />}
    </div>
  );
}

export function PortfolioVideos({ vertical, bordered = "border-white/5" }: { vertical: PortfolioVertical; bordered?: string }) {
  const v = portfolioVideos[vertical];
  return (
    <section className={`border-b ${bordered} py-24 md:py-32`}>
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">{v.eyebrow}</p>
        <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
          {v.title} <span className="text-fg-secondary">{v.subtitle}</span>
        </h2>
        <div className="mt-12">
          <VideoRows films={v.films} reels={v.reels} />
        </div>
        {v.note && <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fg-secondary">{v.note}</p>}
      </div>
    </section>
  );
}
