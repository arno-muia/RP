# Royal Priesthood OS — Architecture

Validated against the May 2026 deep research report (DeepSeek / ChatGPT / Kimi review). This document is the source of truth for `rpos-v4`.

## Five non-negotiable corrections

1. **Keep Expo through Phase 3** — PWA for public/member; native app for staff check-in, offline sync, push.
2. **Household as first-class domain** — `Household` + `HouseholdMember` in Prisma from day one (not `familyId` on Member).
3. **Kenya DPA before data migration** — ODPC registration, Turso DPA + SCCs, breach procedure. See [COMPLIANCE.md](./COMPLIANCE.md).
4. **Integer cents for money** — `GivingTransaction.amountCents Int`; never Prisma `Decimal` on SQLite.
5. **20-week timeline, 740 hours** — M-Pesa (+2 wks), compliance, PWA testing each add buffer.

## Three-layer product model

| Layer | Route group | Auth | Roles | Purpose |
|-------|-------------|------|-------|---------|
| Public | `(public)/` | None | — | Marketing, giving, events, sermons, learn, self check-in |
| Member | `(member)/` | Session | `MEMBER` + staff | Dashboard, household, giving history, discipleship |
| Ops | `(ops)/` | Session + RBAC | `ADMIN`, `HOSPITALITY`, `LEADERSHIP`, `CELL_LEADER`* | CRM, check-in, care, reports |

\* `CELL_LEADER` limited to groups + attendance routes.

## Stack

```
Frontend     Next.js 16 App Router · Tailwind v4 · Motivation-inspired public UI
Mobile       Expo (Phase 3) — staff workflows; shared `/api/mobile/*` JWT layer
Backend      Server Actions · Route Handlers · Inngest (background jobs)
Database     Prisma 6 + Turso LibSQL · lazy client for Vercel builds
Auth         NextAuth v5 · bcrypt 12 · JWT role injection · magic links (Resend)
Payments     M-Pesa Daraja STK Push · sandbox → production migration path
Hosting      Vercel · Turso embedded replicas · GitHub Actions CI
```

## Data flow

```
Clients (Web / Expo)
    → Next.js API + Server Actions
    → Prisma (lazy singleton)
    → Turso LibSQL (prod) | SQLite file (local dev)
    → Inngest / Resend / M-Pesa Daraja
```

## SQLite operational notes

- `ALTER TABLE` is limited; Prisma rebuilds tables with exclusive locks.
- Schedule schema migrations midweek; consider blue-green DB cutover per campus (Turso DB-per-tenant ready).
- Financial amounts: always integer smallest currency unit.

## Mobile strategy (hybrid)

| Surface | Channel | Rationale |
|---------|---------|-----------|
| Visitors, sermons, giving | PWA / web | Low install friction |
| Staff check-in, QR, offline | Expo | Background sync + push on budget Android |

Do not sunset Expo until PWA Background Sync is reliable on iOS Safari and entry-level Android browsers.

## References

- Port lineage: `ken-muritu/rpweb` (`apps/rpos-v3`)
- Design (public layer): Motivation Church patterns in `design-inspo/motivationchurch.txt`
- Roadmap: [ROADMAP.md](./ROADMAP.md)
- Compliance: [COMPLIANCE.md](./COMPLIANCE.md)
