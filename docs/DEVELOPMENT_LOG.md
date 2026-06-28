# Development Log — Royal Priesthood Website

> **Purpose:** Permanent engineering journal. Entries are chronological and never deleted.
> **Last Updated:** 2026-06-28

---

## 2026-06-11 09:06 — Day Zero: Monorepo Scaffold

**Task:** Initialize v4 rebuild as clean monorepo

**Files Modified:**
- `package.json` — root monorepo with npm workspaces
- `apps/web/package.json` — Next.js app scaffold
- `vercel.json` — security headers (moved to `apps/web/vercel.json` in subsequent commit)
- `design-inspo/*.txt` — reference notes (Motivation Church, VOUS, Austin Stone, Elevation)
- `docs/MIGRATION.md` — v3 → v4 migration tracking

**Reason:** Legacy v3 (rpacademy monorepo) had accumulated technical debt: stale Netlify config, `dev.db` in git, Next.js version skew, `db:push`-only migrations.

**Implementation Details:**
- Used npm workspaces for monorepo management
- `apps/web` as sole deployable application (Vercel root)
- Root `package.json` lists `next` purely for Vercel framework detection
- Design-inspo as text files for AI-assisted UI generation

**Testing Performed:** None (scaffold only)

**Problems Encountered:** None

**Resolution:** N/A

**Next Steps:** Build public homepage vertical slice

---

## 2026-06-11 09:16 — Motivation Church-Inspired Homepage

**Task:** Build first vertical slice of public homepage

**Files Modified:**
- `apps/web/src/app/(public)/page.tsx` — homepage
- Multiple new components in `components/home/` and `components/layout/`
- `components/ui/button.tsx` — Button primitive
- `lib/site.ts` — navigation constants

**Reason:** Prove public marketing hypothesis with a working homepage

**Implementation Details:**
- `(public)/` route group isolates marketing from future authenticated areas
- Motivation Church cream aesthetic, Cormorant + Inter typography
- Homepage sections: hero, mission, events, ministries, sermon, visit
- Shared header/footer with mobile menu

**Testing Performed:** Local dev server visual verification

**Problems Encountered:** None

**Resolution:** N/A

**Next Steps:** Fix Vercel deploy configuration

---

## 2026-06-11 09:20 — Fix Vercel Monorepo Deploy

**Task:** Fix Vercel framework detection for monorepo

**Files Modified:**
- `apps/web/vercel.json` — moved from repo root, security headers
- Root `package.json` — added `next` as dependency for detection

**Reason:** Vercel monorepo detection failed when headers lived at root without framework context

**Implementation Details:**
- Moved `vercel.json` to `apps/web/vercel.json`
- Security headers: HSTS 2-year, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy

**Testing Performed:** Vercel deploy verification

**Problems Encountered:** Vercel requires framework at repo root for monorepo detection

**Resolution:** Added `next` as root dependency

**Next Steps:** Architectural pivot — research-validated full-stack schema

---

## 2026-06-11 09:34 — Research-Validated Architecture Pivot

**Task:** Port full Prisma schema, auth system, RBAC middleware, three route groups

**Files Modified:**
- `apps/web/prisma/schema.prisma` — 35 models, 37 enums
- `apps/web/src/lib/prisma.ts` — lazy Turso/SQLite client
- `apps/web/src/lib/auth.ts` — NextAuth v5 with credentials + magic-link
- `apps/web/src/lib/auth-edge.ts` — JWT-only edge auth
- `apps/web/src/lib/magic-link.ts` — HMAC token creation/verification
- `apps/web/src/lib/rbac.ts` — route → role mapping
- `apps/web/src/middleware.ts` — NextAuth session gate + RBAC
- `apps/web/src/app/(public|member|ops)/` — three route groups
- `apps/web/src/app/(public)/login/page.tsx` — stub
- `apps/web/src/app/(member)/dashboard/page.tsx` — stub
- `apps/web/src/app/(member)/household/page.tsx` — stub
- `apps/web/src/app/(ops)/ops/page.tsx` — stub
- `apps/web/src/app/(ops)/admin/page.tsx` — stub
- `apps/web/.env.example` — environment template
- `docs/ARCHITECTURE.md` — architecture documentation
- `docs/ROADMAP.md` — 20-week implementation plan
- `docs/COMPLIANCE.md` — Kenya DPA checklist
- `docs/MIGRATION.md` — updated migration status

**Reason:** The project stops being "a marketing site" and becomes "Royal Priesthood OS" — the full ministry domain model

**Implementation Details:**
- 35 models in 13 domains: Identity, Household, Attendance, Visitors, Cell Groups, Giving, Discipleship/LMS, Events, Volunteers, Pastoral Care, Communications, Prayer, Public Website
- 37 enums covering all state machines
- Lazy Prisma client Proxy defers engine creation until first method invocation (Vercel build resilience)
- JWT session (30 days) injects `role`, `memberId`, `mustChangePassword`
- Login lockout after 5 failures for 15 minutes
- RBAC: ADMIN/HOSPITALITY/LEADERSHIP full ops access, CELL_LEADER limited
- The research report's five corrections codified in ARCHITECTURE.md

**Testing Performed:** Local build verification

**Problems Encountered:**
- Prisma query engine caches DB URL on first init — breaks builds without env vars (solved with lazy Proxy)
- Edge middleware cannot import Prisma/bcrypt — requires separate auth-edge.ts

**Resolution:** Lazy Proxy pattern for Prisma; dual auth files

**Next Steps:** Launch public website with burgundy/gold branding

---

## 2026-06-12 01:38 — Public Website Launch

**Task:** Full public marketing site launch with Royal Priesthood branding

**Files Modified:**
- All `(public)/` page files (13 routes + 2 dynamic routes)
- `content/*.json` — 7 JSON content files
- `lib/content.ts` — DB-first content layer with JSON fallback
- `lib/images.ts` — canonical image path map
- `lib/seo.ts` — per-page metadata + church JSON-LD
- `lib/slug.ts` — URL slug generation
- All `components/home/` — replaced Motivation aesthetic with burgundy/gold
- `components/content/` — sermon-card, event-card
- `components/forms/` — contact-form, prayer-form
- `components/shared/` — page-hero, service-times-grid
- `app/globals.css` — brand tokens, three visual registers
- `app/sitemap.ts` — sitemap.xml generation
- `app/robots.ts` — robots.txt generation
- `prisma/seed.ts` — database seeding from JSON
- `public/images/` — ~50 ministry images added
- `app/api/contact/route.ts` — contact form handler
- `app/api/prayer/route.ts` — prayer request handler
- `next.config.ts` — image remote patterns, URL redirects

**Reason:** Ship the embassy's public website with its own identity

**Implementation Details:**
- Brand pivot: burgundy `#6B1D3A`, gold `#C9A84C`, cream `#FAF7F2`
- Three visual registers: Celestial (dark sections), Parchment (content), Warm (CTAs)
- Fonts: Cinzel/Inter/JetBrains Mono (post-v3 change)
- JSON content layer allows build and deploy even if Turso is down
- 7 JSON files: site, sermons, series, events, leadership, testimonials, academy modules
- DB-first content with JSON fallback via `lib/content.ts`
- SEO: per-page metadata, church JSON-LD on homepage, sitemap, robots
- URL redirects: `/giving`→`/give`, `/plan-visit`→`/visit`, `/request-prayer`→`/prayer`, `/learn`→`/academy`

**Testing Performed:** Local dev server, Vercel preview deploy

**Problems Encountered:**
- Images from legacy repo had canonical path mismatches — solved with `lib/images.ts`
- Seed script needed careful mapping between JSON fields and Prisma models

**Resolution:** Centralized image path mapping; careful seed script design

**Next Steps:** Academy separation, ECC integration

---

## 2026-06-12 04:47 — Academy Separation

**Task:** Point academy enrollment to separate LMS app

**Files Modified:**
- `content/site.json` — `academyUrl` changed to `https://rpacademy.vercel.app/`

**Reason:** Kingdom Formation LMS runs as a separate deployed app (rpacademy)

**Implementation Details:** Single URL change in site configuration

**Testing Performed:** Link verification

**Problems Encountered:** None

**Resolution:** N/A

**Next Steps:** Implement on-demand revalidation from RP OS

---

## 2026-06-12 09:00 — ECC Integration (DB-First Revalidation)

**Task:** Make rpwebsite a read-mostly public renderer with RP OS as CMS

**Files Modified:**
- `lib/content.ts` — DB-first pivot, `unstable_cache` with tags
- `app/api/revalidate/route.ts` — new endpoint for RP OS cache busting
- `lib/prisma.ts` — environment-aware client configuration

**Reason:** RP OS Herald's Desk becomes CMS; public site must reflect Turso writes without full redeploy

**Implementation Details:**
- Content layer checks DB availability before falling back to JSON
- `unstable_cache` with 60s TTL and cache tags
- `POST /api/revalidate` accepts tags + paths from RP OS
- Cache tags: `sermons`, `events`, `leadership`, `testimonials`, `site-config`, `homepage`
- Admin UI stays in RP OS, not in this repo's `(ops)/` stubs

**Testing Performed:** `npm run test:ecc-sync` from RP OS repo

**Problems Encountered:**
- Next.js 16 requires `{ expire: 0 }` argument for `revalidateTag()`
- Vercel build env var absence causes Prisma to cache `undefined` URL

**Resolution:** Added cache profile argument; lazy Proxy pattern

**Next Steps:** Brand parity, forensic documentation

---

## 2026-06-12 — Brand Parity and Documentation

**Task:** Align logos/favicons with RP OS ecosystem; produce forensic README

**Files Modified:**
- `public/rp-logo.png`, `public/rp-logo.svg`, `public/rp-logo-mark.png`, `public/rp-logo-mark.svg`
- Multiple favicon sizes (16, 32, 48, 180, 192, 512)
- `README.md` — expanded to exhaustive forensic technical documentation

**Reason:** Ecosystem visual consistency across three Vercel deploys (rpwebsite, rpos, rpacademy)

**Implementation Details:**
- Official RP logos and transparent favicons
- README expanded with 1309 lines covering architecture, feature audit, production readiness, ecosystem integration

**Testing Performed:** Visual verification

**Problems Encountered:** None

**Resolution:** N/A

**Next Steps:** See README's known issues and task backlog

---

## 2026-06-13 — Production Due Diligence Audit

**Task:** Cross-repo forensic audit resolving README drift from HEAD

**Files Modified:**
- `README.md` — Appendix added documenting drift resolution

**Reason:** README claims didn't match HEAD `8623cb3` reality (login form, change-password, magic link, fonts)

**Implementation Details:**
- Resolved drift: login form exists, change-password page exists, magic link page exists, healthendpoint exists
- Documented URL split technical debt (canonical `rpchurch.vercel.app` vs SEO `rpwebsite.vercel.app`)

**Testing Performed:** Cross-referenced README claims against source code

**Problems Encountered:** README had drifted significantly from HEAD

**Resolution:** Added production due diligence appendix

**Next Steps:** Documentation reorganisation and AI memory system

---

## 2026-06-28 — Documentation & AI Memory System

**Task:** Reorganize repository documentation for human and AI maintainability

**Files Modified:**
- `README.md` — Rewritten as public-only documentation (removed development history)
- `CHANGELOG.md` — **Created** with v4.0.0 release notes, semantic versioning
- `PROJECT_MEMORY.md` — **Created** with living project state, feature completion, known issues
- `TASKS.md` — **Created** with high/medium/low priority backlog and completed items
- `AI_RULES.md` — **Created** as permanent AI agent instruction manual
- `docs/ARCHITECTURE.md` — Expanded with full implementation details, data flow diagrams
- `docs/DECISIONS.md` — **Created** with 10 Architecture Decision Records
- `docs/DEVELOPMENT_LOG.md` — **Created** with chronological engineering history
- `docs/API.md` — **Created** documenting all API routes
- `docs/DATABASE.md` — **Created** documenting database schema
- `docs/DEPLOYMENT.md` — **Created** documenting deployment processes
- `docs/ROADMAP.md` — Updated model count from 28 to 35

**Reason:** Establish persistent documentation and AI memory system that survives conversation resets

**Implementation Details:**
- Used source code as primary truth — no fabricated features
- Preserved all useful content from existing files
- ARCHITECTURE.md expanded with route tables, data flow, auth architecture, component inventory
- PROJECT_MEMORY.md designed as first-read for AI agents
- AI_RULES.md mandates procedural checklist before every commit
- DEVELOPMENT_LOG.md entries are permanent — never deleted
- DECISIONS.md uses ADR format with context, decision, consequences, alternatives
- Each API route documented with endpoint, method, parameters, request body, response, errors, auth

**Testing Performed:** Cross-referenced documentation against source code

**Problems Encountered:**
- Existing README was 1309 lines mixing public docs with development history — needed clean separation
- Schema line count changed from 28 to 35 models — needed docs update
- API routes had rate limiting wired but not noted in existing docs

**Resolution:** Public README stripped to essentials; development content moved to PROJECT_MEMORY.md, ARCHITECTURE.md, DEVELOPMENT_LOG.md

**Next Steps:** Begin high-priority tasks from TASKS.md (login UI, Turso Vercel config, rate limiting, canonical URL fix)