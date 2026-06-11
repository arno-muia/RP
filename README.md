# Royal Priesthood OS v4

Ministry operating system for **Royal Priesthood Embassy** — rebuilt from [rpweb](https://github.com/ken-muritu/rpweb) v3 with a research-validated architecture (May 2026).

**Live:** [rpos-v4.vercel.app](https://rpos-v4.vercel.app)

## Architecture

Three layers: **Public** → **Member Portal** → **Ministry Ops**

| Layer | Path | Technology |
|-------|------|------------|
| Public | `(public)/` | Motivation-inspired marketing UI |
| Member | `(member)/` | Self-service dashboard, household, giving |
| Ops | `(ops)/` | CRM, check-in, reports (RBAC) |

Full spec: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) · Roadmap: [docs/ROADMAP.md](./docs/ROADMAP.md) · KDPA: [docs/COMPLIANCE.md](./docs/COMPLIANCE.md)

## Stack

- **Next.js 16** App Router + TypeScript + Tailwind 4
- **Prisma 6** + Turso LibSQL (lazy client for Vercel)
- **NextAuth v5** (credentials, JWT roles, magic links)
- **Inngest** + **Resend** + **M-Pesa Daraja** (phased)
- **Expo** mobile retained through Phase 3 (staff offline/check-in)

## Monorepo

```
rpos-v4/
├── apps/web/           # Next.js app (deploy root)
│   ├── prisma/         # 28 models incl. Household domain
│   └── src/
│       ├── app/(public|member|ops)/
│       └── lib/        # prisma, auth, rbac
├── docs/               # Architecture, roadmap, compliance
└── design-inspo/       # Church site references
```

## Development

```bash
cp apps/web/.env.example apps/web/.env
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
cd apps/web && npm run db:push   # local SQLite schema
```

## Five corrections (from research report)

1. Keep Expo through Phase 3 — hybrid mobile, not PWA-only  
2. Household first-class in schema from day one  
3. Kenya DPA compliance before production migration  
4. Financial amounts as integer cents  
5. 20-week / 740-hour timeline (not 16 weeks)
