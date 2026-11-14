/**
 * The plan to sold film: one continuous shot of a home going from layout
 * lines on bare dirt to sold, cut into frames and scrubbed by the scroll.
 *
 * Frame files live in public/builders/film/v1/{169,916}/f0000.webp and up.
 * `keys` are the frame numbers where the picture holds for each stage.
 * Regenerate with ~/ab/tools/plan-to-sold-film/scripts/encode.sh, which
 * prints the counts and keys to paste here.
 */
export const FILM = {
  base: "/builders/film/v1",
  landscape: { dir: "169", count: 325, keys: [0, 60, 132, 204, 264, 324], w: 1280, h: 720 },
  portrait: { dir: "916", count: 325, keys: [0, 60, 132, 204, 264, 324], w: 608, h: 1080 },
} as const;

export type FilmCut = (typeof FILM)["landscape"] | (typeof FILM)["portrait"];

/**
 * Scroll progress to stage position. The picture holds still for a short
 * distance at each stage (flat steps), then moves to the next.
 * [progress, stage] pairs, stage 0 = plan ... 5 = sold.
 */
const STOPS: [number, number][] = [
  [0, 0],
  [0.04, 0],
  [0.19, 1],
  [0.25, 1],
  [0.4, 2],
  [0.46, 2],
  [0.61, 3],
  [0.67, 3],
  [0.8, 4],
  [0.86, 4],
  [0.96, 5],
  [1, 5],
];

/** Where each stage's caption takes over, in scroll progress. */
export const STAGE_STARTS = [0, 0.115, 0.325, 0.535, 0.735, 0.91];

export function stageIndex(p: number) {
  let i = 0;
  for (let k = 0; k < STAGE_STARTS.length; k++) if (p >= STAGE_STARTS[k]) i = k;
  return i;
}

/** Scroll progress (0..1) to stage position (0..5, fractional mid-move). */
export function stagePosition(p: number) {
  if (p <= 0) return 0;
  for (let i = 1; i < STOPS.length; i++) {
    const [p1, s1] = STOPS[i];
    if (p <= p1) {
      const [p0, s0] = STOPS[i - 1];
      return s0 + ((s1 - s0) * (p - p0)) / (p1 - p0 || 1);
    }
  }
  return STOPS[STOPS.length - 1][1];
}

/** Stage position to a fractional frame number for one cut of the film. */
export function frameAt(stagePos: number, cut: FilmCut) {
  const i = Math.min(cut.keys.length - 2, Math.max(0, Math.floor(stagePos)));
  const t = Math.min(1, Math.max(0, stagePos - i));
  return cut.keys[i] + (cut.keys[i + 1] - cut.keys[i]) * t;
}

export function frameUrl(cut: FilmCut, i: number) {
  return `${FILM.base}/${cut.dir}/f${String(i).padStart(4, "0")}.webp`;
}

/** Stills of each stage, for the stage picker and the labeled slots. */
export const STAGE_STILLS = {
  foundation: `${FILM.base}/stage-foundation.webp`,
  framing: `${FILM.base}/stage-framing.webp`,
  roughIn: `${FILM.base}/stage-rough-in.webp`,
  finished: `${FILM.base}/stage-finished.webp`,
  framingMatched: `${FILM.base}/pair-framing.webp`,
} as const;
