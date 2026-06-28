# Project Memory — Royal Priesthood Website

> **Purpose:** Living memory of the current project state. Read this first before any development work.
> **Last Updated:** 2026-06-28
> **Maintained By:** Royal Priesthood Tech Team + AI Agents
> **Applies To:** v4.x

---

## Version Snapshot

| Field | Value |
|-------|-------|
| **Version** | 4.0.0 (root `package.json`) |
| **Current Branch** | `main` |
| **Latest Commit** | `0fd6614` — Initial commit (squashed history) |
| **Production URL** | [rpchurch.vercel.app](https://rpchurch.vercel.app) |
| **Legacy URL** | [rpwebsite.vercel.app](https://rpwebsite.vercel.app) |
| **Deployment** | Vercel (auto-deploy from `main`) |
| **Database** | 35 models, 37 enums |
| **Next.js** | 16.2.9 |
| **React** | 19.2.4 |
| **Prisma** | 6.6.0 |
| **Tailwind** | v4 |
| **Authentication** | NextAuth 5.0.0-beta.25 |
| **Database (prod)** | Turso LibSQL |
| **Database (dev)** | SQLite file |
| **Last Verified** | 2026-06-28 |

---

## Current Architecture

### Three-Layer Product Model

```
┌────────────────────────────────────────────────────────────────┐
│  PUBLIC (public)/          No auth required                    │
│  Pages: /, /about, /sermons, /series, /events, /academy,      │
│         /give, /visit, /contact, /prayer, /login, /privacy,   │
│         /terms                                                 │
├────────────────────────────────────────────────────────────────┤
│  MEMBER (member)/          Session required                    │
│  Pages: /dashboard, /household, /giving-history,               │
│         /discipleship, /profile (all stubs)                    │
├────────────────────────────────────────────────────────────────┤
│  OPS (ops)/                Session + RBAC                      │
│  Pages: /ops (stub), /admin (stub)                             │
└────────────────────────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.9 (App Router, RSC) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4, three visual registers (Celestial/Parchment/Warm) |
| Database ORM | Prisma 6.6 with Turso LibSQL adapter (prod) / SQLite (dev) |
| Auth | NextAuth 5.0.0-beta.25, JWT sessions, bcryptjs cost 12 |
| Validation | Zod 4 |
| Animation | Framer Motion 11 + GSAP 3 |
| Hosting | Vercel (monorepo root: `apps/web`) |
| Icons | Lucide React |

---

## Current State — Feature Completion

### ✅ Completed

- [x] Monorepo scaffold with npm workspaces
- [x] Vercel deploy configuration with security headers
- [x] Public marketing pages (13 routes + 2 dynamic routes)
- [x] Burgundy/gold brand identity with three visual registers
- [x] JSON content layer (7 files: site, sermons, series, events, leadership, testimonials, academy modules)
- [x] DB-first content layer with JSON fallback (Hybrid CMS pattern)
- [x] On-demand revalidation via `/api/revalidate` (ECC integration)
- [x] Prisma schema: 35 models, 37 enums covering full ministry domain
- [x] Auth backend: credentials + magic-link providers, JWT role injection, login lockout
- [x] RBAC middleware: public/member/ops route protection
- [x] SEO: per-page metadata, sitemap.xml, robots.txt, church JSON-LD
- [x] Image assets: ~50 files (team, services, events, posters)
- [x] Seed script: populates Turso/SQLite from JSON content
- [x] Design reference notes (Motivation Church, VOUS, Austin Stone, Elevation)

### 🔄 In Progress

- [ ] Production Turso database on Vercel — env vars not configured
- [ ] `/auth/magic` page — magic link flow partial (page exists, email not wired)
- [ ] Rate limiting on public APIs (Upstash dependency present)
- [ ] Prisma migrations (currently `db:push` only)

### ⏳ Pending (Phase 1 Backlog)

- [ ] Member portal UI (dashboard, household, giving history, discipleship, profile)
- [ ] Ops portal UI (CRM, check-in, reports)
- [ ] Email integration (Resend)
- [ ] M-Pesa Daraja STK Push
- [ ] Inngest background jobs
- [ ] Expo mobile app (Phase 3)
- [ ] Prisma migration workflow
- [ ] GitHub Actions CI pipeline
- [ ] Automated tests (unit + E2E)
- [ ] Kenya DPA compliance (ODPC registration, SCCs, TIA)

---

## Technical Decisions Summary

| Decision | Status | Rationale |
|----------|--------|-----------|
| Turso LibSQL over Postgres | Fixed | Edge replication, integer-cent money, v3 continuity |
| NextAuth v5 over Clerk/Auth0 | Fixed | Self-hosted, JWT roles, no per-MAU cost |
| JSON fallback content layer | Fixed | Build-time resilience without DB |
| Route groups for layering | Fixed | Isolates public/member/ops logic |
| ECC integration (RP OS writes DB) | Fixed | CMS admin delegated to RP OS Herald's Desk |
| Burgundy/gold branding | Fixed | Royal Priesthood identity post-v3 |
| Financial amounts as integer cents | Fixed | Research correction #4 |
| Household as first-class domain | Fixed | Research correction #2 |

---

## Current Known Issues

| ID | Issue | Severity | Status |
|----|-------|----------|--------|
| C-2 | Production DB dependency — contact/prayer forms return 500 without Turso | Critical | Unresolved |
| C-3 | No rate limiting on public APIs — spam/abuse risk | High | Unresolved |
| C-4 | URL split — SEO/canonical uses `rpwebsite.vercel.app` but canonical is `rpchurch.vercel.app` | High | Unresolved |
| C-5 | No CI pipeline — regressions undetected | Medium | Unresolved |
| C-6 | Zero automated tests | Medium | Unresolved |
| C-7 | Kenya DPA not complete — blocks production member data | Critical | Unresolved |

---

## Current Dependencies

**Runtime (apps/web):**
`next@16.2.9`, `react@19.2.4`, `react-dom@19.2.4`, `next-auth@5.0.0-beta.25`, `@prisma/client@6.6.0`, `@prisma/adapter-libsql@6.6.0`, `@libsql/client@0.15.0`, `bcryptjs@2.4.3`, `zod@4`, `framer-motion@11.18.2`, `gsap@3.15.0`, `lucide-react@1.17.0`, `@upstash/ratelimit@2.0.5`, `@upstash/redis@1.34.3`, `clsx@2.1.1`, `tailwind-merge@3.6.0`, `class-variance-authority@0.7.1`

**Dev (apps/web):**
`prisma@6.6.0`, `tailwindcss@4`, `@tailwindcss/postcss@4`, `eslint@9`, `eslint-config-next@16.2.9`, `typescript@5`, `tsx@4.19.0`

---

## Database Status

| Aspect | Status |
|--------|--------|
| Schema | 35 models, 37 enums |
| Local dev | SQLite file (`prisma/dev.db` via `db:push`) |
| Production | Turso LibSQL (not yet configured on Vercel) |
| Migration strategy | `db:push` only — no Prisma migrations adopted |
| Seed data | JSON content populates all public models |
| Admin user | Seed creates `admin@royalpriesthood.church` |

---

## Deployment Status

| Aspect | Status |
|--------|--------|
| Production URL | https://rpchurch.vercel.app |
| Auto-deploy | Vercel Git integration from `main` |
| Build command | `prisma generate && next build` |
| Staging | None |
| Rollback | Manual via Vercel dashboard |
| CI pipeline | None |

---

## Testing Status

| Type | Coverage |
|------|----------|
| Unit tests | 0% |
| Integration tests | 0% |
| E2E tests | 0% |
| Accessibility audit | Not performed |
| Load testing | Not performed |

---

## Known Technical Debt

| ID | Debt | Impact | Effort to Fix |
|----|------|--------|---------------|
| TD-1 | `db:push` only — no Prisma migrations | Risky for production schema changes | Medium |
| TD-2 | URL split — `rpwebsite.vercel.app` in SEO code, `rpchurch.vercel.app` canonical | SEO confusion, split authority | Low |
| TD-3 | Zero automated tests | No regression safety net | High |
| TD-4 | No CI pipeline | Regressions undetected until deploy | Medium |
| TD-5 | 35-model schema, ~8 models actively used | Migration burden, cognitive overhead | Low |
| TD-6 | JSON CMS is static — should become Admin CMS | Content updates require code deploy | Medium |
| TD-7 | Middleware growing large — auth + RBAC + redirects in one file | Maintenance difficulty | Medium |
| TD-8 | No Prisma repository pattern — direct queries in lib/ | Inconsistent data access | Medium |
| TD-9 | `/prayer` in both PUBLIC and MEMBER path prefixes | RBAC confusion | Low |
| TD-10 | `isMemberPath()` defined but never called in middleware | Dead code | Low |
| TD-11 | Auth files reference "v3" in headers | Stale comments | Low |
| TD-12 | Honeypot/spam fields on contact/prayer but no CAPTCHA | Limited bot protection | Low |

---

## Next Recommended Tasks

1. **Configure Turso on Vercel** — Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` env vars
3. **Add rate limiting** — Wire Upstash Ratelimit to `/api/contact` and `/api/prayer`
4. **Unify canonical URL** — Update `lib/seo.ts`, `sitemap.ts`, `robots.ts` to use `rpchurch.vercel.app`
5. **Add `/api/health`** — Endpoint for uptime monitoring
6. **Adopt Prisma migrations** — Replace `db:push` with `prisma migrate dev`
7. **Build member portal pages** — Implement against Prisma models