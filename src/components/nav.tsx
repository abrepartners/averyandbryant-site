"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

// Real Estate is promoted to its own top-level link — the flagship service.
// The remaining six property verticals live under "More Services" (labeled so
// it reads as "the rest" rather than implying Real Estate isn't a service);
// the non-core product offerings live under "Products". Utility links (Client
// Portal, Account, Referrals) moved to the footer.
const services = [
  { label: "Airbnb Rentals", href: "/airbnb-rentals" },
  { label: "Multi-Family", href: "/multi-family" },
  { label: "Commercial", href: "/commercial" },
  { label: "Lot & Land", href: "/lot-land" },
  { label: "Builders", href: "/builders" },
  { label: "Branding", href: "/branding" },
];

const products = [
  { label: "The Spot · Studios", href: "/studio" },
  { label: "Vellum", href: "/vellum" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
      if (
        productsRef.current &&
        !productsRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(10,10,10,0.92)] backdrop-blur-2xl border-b border-border"
          : ""
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Avery & Bryant — home"
          >
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
            <span className="hidden text-[13px] font-light uppercase tracking-[0.2em] text-white-90 sm:inline">
              Avery &amp; Bryant
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-7 md:flex">
            <Link
              href="/real-estate"
              className="text-[11px] uppercase tracking-[0.15em] text-white-70 transition-colors hover:text-white"
            >
              Real Estate
            </Link>

            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => {
                  setServicesOpen(!servicesOpen);
                  setProductsOpen(false);
                }}
                className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-white-50 transition-colors hover:text-white"
              >
                More Services
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full mt-3 w-52 rounded-md border border-border bg-[rgba(10,10,10,0.97)] p-2 backdrop-blur-2xl">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setServicesOpen(false)}
                      className="block rounded px-3 py-2.5 text-[11px] uppercase tracking-[0.12em] text-white-60 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Products Dropdown */}
            <div ref={productsRef} className="relative">
              <button
                onClick={() => {
                  setProductsOpen(!productsOpen);
                  setServicesOpen(false);
                }}
                className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-white-50 transition-colors hover:text-white"
              >
                Products
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${productsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {productsOpen && (
                <div className="absolute left-0 top-full mt-3 w-52 rounded-md border border-border bg-[rgba(10,10,10,0.97)] p-2 backdrop-blur-2xl">
                  {products.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={() => setProductsOpen(false)}
                      className="block rounded px-3 py-2.5 text-[11px] uppercase tracking-[0.12em] text-white-60 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://api.leadconnectorhq.com/widget/booking/FYjHtkIcX1ebCSfCxQVc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.15em] text-amber-200/70 transition-colors hover:text-amber-200"
            >
              Free Consult
            </a>

            <Link
              href="/book"
              className="ml-2 rounded bg-crimson px-5 py-2 text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-crimson-dark"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="flex h-11 w-11 items-center justify-center text-white-70 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-[rgba(10,10,10,0.97)] px-6 py-8 backdrop-blur-2xl md:hidden">
          <Link
            href="/real-estate"
            onClick={() => setMobileOpen(false)}
            className="block min-h-[44px] py-3 text-sm uppercase tracking-[0.15em] text-white-80 hover:text-white"
          >
            Real Estate
          </Link>

          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            className="flex min-h-[44px] w-full items-center justify-between py-3 text-sm uppercase tracking-[0.15em] text-white-60"
          >
            More Services
            <ChevronDown
              className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
            />
          </button>
          {mobileServicesOpen && (
            <div className="ml-4 border-l border-border pl-4">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMobileOpen(false)}
                  className="block min-h-[44px] py-3 text-sm uppercase tracking-[0.12em] text-white-50 hover:text-white"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            className="flex min-h-[44px] w-full items-center justify-between py-3 text-sm uppercase tracking-[0.15em] text-white-60"
          >
            Products
            <ChevronDown
              className={`h-4 w-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {mobileProductsOpen && (
            <div className="ml-4 border-l border-border pl-4">
              {products.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="block min-h-[44px] py-3 text-sm uppercase tracking-[0.12em] text-white-50 hover:text-white"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          )}

          <a
            href="https://api.leadconnectorhq.com/widget/booking/FYjHtkIcX1ebCSfCxQVc"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block min-h-[44px] py-3 text-sm uppercase tracking-[0.15em] text-amber-200/80 hover:text-amber-200"
          >
            Free Consult
          </a>
          <Link
            href="/book"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block w-full rounded bg-crimson py-3.5 text-center text-sm uppercase tracking-[0.15em] text-white"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
}
