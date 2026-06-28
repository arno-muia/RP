# Architecture Decision Records — Royal Priesthood Website

> **Purpose:** Record of significant architectural decisions. Append new decisions; never overwrite previous ADRs.
> **Last Updated:** 2026-06-28

---

## ADR-001: Turso LibSQL over PostgreSQL for Production Database

- **Date:** 2026-06-11
- **Status:** Accepted

### Context
The legacy v3 codebase used SQLite. The v4 rebuild needed a production database compatible with Vercel serverless. Options included Supabase Postgres, PlanetScale MySQL, and Turso LibSQL.

### Decision
Use Turso LibSQL for production, with SQLite file for local development. The Prisma schema declares `provider = "postgresql"` for Turso LibSQL compatibility at runtime.

### Consequences
- Edge replication compatible with Vercel serverless
- Integer-cent money support on SQLite (no Decimal issues)
- Continuity with v3 SQLite schema
- Direct `db:push`-only migration (no Prisma migrations adopted yet)
- Cross-border data transfer requires Kenya DPA compliance (US-hosted)

### Alternatives Considered
- Supabase Postgres: More mature but connection pool exhaustion on serverless
- PlanetScale MySQL: Schema branching but no SQLite compatibility

---

## ADR-002: NextAuth v5 over Clerk/Auth0

- **Date:** 2026-06-11
- **Status:** Accepted

### Context
The application needed authentication with role-based access control for three user tiers (public, member, ops).

### Decision
Use NextAuth 5.0.0-beta.25 with JWT sessions, credentials, and magic-link providers.

### Consequences
- Self-hosted — no per-MAU cost at church scale
- JWT role injection enables RBAC without DB round-trip per request
- Login lockout (5 failures → 15 min) built into authorize callback
- Magic link flow requires Resend integration (not yet wired)
- Early beta version — risk of breaking changes

### Alternatives Considered
- Clerk: Paid tiers at scale, vendor lock-in
- Auth0: Over-engineered for church scale, cost prohibitive

---

## ADR-003: JSON Fallback Content Layer (Hybrid CMS)

- **Date:** 2026-06-12
- **Status:** Accepted

### Context
The public website must deploy and render even when the database is unreachable. CMS content comes from RP OS Herald's Desk.

### Decision
Implement a DB-first content layer with synchronous JSON fallbacks. The content layer (`lib/content.ts`) probes database availability, queries Prisma if available, and falls back to static JSON imports.

### Consequences
- Build succeeds without database (critical for CI/CD)
- Production serves CMS-managed content after Turso seed
- SEO static generation works from JSON at build time
- Extra `SELECT 1` probe on every uncached request
- Sync helpers needed for `generateStaticParams`

### Alternatives Considered
- Pure DB: Build fails without database
- Pure JSON: No CMS integration possible
- ISR only: Slower initial loads for marketing pages

---

## ADR-004: Route Groups for Three-Layer Separation

- **Date:** 2026-06-11
- **Status:** Accepted

### Context
The application serves three distinct user types (anonymous visitors, logged-in members, staff) requiring different layouts and access controls.

### Decision
Use Next.js route groups `(public)/`, `(member)/`, `(ops)/` with middleware-enforced access control.

### Consequences
- Clear separation of concerns in file system
- Middleware gates routes at the edge without per-page boilerplate
- Each layer can have its own layout without nesting complexity
- API routes bypass middleware — must handle auth explicitly

### Alternatives Considered
- Single route group with per-page checks: More boilerplate, error-prone
- Separate apps: Over-engineered for current scale

---

## ADR-005: ECC Integration — RP OS Writes Turso, This Site Reads

- **Date:** 2026-06-12
- **Status:** Accepted

### Context
Content management (sermons, events, leadership, testimonials) needs an admin interface. Building it in this repo duplicates effort with RP OS.

### Decision
Delegate all CMS CRUD to RP OS Herald's Desk. RP OS writes directly to this repo's Turso database and calls `POST /api/revalidate` to bust cache.

### Consequences
- This repo's `(ops)/` stubs are superseded by RP OS
- Shared Turso database between two applications
- `/api/revalidate` must be secured with shared secret
- Cache tags must match between repos (`sermons`, `events`, etc.)

### Alternatives Considered
- Build admin UI in this repo: Duplicate effort with RP OS
- Webhook-only: RP OS writes then notifies; more latency

---

## ADR-006: Integer Cents for Financial Amounts

- **Date:** 2026-06-11
- **Status:** Accepted

### Context
SQLite has no reliable Decimal type. Prisma's Decimal on SQLite can cause rounding errors.

### Decision
Store all monetary values as `Int` (integer cents). The `GivingTransaction.amountCents` field stores amounts in the smallest currency unit (e.g., 1000 = KES 10.00).

### Consequences
- No floating-point rounding errors
- Simple integer arithmetic
- Display formatting required at the UI layer
- Consistent across all financial models

### Alternatives Considered
- Prisma Decimal: Unreliable on SQLite
- Float: Floating-point errors
- String: Cumbersome arithmetic

---

## ADR-007: Household as First-Class Domain

- **Date:** 2026-06-11
- **Status:** Accepted

### Context
Research correction #2 mandated Household as a first-class domain. Families are operational units for giving, care, check-in.

### Decision
Create `Household` + `HouseholdMember` models in Prisma from day one, rather than a `familyId` column on `Member`.

### Consequences
- Household has its own lifecycle independent of members
- `HouseholdMember` supports role-based membership (HEAD, SPOUSE, CHILD, etc.)
- Giving transactions can be attributed to households
- Care cases can be managed at household level

### Alternatives Considered
- `familyId` column on `Member`: Simpler but loses household-level semantics
- No household concept: Loses operational grouping

---

## ADR-008: Lazy Prisma Client Proxy for Build-Time Resilience

- **Date:** 2026-06-11
- **Status:** Accepted

### Context
Vercel builds run without database environment variables. Prisma's query engine caches the database URL on first init — initializing without env vars caches `undefined` and breaks all queries.

### Decision
Implement a lazy Proxy that defers Prisma engine creation until the first method invocation. Production always uses the proxy; development creates eagerly for DX.

### Consequences
- Build succeeds without database env vars
- Slightly more complex client initialization
- First database query is slower (cold start)

### Alternatives Considered
- Eager init with env check: Breaks builds without DB
- Two separate clients: Duplication

---

## ADR-009: Burgundy/Gold Brand Identity (Post-V3)

- **Date:** 2026-06-12
- **Status:** Accepted

### Context
The initial homepage used Motivation Church's cream/beige palette. This didn't reflect Royal Priesthood Embassy's identity.

### Decision
Pivot to burgundy (`#6B1D3A`), gold (`#C9A84C`), and cream (`#FAF7F2`) with three visual registers (Celestial, Parchment, Warm).

### Consequences
- Distinct church identity vs template-looking site
- Three visual registers provide visual hierarchy
- Font stack changed from Cormorant/Inter to Cinzel/Inter/JetBrains Mono
- Required updating all homepage components

### Alternatives Considered
- Keep Motivation palette: Faster but no brand identity
- Full custom design system: More time-consuming

---

## ADR-010: Separate Edge and Server Auth Files

- **Date:** 2026-06-11
- **Status:** Accepted

### Context
Next.js middleware runs on the Edge runtime, which cannot import Prisma, bcrypt, or other Node.js modules.

### Decision
Maintain two auth files: `auth-edge.ts` for JWT validation only (used by middleware), and `auth.ts` for full credential verification (used by API routes and server components).

### Consequences
- Middleware can validate JWT sessions at the edge
- No code duplication between edge and server auth
- Must keep both files in sync for JWT configuration
- Edge file has limited Node.js API access