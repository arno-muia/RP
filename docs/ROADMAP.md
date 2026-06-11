# 20-Week Implementation Roadmap

Corrected from Kimi's 16-week estimate (+25% buffer). Target: **740 hours**.

## Phase 1 — Foundation (Weeks 1–4)

| Week | Deliverables |
|------|----------------|
| 1 | Prisma schema finalized (28 models, Household domain), Turso prod DB, KDPA docs started |
| 2 | NextAuth v5, login lockout, JWT roles, middleware RBAC |
| 3 | Public pages: Home, About, Sermons, Visit (Motivation design system) |
| 4 | Member portal scaffold: profile, household view; Ops dashboard KPI shell |

## Phase 2 — Core Operations (Weeks 5–10)

| Week | Deliverables |
|------|----------------|
| 5 | Check-in online: QR, manual entry, visitor registration + consent |
| 6 | Check-in offline (IndexedDB + Expo fallback) |
| 7 | Service sessions, hospitality first-timer queue |
| 8 | M-Pesa Daraja **sandbox**: STK push, callback handler |
| 9 | M-Pesa production, funds, recurring giving (Inngest) |
| 10 | Cell groups, user management, CSV import with consent |

## Phase 3 — Engagement (Weeks 11–16)

| Week | Deliverables |
|------|----------------|
| 11 | Events + calendar, registration |
| 12 | LMS: 6 modules, progress, quizzes |
| 13 | Announcements, targeted notifications |
| 14 | Analytics dashboard (Recharts), exportable reports |
| 15 | PWA (Serwist) + offline testing; Expo parity evaluation |
| 16 | Performance (Lighthouse >95), security audit |

## Phase 4 — Compliance & Launch (Weeks 17–20)

| Week | Deliverables |
|------|----------------|
| 17 | KDPA audit: ODPC registration, SCC execution, privacy policy |
| 18 | Staff training, parallel run with legacy |
| 19 | DNS cutover, 48h monitoring, rollback tested |
| 20 | Legacy decommission, post-launch review |

## Effort by phase

| Phase | Hours |
|-------|-------|
| Foundation | 180 |
| Core Operations | 240 |
| Engagement | 200 |
| Compliance & Launch | 120 |
| **Total** | **740** |

## Current status (`rpos-v4`)

- [x] Repo, Vercel, Next.js 16 scaffold
- [x] Motivation-inspired public homepage
- [x] Prisma schema port (v3, incl. Household)
- [x] Three-layer route groups + RBAC middleware
- [ ] Turso production + env on Vercel
- [ ] NextAuth login UI + seed data
- [ ] M-Pesa sandbox
- [ ] Inngest jobs
- [ ] Expo app (Phase 3)
