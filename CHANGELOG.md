# Changelog

All notable user-facing changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

---

## v4.0.0 — 2026-06-12

### Added
- Public marketing website with burgundy/gold branding (Royal Priesthood Embassy identity)
- Homepage with hero, service times, sermons, events, testimonials, CTA sections
- Sermon library with detail pages, series filtering, and YouTube channel links
- Event listing with upcoming/past views and detail pages
- Academy marketing page linking to rpacademy.vercel.app
- Contact form with `POST /api/contact` endpoint
- Prayer request form with `POST /api/prayer` endpoint and anonymous option
- Visit page with service schedule grid, Google Maps embed, FAQs, and RSVP
- About page with beliefs, values, leadership grid, 2026 theme gallery
- Giving page with M-Pesa till number and allocation breakdown
- Privacy policy (KDPA-oriented) and terms of service pages
- SEO metadata per page, sitemap.xml, robots.txt, church JSON-LD
- URL redirects: `/giving`→`/give`, `/plan-visit`→`/visit`, `/request-prayer`→`/prayer`, `/learn`→`/academy`
- Security headers: HSTS (2-year), X-Frame-Options DENY, X-Content-Type-Options nosniff
- RBAC middleware with three-layer route protection (public/member/ops)
- Magic link authentication (backend; email sending not wired)
- Login lockout after 5 failed attempts (15-minute cooldown)
- JWT session with role injection (30-day expiry)
- Audit logging on sign-in

### Changed
- Migrated from legacy rpacademy v3 monorepo (Netlify, SQLite in git) to clean v4 rebuild
- Database schema expanded to 35 models with 37 enums covering full ministry domain
- Content layer uses DB-first approach with JSON fallback for deployment resilience
- On-demand cache revalidation via `POST /api/revalidate` for RP OS integration
- Image assets centralized in `lib/images.ts` with canonical path mapping

### Infrastructure
- Monorepo with npm workspaces; single deployable `apps/web`
- Vercel deployment with security headers in `apps/web/vercel.json`
- Turso LibSQL (production) / SQLite file (development) via Prisma 6
- Next.js 16 App Router with React Server Components
- Tailwind CSS v4 styling with three visual registers (Celestial, Parchment, Warm)
- On-demand ISR with `unstable_cache` and cache tags

---

## v3.x

The legacy v3 codebase (`rpweb`) existed in the rpacademy repository prior to this v4 rebuild. See [rpacademy](https://github.com/RoyalPriesthoodTech/rpacademy) for historical changelogs.