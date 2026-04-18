"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

const services = [
  { label: "Real Estate", href: "/real-estate" },
  { label: "Airbnb Rentals", href: "/airbnb-rentals" },
  { label: "Multi-Family", href: "/multi-family" },
  { label: "Commercial", href: "/commercial" },
  { label: "Lot & Land", href: "/lot-land" },
  { label: "Builders", href: "/builders" },
  { label: "Branding", href: "/branding" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
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
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-crimson text-[11px] font-bold text-white">
              A&B
            </div>
            <span className="hidden text-[13px] font-light uppercase tracking-[0.2em] text-white-90 sm:inline">
              Avery & Bryant
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {/* Services Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-white-50 transition-colors hover:text-white"
              >
                Services
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
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

            <Link
              href="/studioai"
              className="text-[11px] uppercase tracking-[0.15em] text-white-50 transition-colors hover:text-white"
            >
              StudioAI
            </Link>
            <Link
              href="/answr"
              className="text-[11px] uppercase tracking-[0.15em] text-white-50 transition-colors hover:text-white"
            >
              Answr
            </Link>
            <a
              href="https://homes.averyandbryant.com/portal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.15em] text-white-50 transition-colors hover:text-white"
            >
              Client Portal
            </a>
            <Link
              href="/referral"
              className="text-[11px] uppercase tracking-[0.15em] text-crimson transition-colors hover:text-white"
            >
              Referrals
            </Link>

            <Link
              href="/book"
              className="ml-4 rounded bg-crimson px-5 py-2 text-[11px] uppercase tracking-[0.15em] text-white transition-colors hover:bg-crimson-dark"
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
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-[rgba(10,10,10,0.97)] px-6 py-8 backdrop-blur-2xl md:hidden">
          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            className="flex min-h-[44px] w-full items-center justify-between py-3 text-sm uppercase tracking-[0.15em] text-white-60"
          >
            Services
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                mobileServicesOpen ? "rotate-180" : ""
              }`}
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
          <Link
            href="/studioai"
            onClick={() => setMobileOpen(false)}
            className="block min-h-[44px] py-3 text-sm uppercase tracking-[0.15em] text-white-60 hover:text-white"
          >
            StudioAI
          </Link>
          <Link
            href="/answr"
            onClick={() => setMobileOpen(false)}
            className="block min-h-[44px] py-3 text-sm uppercase tracking-[0.15em] text-white-60 hover:text-white"
          >
            Answr
          </Link>
          <a
            href="https://homes.averyandbryant.com/portal"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block min-h-[44px] py-3 text-sm uppercase tracking-[0.15em] text-white-60 hover:text-white"
          >
            Client Portal
          </a>
          <Link
            href="/referral"
            onClick={() => setMobileOpen(false)}
            className="block min-h-[44px] py-3 text-sm uppercase tracking-[0.15em] text-crimson hover:text-white"
          >
            Referrals
          </Link>
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
