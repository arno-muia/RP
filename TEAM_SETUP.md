# Royal Priesthood Public Website — Team Local Setup

**Org repository:** [RoyalPriesthoodTech/rpwebsite](https://github.com/RoyalPriesthoodTech/rpwebsite)

This guide helps contributors run the public website locally. It does **not** contain production credentials. Ask your **team lead** for Turso tokens and shared secrets.

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20 LTS or 22.x |
| npm | 10+ |
| Git | Latest |

Optional: [Turso CLI](https://docs.turso.tech/cli)

---

## 1. Clone and install

```bash
git clone https://github.com/RoyalPriesthoodTech/rpwebsite.git
cd rpwebsite/apps/web
npm install
```

The Next.js app lives in **`apps/web/`** (not the repo root).

---

## 2. Environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` locally. **Never commit `.env.local` or `.env`.**

| Variable | How to obtain |
|----------|----------------|
| `DATABASE_URL` | Local: `file:./prisma/dev.db` |
| `TURSO_DATABASE_URL` | Team lead or `turso db show rpwebsite` |
| `TURSO_AUTH_TOKEN` / `DATABASE_AUTH_TOKEN` | Team lead or `turso db tokens create rpwebsite` |
| `NEXTAUTH_SECRET` / `AUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` |
| `SEED_ADMIN_PASSWORD` | Local-only password for seeding |
| `REVALIDATE_SECRET` | Team lead (only if testing RP OS cache bust webhook) |
| `RESEND_API_KEY` | Optional (transactional email) |
| `UPSTASH_REDIS_REST_*` | Optional locally — rate limiting skipped when unset |

Full list: `apps/web/.env.example`

---

## 3. Database setup

**Local SQLite:**

```bash
npm run db:push
SEED_ADMIN_PASSWORD='your-local-admin' npm run db:seed
```

**Turso:**

```bash
# Fill Turso vars in .env.local first
npm run db:setup
```

Content JSON files in `apps/web/content/` are loaded during seed (sermons, events, leadership, etc.).

---

## 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Member portal:** `/login` → `/dashboard` (requires seeded user + valid auth env)

---

## 5. Verify your setup

```bash
npm run type-check
npm run build
npm run lint
```

Health check: `GET /api/health` → `200`

---

## 6. Project layout (essentials)

| Path | Purpose |
|------|---------|
| `apps/web/src/app/` | Pages (public, member, ops) |
| `apps/web/src/components/` | UI sections, forms, layout |
| `apps/web/content/` | Static JSON content (also seeded to DB) |
| `apps/web/prisma/` | Schema and seed |
| `apps/web/public/` | Images, logo, favicons |

---

## 7. Ecosystem context

| Product | Repo | Role |
|---------|------|------|
| **Website** (this) | RoyalPriesthoodTech/rpwebsite | Public marketing + member portal |
| **RP OS** | RoyalPriesthoodTech/rpos | CMS source (Scribe's Chamber) |
| **Academy** | RoyalPriesthoodTech/rpacademy | Kingdom Formation LMS |

Live sermon/event content is typically managed in RP OS and revalidated on the website via `/api/revalidate` (team lead configures shared secret).

---

## 8. Security rules for contributors

1. **Never** commit `.env.local`, tokens, or passwords.
2. Contact/prayer forms include honeypot fields — do not remove anti-spam logic.
3. Use local-only `SEED_ADMIN_PASSWORD` for development.

---

## 9. Troubleshooting

| Issue | Fix |
|-------|-----|
| Seed fails | Set `SEED_ADMIN_PASSWORD` in environment |
| Prisma client error | Run `npm run db:generate` from `apps/web/` |
| Auth redirect loop | Ensure `NEXTAUTH_URL` matches your dev port |
| GSAP animations janky | Normal in dev; test production build for perf |

---

## 10. Getting help

- **Credentials:** Team lead
- **Bugs:** GitHub Issues in this repository
