# Royal Priesthood OS v4 — Technical README

**Ministry operating system for Royal Priesthood Embassy (Thika, Kenya).**  
Rebuilt from [rpacademy](https://github.com/RoyalPriesthoodTech/rpacademy) (legacy `rpweb` v3) with a research-validated architecture (May 2026 deep research report).

| Resource | URL |
|----------|-----|
| **Public website (live)** | [rpwebsite.vercel.app](https://rpwebsite.vercel.app) |
| **Kingdom Formation Academy** | [rpacademy.vercel.app](https://rpacademy.vercel.app/) |
| **Repository** | [github.com/ken-muritu/rpwebsite](https://github.com/RoyalPriesthoodTech/rpwebsite) |
| **Legacy lineage** | [github.com/ken-muritu/rpacademy](https://github.com/RoyalPriesthoodTech/rpacademy) |

**Version:** `4.0.0` (root `package.json`)  
**Current phase:** Phase 1 (Foundation) — public marketing site largely complete; CMS admin delegated to RP OS ECC; member/ops portals are scaffolds.  
**Production URL (canonical):** [rpchurch.vercel.app](https://rpchurch.vercel.app)  
**Last forensic update:** 2026-06-12 (commit `8623cb3`) · **13 commits**  
**Ecosystem:** [RP OS / ECC](https://github.com/RoyalPriesthoodTech/rpos) · [RP Academy](https://github.com/RoyalPriesthoodTech/rpacademy)

**Status legend:** ✅ Complete · ⚠️ Partial/Needs Work · ❌ Missing · 🔴 Critical Issue · 🟡 Technical Debt · 🟢 Good/Compliant

---

## Table of Contents

1. [Genesis & Evolution](#1-genesis--evolution) `[UPDATED]`
2. [Core Architecture](#2-core-architecture) `[UPDATED]`
3. [Functional Deep-Dive](#3-functional-deep-dive)
4. [Feature Audit & Production Readiness Assessment](#4-feature-audit--production-readiness-assessment) `[NEW]`
5. [Known Issues & Technical Debt](#5-known-issues--technical-debt) `[UPDATED]`
6. [Missing Features — Global Standards Gap Analysis](#6-missing-features--global-standards-gap-analysis) `[NEW]`
7. [Conception to Current State](#7-conception-to-current-state) `[UPDATED]`
8. [Ecosystem Integration (RP OS ECC)](#8-ecosystem-integration-rp-os-ecc) `[NEW]`
9. [Development](#9-development)
10. [Related Documentation](#10-related-documentation)

---

## 1. Genesis & Evolution

### 1.1 Problem statement (pre-v4)

Royal Priesthood Embassy needed a unified digital platform covering:

- **Public discovery** — visitors find service times, sermons, events, and giving options.
- **Member self-service** — households, giving history, discipleship progress.
- **Ministry operations** — CRM, check-in, pastoral care, reporting with role-based access.

The legacy codebase lived in **rpacademy** (`rpweb` v3, `apps/rpos-v3`). It accumulated debt: stale Netlify config, `dev.db` in git, Next.js version skew between root and app, `db:push`-only migrations, and no formal Kenya DPA compliance path before US-hosted database migration.

### 1.2 Research intervention (May 2026)

A multi-model deep research report (DeepSeek / ChatGPT / Kimi review) produced **five non-negotiable corrections** that govern all v4 decisions:

| # | Correction | Rationale |
|---|------------|-----------|
| 1 | Keep **Expo** through Phase 3 | PWA alone cannot satisfy staff offline check-in, QR scanning, and push on budget Android devices |
| 2 | **Household** as first-class domain | `Household` + `HouseholdMember` models from day one — not a `familyId` column on `Member` |
| 3 | **Kenya DPA 2019** before production data migration | Turso is US-hosted; cross-border transfer requires ODPC registration, DPA, SCCs |
| 4 | **Integer cents** for money | `GivingTransaction.amountCents Int` — never Prisma `Decimal` on SQLite |
| 5 | **20-week / 740-hour** timeline | M-Pesa (+2 wks), compliance, PWA testing each add buffer (corrected from Kimi's 16-week estimate) |

### 1.3 Git commit timeline (complete history)

The repository has **6 commits** (as of 2026-06-12). Every commit is documented below.

#### Commit `4793545` — 2026-06-11 — *Initial scaffold for Royal Priesthood OS v4 rebuild*

- **What:** Created monorepo skeleton with `apps/web` Next.js app, root `package.json` workspaces, `vercel.json` security headers, `design-inspo/` reference snapshots (Motivation Church, VOUS Church, Austin Stone, Elevation), and `docs/MIGRATION.md`.
- **Technology choices at this stage:**
  - **Next.js** (initially described as 15+ in commit message; subsequently upgraded to 16) — App Router, React Server Components, Vercel-native deploy.
  - **npm workspaces** — single deployable web app now; `packages/*` declared but never populated.
  - **Design-inspo text files** — human-readable pattern libraries rather than Figma tokens; chosen for speed of reference during AI-assisted rebuild.
- **Why not continue v3 in-place:** Clean break avoids carrying Netlify config, committed SQLite files, and version skew.

#### Commit `088456c` — 2026-06-11 — *Add Motivation Church-inspired public homepage*

- **What:** Introduced `(public)/` route group, marketing components (hero, mission, events, ministries, sermon, visit), shared header/footer, mobile menu, `Button` UI primitive, `lib/site.ts` navigation constants.
- **Design pivot:** Typography shifted from generic Inter to **Cormorant + Inter** with cream palette (later commit `7471631` pivoted again to **burgundy/gold** embassy branding).
- **Architectural decision:** Route groups `(public)` isolate marketing from future authenticated areas.

#### Commit `38d2f47` — 2026-06-11 — *Fix Vercel monorepo deploy configuration*

- **What:** Moved `vercel.json` from repo root to `apps/web/vercel.json`; added Next.js at repo root for Vercel framework detection; aligned deploy root to `apps/web`.
- **Why:** Vercel monorepo detection failed when headers lived at root without framework context. Root `package.json` now lists `next` as a dependency purely for detection.

#### Commit `4a03053` — 2026-06-11 — *Pivot to research-validated Royal Priesthood OS architecture*

- **What:** Largest architectural commit. Ported full Prisma schema (35 models, 37 enums), `lib/prisma.ts` lazy Turso client, `lib/auth.ts` + `auth-edge.ts` + `magic-link.ts`, `lib/rbac.ts`, `middleware.ts`, three route groups `(public|member|ops)`, stub pages for login/dashboard/household/ops, NextAuth API route, `.env.example`, and canonical docs (`ARCHITECTURE.md`, `ROADMAP.md`, `COMPLIANCE.md`, updated `MIGRATION.md`).
- **Why Prisma 6 + Turso LibSQL over Postgres:** Legacy v3 already used SQLite; Turso provides edge replication compatible with Vercel serverless; LibSQL adapter avoids connection pool exhaustion on serverless.
- **Why NextAuth v5 beta:** JWT sessions avoid server-side session store on serverless; role injection in JWT supports RBAC without DB round-trip per request in middleware.
- **Why dual auth files (`auth.ts` + `auth-edge.ts`):** Middleware runs on Edge runtime — cannot use Prisma or bcrypt. Edge file validates JWT only; server file handles credential verification.

#### Commit `7471631` — 2026-06-12 — *Launch Royal Priesthood public website as rpwebsite*

- **What:** Full public marketing site from PRD — burgundy/gold branding, JSON content layer (`content/*.json`), all public pages, migrated ministry images (~50 files in `public/images/`), Turso seed script, 7 website-specific Prisma models added to schema, production URL rename to `rpwebsite`.
- **Branding pivot:** Motivation Church cream aesthetic → Royal Priesthood Embassy burgundy (`#6B1D3A`), gold (`#C9A84C`), cream (`#FAF7F2`) with Montserrat/Bebas/Dancing Script fonts.
- **Content strategy decision:** JSON files as build-time fallback + Turso override via `lib/content.ts` — site works without database at build time; production can serve CMS-managed content after seed.

#### Commit `ec5fdec` — 2026-06-12 — *Point academy enrollment link to rpacademy.vercel.app*

- **What:** Updated `content/site.json` `academyUrl` from `https://academy.royalpriesthood.church` to `https://rpacademy.vercel.app/`.
- **Why:** Kingdom Formation LMS runs as a separate deployed app; church website links out rather than embedding LMS.

#### Commit `3d1e84e` — 2026-06-12 — *Expand README into exhaustive forensic technical documentation*

- **What:** First forensic README pass (35 models, feature inventory, security surface).
- **Why:** Establish single source of truth before ecosystem integration.

#### Commit `470afd3` — 2026-06-12 — *Serve public content DB-first with on-demand revalidation from RP OS*

- **What:** `lib/content.ts` pivots to **DB-first** in production; JSON fallback only in non-production when Turso unreachable. Added `unstable_cache` with tags (`sermons`, `events`, `site-config`, etc.). New `POST /api/revalidate` endpoint for RP OS Embassy Command Center.
- **Why:** Herald's Desk (RP OS) becomes CMS; public site must reflect Turso writes without full redeploy.
- **Architectural decision:** Admin UI stays in RP OS (`/ops/heralds-desk`), not in rpwebsite `(ops)/` stubs.

#### Commit `dd42d97` — 2026-06-12 — *Fix revalidate API for Next.js 16 required cache profile argument*

- **What:** `revalidateTag(tag, { expire: 0 })` — Next.js 16 breaking change fix.
- **Why:** ECC live sync test (`rpos` `npm run test:ecc-sync`) failed without explicit cache profile.

#### Commits `040ec26` / `ca6d8a1` — 2026-06-12 — *Official RP logos and transparent favicons*

- **What:** Brand assets aligned with RP OS and RP Academy.
- **Why:** Ecosystem visual consistency across three Vercel deploys.

### 1.4 Technology stack decisions (current)

| Layer | Choice | Alternatives considered | Why this choice |
|-------|--------|----------------------|-----------------|
| Framework | Next.js 16.2.9 App Router | Remix, Astro | RSC + API routes + middleware + Vercel first-class; team familiarity from v3 |
| Language | TypeScript 5 strict | JavaScript | Schema + content types; Prisma codegen |
| Styling | Tailwind CSS v4 | CSS Modules, styled-components | Utility-first matches rapid marketing iteration; v4 via `@tailwindcss/postcss` |
| ORM | Prisma 6.6 | Drizzle, Kysely | v3 schema port; migration tooling; LibSQL adapter |
| Database | Turso LibSQL (prod) / SQLite file (dev) | Supabase Postgres, PlanetScale | Edge replicas; integer-cent money on SQLite; v3 continuity |
| Auth | NextAuth 5.0.0-beta.25 | Clerk, Auth0 | Self-hosted; JWT roles; no per-MAU cost for church scale |
| Validation | Zod 4 | Yup, Valibot | API route input validation; auth credential parsing |
| Password hashing | bcryptjs cost 12 | argon2 | v3 parity; pure JS (no native addon issues on Vercel) |
| Email (planned) | Resend | SendGrid, SES | Documented in `.env.example`; not wired |
| Jobs (planned) | Inngest | BullMQ, Trigger.dev | Documented in architecture; not wired |
| Payments (planned) | M-Pesa Daraja STK Push | Stripe, PayPal | Kenya-primary congregation; M-Pesa till already on giving page |
| Mobile (planned) | Expo (Phase 3) | PWA-only, React Native bare | Research report mandates hybrid; staff offline check-in |
| Hosting | Vercel | Netlify (legacy), Railway | Prior Netlify debt in v3; Next.js co-location |

### 1.5 Planned but not yet in repository

| Item | Status | Documented in |
|------|--------|---------------|
| `packages/*` workspace packages | **Not created** | Root `package.json` workspaces |
| `apps/mobile` Expo app | **Not created** | `docs/ARCHITECTURE.md`, `docs/ROADMAP.md` Phase 3 |
| Inngest integration | **Not created** | `docs/ARCHITECTURE.md` |
| Resend email sending | **Not created** | `.env.example` |
| M-Pesa Daraja SDK | **Not created** | `docs/ROADMAP.md` Week 8–9 |
| GitHub Actions CI | **Not created** | `docs/ARCHITECTURE.md` mentions it |
| Prisma migrations (vs `db:push`) | **Not adopted** | `docs/MIGRATION.md` flags as pre-production requirement |

---

## 2. Core Architecture

### 2.1 Three-layer product model

```
┌─────────────────────────────────────────────────────────────┐
│  PUBLIC (public)/          No auth required                 │
│  Marketing, sermons, events, giving, contact, academy link  │
├─────────────────────────────────────────────────────────────┤
│  MEMBER (member)/          Session required                 │
│  Dashboard, household, giving history, discipleship         │
├─────────────────────────────────────────────────────────────┤
│  OPS (ops)/                Session + RBAC                   │
│  CRM, check-in, care, reports, admin content                │
└─────────────────────────────────────────────────────────────┘
```

| Layer | Route group | Auth | Roles | Purpose |
|-------|-------------|------|-------|---------|
| Public | `(public)/` | None | — | Marketing, giving info, events, sermons, academy redirect |
| Member | `(member)/` | Session (any logged-in user) | Intended: `MEMBER` + staff | Self-service dashboard |
| Ops | `(ops)/` | Session + RBAC | `ADMIN`, `HOSPITALITY`, `LEADERSHIP`, `CELL_LEADER`* | Ministry operations |

\* `CELL_LEADER` limited to `/ops`, `/ops/groups`, `/ops/attendance`, `/groups`.

Full spec: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

### 2.2 Repository file tree (every path, with role)

```
rpwebsite/
├── package.json                 # Monorepo root v4.0.0; workspaces; delegates scripts to apps/web
├── package-lock.json
├── README.md                    # This document
├── .gitignore                   # node_modules, .env*, *.db, .next, .vercel
│
├── apps/web/                    # ★ Sole deployable application (Vercel root)
│   ├── package.json             # App dependencies and DB scripts
│   ├── next.config.ts           # Image remote patterns, URL redirects
│   ├── vercel.json              # Security headers (HSTS, X-Frame-Options, etc.)
│   ├── tsconfig.json            # Strict TS; @/* → src/*
│   ├── eslint.config.mjs        # eslint-config-next
│   ├── postcss.config.mjs       # Tailwind v4
│   ├── .env.example             # Environment variable template
│   ├── AGENTS.md / CLAUDE.md    # Next.js 16 agent guidance
│   │
│   ├── content/                 # Static JSON CMS (build-time fallbacks)
│   │   ├── site.json            # Church metadata, services, beliefs, FAQs, academy URL
│   │   ├── sermons.json         # 8 published sermons
│   │   ├── series.json          # 6 sermon series
│   │   ├── events.json          # 6 events (2026 outreach/special)
│   │   ├── leadership.json      # 7 leadership bios
│   │   ├── testimonials.json    # 3 testimonials
│   │   └── academy-modules.json # 6 Kingdom Formation modules (marketing catalog)
│   │
│   ├── prisma/
│   │   ├── schema.prisma        # 35 models, 37 enums
│   │   ├── seed.ts              # Seeds Turso/SQLite from JSON + admin user
│   │   └── turso-client.ts      # Prisma factory for CLI scripts (non-lazy)
│   │
│   ├── scripts/
│   │   └── db-push-turso.ts     # Push schema to Turso via prisma migrate diff
│   │
│   ├── public/
│   │   ├── images/
│   │   │   ├── events/          # Event poster JPEGs (6 files)
│   │   │   ├── posters/         # Duplicate poster set + theme 2026
│   │   │   ├── services/      # Worship photography (~20 JPGs)
│   │   │   └── team/            # Leadership headshots (7 JPGs)
│   │   └── *.svg                # Default Next.js placeholder SVGs
│   │
│   └── src/
│       ├── middleware.ts        # NextAuth session gate + RBAC
│       ├── types/
│       │   ├── index.ts         # Content/domain TypeScript interfaces
│       │   └── next-auth.d.ts   # JWT session extensions (role, memberId)
│       ├── lib/                 # Server utilities (see §2.4)
│       ├── components/          # React UI (see §2.5)
│       └── app/
│           ├── layout.tsx       # Root layout, fonts, metadata
│           ├── globals.css      # Brand tokens, three visual registers
│           ├── robots.ts        # /robots.txt generation
│           ├── sitemap.ts       # /sitemap.xml from JSON content
│           ├── api/             # Route handlers
│           ├── (public)/        # Marketing pages
│           ├── (member)/        # Member portal (stubs)
│           └── (ops)/           # Ministry ops (stubs)
│
├── docs/
│   ├── ARCHITECTURE.md          # Stack, data flow, mobile strategy
│   ├── ROADMAP.md               # 20-week / 740-hour plan
│   ├── MIGRATION.md             # v3 → v4 port status
│   └── COMPLIANCE.md            # Kenya DPA 2019 checklist
│
└── design-inspo/                # Church website design reference notes
    ├── motivationchurch.txt     # Primary public-layer inspiration
    └── vouschurch.txt           # Secondary reference
```

**Note:** `design-inspo/austinstone.txt` and `elevationwebsite.txt` were added in commit `4793545` but are **deleted locally** (not in current tree). Data Unavailable for whether deletion was intentional.

### 2.3 Data flow

```
Browser / (future) Expo
    │
    ▼
Next.js 16 App Router
    ├── Server Components → lib/content.ts → JSON files (fallback)
    │                                    → Prisma (if DB available)
    ├── Client Components → fetch('/api/...') → Route Handlers → Prisma
    └── middleware.ts → auth-edge.ts (JWT validation only)
    │
    ▼
Prisma Client (lazy singleton via Proxy)
    │
    ├── Production: @prisma/adapter-libsql → Turso (libsql://)
    └── Development: SQLite file (DATABASE_URL=file:./prisma/dev.db)
    │
    ▼
(future) Inngest / Resend / M-Pesa Daraja
```

**Critical Prisma invariant** (`lib/prisma.ts`): The query engine is a singleton that caches the database URL on first init. Build-time initialization without env vars caches `undefined` and breaks all queries. Solution: lazy `Proxy` that defers engine creation until first method invocation; production always uses proxy; development creates eagerly for DX.

```26:63:apps/web/src/lib/prisma.ts
function createRealPrismaClient(): PrismaClient {
  const tursoUrl = getEnvVar('TURSO_DATABASE_URL')
  const tursoAuthToken = getEnvVar('TURSO_AUTH_TOKEN') || getEnvVar('DATABASE_AUTH_TOKEN')
  // ...
  const useTurso = tursoUrl && tursoAuthToken && tursoUrl.startsWith('libsql://')
  if (useTurso) {
    const adapter = new PrismaLibSQL({ url: tursoUrl, authToken: tursoAuthToken })
    return new PrismaClient({ adapter, log: ['error'] })
  }
  if (process.env.NODE_ENV === 'production' && !tursoUrl) {
    throw new Error('TURSO_DATABASE_URL environment variable is not set.')
  }
  return new PrismaClient({ log: /* dev: verbose, prod: error only */ })
}
```

**Content layer pattern** (`lib/content.ts`): Every `get*()` function follows:

1. `dbAvailable()` — `SELECT 1` probe
2. If DB up → query Prisma model
3. If rows exist → return mapped DB data
4. Else → return static JSON import

Sync helpers (`getSermonsSync`, `getEventsSync`, `getSeriesSync`) exist for `generateStaticParams` at build time without async DB.

### 2.4 `lib/` modules (complete reference)

| Module | Exports | Dependencies | Role |
|--------|---------|--------------|------|
| `auth.ts` | `auth`, `signIn`, `signOut`, `handlers` | next-auth, bcryptjs, zod, prisma, magic-link | Server NextAuth: credentials + magic-link providers; JWT 30-day; login lockout; audit log |
| `auth-edge.ts` | `auth` | next-auth, zod | Edge middleware auth — JWT callbacks only, no DB |
| `magic-link.ts` | `createMagicLinkToken`, `verifyMagicLinkToken`, `buildMagicLinkUrl` | crypto | HMAC-SHA256 tokens, 15-min TTL; targets `/auth/magic` (page not built) |
| `prisma.ts` | `getPrisma`, `prisma`, `$transaction`, `testConnection` | @prisma/client, adapter-libsql | Lazy singleton Prisma client |
| `rbac.ts` | path classifiers, `canAccessOpsRoute`, `getDefaultRedirectForRole` | none | Route → role mapping for middleware |
| `content.ts` | 20+ `get*` functions, formatters, sync helpers | JSON, prisma, images, types | Hybrid CMS data layer |
| `site.ts` | `site`, `navLinks` | site.json | Static nav + site constants |
| `seo.ts` | `createPageMetadata`, `churchSchema` | site.json | Per-page metadata + schema.org Church JSON-LD |
| `images.ts` | `images` | none | Canonical `/images/...` path map |
| `cn.ts` | `cn` | clsx, tailwind-merge | Tailwind class merge |

### 2.5 Components (complete reference)

| Directory | Component | Used by | Status |
|-----------|-----------|---------|--------|
| `layout/` | `site-header.tsx` | `(public)/layout` | **Working** |
| `layout/` | `site-footer.tsx` | `(public)/layout` | **Working** |
| `layout/` | `mobile-menu.tsx` | `site-header` | **Working** |
| `home/` | `hero-section.tsx` | Homepage | **Working** |
| `home/` | `service-times-section.tsx` | Homepage | **Working** |
| `home/` | `welcome-section.tsx` | Homepage | **Working** |
| `home/` | `sermon-section.tsx` | Homepage | **Working** |
| `home/` | `events-section.tsx` | Homepage | **Working** |
| `home/` | `what-to-expect-section.tsx` | Homepage | **Working** |
| `home/` | `testimonials-section.tsx` | Homepage | **Working** |
| `home/` | `cta-banner-section.tsx` | Homepage | **Working** |
| `content/` | `sermon-card.tsx` | Sermons, series pages | **Working** |
| `content/` | `event-card.tsx` | Events list, homepage | **Working** |
| `forms/` | `contact-form.tsx` | `/contact` | **Working** (requires DB for persistence) |
| `forms/` | `prayer-form.tsx` | `/prayer` | **Working** (requires DB for persistence) |
| `shared/` | `page-hero.tsx` | Most public pages | **Working** |
| `shared/` | `service-times-grid.tsx` | `/visit`, service-times section | **Working** |
| `ui/` | `button.tsx` | Widespread CTAs | **Working** |
| `ui/` | `decorated-text.tsx` | — | **Not used** (dead code) |

### 2.6 Prisma schema — 35 models, 37 enums

**Datasource:** `provider = "sqlite"` with Turso LibSQL adapter at runtime.

#### Models by domain

| Domain | Models |
|--------|--------|
| Identity | `User`, `Member` |
| Household | `Household`, `HouseholdMember` |
| Attendance | `ServiceSession`, `Attendance` |
| Visitors | `Visitor`, `FollowUp` |
| Cell groups | `CellGroup`, `CellGroupMembership` |
| Giving | `GivingTransaction`, `GivingCampaign` |
| Discipleship/LMS | `DiscipleshipModule`, `DiscipleshipLesson`, `MemberProgress`, `Quiz`, `QuizQuestion` |
| Events | `ChurchEvent`, `EventRegistration` |
| Volunteers | `VolunteerRole`, `VolunteerAssignment` |
| Pastoral care | `CareCase`, `CareNote` |
| Communications | `Announcement`, `MessageLog` |
| Prayer (ops) | `PrayerRequest` |
| Audit/system | `AuditLog`, `SystemConfig` |
| Public website | `SermonSeries`, `PublicSermon`, `WebsiteLeader`, `WebsiteTestimonial`, `WebsiteAcademyModule`, `ContactSubmission`, `PrayerSubmission` |

#### Key relationships

- `User` 1:1 optional `Member`
- `Member` N:1 `Household`, `CellGroup`; 1:1 `HouseholdMember`, `CellGroupMembership`
- `Household` 1:N `HouseholdMember`, `Member`, `GivingTransaction`, `CareCase`
- `ServiceSession` 1:N `Attendance`, `Visitor`
- `Visitor` 1:N `FollowUp`; optional conversion to `Member`
- `DiscipleshipModule` 1:N `DiscipleshipLesson` → optional `Quiz` → `QuizQuestion`
- `ChurchEvent` 1:N `EventRegistration`
- `SermonSeries` 1:N `PublicSermon`

#### Enums (37)

`UserRole`, `Gender`, `MaritalStatus`, `DiscipleshipLevel`, `MemberStatus`, `HouseholdRole`, `HouseholdStatus`, `SessionType`, `SessionStatus`, `CheckInMethod`, `VisitorSource`, `FollowUpStatus`, `FollowUpType`, `FollowUpTaskStatus`, `CellGroupStatus`, `CellGroupRole`, `CellGroupMembershipStatus`, `GivingMethod`, `GivingFund`, `TransactionStatus`, `RecurringFrequency`, `ProgressStatus`, `QuestionType`, `ChurchEventType`, `ChurchEventStatus`, `PaymentStatus`, `AssignmentStatus`, `CareCaseType`, `CarePriority`, `CareCaseStatus`, `AnnouncementPriority`, `TargetAudience`, `MessageType`, `MessageStatus`, `PrayerCategory`, `PrayerStatus`, `AuditAction`

**Financial invariant:** `GivingTransaction.amountCents` is `Int` (smallest currency unit). No `Decimal` fields.

### 2.7 Middleware and RBAC flow

```10:47:apps/web/src/middleware.ts
export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const mustChangePassword = req.auth?.user?.mustChangePassword;

  if (isPublicPath(pathname)) return NextResponse.next();
  if (!isLoggedIn) { /* redirect to /login?callbackUrl= */ }
  if (mustChangePassword && pathname !== "/change-password") { /* redirect */ }
  if (isOpsPath(pathname) && !canAccessOpsRoute(pathname, userRole)) { /* redirect */ }
  return NextResponse.next();
});
```

**Matcher excludes:** `api`, `_next/static`, `_next/image`, `images`, `favicon.ico`, `manifest.json`, `robots.txt`, `sitemap.xml` — API routes bypass middleware entirely.

**RBAC role matrix for ops routes:**

| Role | Ops access |
|------|------------|
| `ADMIN`, `HOSPITALITY`, `LEADERSHIP` | All ops prefixes |
| `CELL_LEADER` | `/ops`, `/ops/groups`, `/ops/attendance`, `/groups` only |
| `MEMBER` | Redirected to `/dashboard` |
| Unauthenticated | Redirected to `/login` |

**Note:** `isMemberPath()` is defined in `rbac.ts` but **never called** by middleware — member routes only require login, not `MEMBER` role specifically.

### 2.8 Auth system (server)

Two credential providers in `lib/auth.ts`:

1. **`credentials`** — email + password (Zod: email + min 8 chars), bcrypt compare, lockout after 5 failures for 15 minutes.
2. **`magic-link`** — HMAC token verification via `verifyMagicLinkToken()`, no password.

JWT session (30 days) injects `role`, `memberId`, `mustChangePassword`. Sign-in creates `AuditLog` entry with action `LOGIN`.

```86:114:apps/web/src/lib/auth.ts
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error(`Account locked until ${user.lockedUntil.toISOString()}`)
        }
        const isValid = await bcrypt.compare(password, user.passwordHash)
        if (!isValid) {
          const newAttempts = user.failedLoginAttempts + 1
          const shouldLock = newAttempts >= 5
          await db.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: newAttempts,
              lockedUntil: shouldLock ? new Date(Date.now() + 15 * 60 * 1000) : null,
            },
          })
          // ...
        }
```

### 2.9 Environment variables

| Variable | Used in code | Purpose |
|----------|--------------|---------|
| `DATABASE_URL` | Prisma schema, local dev | SQLite file path |
| `TURSO_DATABASE_URL` | `prisma.ts`, `turso-client.ts` | Production LibSQL URL |
| `TURSO_AUTH_TOKEN` / `DATABASE_AUTH_TOKEN` | `prisma.ts`, `turso-client.ts` | Turso auth |
| `NEXTAUTH_URL` | NextAuth, `magic-link.ts` | Canonical app URL |
| `NEXTAUTH_SECRET` / `AUTH_SECRET` | NextAuth, `magic-link.ts` | JWT + HMAC signing |
| `NODE_ENV` | `prisma.ts` | Prod vs dev client behavior |
| `APP_NAME`, `APP_URL` | — | **Defined in `.env.example`, not referenced in source** |
| `RESEND_API_KEY`, `EMAIL_*` | — | **Defined, not wired** |

### 2.10 Dependency tree (runtime)

```
apps/web
├── next@16.2.9
├── react@19.2.4 / react-dom@19.2.4
├── next-auth@5.0.0-beta.25
├── @prisma/client@6.6.0 + prisma@6.6.0 (dev)
├── @prisma/adapter-libsql@6.6.0 + @libsql/client@0.15.0
├── bcryptjs@2.4.3
├── zod@4
├── lucide-react@1.17.0
├── clsx@2.1.1 + tailwind-merge@3.6.0 + class-variance-authority@0.7.1
└── tailwindcss@4 (dev) + @tailwindcss/postcss@4 (dev)
```

Root `package.json` additionally lists `next`, `react`, `react-dom` for Vercel framework detection.

### 2.11 npm scripts

| Script | Location | Command |
|--------|----------|---------|
| `dev` | root → web | `next dev` |
| `build` | root → web | `prisma generate && next build` |
| `lint` | root → web | `eslint` |
| `type-check` | root → web | `tsc --noEmit` |
| `db:generate` | web | `prisma generate` |
| `db:push` | web | `prisma db push` (local SQLite) |
| `db:push:turso` | web | `tsx scripts/db-push-turso.ts` |
| `db:seed` | web | `tsx prisma/seed.ts` |
| `db:setup` | web | `db:push:turso && db:seed` |
| `db:studio` | web | `prisma studio` |
| `postinstall` | web | `prisma generate` |

### 2.12 Test infrastructure

| Framework | Present |
|-----------|---------|
| Vitest | **No** |
| Jest | **No** |
| Playwright | **No** (optional peer in lockfile only) |
| `*.test.ts` / `*.spec.ts` | **0 files** |

**Test coverage status:** Data Unavailable (no coverage tooling configured).

---

## 3. Functional Deep-Dive

For each feature: logic, implementation, status, and test coverage.

**Status legend:**
- **Working** — renders/functions in production with JSON fallback or DB
- **Partial** — backend exists, UI incomplete or requires external config
- **Stub** — placeholder page only
- **Not Working** — broken or unreachable

---

### 3.1 Public layer — pages

#### `/` — Homepage

| Aspect | Detail |
|--------|--------|
| **File** | `src/app/(public)/page.tsx` |
| **Logic** | Composes 8 home sections + injects `churchSchema()` JSON-LD |
| **Data** | `getLatestSermon()`, `getUpcomingEvents()`, `getServiceTimes()`, etc. via child components |
| **Status** | **Working** |
| **Tests** | None |

#### `/about` — About & beliefs

| Aspect | Detail |
|--------|--------|
| **Logic** | Story, statement of faith (`getBeliefs()`), values (`getValues()`), leadership grid (`getLeadership()`), 2026 theme section with `images.theme2026` gallery |
| **Status** | **Working** |
| **Tests** | None |

#### `/visit` — Plan your visit

| Aspect | Detail |
|--------|--------|
| **Logic** | Service schedule grid, Google Maps embed, visit steps, FAQs (`getVisitFaqs()`), RSVP CTA |
| **Edge case** | Maps embed may use generic coordinates — verify against `site.json` `address.mapsUrl` |
| **Status** | **Working** (map accuracy: **Partial** — Data Unavailable for exact embed coordinates) |
| **Tests** | None |

#### `/sermons` — Sermon library

| Aspect | Detail |
|--------|--------|
| **Logic** | Lists all published sermons; series filter chips; uses `SermonCard` |
| **Status** | **Working** |
| **Tests** | None |

#### `/sermons/[slug]` — Sermon detail

| Aspect | Detail |
|--------|--------|
| **Logic** | `getSermonBySlug()`, related sermons, `generateStaticParams()` from `getSermonsSync()` |
| **Video** | Links to YouTube **channel** URL in JSON — not embedded player, not per-sermon video IDs |
| **Status** | **Working** (video playback: **Partial** — external link only) |
| **Tests** | None |

#### `/series` — Series index

| Aspect | Detail |
|--------|--------|
| **Logic** | `getSeries()` cards with sermon counts |
| **Status** | **Working** |
| **Tests** | None |

#### `/series/[slug]` — Series detail

| Aspect | Detail |
|--------|--------|
| **Logic** | `getSermonsBySeries()`, empty-state message for series with 0 sermons (e.g. `gift-series`) |
| **Status** | **Working** |
| **Tests** | None |

#### `/events` — Events listing

| Aspect | Detail |
|--------|--------|
| **Logic** | Upcoming/ongoing + past event grids from `getEvents()` |
| **Status** | **Working** |
| **Tests** | None |

#### `/events/[slug]` — Event detail

| Aspect | Detail |
|--------|--------|
| **Logic** | `getEventBySlug()`, poster image, date/time/location |
| **Status** | **Working** |
| **Tests** | None |

#### `/academy` — Kingdom Formation marketing

| Aspect | Detail |
|--------|--------|
| **Logic** | Module catalog from `getAcademyModules()`; external CTA to `site.academyUrl` → `https://rpacademy.vercel.app/` |
| **Status** | **Working** (LMS itself is separate app) |
| **Tests** | None |

#### `/give` — Giving

| Aspect | Detail |
|--------|--------|
| **Logic** | Static M-Pesa till (`8598004`), account name, giving theology, allocation breakdown (35/30/25/10% static copy) |
| **Payments** | No STK Push, no online processing — display only |
| **Status** | **Working** (informational); online giving: **Not implemented** |
| **Tests** | None |

#### `/contact` — Contact

| Aspect | Detail |
|--------|--------|
| **Logic** | Church contact info + `ContactForm` client component |
| **Persistence** | `POST /api/contact` → `ContactSubmission` table |
| **Status** | **Partial** — form UI works; persistence requires Turso/SQLite configured on Vercel |
| **Tests** | None |

#### `/prayer` — Prayer requests

| Aspect | Detail |
|--------|--------|
| **Logic** | `PrayerForm` with anonymous option |
| **Persistence** | `POST /api/prayer` → `PrayerSubmission` table |
| **RBAC note** | `/prayer` is in `PUBLIC_PATH_PREFIXES` — public page; also listed in `MEMBER_PATH_PREFIXES` (unused conflict) |
| **Status** | **Partial** — same DB dependency as contact |
| **Tests** | None |

#### `/login` — Sign in

| Aspect | Detail |
|--------|--------|
| **Logic** | Placeholder text only — no form, no `signIn()` call |
| **Backend** | NextAuth handlers at `/api/auth/[...nextauth]` are fully implemented |
| **Status** | **Stub / Not Working** for end users — cannot sign in via UI |
| **Tests** | None |

#### `/privacy` — Privacy policy

| Aspect | Detail |
|--------|--------|
| **Logic** | KDPA-oriented policy text; mentions Google Analytics |
| **Status** | **Working** (content); GA implementation: **Not present** |
| **Tests** | None |

#### `/terms` — Terms of service

| Aspect | Detail |
|--------|--------|
| **Status** | **Working** |
| **Tests** | None |

---

### 3.2 Public layer — infrastructure features

#### URL redirects

| Source | Destination | Config |
|--------|-------------|--------|
| `/giving` | `/give` | `next.config.ts` permanent |
| `/plan-visit` | `/visit` | permanent |
| `/request-prayer` | `/prayer` | permanent |
| `/learn` | `/academy` | permanent |

**Status:** **Working**

#### SEO — metadata

| Feature | File | Status |
|---------|------|--------|
| Per-page `createPageMetadata()` | `lib/seo.ts` | **Working** |
| Church JSON-LD on homepage | `lib/seo.ts` `churchSchema()` | **Working** |
| `sitemap.xml` | `app/sitemap.ts` | **Working** — static pages + dynamic sermon/series/event slugs from JSON |
| `robots.txt` | `app/robots.ts` | **Working** — disallows `/ops/`, `/dashboard/`, `/admin/`, `/api/` |

#### Security headers

| Header | Value | Source |
|--------|-------|--------|
| HSTS | 2-year, preload | `vercel.json` |
| X-Frame-Options | DENY | `vercel.json` |
| X-Content-Type-Options | nosniff | `vercel.json` |
| Referrer-Policy | strict-origin-when-cross-origin | `vercel.json` |
| Permissions-Policy | camera/geolocation self; mic/payment restricted | `vercel.json` |

**Status:** **Working** on Vercel deploy

#### Visual design system

| Register | Context | Tokens |
|----------|---------|--------|
| Celestial | Hero, dark sections | Burgundy gradients |
| Parchment | Content sections | Cream `#FAF7F2` |
| Warm | CTAs, accents | Gold `#C9A84C` |

**Fonts:** Montserrat (body), Bebas Neue (display), Dancing Script (accent) — loaded in root `layout.tsx`.

**Status:** **Working**

#### Mobile navigation

| Feature | Implementation |
|---------|----------------|
| Hamburger menu | `mobile-menu.tsx` — full-screen overlay |
| Header scroll state | `site-header.tsx` — background opacity on scroll |

**Status:** **Working**

#### Skip link (a11y)

Root layout includes skip-to-content link.

**Status:** **Working**

---

### 3.3 API routes

#### `POST /api/contact`

```12:34:apps/web/src/app/api/contact/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    await getPrisma().contactSubmission.create({ data: { ... } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
```

| Aspect | Detail |
|--------|--------|
| **Validation** | Zod: name 1–200, email, phone optional max 30, message 1–5000 |
| **Auth** | None (public) |
| **Rate limit** | None |
| **Status** | **Working** when DB configured; **Not Working** on Vercel without `TURSO_*` env → 500 |
| **Tests** | None |

#### `POST /api/prayer`

| Aspect | Detail |
|--------|--------|
| **Validation** | Zod: request 1–5000, name optional, anonymous flag |
| **Logic** | If `anonymous`, stores `name: null` |
| **Status** | Same as contact — **Partial** |
| **Tests** | None |

#### `/api/auth/[...nextauth]`

| Aspect | Detail |
|--------|--------|
| **Methods** | GET, POST (NextAuth standard) |
| **Providers** | credentials, magic-link |
| **Status** | **Working** (API level); unusable without login UI or magic-link email flow |
| **Tests** | None |

---

### 3.4 Member portal (`(member)/`)

| Route | File | Status | Notes |
|-------|------|--------|-------|
| `/dashboard` | `dashboard/page.tsx` | **Stub** | "Phase 1, Week 4" placeholder |
| `/household` | `household/page.tsx` | **Stub** | Describes household domain; no Prisma queries |

**Nav links without pages:** `/giving-history`, `/discipleship`, `/profile`, `/attendance`, `/volunteer`, `/my-group`, `/certificates`, `/member-dashboard`

**Layout:** `member/layout.tsx` provides header nav — **Working** (shell only)

**Prisma models ready but unwired:** `Household`, `HouseholdMember`, `Member`, `GivingTransaction`, `MemberProgress`

---

### 3.5 Ministry ops (`(ops)/`)

| Route | File | Status | Notes |
|-------|------|--------|-------|
| `/ops` | `ops/page.tsx` | **Stub** | CRM dashboard placeholder |
| `/admin` | `admin/page.tsx` | **Stub** | Links to `/admin/sermons`, `/admin/events`, `/admin/content` — **pages do not exist** |

**Nav links without pages:** `/ops/check-in`, `/ops/members`, `/ops/reports`

**RBAC prefixes without routes:** `/members`, `/visitors`, `/groups`, `/care`, `/reports`, `/settings`, `/volunteers`, `/announcements`, `/users`

**Prisma models ready but unwired:** All ops-domain models (Visitor, Attendance, CareCase, etc.)

---

### 3.6 Authentication features (backend)

| Feature | Status | Notes |
|---------|--------|-------|
| Email/password login | **Partial** | `authorize()` complete; no UI |
| Login lockout (5 fails → 15 min) | **Working** (server) | Untested without UI |
| Magic link token creation | **Working** (library) | `createMagicLinkToken()` never called |
| Magic link verification | **Working** (server) | Provider exists in auth.ts |
| Magic link page `/auth/magic` | **Not Working** | Route does not exist |
| Magic link email sending | **Not implemented** | Resend not integrated |
| JWT role injection | **Working** | `role`, `memberId`, `mustChangePassword` in session |
| Password change redirect | **Not Working** | `/change-password` page missing |
| Audit log on login | **Working** (server) | `AuditLog` CREATE on signIn event |
| Seed admin user | **Working** (script) | `admin@royalpriesthood.church` / `(local — set via SEED_ADMIN_PASSWORD)` |

---

### 3.7 Database and seeding

| Feature | Command | Status |
|---------|---------|--------|
| Local schema push | `npm run db:push` | **Working** |
| Turso schema push | `npm run db:push:turso` | **Working** (requires Turso credentials) |
| Seed from JSON | `npm run db:seed` | **Working** — populates SystemConfig, sermons, series, events, leaders, testimonials, academy modules, admin user |
| Prisma Studio | `npm run db:studio` | **Working** |
| Production Turso on Vercel | — | **Data Unavailable** — ROADMAP marks unchecked |

---

### 3.8 Content JSON inventory

| File | Records | Key fields |
|------|---------|------------|
| `site.json` | 1 | Name, tagline, scripture, address (Thika), M-Pesa till, academy URL, 4 service times, 6 beliefs, 3 values, 8 FAQs |
| `sermons.json` | 8 | slug, title, series, speaker, date, YouTube channel URL, thumbnails |
| `series.json` | 6 | slug, title, sermonCount (includes `gift-series` with 0) |
| `events.json` | 6 | 2026 outreach events with posters |
| `leadership.json` | 7 | Pastor + 6 team with bios and `/images/team/*.jpg` |
| `testimonials.json` | 3 | Quote, name, role |
| `academy-modules.json` | 6 | Module catalog mirroring rpacademy content |

---

### 3.9 Image assets

~50 files under `public/images/`:

| Directory | Count | Purpose |
|-----------|-------|---------|
| `team/` | 7 | Leadership headshots |
| `services/` | ~20 | Worship photography, Kingdom Formation series art |
| `events/` | 6 | Event posters |
| `posters/` | ~12 | Duplicates + theme 2026 latter rain |

Canonical paths centralized in `lib/images.ts`. Source lineage: `github.com/ken-muritu/rpacademy/assets/images/`.

**Known filename typo:** `kindgom-formation.jpg` (misspelled) — not referenced in `images.ts`.

**Status:** **Working** — assets present in repo (commit `7471631`).

---

## 4. Feature Audit & Production Readiness Assessment

`[NEW]` — Evaluated for global-scale production readiness (June 12, 2026).

### 4.1 Security & Compliance

| Control | Status | Detail |
|---------|--------|--------|
| Authentication backend | ⚠️ | NextAuth credentials + magic-link providers wired; **no login UI** |
| Login lockout (5 fails → 15 min) | ✅ | Server-side in `lib/auth.ts` |
| RBAC middleware | ✅ | Ops routes gated; member routes login-only |
| MFA | ❌ | |
| Rate limiting | ❌ | Contact/prayer APIs unprotected |
| Encryption in transit | ✅ | HTTPS + HSTS (vercel.json) |
| Encryption at rest | ⚠️ | Turso default (`aws-eu-west-1`) |
| Input validation | ✅ | Zod on `/api/contact`, `/api/prayer` |
| Audit logging | ⚠️ | Login only; no export logging |
| Kenya DPA / ODPC | ❌ | `docs/COMPLIANCE.md` all unchecked |
| Secrets in seed | 🔴 | `(local — set via SEED_ADMIN_PASSWORD)` in `prisma/seed.ts` |
| Revalidate API auth | ✅ | `x-revalidate-secret` header required |
| Dependency scanning | ❌ | |

### 4.2 Reliability & Resilience

| Control | Status |
|---------|--------|
| JSON fallback when DB down | ✅ Non-production only (`useJsonFallback()`) |
| Error handling on APIs | ⚠️ Generic 500 messages |
| Retry / circuit breaker | ❌ |
| Health check endpoint | ❌ No `/api/health` — use homepage 200 |
| Graceful degradation | ✅ Static JSON ensures build succeeds |

### 4.3 Observability & Monitoring

| Control | Status |
|---------|--------|
| Structured logging | ❌ |
| Metrics / tracing | ❌ |
| Alerting / SLOs | ❌ |
| Sentry | ❌ |

### 4.4 Performance & Scalability

| Control | Status |
|---------|--------|
| ISR + cache tags | ✅ 60s TTL via `unstable_cache` |
| On-demand revalidation | ✅ `/api/revalidate` from RP OS |
| `dbAvailable()` per request | 🟡 Extra `SELECT 1` on uncached paths |
| Load testing | **Data Unavailable** |
| CDN | ⚠️ Vercel edge only |

### 4.5 Data Management

| Control | Status |
|---------|--------|
| Prisma migrations | ❌ `db:push` only |
| Backup / DR | ❌ Not documented |
| PII in ContactSubmission | ⚠️ Stored plaintext |
| CMS source of truth | ✅ Turso in production; ECC writes via RP OS |

### 4.6 API & Integration

| Route | Status |
|-------|--------|
| `POST /api/contact` | ⚠️ Requires Turso on Vercel |
| `POST /api/prayer` | ⚠️ Same |
| `POST /api/revalidate` | ✅ ECC webhook from RP OS |
| `GET/POST /api/auth/*` | ✅ Backend only |
| OpenAPI docs | ❌ |
| M-Pesa / Resend / Inngest | ❌ Planned |

### 4.7 CI/CD & Deployment

| Control | Status |
|---------|--------|
| GitHub Actions CI | ❌ |
| Vercel auto-deploy | ✅ `main` → production |
| Staging environment | ❌ |
| Rollback | ⚠️ Manual via Vercel dashboard |

### 4.8 Code Quality & Maintainability

| Metric | Status |
|--------|--------|
| Test coverage | **0%** |
| Lint / typecheck scripts | ✅ `npm run lint`, `type-check` |
| Schema vs UI gap | 🔴 35 models, ~8 actively used |
| Documentation | ✅ This README |

### 4.9 Localization & Accessibility

| Control | Status |
|---------|--------|
| i18n / Swahili | ❌ English only |
| WCAG 2.1 AA audit | ❌ PRD planned |
| Skip link | ✅ Root layout |
| Mobile responsive | ✅ |
| Cross-browser testing | **Data Unavailable** |

### 4.10 User & Tenant Management

| Control | Status |
|---------|--------|
| Multi-tenancy | ❌ Single church |
| Member portal | ❌ Stub pages only |
| CMS admin | ✅ Delegated to RP OS Herald's Desk |
| SSO with RP OS / Academy | ❌ |

---

## 5. Known Issues & Technical Debt

`[UPDATED]` — Section renumbered from 4.

### 5.1 Critical

| ID | Issue | Impact | Location |
|----|-------|--------|----------|
| C-1 | **No login UI** | Auth backend complete but users cannot sign in | `(public)/login/page.tsx` |
| C-2 | **Production DB dependency** | Contact/prayer forms return 500 without Turso on Vercel | `api/contact`, `api/prayer`, `prisma.ts` |
| C-3 | **Hardcoded seed password** | `(local — set via SEED_ADMIN_PASSWORD)` in seed script, logged to console | `prisma/seed.ts:46-64` |
| C-4 | **Kenya DPA not complete** | Production member data migration blocked | `docs/COMPLIANCE.md` — all items unchecked |

### 5.2 High

| ID | Issue | Impact | Location |
|----|-------|--------|----------|
| H-1 | **Missing `/change-password` page** | Users with `mustChangePassword=true` redirect loop or 404 | `middleware.ts:27-34` |
| H-2 | **Missing `/auth/magic` page** | Magic link flow non-functional end-to-end | `magic-link.ts:41-44` |
| H-3 | **Public APIs unauthenticated, no rate limit** | Spam/abuse on contact and prayer endpoints | `api/contact`, `api/prayer` |
| H-4 | **API routes bypass middleware** | No session check possible at edge for APIs | `middleware.ts:50` matcher |
| H-5 | **No Prisma migrations** | `db:push` only — risky for production schema changes | `docs/MIGRATION.md` |
| H-6 | **35-model schema, ~5 models used** | Large schema surface with no UI — migration burden | `schema.prisma` |

### 5.3 Medium

| ID | Issue | Impact | Location |
|----|-------|--------|----------|
| M-1 | **Sermon video URLs point to channel, not videos** | Poor sermon detail UX | `content/sermons.json` |
| M-2 | **Placeholder WhatsApp number** | `254700000000` — not real | `content/site.json` |
| M-3 | **Privacy policy claims Google Analytics** | Policy/implementation mismatch | `privacy/page.tsx` |
| M-4 | **`/prayer` in both PUBLIC and MEMBER prefixes** | RBAC confusion for future member prayer page | `rbac.ts:16,50` |
| M-5 | **`isMemberPath()` unused** | Member routes don't enforce MEMBER role | `rbac.ts:74-78` |
| M-6 | **Event slug mapping fragile** | DB events map slugs by array index, not stable key | `content.ts:252-255` |
| M-7 | **`getUpcomingEvents()` DB path** | Mixes JSON status with DB rows inconsistently | `content.ts:261-283` |
| M-8 | **No CI pipeline** | Regressions undetected | — |
| M-9 | **Zero automated tests** | No regression safety net | — |
| M-10 | **Stale `apps/web/README.md`** | Default create-next-app boilerplate | `apps/web/README.md` |
| M-11 | **Empty `packages/*` workspace** | Misleading monorepo structure | Root `package.json` |
| M-12 | **Prisma prod logging** | Logs whether Turso env vars are SET (info leak) | `prisma.ts:30-32` |

### 5.4 Low / cosmetic

| ID | Issue | Impact | Location |
|----|-------|--------|----------|
| L-1 | **`DecoratedText` component unused** | Dead code | `components/ui/decorated-text.tsx` |
| L-2 | **Filename typo `kindgom-formation.jpg`** | Orphan asset | `public/images/services/` |
| L-3 | **Duplicate poster images** | `events/` and `posters/` overlap | `public/images/` |
| L-4 | **Giving allocation percentages static** | Not configurable via CMS | `give/page.tsx` |
| L-5 | **Unsplash in `remotePatterns`** | No current usage — leftover from scaffold | `next.config.ts` |
| L-6 | **Auth file header says "v3"** | Stale comment | `auth.ts:2`, `prisma.ts:2` |
| L-7 | **ROADMAP says "28 models"** | Outdated count (actual: 35) | `docs/ROADMAP.md` |
| L-8 | **Sign-out audit** | Only `console.log` — no AuditLog | `auth.ts:185-188` |

### 5.5 Security surface summary

| Control | Status |
|---------|--------|
| HTTPS (Vercel) | **Working** |
| HSTS + security headers | **Working** |
| bcrypt cost 12 | **Working** |
| Login lockout | **Working** (server) |
| JWT httpOnly cookies | **Working** (NextAuth default) |
| CSRF on API routes | **Not implemented** (JSON POST from same origin only) |
| Rate limiting | **Not implemented** |
| CAPTCHA on forms | **Not implemented** |
| Pastoral note encryption | **Not implemented** (recommended in COMPLIANCE.md) |
| RBAC on member routes | **Not enforced** (login only) |

### 5.6 Performance notes

| Area | Observation |
|------|-------------|
| Static generation | Sermon/series/event pages use `generateStaticParams` from JSON — **fast** |
| DB probe per request | `dbAvailable()` runs `SELECT 1` on every `get*()` call — potential latency if DB slow |
| Image optimization | Next.js `Image` component used; local assets — no CDN beyond Vercel |
| Bundle | No analytics on bundle size — Data Unavailable |

---

## 6. Missing Features — Global Standards Gap Analysis

`[NEW]`

| Missing capability | Why needed | Approach | Complexity |
|--------------------|------------|----------|------------|
| Login UI | Auth backend unusable | Build `(public)/login/page.tsx` with `signIn()` | **Low** |
| Member portal routes | Self-service reduces admin load | Implement `(member)/` pages against Prisma | **High** |
| GitHub Actions CI | Regression safety | lint + typecheck + build on PR | **Medium** |
| Rate limiting on public APIs | Spam/abuse | Upstash Ratelimit middleware | **Low** |
| `/api/health` | Uptime monitoring | Mirror rpacademy pattern | **Low** |
| Prisma migrations | Safe schema changes | `prisma migrate deploy` | **Medium** |
| M-Pesa STK Push | Kenya giving | Daraja SDK on `/give` | **Medium** |
| Kenya ODPC registration | Legal compliance | See COMPLIANCE.md | **Medium** |
| SSO with RP OS | Single staff identity | Shared NextAuth secret or OIDC | **High** |
| Automated tests | Quality gate | Playwright for public pages | **Medium** |
| Sermon video embeds | UX | Per-sermon YouTube IDs in CMS | **Low** |
| Ops module implementation | In-repo CRM | **Deferred** — use RP OS instead | **N/A** |

---

## 7. Conception to Current State

`[UPDATED]`

### 7.1 Narrative timeline

**Before June 2026:** Royal Priesthood Embassy operated with a fragmented digital presence — legacy `rpweb` in the rpacademy monorepo, Netlify deploys, SQLite committed to git, and no formal path to Kenya DPA compliance for cloud database migration.

**2026-06-11 09:06 — Day zero:** Commit `4793545` establishes v4 as a deliberate rebuild. The problem statement is implicit in `docs/MIGRATION.md`: port what works, discard debt, adopt research-validated architecture. Design inspiration is captured as text files (Motivation Church primary) rather than pixel-perfect mocks — a pragmatic choice for AI-assisted velocity.

**2026-06-11 09:16 — First vertical slice:** Commit `088456c` proves the public marketing hypothesis — a church homepage with hero, events, sermons, visit CTA. The `(public)` route group pattern is born. Typography starts Motivation-adjacent (Cormorant/Inter/cream).

**2026-06-11 09:20 — Deploy unblock:** Commit `38d2f47` fixes Vercel monorepo detection. Without this, none of the architecture matters — the site cannot ship. Security headers move to `apps/web/vercel.json`.

**2026-06-11 09:34 — The pivot:** Commit `4a03053` is the architectural inflection point. The project stops being "a marketing site" and becomes "Royal Priesthood OS" — 35 Prisma models representing the full ministry domain (households, attendance, giving, care, LMS), NextAuth with RBAC middleware, three route groups. The May 2026 research report's five corrections are codified in `ARCHITECTURE.md`. Most models exist as **schema-only aspirations** — the "why" is forward compatibility: migrating production data from v3 should not require another schema revolution.

**2026-06-12 01:38 — Public launch:** Commit `7471631` ships the embassy website as `rpwebsite`. Burgundy/gold branding replaces cream Motivation palette — the site now reflects Royal Priesthood identity, not a template church. JSON content files mean the site builds and deploys even if Turso is down. ~50 ministry images migrate from rpacademy. The seed script bridges JSON → Turso for production CMS override.

**2026-06-12 04:47 — Academy separation:** Commit `ec5fdec` acknowledges Kingdom Formation LMS as a separate product (`rpacademy.vercel.app`).

**2026-06-12 PM — ECC integration:** Commits `470afd3`–`dd42d97` make rpwebsite a **read-mostly public renderer** with Turso as CMS storage and RP OS Herald's Desk as the admin console. The `(ops)/` stubs in this repo are **superseded** by RP OS `/ops/heralds-desk`.

**2026-06-12 PM — Brand parity:** Logo/favicon commits align with RP OS and Academy.

### 7.2 Why specific code exists

| Code | Why it exists |
|------|---------------|
| `lib/prisma.ts` Proxy | Vercel build-time env var absence breaks Prisma permanently without lazy init |
| `auth-edge.ts` separate from `auth.ts` | Edge middleware cannot import Prisma/bcrypt |
| `content.ts` JSON fallback | Static builds + resilience when Turso unavailable |
| `images.ts` path map | Decouple content JSON from filesystem layout; trace lineage to rpacademy assets |
| `rbac.ts` path prefixes | Single source of truth for middleware + future layout guards |
| `Household` model | Research correction #2 — families are operational units for giving, care, check-in |
| `amountCents Int` | Research correction #4 — SQLite has no reliable Decimal |
| `POST /api/revalidate` | ECC webhook — RP OS busts cache after Herald's Desk saves |
| Stub member/ops pages | Superseded by RP OS; kept for route-group proof |
| `vercel.json` headers | Security baseline before ops data exists |
| `design-inspo/*.txt` | Human-readable pattern library for AI-assisted UI generation |

### 7.3 Current state summary (2026-06-12)

| Layer | Completion | Notes |
|-------|------------|-------|
| Public marketing | ~90% | All pages; DB-first + ECC revalidation |
| CMS admin | ✅ **Delegated to RP OS** | Herald's Desk writes Turso + revalidates |
| Auth backend | ~70% | No login UI |
| Member portal | ~5% | Stubs only |
| In-repo ministry ops | ~5% | **Use RP OS instead** |
| Integrations | ⚠️ Revalidate only | M-Pesa, Inngest, Resend not started |
| Compliance | ~10% | Privacy policy only |
| Tests | 0% | |

---

## 8. Ecosystem Integration (RP OS ECC)

`[NEW]`

### 8.1 Three-product topology

| Product | Role | URL | Database |
|---------|------|-----|----------|
| **RP Website** (this) | Public marketing + forms | rpchurch.vercel.app | `rpwebsite` |
| **RP OS** | CRM + Embassy Command Center | rpchurchos.vercel.app | `rpos` |
| **RP Academy** | Kingdom Formation LMS | rpacademy.vercel.app | `rpacademy` |

### 8.2 Herald's Desk → this site

RP OS writes directly to **this repo's Turso database** (`rpwebsite`) for:

- `PublicSermon`, `SermonSeries`, `ChurchEvent`
- `WebsiteLeader`, `WebsiteTestimonial`
- `SystemConfig` (welcome message, service times, hero image)

After each write, RP OS calls:

```http
POST https://rpchurch.vercel.app/api/revalidate
x-revalidate-secret: <REVALIDATE_SECRET>
Content-Type: application/json

{ "tags": ["sermons", "homepage"], "paths": ["/", "/sermons"] }
```

**Environment pairing:**

| rpwebsite | RP OS |
|-----------|-------|
| `REVALIDATE_SECRET` | `WEBSITE_REVALIDATE_SECRET` (same value) |
| — | `WEBSITE_REVALIDATE_URL=https://rpchurch.vercel.app/api/revalidate` |
| `TURSO_*` | `TURSO_WEBSITE_*` (same DB, different token names) |

### 8.3 Cache tags (must match RP OS `lib/ecc-revalidate.ts`)

| Tag | Invalidated content |
|-----|---------------------|
| `sermons` | Sermon list + detail |
| `events` | Event list + detail |
| `leadership` | About page leaders |
| `testimonials` | Homepage testimonials |
| `site-config` | Service times, welcome message |
| `homepage` | `/` aggregate |

### 8.4 Verification

From RP OS repo: `npm run test:ecc-sync` — patches Turso rows, revalidates, confirms marker appears on live HTML, restores originals.

### 8.5 What stays in this repo vs RP OS

| Concern | Owner |
|---------|-------|
| Public page rendering | **rpwebsite** |
| Contact/prayer form submission | **rpwebsite** (`/api/contact`, `/api/prayer`) |
| CMS CRUD UI | **RP OS** Herald's Desk |
| Member CRM, attendance, giving | **RP OS** |
| LMS content admin | **RP OS** Scribe's Chamber → `rpacademy` DB |

---

## 9. Development

### 9.1 Prerequisites

- Node.js >= 20
- npm (workspaces)

### 9.2 Setup

```bash
cp apps/web/.env.example apps/web/.env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 9.3 Database (local)

```bash
cd apps/web
npm run db:push      # SQLite schema at prisma/dev.db
npm run db:seed      # Seed from content JSON + admin user
```

### 9.4 Database (Turso production)

```bash
cd apps/web
# Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env
npm run db:setup     # db:push:turso && db:seed
```

### 9.5 Scripts (from repo root)

```bash
npm run dev          # Start dev server
npm run build        # prisma generate + next build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

---

## 10. Related Documentation

| Document | Purpose |
|----------|---------|
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Stack, data flow, mobile strategy |
| [docs/ROADMAP.md](./docs/ROADMAP.md) | 20-week / 740-hour plan |
| [docs/MIGRATION.md](./docs/MIGRATION.md) | v3 → v4 port checklist |
| [docs/COMPLIANCE.md](./docs/COMPLIANCE.md) | Kenya DPA checklist |
| [rpos/README.md](https://github.com/RoyalPriesthoodTech/rpos) | RP OS + ECC forensic reference |
| [rpacademy/README.md](https://github.com/RoyalPriesthoodTech/rpacademy) | Academy + mobile forensic reference |

---

## Five corrections (from research report)

1. Keep Expo through Phase 3 — hybrid mobile, not PWA-only  
2. Household first-class in schema from day one  
3. Kenya DPA compliance before production migration  
4. Financial amounts as integer cents  
5. 20-week / 740-hour timeline (not 16 weeks)

---

*This README is the living forensic Single Source of Truth for rpwebsite. Sections marked `[NEW]` or `[UPDATED]` reflect the June 12, 2026 ecosystem audit (ECC integration + production readiness).*

---

## Appendix — Production Due Diligence (June 13, 2026) `[NEW]`

Cross-repo forensic audit. Resolves README drift from HEAD `8623cb3` (website v2.0 core).

### README vs HEAD Drift (corrected in this update)

| Item | Prior README claim | HEAD `8623cb3` reality |
|------|-------------------|------------------------|
| `/login` | Stub | ✅ `LoginForm` wired with NextAuth |
| `/change-password` | Missing | ✅ Page + API route |
| `/auth/magic` | Missing | ✅ Magic link page |
| `/api/health` | Missing | ✅ Returns DB connectivity status |
| `/api/rsvp` | Not documented | ✅ Visit RSVP form handler |
| Member pages | Dashboard/household stubs only | ✅ +profile, giving-history, discipleship |
| Fonts | Montserrat/Bebas/Dancing Script | Cinzel/Inter/JetBrains Mono |
| Commit count | 11 | **13** |

### Deployment & Production

| Check | Result |
|-------|--------|
| Canonical URL | https://rpchurch.vercel.app (GitHub homepage, layout OG, ECC revalidate) |
| Legacy URL | https://rpwebsite.vercel.app (still in sitemap.ts — **technical debt**) |
| Latest deploy | `8623cb3` — design system v2, RSVP, deployment wiring |
| GitHub Actions CI | ❌ **None** — Vercel Git integration only |
| Turso DB | `rpwebsite` — DB-first content with JSON fallback |

### Ecosystem Integration

| Integration | Status |
|-------------|--------|
| RP OS Herald's Desk → Turso writes | ✅ Working |
| RP OS → `/api/revalidate` cache bust | ✅ Working (`REVALIDATE_SECRET` pairing) |
| RP Academy link | ✅ `/academy` → rpacademy.vercel.app |
| Rate limiting on public APIs | ❌ Missing |
| Email (Resend) | ❌ Not wired |

### URL Split (Critical Technical Debt)

| Source | URL |
|--------|-----|
| GitHub homepage, layout OG, ECC webhook | `rpchurch.vercel.app` |
| `lib/seo.ts`, `sitemap.ts`, `robots.ts` | `rpwebsite.vercel.app` |

**Remediation:** Unify all SEO/canonical references to `rpchurch.vercel.app`.

*Forensic README append — June 13, 2026. See [rpacademy](https://github.com/RoyalPriesthoodTech/rpacademy) and [rpos](https://github.com/RoyalPriesthoodTech/rpos) for ecosystem parity.*
