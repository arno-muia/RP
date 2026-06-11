# v3 → v4 Migration Plan

## Phase 1 — Foundation (current)

- [x] Private repo `ken-muritu/rpos-v4`
- [x] Next.js 15 scaffold at `apps/web`
- [x] Vercel project linked
- [ ] Prisma schema port from `apps/rpos-v3/prisma/schema.prisma`
- [ ] `lib/` core modules (prisma lazy proxy, auth, rbac, mpesa)
- [ ] Public marketing pages with design-system tokens from `design-inspo/`

## Phase 2 — Ministry features

Port route groups from v3:

- `(public)/` — home, visit, giving, events, sermons, learn, check-in
- `(member)/` — dashboard, household, giving history, discipleship
- `(ops)/` — CRM, attendance, care, campaigns, reports

## Phase 3 — Mobile + desktop

- Expo app consuming `/api/mobile/*` JWT endpoints
- Tauri desktop shell for kiosk check-in and offline staff tools

## Technical debt to avoid (from v3 forensic review)

- Remove stale `netlify.toml`
- Align Next.js version at monorepo root and app level
- Use Prisma migrations instead of `db:push` only
- Exclude `dev.db` from git
- Fix Android CI asset paths before re-enabling APK workflow
