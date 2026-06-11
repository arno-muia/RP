# Migration from rpweb v3

Superseded by [ROADMAP.md](./ROADMAP.md). Quick status:

## Ported to v4

- [x] Prisma schema (`apps/web/prisma/schema.prisma`) — 28 models, Household domain
- [x] `lib/prisma.ts` lazy Turso/SQLite client
- [x] `lib/rbac.ts` + middleware three-layer protection
- [x] `lib/auth.ts` + `auth-edge.ts` + magic-link tokens
- [x] Route groups: `(public)`, `(member)`, `(ops)`
- [x] Motivation-inspired public homepage

## Next (Phase 1)

- [ ] Turso production + Vercel env vars
- [ ] `prisma/seed.ts` + login UI
- [ ] Port remaining `(public)` pages from v3
- [ ] Member household view wired to Prisma
- [ ] Ops KPI dashboard

## Deferred

- M-Pesa sandbox (Week 8)
- Inngest jobs (Week 9)
- Expo app monorepo package (Phase 3)
- Tauri kiosk (post-Expo evaluation)

## v3 debt not carried forward

- Stale `netlify.toml`
- `dev.db` in git
- Root/app Next.js version skew
- `db:push` only — adopt migrations before production cutover
