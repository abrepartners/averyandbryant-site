import Link from "next/link";
import { Instagram, Facebook, Youtube, MapPin, Phone } from "lucide-react";

const locations = [
  {
    city: "Little Rock",
    address: "12521 Kanis Rd, Little Rock, AR 72211",
    phone: "(501) 502-2925",
    phoneHref: "tel:+15015022925",
  },
  {
    city: "NW Arkansas",
    address: "Bentonville, AR",
    phone: "(479) 364-5502",
    phoneHref: "tel:+14793645502",
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/averyandbryant.lr/",
    icon: Instagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/averyandbryant/",
    icon: Facebook,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@averyandbryant",
    icon: Youtube,
  },
];

const services = [
  { label: "Real Estate", href: "/real-estate" },
  { label: "Airbnb Rentals", href: "/airbnb-rentals" },
  { label: "Multi-Family", href: "/multi-family" },
  { label: "Lot & Land", href: "/lot-land" },
  { label: "Builders", href: "/builders" },
  { label: "Branding", href: "/branding" },
];

const products = [
  { label: "StudioAI", href: "/studioai" },
  { label: "Answr", href: "/answr" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#060606]">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-crimson text-[11px] font-bold text-white">
                A&B
              </div>
              <span className="text-[13px] font-light uppercase tracking-[0.2em] text-white-90">
                Avery & Bryant
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white-40">
              Real estate media and AI infrastructure. Professional photography,
              virtual staging, AI voice agents, and content systems.
            </p>
            <div className="mt-6 flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded border border-border text-white-40 transition-colors hover:border-crimson/30 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-white-30">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-white-50 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-white-30">
              Products
            </h3>
            <ul className="mt-4 space-y-2.5">
              {products.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-sm text-white-50 transition-colors hover:text-white"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://homes.averyandbryant.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white-50 transition-colors hover:text-white"
                >
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-white-30">
              Locations
            </h3>
            <div className="mt-4 space-y-6">
              {locations.map((loc) => (
                <div key={loc.city}>
                  <p className="text-sm font-medium text-white-80">
                    {loc.city}
                  </p>
                  <div className="mt-1.5 flex items-start gap-2 text-white-40">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span className="text-xs leading-relaxed">
                      {loc.address}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-white-40">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <a
                      href={loc.phoneHref}
                      className="text-xs transition-colors hover:text-white"
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-white-30">
            &copy; {new Date().getFullYear()} Avery & Bryant. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/book"
              className="text-xs text-white-40 transition-colors hover:text-white"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
