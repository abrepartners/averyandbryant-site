import Link from "next/link";
import Image from "next/image";
import { HeroBranding } from "@/components/heroes/hero-branding";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { brandingPackages, brandingGuarantee } from "@/lib/pricing";

export const metadata = {
  alternates: { canonical: "/branding" },
  title:
    "Headshots & Brand Sessions for Arkansas Agents | Avery & Bryant",
  description:
    "Headshot Session $95 on scheduled studio days, 5 retouched images. Brand Session $299 across The Spot and our other office areas. Content days, team days and retainers are scoped on a free call. Central Arkansas.",
};

// What the two priced sessions are NOT. Each of these is scoped on a call,
// so the page owes the reader a real explanation instead of a hidden number.
const consultServices = [
  {
    name: "Content Day",
    summary: "A library, not a session.",
    whatItIs:
      "A half day or full day where we shoot a body of work instead of a single set. You bring several looks, we move through the rooms, and we shoot stills and short video in the same block.",
    whatYouGet:
      "Enough photos and clips to carry your posting for a season instead of a week, retouched, cut and delivered ready to use.",
    whyTalk:
      "The cost moves with how long we shoot, how many looks you bring, how much video you want, and whether we shoot here or somewhere else. One printed number would be wrong for almost everybody.",
  },
  {
    name: "Team Day",
    summary: "One pass, one consistent look across the whole roster.",
    whatItIs:
      "A day built around your office. Matching headshots for every person, a group shot, and usually working shots of the team together in the same visual language.",
    whatYouGet:
      "A roster page where everybody matches, shot in one pass, so nobody on your site is three years and one haircut out of date.",
    whyTalk:
      "It depends on headcount, whether we shoot at our studio or yours, and how much brand content you want beyond the faces. If all you need is matching headshots for 4 or more people, that is the $80 per person rate above and you can book it today without a call.",
  },
  {
    name: "Ongoing Content",
    summary: "The same shoot on a schedule, so you never run dry.",
    whatItIs:
      "We shoot on a set cadence, usually monthly, instead of once. Each visit adds to a running library rather than replacing it.",
    whatYouGet:
      "A steady supply of new images and clips, which is what actually keeps a personal brand alive. One big shoot ages out in about a quarter.",
    whyTalk:
      "Cadence and volume are the whole cost, and they are genuinely different for a solo agent and a team of ten. We would rather build yours than sell you someone else's.",
  },
  {
    name: "Brand Video",
    summary: "A minute of you, talking to the people who are about to call you.",
    whatItIs:
      "A short video, roughly a minute, where you speak to camera. We cut it together with footage of you working so it does not feel like a testimonial read.",
    whatYouGet:
      "An introduction video for your website, your profile, and the top of your feed, in a format you can cut down for social.",
    whyTalk:
      "Scripting, finished length, and how much we shoot around the talking are what set the price. Those are decisions to make with you, not for you.",
  },
  {
    name: "On Location",
    summary: "Your office, a listing, or the place your brand lives.",
    whatItIs:
      "The same sessions, shot somewhere that means something to you instead of in our rooms. Available across Central Arkansas.",
    whatYouGet:
      "A shoot on your own ground, with the backdrop your clients already associate with you.",
    whyTalk:
      "We shoot in the studio by default because controlled light is part of why these prices work. On location adds time and travel, so we scope it with you and confirm the travel fee when you book.",
  },
];

// Four things people mix up. The whole point of this page is that a reader
// finishes it able to tell them apart.
const differences = [
  {
    thing: "A headshot",
    plain:
      "One look, one backdrop, 30 minutes, 5 images. It replaces the photo on your profile. Refresh it about once a year.",
  },
  {
    thing: "A brand session",
    plain:
      "A set of images of you, shot across several rooms with two wardrobe looks. Enough to carry a website, a profile, and months of posts without repeating yourself.",
  },
  {
    thing: "A content day",
    plain:
      "A library instead of a set. Photos and short video shot across a half or full day, built so you are posting from it long after the day ends.",
  },
  {
    thing: "Ongoing content",
    plain:
      "The same shoot on repeat at a set cadence. You stop planning shoots and start planning posts.",
  },
];

// Real frames of the rooms. Room names match the studio site, alt text describes
// only what is visible in the frame.
const rooms = [
  {
    src: "/images/studio/spot-5.jpg",
    name: "The Podcast Room",
    look: "Sage paneling, rose velvet, warm lamps",
    alt: "Two rose velvet chairs against a sage green paneled wall beside an arched mirror and a warm floor lamp",
  },
  {
    src: "/images/studio/spot-9.jpg",
    name: "The Neutral Room",
    look: "Warm wood slats and olive fabric",
    alt: "Olive green fabric chairs in front of a warm wood slat wall with a palm plant and a microphone on a boom stand",
  },
  {
    src: "/images/studio/spot-7.jpg",
    name: "The Black Room",
    look: "Dark walls, colored light",
    alt: "Two dark armchairs on a patterned rug, lit from the sides with purple and orange light against a black wall",
  },
  {
    src: "/images/studio/spot-8.jpg",
    name: "The Garage",
    look: "Moss wall, roll up door, hard light",
    alt: "A round table with two microphone boom arms in front of a green moss wall and a metal roll up door",
  },
];

const steps = [
  {
    number: "01",
    title: "Pick the session or the call",
    description:
      "A headshot or a brand session books straight off this page. Anything bigger starts with a free 30 minute call so we can build the right shape first.",
  },
  {
    number: "02",
    title: "We shoot",
    description:
      "Studio lighting is already set, so the session starts when you walk in. We direct the posing, so you do not have to know what to do with your hands.",
  },
  {
    number: "03",
    title: "You get your images",
    description:
      "Retouched files, sized for your website, your profile and social. We confirm the delivery date with you when you book the block.",
  },
];

const faqs = [
  {
    question: "How much is a professional headshot in Little Rock?",
    answer:
      "A Headshot Session is $95: 30 minutes in our studio and 5 retouched images. Those sessions run on scheduled headshot days, so you take a time on the next open studio block rather than naming your own date. If 4 or more of you book the same block, it is $80 per person.",
  },
  {
    question: "Why do headshots only run on scheduled days?",
    answer:
      "Because batching is the reason the price is $95. We set up the studio once and run sessions back to back in a single block instead of building a shoot around one person. Booking a one off on demand would cost you a great deal more, so we would rather give you a date than a higher number.",
  },
  {
    question: "What is the difference between a headshot and a brand session?",
    answer:
      "A headshot is one look on one backdrop: 30 minutes, 5 retouched images, the photo that goes on your profile. A Brand Session is $299 and runs 60 to 75 minutes across The Spot and the other areas of our office, with 2 wardrobe looks and 12 to 15 retouched images. It gives you headshots plus working shots you can post from for months.",
  },
  {
    question:
      "Why are content days, team days and retainers not priced on this page?",
    answer:
      "Because the honest number depends on how long we shoot, how many people are in it, how much video you want, and where it happens. Publishing one number for those would be wrong for almost everyone who reads it. We scope them on a free 30 minute call instead, and you leave the call with a real number.",
  },
  {
    question: "Do you shoot on location?",
    answer:
      "Yes, across Central Arkansas. We shoot in the studio by default because controlled light is part of why these prices work, so on location is scoped with you and the travel fee is confirmed when you book.",
  },
  {
    question: "Where do you shoot, and what areas do you cover?",
    answer:
      "Sessions are shot at The Spot, our Little Rock studio, and the other areas of our office. We serve Central Arkansas, including Little Rock, Benton, Conway and Hot Springs.",
  },
  {
    question: "When do I get my images?",
    answer:
      "Your retouched images are delivered after the session, and we confirm the delivery date with you when you book the block.",
  },
  {
    question: "What if I am not happy with my photos?",
    answer:
      "Every session is backed by our Satisfaction Reshoot Guarantee. Report an issue with our work within 7 days of delivery and we will reshoot it free.",
  },
];

export default function BrandingPage() {
  return (
    <>
      <HeroBranding />

      {/* ── THE TWO PRICES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Priced on the page
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Two sessions book themselves.{" "}
            <span className="text-fg-secondary">
              Everything else is a conversation.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-secondary">
            These two are the same for everybody, so they get a price. Take a
            time and turn up.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {brandingPackages.map((pkg) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                ctaHref="/book"
                ctaLabel="Book a Session"
              />
            ))}
          </div>

          {/* How headshot days work, said plainly */}
          <div className="mt-8 rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 md:p-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
              How headshot days work
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-secondary">
              We do not shoot $95 headshots one at a time on demand. We schedule
              headshot days: one studio block with sessions running back to
              back. You take a time on the next open day. That batching is
              exactly why the session costs what it costs, and it is worth
              saying out loud rather than dressing it up. Bring 4 or more people
              into the same block and it drops to $80 each.
            </p>
          </div>

          <div className="mt-12">
            <GuaranteeBadge guarantee={brandingGuarantee} />
          </div>
        </div>
      </section>

      {/* ── WHAT IS THE DIFFERENCE ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            In plain English
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Four things people mix up.{" "}
            <span className="text-fg-secondary">Here is the difference.</span>
          </h2>

          <div className="mt-16 grid gap-px overflow-hidden rounded border border-white/5 bg-white/5">
            {differences.map((row) => (
              <div
                key={row.thing}
                className="grid gap-2 bg-[#0d0d0d] p-8 md:grid-cols-[minmax(0,240px)_1fr] md:gap-10 md:p-10"
              >
                <h3 className="font-display text-lg font-medium text-fg">
                  {row.thing}
                </h3>
                <p className="text-sm leading-relaxed text-fg-secondary">
                  {row.plain}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-fg-secondary">
            If you already know which one you want, book it. If you do not, that
            is what the call is for, and picking the smaller one is a perfectly
            good answer.
          </p>
        </div>
      </section>

      {/* ── WHAT ELSE WE DO ── */}
      <section
        id="what-we-do"
        className="scroll-mt-24 border-t border-white/5 py-24 md:py-32"
      >
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Scoped on a call
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            The rest of what we do.{" "}
            <span className="text-fg-secondary">
              What it is, and what you get.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-secondary">
            None of these carry a price on this page, and that is deliberate.
            They are built around your team, your calendar and where we shoot,
            so a number printed here would be a guess. Here is what each one
            actually is.
          </p>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {consultServices.map((service, i) => (
              <div
                key={service.name}
                className={`flex flex-col rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20 md:p-10 ${
                  i === consultServices.length - 1 &&
                  consultServices.length % 2 === 1
                    ? "lg:col-span-2"
                    : ""
                }`}
              >
                <h3 className="font-display text-2xl font-medium text-fg">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-crimson/80">
                  {service.summary}
                </p>

                <dl className="mt-6 flex-1 space-y-5">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
                      What it is
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-fg-strong">
                      {service.whatItIs}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
                      What you get
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-fg-strong">
                      {service.whatYouGet}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-fg-secondary">
                      Why it starts with a call
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-fg-secondary">
                      {service.whyTalk}
                    </dd>
                  </div>
                </dl>

                <Link
                  href="/book"
                  className="mt-8 inline-block w-fit rounded border border-crimson/30 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-crimson/90 transition-colors hover:border-crimson/60 hover:text-white"
                >
                  Talk through {service.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHERE WE SHOOT ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Where we shoot
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Four rooms in one building.{" "}
            <span className="text-fg-secondary">
              That is the brand session.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-secondary">
            A headshot needs one clean backdrop. A brand session needs variety,
            and walking between rooms is how you get several looks out of one
            hour without driving anywhere. These are our rooms as they stand.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {rooms.map((room) => (
              <figure
                key={room.src}
                className="overflow-hidden rounded border border-white/5 bg-[rgba(17,17,17,0.5)]"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={room.src}
                    alt={room.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-6 py-5">
                  <span className="font-display text-lg font-medium text-fg">
                    {room.name}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
                    {room.look}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-start">
            <div className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
                Somewhere else
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
                We shoot on location across Central Arkansas: your office, a
                listing, a venue that means something to your brand. We lead
                with the studio because controlled light is part of why these
                prices work, so on location is scoped with you and the travel
                fee is confirmed when you book. No surprise line on the invoice.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg-secondary">
                If you already have a photographer and just need a room, The
                Spot rents by the hour.{" "}
                <a
                  href="https://www.gettothespot.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crimson transition-colors hover:text-white"
                >
                  See the studio &rarr;
                </a>
              </p>
            </div>

            <figure className="overflow-hidden rounded border border-white/5 bg-[rgba(17,17,17,0.5)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/studio/spot-3.jpg"
                  alt="A guest speaking at a microphone on a boom arm beside a window at dusk"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <figcaption className="px-6 py-5 text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
                A session running in the building
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            How it works
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Three steps. <span className="text-fg-secondary">That is it.</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 transition-all duration-500 hover:border-crimson/20"
              >
                <span className="font-display text-4xl font-extralight text-crimson">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-fg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-fg-secondary">
            Serving Central Arkansas, from Little Rock to Hot Springs.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection faqs={faqs} />

      <ConsultCTA
        interest="branding"
        headline="Not sure whether you need a headshot or a content day?"
        subhead="That is the most common question we get, and it is a five minute answer. Free 30 minute call, we work out which one fits and what it costs, and you leave with a real number."
      />

      {/* ── CTA ── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-[1280px] px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            Get started
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Book the simple one, or let us help you pick.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-fg-secondary md:text-lg">
            A $95 headshot on the next studio day, a $299 brand session, or a
            call about the bigger version. All three start in the same place.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Book a Session
            </Link>
            <a
              href="mailto:book@averyandbryant.com?subject=Headshots%20and%20branding"
              className="inline-flex items-center justify-center rounded border border-white/20 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-fg-strong transition-all hover:border-white/40 hover:text-white"
            >
              Email book@averyandbryant.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
