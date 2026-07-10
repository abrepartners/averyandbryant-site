import Link from "next/link";
import { Instagram, Facebook, Youtube, MapPin, Phone } from "lucide-react";

const locations = [
  {
    city: "Little Rock · Central Arkansas",
    address: "12521 Kanis Rd, Little Rock, AR 72211",
    phone: "(501) 502-2925",
    phoneHref: "tel:+15015022925",
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
  { label: "The Spot · Studios", href: "/studio" },
  { label: "Vellum", href: "/vellum" },
];

const account = [
  {
    label: "Client Portal",
    href: "https://homes.averyandbryant.com/portal",
    external: true,
  },
  { label: "Account · Members", href: "/members" },
  { label: "Referrals", href: "/referral" },
  { label: "Gallery", href: "/gallery" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#060606]">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <svg
                viewBox="490 281 120 128"
                aria-hidden="true"
                className="h-8 w-auto shrink-0"
              >
                <path
                  fill="#C41230"
                  d="M495.934,288.743c-0.086-1.285,1.008-2.477,2.308-2.455c17.911-0.028,35.821-0.004,53.731-0.012c8.104-0.079,16.303,0.104,24.202,2.09c6.564,1.625,12.994,4.402,18.083,8.945c3.621,3.197,6.368,7.406,7.671,12.072c1.544,5.509,1.485,11.446,0.007,16.965c-1.476,5.453-4.909,10.327-9.517,13.59c-2.457,1.803-5.211,3.141-8.021,4.293c5.4,2.055,10.508,5.335,13.871,10.116c3.628,5.04,4.979,11.404,4.767,17.536c-0.169,5.408-1.784,10.857-5.063,15.205c-3.666,4.912-8.977,8.373-14.6,10.658c-8.29,3.361-17.325,4.359-26.207,4.404c-19.175,0.01-38.35-0.006-57.525,0.01c-0.998-0.016-2.169,0.15-2.945-0.623c-0.969-0.824-0.747-2.188-0.768-3.314C495.938,361.729,495.92,325.236,495.934,288.743z M506.68,296.24c0.008,31.993-0.004,63.982,0.004,95.975c17.172-0.02,34.345-0.006,51.514-0.01c4.12,0.018,8.254-0.215,12.31-0.963c5.599-1.047,11.214-2.967,15.677-6.607c3.076-2.473,5.258-6.041,5.954-9.935c0.904-5.256,0.053-11.089-3.439-15.284c-3.617-4.341-8.993-6.739-14.298-8.321c-0.011,10.07,0.007,20.138-0.007,30.208c-3.502,0.006-7.001-0.004-10.504,0.006c-0.128-10.07-0.214-20.137-0.339-30.208c-9.344,2.117-18.15,6.894-24.643,13.985c-4.375,4.677-7.639,10.295-10.008,16.226c-3.613-0.018-7.227-0.006-10.84-0.006c-0.021-17.686,0-35.371-0.012-53.056c-0.022-3.084,0.666-6.17,2.035-8.932c2.161-4.334,5.852-7.753,9.997-10.174c5.423-3.152,11.839-4.244,18.046-3.916c5.755,0.268,11.474,2.076,16.179,5.436c4.307,3.015,8.023,7.234,9.412,12.398c0.98,3.379,0.624,6.923,0.669,10.387c-3.627,0.881-7.354,1.32-10.919,2.467c-0.021-1.399-0.032-2.803-0.104-4.198c-0.102-2.837,0.235-5.786-0.825-8.491c-1.864-5.037-6.812-8.436-11.99-9.33c-4.462-0.797-9.329-0.603-13.358,1.664c-4.718,2.678-7.999,7.901-7.96,13.378c-0.053,10.948-0.171,21.892-0.226,32.835c9.88-11.889,24.063-19.836,39.069-23.184c3.776-0.672,7.577-1.427,11.114-2.961c4.41-1.851,8.723-4.621,11.083-8.918c2.438-4.443,2.768-9.893,1.44-14.732c-1.41-5.021-5.47-8.82-10.012-11.107c-6.592-3.374-14.09-4.504-21.424-4.625C542.411,296.237,524.545,296.25,506.68,296.24z"
                />
              </svg>
              <span className="text-[13px] font-light uppercase tracking-[0.2em] text-white-90">
                Avery &amp; Bryant
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
            </ul>

            <h3 className="mt-8 text-[10px] font-medium uppercase tracking-[0.25em] text-white-30">
              Account
            </h3>
            <ul className="mt-4 space-y-2.5">
              {account.map((a) =>
                a.external ? (
                  <li key={a.href}>
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white-50 transition-colors hover:text-white"
                    >
                      {a.label}
                    </a>
                  </li>
                ) : (
                  <li key={a.href}>
                    <Link
                      href={a.href}
                      className="text-sm text-white-50 transition-colors hover:text-white"
                    >
                      {a.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.25em] text-white-30">
              Location
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
            &copy; {new Date().getFullYear()} Avery & Bryant. All rights
            reserved.
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
