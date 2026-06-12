# Avery & Bryant Site — Claude Code Guide

## Overview

Marketing website and booking platform for Avery & Bryant Real Estate Media. Next.js 16 App Router site with 6 property verticals, a podcast studio vertical, Aryeo order form integration, Stripe payment flow, GHL CRM sync, and Google Reviews. SEO-first, mobile-responsive, premium dark aesthetic.

**Live URL**: averyandbryant.com
**Repo**: github.com/abrepartners/averyandbryant-site

## Stack

- **Framework**: Next.js 16 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style, zinc base)
- **Bundler**: Turbopack (dev mode)
- **Deploy**: Vercel
- **Payments**: Stripe (webhooks → GHL contact sync)
- **CRM**: GoHighLevel (contact upsert, workflows, custom fields)
- **Orders**: Aryeo (order forms per vertical, product catalog)
- **Reviews**: Google Places API (live reviews on homepage)
- **Analytics**: GTM, GA4, Meta Pixel (all optional via env vars)
- **Icons**: Lucide React

## Commands

- **Dev**: `npm run dev` (Turbopack on localhost:3000)
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`
- **Type check**: `npx tsc --noEmit`
- **Deploy**: `npx vercel --prod` (or push to main)

## Architecture

```
src/
  app/
    page.tsx                     Homepage
    layout.tsx                   Root layout (nav, footer, analytics)
    globals.css                  Tailwind + custom CSS
    robots.ts                    Dynamic robots.txt
    sitemap.ts                   Dynamic sitemap
    not-found.tsx                404 page

    real-estate/page.tsx         Property vertical pages
    builders/page.tsx              (each has hero, services,
    airbnb-rentals/page.tsx         pricing, order CTA)
    lot-land/page.tsx
    multi-family/page.tsx
    commercial/page.tsx

    studio/page.tsx              Podcast studio vertical
    studioai/page.tsx            StudioAI product page
    branding/page.tsx            Agent branding vertical
    gallery/page.tsx             Portfolio gallery
    book/page.tsx                Booking page
    members/page.tsx             Stripe customer portal (Spot studio)
    referral/page.tsx            Referral program
    answr/page.tsx               Answr product page
    order/[vertical]/page.tsx    Dynamic order form embed per vertical
    preview/heroes/page.tsx      Hero component preview (dev only)

    api/stripe/webhook/route.ts  Stripe webhook → GHL contact + workflow

  components/
    nav.tsx                      Site navigation
    hero.tsx                     Homepage hero
    heroes/                      Per-vertical hero components
    footer.tsx                   Site footer
    order-form.tsx               Aryeo order form embed
    order-link.tsx               Order CTA button
    consult-cta.tsx              Free consultation CTA (amber pill)
    google-reviews.tsx           Live Google Reviews section
    analytics.tsx                GTM / GA4 / Meta Pixel loader
    utm-capture.tsx              UTM parameter capture
    scroll-to-top.tsx            Scroll-to-top button
    studio/podcast-carousel.tsx  Studio podcast room carousel

  lib/
    aryeo.ts                     Aryeo API client (server-only)
    ghl.ts                       GHL API client (server-only)
    order-forms.ts               Order form IDs per vertical
    utils.ts                     shadcn utility (cn)
    utm.ts                       UTM tracking utilities

scripts/
  aryeo/
    create-products.mjs          Aryeo product catalog creator
    new-products.json            Product definitions for catalog
  ghl/
    email-templates.mjs          GHL email template management
    rebrand-templates.mjs        Template rebranding script

docs/                            21 planning/reference docs
  launch-status.md               May 1 launch tracker
  pricing-matrix.md              Pricing by vertical
  order-form-field-specs.md      Aryeo form field specs
  webhook-flow.md                Stripe → GHL webhook flow
  dns-cutover-runbook.md         DNS migration steps
  ...

public/
  images/                        Portfolio photos, brand assets, before/after showcases
  favicon.svg                    SVG favicon
  og-image.svg                   Open Graph image
```

## Property Verticals

| Route | Aryeo Form ID | Order Form |
|-------|--------------|------------|
| `/real-estate` | `01918da6-2d38-7375-8fe1-96d7d74f812a` | homes.averyandbryant.com/order-forms/{id} |
| `/builders` | `01914ab4-8713-72aa-b503-63ed6d4a11a5` | " |
| `/airbnb-rentals` | `01918dcc-0824-72a8-abbe-61a9c9d9edb1` | " |
| `/lot-land` | `d6f632d8-1b59-4163-a63a-aeff8decce83` | " |
| `/multi-family` | `01914ab7-5488-710c-b2c9-62a929eed936` | " |
| `/commercial` | No Aryeo form — uses consult CTA | — |

## External Integrations

| Service | Purpose | Auth |
|---------|---------|------|
| Aryeo | Order forms, product catalog | `ARYEO_API_KEY` (server-only) |
| GoHighLevel | Contact upsert, workflows, custom fields | `GHL_API_TOKEN` + `GHL_LOCATION_ID` (server-only) |
| Stripe | Studio payments, webhooks, customer portal | `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` (server-only) |
| Google Places | Live reviews on homepage | `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` (server-only) |
| GTM / GA4 / Meta Pixel | Analytics tracking | `NEXT_PUBLIC_*` env vars (client-side, optional) |

## Applicable Skills

| Skill | When to use |
|-------|-------------|
| **leverage-audit** | After completing features |
| **ghl-refresh** | When GHL API or custom field behavior changes |
| **frontend-design** | When building new pages or components |
| **banana** | When generating hero images or portfolio visuals |

## Rules

- **SEO-first** — every page needs proper metadata, Open Graph tags, and structured data. Don't ship pages without them.
- **Real photos only** — never AI-generate images of A&B's actual business, showrooms, team, or portfolio. Use real photography from Aryeo/Dropbox. AI is only for stone/material/lifestyle scenes.
- **Server-only secrets** — `ARYEO_API_KEY`, `GHL_API_TOKEN`, `STRIPE_SECRET_KEY`, `GOOGLE_PLACES_API_KEY` must never leak to the client. Use `import "server-only"` in lib files that touch them.
- **Aryeo form IDs are in `src/lib/order-forms.ts`** — if forms are recreated in Aryeo, update that single file.
- **Stripe webhook maps products to GHL tags** — `TIER_TAGS` and `PRODUCT_TAGS` in `src/app/api/stripe/webhook/route.ts`. New Stripe products need entries here.
- **GHL custom field ID hardcoded** — Studio Schedule URL field `MeyPRVtDcNwSFyoh89ma` in the Stripe webhook. If recreated in GHL, update there.
- **shadcn/ui convention** — New York style, zinc base, Lucide icons. Add components via `npx shadcn@latest add <component>`.
- **Correct logo** — crimson AB monogram from `public/images/brand/`. NOT the black "ab" icon from Desktop.
- **No Canva** — all carousels and graphics use HTML/CSS or Banana/image-gen-engine. Never Canva.
- **GHL drafts only** — never schedule or publish content via GHL API. Always create as draft for manual approval.

## Project-Level Permissions

This repo has its own `.claude/settings.local.json` with an extensive allow list covering tsc, git, npm, curl, Vercel, Aryeo API, GHL MCP, Stripe MCP, Canva MCP, and Google Drive MCP. Review that file before adding new permissions — most common operations are already covered.

**Note**: The local settings file contains some allow rules with plaintext API tokens embedded in exact-match curl/node commands. These should be cleaned up in a separate pass — replace them with pattern-based rules that reference env vars instead of hardcoded credentials.
