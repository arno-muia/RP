# Task Backlog — Royal Priesthood Website

> **Purpose:** Actively maintained project backlog. Read before starting any development work.
> **Last Updated:** 2026-06-28

---

## High Priority

- [ ] **Configure Turso on Vercel** — Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` environment variables for production database connectivity
- [ ] **Add rate limiting** — Wire Upstash Ratelimit (`@upstash/ratelimit` already in dependencies) to `/api/contact` and `/api/prayer`
- [ ] **Unify canonical URL** — Update `lib/seo.ts`, `sitemap.ts`, `robots.ts` to use `rpchurch.vercel.app` instead of `rpwebsite.vercel.app`
- [ ] **Add `/api/health`** — Create a health check endpoint returning DB connectivity status for uptime monitoring
- [ ] **Adopt Prisma migrations** — Replace `db:push` with `prisma migrate dev`/`prisma migrate deploy` for safe schema changes

## Medium Priority

- [ ] **Build member portal dashboard** — Implement `/dashboard` with real Prisma queries (household, giving history, discipleship progress)
- [ ] **Build household page** — Wire `(member)/household/page.tsx` to `Household` and `HouseholdMember` models
- [ ] **Build giving history page** — Wire `(member)/giving-history/page.tsx` to `GivingTransaction` model
- [ ] **Build profile page** — Wire `(member)/profile/page.tsx` to `Member` model with edit capabilities
- [ ] **Build discipleship page** — Wire `(member)/discipleship/page.tsx` to `MemberProgress` and `DiscipleshipModule` models
- [ ] **Fix `/change-password` page** — Ensure the page works correctly with the middleware redirect flow
- [ ] **Fix `/auth/magic` page** — Complete the magic link authentication flow end-to-end
- [ ] **Add sermon video embeds** — Replace YouTube channel links with per-sermon video IDs from CMS
- [ ] **Add GitHub Actions CI** — lint + typecheck + build on PR to main
- [ ] **Write unit tests** — Core lib modules: `auth.ts`, `content.ts`, `rbac.ts`, `prisma.ts`, `slug.ts`
- [ ] **Add rate limiting to revalidate API** — Protect `/api/revalidate` from abuse beyond the secret header

## Low Priority

- [ ] **Remove unused `DecoratedText` component** — Dead code in `components/ui/decorated-text.tsx`
- [ ] **Fix filename typo `kindgom-formation.jpg`** — Orphan asset in `public/images/services/`
- [ ] **Deduplicate poster images** — `events/` and `posters/` directories overlap
- [ ] **Make giving allocation configurable via CMS** — Hardcoded percentages in `give/page.tsx`
- [ ] **Remove Unsplash from `remotePatterns`** — No current usage in `next.config.ts`
- [ ] **Fix stale version comments** — `auth.ts` and `prisma.ts` headers reference "v3"
- [ ] **Add sign-out AuditLog** — Currently only `console.log` — no persistence
- [ ] **Add `/api/rsvp` documentation** — Route exists but undocumented
- [ ] **Update `apps/web/README.md`** — Still contains default create-next-app boilerplate

## Completed

> **Note:** Completed items are moved here rather than deleted for historical reference.

### Phase 0 — Scaffold & Foundation (2026-06-11)

- [x] Initialize monorepo with npm workspaces
- [x] Add Vercel deploy configuration with security headers
- [x] Create design-inspo reference notes (Motivation Church, VOUS, Austin Stone, Elevation)
- [x] Build Motivation Church-inspired public homepage with hero, events, sermons, visit sections
- [x] Fix Vercel monorepo detection (move vercel.json to apps/web)
- [x] Port Prisma schema from v3 (35 models, 37 enums)
- [x] Implement lazy Turso/SQLite Prisma client
- [x] Implement NextAuth v5 auth with credentials + magic-link providers
- [x] Implement RBAC middleware with three-layer route protection
- [x] Create route groups: `(public)`, `(member)`, `(ops)`
- [x] Add canonical architecture docs (ARCHITECTURE.md, ROADMAP.md, MIGRATION.md, COMPLIANCE.md)

### Phase 1 — Public Website Launch (2026-06-12)

- [x] Implement burgundy/gold brand identity with three visual registers
- [x] Create JSON content layer (7 files for site config, sermons, series, events, leadership, testimonials, academy)
- [x] Build all public marketing pages (13 routes + 2 dynamic routes)
- [x] Add DB-first content layer with JSON fallback (Hybrid CMS)
- [x] Implement on-demand revalidation via `/api/revalidate` for RP OS integration
- [x] Migrate ~50 ministry images from legacy v3
- [x] Create seed script for Turso/SQLite population
- [x] Add SEO metadata, sitemap.xml, robots.txt, church JSON-LD
- [x] Add URL redirects (giving, plan-visit, request-prayer, learn)
- [x] Add official RP logos and transparent favicons
- [x] Fix revalidate API for Next.js 16 cache profile requirement
- [x] Point academy enrollment link to rpacademy.vercel.app
- [x] Implement RSVP form route
- [x] Add `/api/health` endpoint

### Authentication

- [x] **Login UI** — `(public)/login/page.tsx` with `LoginForm` component using `signIn("credentials", ...)`. Handles callback URLs, error states, account lockout messages, loading states. Already implemented and working.

### Documentation & AI Memory (2026-06-28)

- [x] Create CHANGELOG.md for user-facing releases
- [x] Create PROJECT_MEMORY.md as living project state
- [x] Create TASKS.md as active backlog
- [x] Create AI_RULES.md as AI agent instruction manual
- [x] Create docs/DECISIONS.md with Architecture Decision Records
- [x] Create docs/DEVELOPMENT_LOG.md as engineering journal
- [x] Create docs/API.md documenting all API routes
- [x] Create docs/DATABASE.md documenting database schema
- [x] Create docs/DEPLOYMENT.md documenting deployment processes
- [x] Rewrite README.md as public-only documentation
- [x] Expand docs/ARCHITECTURE.md with full implementation details
- [x] Update docs/ROADMAP.md to fix stale model count (28→35)