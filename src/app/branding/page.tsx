import Image from "next/image";
import { HeroBranding } from "@/components/heroes/hero-branding";
import { ConsultCTA } from "@/components/consult-cta";
import { FaqSection } from "@/components/faq-section";
import { PackageCard } from "@/components/pricing/package-card";
import { GuaranteeBadge } from "@/components/pricing/guarantee-badge";
import { brandingPackages, brandingGuarantee } from "@/lib/pricing";

// Every CTA on this page opens the same free consultation calendar used by the
// nav and the ConsultCTA block. /book is the listing media order form and is
// the wrong door for a headshot, a brand session or a content day.
const CONSULT_URL =
  "https://api.leadconnectorhq.com/widget/booking/FYjHtkIcX1ebCSfCxQVc?interest=branding";

export const metadata = {
  alternates: { canonical: "/branding" },
  title:
    "Headshots & Brand Sessions for Central Arkansas Agents | Avery & Bryant",
  description:
    "Headshot Session $95, Brand Session $299, shot in our Little Rock studio. Content days, team days and retainers are scoped on a free call. Central Arkansas.",
};

// Real client frames, single look sessions. Five different people, one look
// each: this is what the $95 session produces. Alt text describes only what is
// visible in the frame. position keeps the subject inside the crop.
const singleLookFrames = [
  {
    src: "/images/branding/headshot-white-shirt-warm-brown-backdrop.jpg",
    caption: "Warm backdrop",
    position: "center",
    alt: "A bald man with short gray chin stubble in a white open collar dress shirt, smiling with his lips closed, against a mottled warm brown studio backdrop",
  },
  {
    src: "/images/branding/headshot-pinstripe-suit-dark-backdrop.jpg",
    caption: "Suit and tie",
    position: "center 18%",
    alt: "A bald man with a full red beard in a charcoal pinstripe jacket, taupe shirt and a tie printed with guitars, smiling against a dark gray studio backdrop",
  },
  {
    src: "/images/branding/headshot-white-tee-warm-gray-backdrop.jpg",
    caption: "White tee",
    position: "58% center",
    alt: "A younger man with short fair hair in a plain white t-shirt, arms folded, smiling broadly against a warm gray seamless backdrop",
  },
  {
    src: "/images/branding/headshot-black-tee-warm-gray-backdrop.jpg",
    caption: "Black tee",
    position: "52% center",
    alt: "A man with short mid brown hair in a plain black t-shirt, arms folded, with a slight smile, against a warm gray seamless backdrop",
  },
  {
    src: "/images/branding/headshot-black-shirt-blue-backdrop.jpg",
    caption: "Blue backdrop",
    position: "center 18%",
    alt: "A man with a shaved head and a full dark beard in a black button down shirt, turned to one side with a calm expression, against a mottled deep blue backdrop",
  },
];

// One client, one session, three looks. This row is the whole argument for the
// $299 session: a wardrobe change and a move off the backdrop.
const oneSessionFrames = [
  {
    src: "/images/branding/brand-session-suit-with-tie.jpg",
    caption: "Look one, jacket and tie",
    position: "46% center",
    alt: "A bald man with a full red beard in a charcoal pinstripe jacket and a guitar print tie, arms folded with a gold watch on his wrist, against a dark gray studio backdrop",
  },
  {
    src: "/images/branding/brand-session-suit-open-collar.jpg",
    caption: "Look two, tie off, collar open",
    position: "center 15%",
    alt: "The same man in the same pinstripe jacket with the tie removed and the collar of his taupe shirt open, arms folded, against the dark gray studio backdrop",
  },
  {
    src: "/images/branding/brand-session-seated-by-window.jpg",
    caption: "Look three, off the backdrop",
    position: "center 22%",
    alt: "The same man seated on a dark leather sofa with one arm along the back of it, in front of a floor to ceiling window filled with bright daylight",
  },
];

// Two more sessions, one deliberate change each.
const oneChangeFrames = [
  {
    src: "/images/branding/brand-session-white-shirt-warm-backdrop.jpg",
    caption: "Warm brown backdrop",
    position: "center 12%",
    alt: "A bald man with gray stubble in a crisp white dress shirt, framed from the head to the chest, against a warm brown studio backdrop",
  },
  {
    src: "/images/branding/brand-session-white-shirt-slate-blue-backdrop.jpg",
    caption: "Same shirt, slate blue",
    position: "center 20%",
    alt: "The same man in the same white dress shirt, framed head and shoulders, square to camera against a slate blue gray backdrop",
  },
  {
    src: "/images/branding/brand-session-black-shirt-blue-set.jpg",
    caption: "Blue set",
    position: "55% center",
    alt: "A man with a shaved head and a full dark beard in a black button down shirt, looking straight at the camera against a mottled deep blue backdrop",
  },
  {
    src: "/images/branding/brand-session-black-shirt-tan-set-standing.jpg",
    caption: "Tan set, standing",
    position: "center 28%",
    alt: "The same man standing, turned to one side with his head to camera, in a black button down shirt and black trousers with a brown leather belt, against a warm tan backdrop",
  },
];

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
      "It depends on headcount, whether we shoot at our studio or yours, and how much brand content you want beyond the faces. If all you need is matching headshots for 4 or more people, that is the $80 per person rate above.",
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

// Two real frames of the rooms, captioned to what is actually in the frame.
const rooms = [
  {
    src: "/images/studio/spot-5.jpg",
    name: "The lounge set",
    look: "Sage paneling, rose velvet, warm lamps",
    alt: "Two dusty rose velvet armchairs in front of a sage green paneled wall, beside a tall arched mirror reflecting the room's track lighting and a two globe floor lamp",
  },
  {
    src: "/images/studio/spot-7.jpg",
    name: "The dark room",
    look: "Dark walls, colored light",
    alt: "Two dark armchairs facing each other on a patterned rug in a dark walled room, lit with purple from the left and warm orange from the right",
  },
];

const steps = [
  {
    number: "01",
    title: "Pick the session or the call",
    description:
      "Everything on this page starts on the same free call calendar. The two priced sessions have a fixed number, so the call is scheduling rather than quoting. Anything bigger gets scoped on the call first.",
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

// Ordinary trust signals, all confirmed true by the owner.
const trustSignals = [
  {
    label: "Insured",
    detail: "We carry full insurance coverage on every shoot.",
  },
  {
    label: "A plus with the BBB",
    detail: "Rated A plus by the Better Business Bureau.",
  },
  {
    label: "200 plus agents",
    detail: "More than 200 Arkansas agents have shot with us.",
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
    question: "How do I book one?",
    answer:
      "Every session on this page starts on the same free call calendar. Take a time, tell us which session you want, and we put you on the next open studio block. The two priced sessions are fixed prices, so there is nothing to quote on the call.",
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
            Two sessions carry a price.{" "}
            <span className="text-fg-secondary">
              Everything else is a conversation.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-secondary">
            These two are the same for everybody, so they get a number. Take a
            time on the calendar, tell us which one you want, and turn up.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {brandingPackages.map((pkg) => (
              <PackageCard
                key={pkg.name}
                pkg={pkg}
                ctaHref={CONSULT_URL}
                ctaTarget="_blank"
                ctaLabel="Get on the calendar"
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

      {/* ── THE $95 SESSION, FIVE REAL FACES ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            The $95 session
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            Five people. Five sessions.{" "}
            <span className="text-fg-secondary">One look each.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-secondary">
            Every frame on this page is our own client work. These five are
            single look sessions: one person, one backdrop, the photo that goes
            on a profile. Suit, tee or open collar, the light and the direction
            are the same.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
            {singleLookFrames.map((frame) => (
              <figure
                key={frame.src}
                className="overflow-hidden rounded border border-white/5 bg-[rgba(17,17,17,0.5)]"
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                    style={{ objectPosition: frame.position }}
                  />
                </div>
                <figcaption className="px-4 py-4 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                  {frame.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE $299 SESSION, ONE PERSON CHANGING LOOK ── */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
            The $299 session
          </p>
          <h2 className="mt-4 font-display text-[clamp(28px,5vw,48px)] font-light tracking-tight text-fg">
            One person, one session,{" "}
            <span className="text-fg-secondary">several different looks.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-secondary">
            This is the whole difference between the two numbers. A brand
            session is not a longer headshot. It is a change of clothes, a
            change of backdrop, and a move off the backdrop altogether when the
            shot calls for it. Here is one session, in order.
          </p>

          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {oneSessionFrames.map((frame) => (
              <figure
                key={frame.src}
                className="overflow-hidden rounded border border-white/5 bg-[rgba(17,17,17,0.5)]"
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: frame.position }}
                  />
                </div>
                <figcaption className="px-5 py-4 text-[11px] uppercase tracking-[0.2em] text-fg-secondary">
                  {frame.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-fg-secondary">
            Same hour, same person. Jacket and tie, then the tie comes off, then
            we leave the backdrop and shoot him seated in daylight. Three usable
            identities out of one session instead of one.
          </p>

          <div className="mt-16 border-t border-white/5 pt-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
              Two more sessions
            </p>
            <h3 className="mt-4 font-display text-[clamp(22px,3.5vw,32px)] font-light tracking-tight text-fg">
              One deliberate change each.
            </h3>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {oneChangeFrames.map((frame) => (
                <figure
                  key={frame.src}
                  className="overflow-hidden rounded border border-white/5 bg-[rgba(17,17,17,0.5)]"
                >
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                      style={{ objectPosition: frame.position }}
                    />
                  </div>
                  <figcaption className="px-4 py-4 text-[10px] uppercase tracking-[0.2em] text-fg-secondary">
                    {frame.caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-fg-secondary">
              Some of these faces appear in the row of five as well, and that is
              the honest way to read it: a brand session starts with the same
              headshot and then keeps going.
            </p>
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
            If you already know which one you want, take a time and say so. If
            you do not, that is what the call is for, and picking the smaller
            one is a perfectly good answer.
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

                <a
                  href={CONSULT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block w-fit rounded border border-crimson/30 px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-crimson/90 transition-colors hover:border-crimson/60 hover:text-white"
                >
                  Talk through {service.name}
                </a>
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
            A backdrop is not the only room.{" "}
            <span className="text-fg-secondary">
              That is the brand session.
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-secondary">
            A headshot needs one clean backdrop. A brand session needs variety,
            and walking between rooms is how you get several looks out of one
            hour without driving anywhere. Two of ours, as they stand.
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

          <div className="mt-10 rounded border border-white/5 bg-[rgba(17,17,17,0.5)] p-8 md:p-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-crimson/60">
              Somewhere else
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-secondary">
              We shoot on location across Central Arkansas: your office, a
              listing, a venue that means something to your brand. We lead with
              the studio because controlled light is part of why these prices
              work, so on location is scoped with you and the travel fee is
              confirmed when you book. No surprise line on the invoice.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-secondary">
              If you already have a photographer and just need a room, The Spot
              rents by the hour.{" "}
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

          <div className="mt-10 grid gap-px overflow-hidden rounded border border-white/5 bg-white/5 sm:grid-cols-3">
            {trustSignals.map((signal) => (
              <div key={signal.label} className="bg-[#0d0d0d] p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.25em] text-crimson/70">
                  {signal.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-secondary">
                  {signal.detail}
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
            <a
              href={CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-crimson px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] text-white transition-all hover:bg-crimson-dark hover:shadow-[0_8px_32px_rgba(196,18,48,0.25)]"
            >
              Get on the calendar
            </a>
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
