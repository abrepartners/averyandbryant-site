import "server-only";

type PlaceReview = {
  name?: string;
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
  relativePublishTimeDescription?: string;
};

type PlaceResponse = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlaceReview[];
};

const FIELD_MASK =
  "displayName,rating,userRatingCount,googleMapsUri,reviews.text,reviews.rating,reviews.authorAttribution,reviews.relativePublishTimeDescription";

async function fetchPlace(
  placeId: string,
  apiKey: string,
): Promise<PlaceResponse | null> {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
        Accept: "application/json",
      },
      next: { revalidate: 86400 },
    },
  );
  if (!res.ok) {
    console.error("[google-reviews] Places API error", res.status);
    return null;
  }
  return (await res.json()) as PlaceResponse;
}

export async function GoogleReviews({ max = 3 }: { max?: number }) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  const place = await fetchPlace(placeId, apiKey);
  if (!place || !place.reviews || place.reviews.length === 0) return null;

  const reviews = place.reviews
    .filter((r): r is PlaceReview & { rating: number } => (r.rating ?? 0) >= 4)
    .slice(0, max);
  if (reviews.length === 0) return null;

  const rating = place.rating?.toFixed(1);
  const count = place.userRatingCount;
  const profileUrl = place.googleMapsUri;

  return (
    <section className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
              What clients say
            </p>
            <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-white-90">
              {rating ? (
                <>
                  <span className="text-crimson">{rating} ★</span>{" "}
                  <span className="text-white-40">
                    from {count ?? "hundreds of"} Google reviews.
                  </span>
                </>
              ) : (
                "Reviewed by Arkansas agents and hosts."
              )}
            </h2>
          </div>
          {profileUrl ? (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-crimson transition-colors hover:text-white"
            >
              Read all on Google &rarr;
            </a>
          ) : null}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => {
            const text = r.text?.text ?? r.originalText?.text ?? "";
            const author = r.authorAttribution?.displayName ?? "Google reviewer";
            return (
              <article
                key={r.name ?? `${author}-${i}`}
                className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8"
              >
                <div
                  className="text-crimson tracking-wide"
                  aria-label={`${r.rating} out of 5 stars`}
                >
                  {"★".repeat(Math.round(r.rating))}
                  <span className="text-fg-faint">
                    {"★".repeat(5 - Math.round(r.rating))}
                  </span>
                </div>
                <p className="mt-4 line-clamp-6 text-sm leading-relaxed text-fg-strong">
                  {text}
                </p>
                <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
                  {author}
                  {r.relativePublishTimeDescription ? (
                    <span className="text-fg-faint">
                      {" · "}
                      {r.relativePublishTimeDescription}
                    </span>
                  ) : null}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
