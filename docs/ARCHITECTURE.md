# Royal Priesthood Website — Architecture

> **Purpose:** System architecture, data flow, and design documentation.
> **Last Updated:** 2026-06-28

---

## Five Non-Negotiable Corrections (May 2026 Research Report)

Validation from DeepSeek / ChatGPT / Kimi review:

1. **Keep Expo through Phase 3** — PWA for public/member; native app for staff check-in, offline sync, push.
2. **Household as first-class domain** — `Household` + `HouseholdMember` in Prisma from day one (not `familyId` on Member).
3. **Kenya DPA before data migration** — ODPC registration, Turso DPA + SCCs, breach procedure. See [COMPLIANCE.md](./COMPLIANCE.md).
4. **Integer cents for money** — `GivingTransaction.amountCents Int`; never Prisma `Decimal` on SQLite.
5. **20-week timeline, 740 hours** — M-Pesa (+2 wks), compliance, PWA testing each add buffer.

---

## Repository Structure

```
rpwebsite/
├── README.md                  # Public-only documentation
├── CHANGELOG.md               # User-facing release notes
├── PROJECT_MEMORY.md          # Living project state (AI-first)
├── TASKS.md                   # Active backlog
├── AI_RULES.md                # AI agent instruction manual
├── package.json               # Monorepo root (Vercel detection)
│
├── apps/web/                  # ★ Sole deployable application
│   ├── package.json
│   ├── next.config.ts
│   ├── vercel.json            # Security headers
│   ├── content/               # Static JSON CMS (build-time fallbacks)
│   ├── prisma/                # Schema, seed, Turso client
│   ├── scripts/               # Utility scripts (db-push-turso)
│   ├── public/                # Static assets, images
│   └── src/
│       ├── middleware.ts      # NextAuth session gate + RBAC
│       ├── types/             # Content/domain TypeScript interfaces
│       ├── lib/               # Server utilities
│       ├── components/        # React UI components
│       └── app/               # Next.js App Router pages + API
│           ├── layout.tsx
│           ├── (public)/      # Marketing pages (no auth)
│           ├── (member)/      # Member portal (session required)
│           ├── (ops)/         # Ops portal (session + RBAC)
│           └── api/           # Route handlers
│
├── docs/                      # Developer documentation
│   ├── ARCHITECTURE.md        # This file
│   ├── ROADMAP.md             # 20-week implementation plan
│   ├── MIGRATION.md           # v3 → v4 migration status
│   ├── COMPLIANCE.md          # Kenya DPA 2019 checklist
│   ├── DECISIONS.md           # Architecture Decision Records
│   ├── DEVELOPMENT_LOG.md     # Engineering journal
│   ├── API.md                 # API route documentation
│   ├── DATABASE.md            # Database schema and models
│   └── DEPLOYMENT.md          # Deployment processes
│
├── design-inspo/              # Church website design references
└── scripts/                   # Repository utility scripts
```

---

## Application Layers

### Three-Layer Product Model

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

\* `CELL_LEADER` limited to `/ops`, `/ops/groups`, `/ops/attendance`, `/groups` only.

### Public Routes

| Route | Page | Status |
|-------|------|--------|
| `/` | Homepage | Working |
| `/about` | About & beliefs | Working |
| `/sermons` | Sermon library | Working |
| `/sermons/[slug]` | Sermon detail | Working |
| `/series` | Series index | Working |
| `/series/[slug]` | Series detail | Working |
| `/events` | Events listing | Working |
| `/events/[slug]` | Event detail | Working |
| `/academy` | Kingdom Formation marketing | Working |
| `/give` | Giving information | Working |
| `/visit` | Plan your visit | Working |
| `/contact` | Contact form | Partial (DB-dependent) |
| `/prayer` | Prayer requests | Partial (DB-dependent) |
| `/login` | Sign in | Stub (backend complete) |
| `/privacy` | Privacy policy | Working |
| `/terms` | Terms of service | Working |
| `/change-password` | Password change | Working |
| `/auth/magic` | Magic link verification | Working |

### Member Routes (Stubs)

| Route | Purpose | Status |
|-------|---------|--------|
| `/dashboard` | Member dashboard | Stub |
| `/household` | Household management | Stub |
| `/giving-history` | Giving history | Stub |
| `/discipleship` | Discipleship progress | Stub |
| `/profile` | Profile management | Stub |

### OPS Routes (Stubs)

| Route | Purpose | Status |
|-------|---------|--------|
| `/ops` | CRM dashboard | Stub |
| `/admin` | Admin panel | Stub |

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 16.2.9 App Router | RSC + API routes + middleware + Vercel first-class |
| Language | TypeScript 5 strict | Schema + content types; Prisma codegen |
| Styling | Tailwind CSS v4 | Utility-first matches rapid marketing iteration |
| ORM | Prisma 6.6 | v3 schema port; LibSQL adapter; migration tooling |
| Database | Turso LibSQL (prod) / SQLite file (dev) | Edge replication; integer-cent money; v3 continuity |
| Auth | NextAuth 5.0.0-beta.25 | Self-hosted; JWT roles; no per-MAU cost |
| Validation | Zod 4 | API route input validation; auth credential parsing |
| Password hashing | bcryptjs cost 12 | v3 parity; pure JS (no native addon issues) |
| Animation | Framer Motion 11 + GSAP 3 | Page transitions and scroll reveals |
| Hosting | Vercel | Next.js co-location; edge functions |
| Icons | Lucide React | Consistent icon set |

---

## Data Flow

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

### Content Layer Strategy

The content layer (`lib/content.ts`) uses a **DB-first with JSON fallback** pattern:

1. `dbAvailable()` — `SELECT 1` probe to check database connectivity
2. If DB is up → query Prisma model
3. If rows exist → return mapped DB data
4. Else → return static JSON import

Sync helpers (`getSermonsSync`, `getEventsSync`, `getSeriesSync`) exist for `generateStaticParams` at build time without async DB.

### Cache Invalidation

- ISR with `unstable_cache` (60s TTL)
- Cache tags: `sermons`, `events`, `leadership`, `testimonials`, `site-config`, `homepage`
- On-demand revalidation via `POST /api/revalidate` from RP OS Embassy Command Center
- Uses `revalidateTag(tag, { expire: 0 })` for Next.js 16 compatibility

---

## Authentication

### Auth Architecture

```
Browser
  → middleware.ts (edge runtime)
    → auth-edge.ts (JWT validation only — no DB)
    → RBAC check (lib/rbac.ts)
    → Allow/redirect

Browser
  → Login form (future)
    → POST /api/auth/... (server runtime)
      → auth.ts (credentials + magic-link)
        → bcrypt verify (cost 12)
        → JWT session (30-day)
        → AuditLog entry
```

### Providers

| Provider | Status | Details |
|----------|--------|---------|
| Credentials (email + password) | Working (backend) | Zod validation, bcrypt compare, lockout after 5 failures |
| Magic link | Working (library) | HMAC-SHA256 tokens, 15-min TTL, Resend not wired |

### JWT Session Shape

```typescript
interface Session {
  user: {
    id: string;
    email: string;
    role: UserRole;
    memberId?: string;
    mustChangePassword: boolean;
  };
  expires: string; // 30 days
}
```

### RBAC Matrix

| Role | Ops access |
|------|------------|
| `ADMIN`, `HOSPITALITY`, `LEADERSHIP` | All ops prefixes |
| `CELL_LEADER` | `/ops`, `/ops/groups`, `/ops/attendance`, `/groups` only |
| `MEMBER` | Redirected to `/dashboard` |
| Unauthenticated | Redirected to `/login` |

---

## Database

See [DATABASE.md](./DATABASE.md) for complete schema documentation.

- **Provider:** `postgresql` in schema (for Turso LibSQL compatibility at runtime)
- **Models:** 35 models across 13 domains
- **Enums:** 37 enums
- **Financial invariant:** All monetary values stored as integer cents (`Int`)
- **Migration strategy:** Currently `db:push` only; Prisma migrations not yet adopted

---

## Middleware and Route Protection

```typescript
// apps/web/src/middleware.ts
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

**Matcher excludes:** `api`, `_next/static`, `_next/image`, `images`, `favicon.ico`, `manifest.json`, `robots.txt`, `sitemap.xml`

---

## Key `lib/` Modules

| Module | Exports | Role |
|--------|---------|------|
| `auth.ts` | `auth`, `signIn`, `signOut`, `handlers` | Server NextAuth: credentials + magic-link providers |
| `auth-edge.ts` | `auth` | Edge middleware auth — JWT callbacks only |
| `magic-link.ts` | `createMagicLinkToken`, `verifyMagicLinkToken`, `buildMagicLinkUrl` | HMAC-SHA256 tokens, 15-min TTL |
| `prisma.ts` | `getPrisma`, `prisma`, `$transaction`, `testConnection` | Lazy singleton Prisma client |
| `rbac.ts` | path classifiers, `canAccessOpsRoute`, `getDefaultRedirectForRole` | Route → role mapping |
| `content.ts` | 20+ `get*` functions, formatters, sync helpers | Hybrid CMS data layer |
| `site.ts` | `site`, `navLinks` | Static nav + site constants |
| `seo.ts` | `createPageMetadata`, `churchSchema` | Per-page metadata + JSON-LD |
| `images.ts` | `images` | Canonical `/images/...` path map |
| `cn.ts` | `cn` | Tailwind class merge |
| `api-guard.ts` | `enforceRateLimit` | Rate limiting middleware |
| `rate-limit.ts` | `checkRateLimit`, `RateLimitCategory` | Upstash Ratelimit integration |
| `slug.ts` | `createSlug`, `eventSlug` | URL slug generation |

---

## UI Component Architecture

| Directory | Component | Status |
|-----------|-----------|--------|
| `layout/` | `site-header.tsx`, `site-footer.tsx` | Working |
| `home/` | 9 sections (hero, sermons, events, etc.) | Working |
| `content/` | `sermon-card.tsx`, `event-card.tsx`, `faq-accordion.tsx` | Working |
| `forms/` | `contact-form.tsx`, `prayer-form.tsx`, `login-form.tsx`, `rsvp-form.tsx`, `change-password-form.tsx` | Working (DB-dependent) |
| `shared/` | `page-hero.tsx`, `service-times-grid.tsx` | Working |
| `ui/` | `button.tsx`, `decorated-text.tsx` | Working (decorated-text unused) |
| `motion/` | `page-transition.tsx`, `scroll-reveal.tsx`, `stagger-container.tsx` | Working |
| `providers/` | `session-provider.tsx` | Working |
| `theme/` | `theme-provider.tsx`, `theme-toggle.tsx` | Working |

---

## Deployment Architecture

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

```
GitHub (main branch)
    │
    ▼ (push)
Vercel Git Integration
    │
    ├── Build: prisma generate && next build
    ├── Deploy: Vercel Edge Network
    │
    ▼
rpchurch.vercel.app (production)
    │
    ├── CDN: Vercel Edge Cache
    ├── DB: Turso LibSQL (aws-eu-west-1)
    └── CMS: RP OS Herald's Desk (writes Turso)
```

---

## Ecosystem Integration (Three-Product Topology)

| Product | Role | URL | Database |
|---------|------|-----|----------|
| **RP Website** (this) | Public marketing + forms | rpchurch.vercel.app | `rpwebsite` |
| **RP OS** | CRM + Embassy Command Center | rpchurchos.vercel.app | `rpos` |
| **RP Academy** | Kingdom Formation LMS | rpacademy.vercel.app | `rpacademy` |

### Integration Pattern

1. RP OS Herald's Desk writes content to this repo's Turso database
2. RP OS calls `POST /api/revalidate` with cache tags
3. This site re-renders with fresh data

---

## Environment Variables

| Variable | Used In | Purpose |
|----------|---------|---------|
| `DATABASE_URL` | Prisma schema, local dev | SQLite file path |
| `TURSO_DATABASE_URL` | `prisma.ts`, `turso-client.ts` | Production LibSQL URL |
| `TURSO_AUTH_TOKEN` / `DATABASE_AUTH_TOKEN` | `prisma.ts`, `turso-client.ts` | Turso auth |
| `NEXTAUTH_URL` | NextAuth, `magic-link.ts` | Canonical app URL |
| `NEXTAUTH_SECRET` / `AUTH_SECRET` | NextAuth, `magic-link.ts` | JWT + HMAC signing |
| `NODE_ENV` | `prisma.ts` | Prod vs dev client behavior |
| `REVALIDATE_SECRET` | `/api/revalidate` | ECC webhook shared secret |
| `UPSTASH_REDIS_REST_URL` | Rate limiting | Upstash Redis REST endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | Rate limiting | Upstash Redis auth token |

---

## Design System

### Visual Registers

| Register | Context | Tokens |
|----------|---------|--------|
| Celestial | Hero, dark sections | Burgundy `#6B1D3A` gradients |
| Parchment | Content sections | Cream `#FAF7F2` |
| Warm | CTAs, accents | Gold `#C9A84C` |

### Typography

| Font | Usage |
|------|-------|
| Cinzel | Display / headings |
| Inter | Body text |
| JetBrains Mono | Code blocks |