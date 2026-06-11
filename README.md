# Royal Priesthood OS v4

Clean rebuild of [rpweb](https://github.com/ken-muritu/rpweb) — the ministry operating system for Royal Priesthood Embassy.

## Stack

| Layer | Technology |
|-------|------------|
| Web app | Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 |
| Hosting | Vercel |
| Database | Turso LibSQL + Prisma (planned — port from v3) |
| Auth | NextAuth v5 (planned) |
| Jobs / email | Inngest + Resend (planned) |
| Payments | M-Pesa Daraja STK Push (planned) |
| Mobile | Expo SDK (planned — Phase 2) |
| Desktop kiosk | Tauri v2 (planned — Phase 3, staff check-in / offline) |

## Monorepo layout

```
rpos-v4/
├── apps/
│   └── web/          # Primary Next.js app (public + member + ops)
├── packages/         # shared types, content, utils (planned)
├── design-inspo/     # Reference HTML snapshots from benchmark church sites
└── vercel.json
```

## Design direction

Public marketing UI follows **Motivation Church** patterns (see `design-inspo/motivationchurch.txt`):

- Cormorant Garamond + Inter typography
- Warm cream backgrounds (`#f7f4ef`)
- Full-bleed hero with service times + “New Here?” CTA
- Italic serif accent words (“Love *God.* Love *People.*”)
- Offset image pairs, event cards, ministry photo grid
- Latest sermon block + visit invitation section

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Migration from v3

See `docs/MIGRATION.md` for the phased port plan from `ken-muritu/rpweb` (`apps/rpos-v3`).
