export const metadata = {
  title: "Book a Shoot | Central & NW Arkansas | Avery & Bryant",
  description:
    "Book professional real estate media in Central Arkansas or Northwest Arkansas. HDR photography, drone, video tours, and more. Book online in under 2 minutes.",
};

const locations = [
  {
    region: "Central Arkansas",
    areas: "Little Rock, Benton, Conway, Hot Springs & surrounding areas",
    address: "12521 Kanis Rd, Little Rock, AR 72211",
    phone: "(501) 502-2925",
    bookingUrl: "https://homes.averyandbryant.com/order",
    buttonLabel: "Book Central Arkansas",
  },
  {
    region: "Northwest Arkansas",
    areas: "Bentonville, Fayetteville, Rogers, Springdale & surrounding areas",
    address: "Bentonville, AR 72712",
    phone: "(479) 364-5502",
    bookingUrl: "https://homes.averyandbryant.com/order",
    buttonLabel: "Book NW Arkansas",
  },
];

const expectations = [
  "Book online in under 2 minutes",
  "Confirmation text with shoot details",
  "We show up on time, every time",
  "Photos delivered within 24-48 hours via Aryeo",
];

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/5 blur-[150px]" />
        <div className="absolute left-8 top-24 h-20 w-20 border-l border-t border-crimson/20" />
        <div className="absolute bottom-24 right-8 h-20 w-20 border-b border-r border-crimson/20" />

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center md:px-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-crimson/30 bg-crimson/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-crimson" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-crimson">
              Book a Shoot
            </span>
          </div>

          <h1 className="font-display text-[clamp(32px,6vw,72px)] font-extralight leading-[1.1] tracking-tight text-white-90">
            Let&apos;s make your listings
            <br />
            <span className="text-white-40">stand out.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white-50 md:text-lg">
            Choose your area to get started. Book in under 2 minutes.
          </p>
        </div>
      </section>

      {/* Location Picker */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {locations.map((location) => (
              <a
                key={location.region}
                href={location.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-white/5 bg-card p-8 transition-all hover:border-crimson/30 hover:bg-crimson/5 md:p-10"
              >
                <h2 className="font-display text-2xl font-extralight text-white-90 transition-colors group-hover:text-crimson md:text-3xl">
                  {location.region}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white-50">
                  {location.areas}
                </p>
                <div className="mt-6 space-y-2 text-sm text-white-40">
                  <p>{location.address}</p>
                  <p>{location.phone}</p>
                </div>
                <div className="mt-8 inline-block rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all group-hover:bg-crimson-dark group-hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]">
                  {location.buttonLabel}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-6 text-center md:px-12">
          <div className="space-y-4 text-sm text-white-50">
            <p>
              <span className="text-white-30">Email</span>{" "}
              <a
                href="mailto:hello@averyandbryant.com"
                className="text-white-70 transition-colors hover:text-crimson"
              >
                hello@averyandbryant.com
              </a>
            </p>
            <p>
              <span className="text-white-30">Instagram</span>{" "}
              <a
                href="https://instagram.com/averyandbryant.lr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-70 transition-colors hover:text-crimson"
              >
                @averyandbryant.lr
              </a>
            </p>
          </div>
          <div className="mt-8 border-t border-border pt-8">
            <p className="text-sm text-white-40">Or call us directly</p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
              <a
                href="tel:+15015022925"
                className="text-sm text-white-70 transition-colors hover:text-crimson"
              >
                Central AR: (501) 502-2925
              </a>
              <a
                href="tel:+14793645502"
                className="text-sm text-white-70 transition-colors hover:text-crimson"
              >
                NW AR: (479) 364-5502
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <h2 className="mb-8 text-center font-display text-[clamp(24px,4vw,48px)] font-extralight tracking-tight text-white-90">
            What to expect
          </h2>
          <ul className="space-y-4">
            {expectations.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-white-50"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                <span className="text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
