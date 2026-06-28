# Deployment Documentation — Royal Priesthood Website

> **Purpose:** Document deployment processes for local development, production, and rollback.
> **Last Updated:** 2026-06-28

---

## Prerequisites

- Node.js >= 20
- npm (workspaces)
- Git
- Vercel account (for production deployment)
- Turso account (for production database)
- Upstash account (for rate limiting)

---

## Local Development

### 1. Clone and Install

```bash
git clone https://github.com/RoyalPriesthoodTech/rpwebsite.git
cd rpwebsite
npm install
```

### 2. Environment Variables

```bash
cp apps/web/.env.example apps/web/.env
```

Required for local development:
- `DATABASE_URL=file:./prisma/dev.db` (SQLite local file)

Optional (for Turso production testing):
- `TURSO_DATABASE_URL=libsql://...`
- `TURSO_AUTH_TOKEN=...`

Required for auth testing:
- `NEXTAUTH_URL=http://localhost:3000`
- `AUTH_SECRET=your-random-secret-here`

### 3. Database Setup (Local SQLite)

```bash
cd apps/web
npm run db:push      # Create/update SQLite schema at prisma/dev.db
npm run db:seed      # Seed from content JSON + admin user
```

### 4. Run Dev Server

```bash
npm run dev
# or from repo root:
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Commands

| Command | Location | Description |
|---------|----------|-------------|
| `npm run db:push` | apps/web | Push schema to local SQLite |
| `npm run db:push:turso` | apps/web | Push schema to Turso production |
| `npm run db:seed` | apps/web | Seed database from JSON content |
| `npm run db:setup` | apps/web | `db:push:turso && db:seed` |
| `npm run db:studio` | apps/web | Open Prisma Studio GUI |
| `npm run db:migrate` | apps/web | Alias for `db:push` |

---

## Vercel Deployment

### Production URL
https://rpchurch.vercel.app

### Legacy URL
https://rpwebsite.vercel.app (still referenced in SEO code — see Known Issues)

### Automatic Deploy

The project is configured for automatic deployment from the `main` branch via Vercel Git integration:

1. Push to `main` on GitHub
2. Vercel detects changes and triggers a build
3. Build command: `prisma generate && next build`
4. Output directory: `.next` (default for Next.js)

### Manual Deploy

```bash
npx vercel --prod
```

### Environment Variables on Vercel

| Variable | Required | Notes |
|----------|----------|-------|
| `TURSO_DATABASE_URL` | Yes (for DB features) | LibSQL URL from Turso |
| `TURSO_AUTH_TOKEN` | Yes (for DB features) | Turso auth token |
| `NEXTAUTH_URL` | Yes | `https://rpchurch.vercel.app` |
| `AUTH_SECRET` | Yes | Random string for JWT signing |
| `NODE_ENV` | Auto | Set to `production` by Vercel |
| `REVALIDATE_SECRET` | Yes | Shared secret with RP OS |
| `UPSTASH_REDIS_REST_URL` | Yes (for rate limiting) | From Upstash dashboard |
| `UPSTASH_REDIS_REST_TOKEN` | Yes (for rate limiting) | From Upstash dashboard |
| `SEED_ADMIN_PASSWORD` | For seed script | Admin user password |

### Security Headers (vercel.json)

```json
{
  "headers": [
    { "key": "Strict-Transport-Security", "value": "max-age=63072000; preload" },
    { "key": "X-Frame-Options", "value": "DENY" },
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
    { "key": "Permissions-Policy", "value": "camera=(self), geolocation=(self), microphone=(), payment=()" }
  ]
}
```

---

## Turso Database Deployment

### 1. Create Turso Database

```bash
# Install Turso CLI
curl -sSfL https://get.turso.tech/install.sh | sh

# Login
turso auth login

# Create database
turso db create rpwebsite

# Get connection URL
turso db show rpwebsite --url

# Generate auth token
turso db tokens create rpwebsite
```

### 2. Push Schema to Turso

```bash
cd apps/web
npm run db:push:turso
```

### 3. Seed Database

```bash
npm run db:seed
```

### 4. Verify

```bash
npm run db:studio
```

---

## Build Process

### Local Build

```bash
npm run build
```

This runs:
1. `prisma generate` — generates Prisma client
2. `next build` — builds Next.js application

### TypeScript Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

---

## Rollback Strategy

### Vercel Rollback

1. Go to Vercel dashboard → Deployments
2. Find the last known-good deployment
3. Click "..." → "Promote to Production"

Or use the Vercel CLI:

```bash
npx vercel rollback
```

### Database Rollback

Since the project currently uses `db:push` instead of Prisma migrations, database rollback is manual:

1. **Before any schema change:** Create a backup of the Turso database
2. **To roll back:**
   - Restore from backup (if available)
   - Or manually revert schema changes and re-run `db:push:turso`
   - Or re-seed from JSON content

**Recommendation:** Adopt Prisma migrations (`prisma migrate dev` and `prisma migrate deploy`) for safe schema versioning before production member data.

---

## CI/CD

### Current State

- **No GitHub Actions CI** — Vercel Git integration is the only automated pipeline
- **No staging environment** — deploys directly to production from `main`

### Recommended CI Pipeline

```yaml
# .github/workflows/ci.yml (not yet created)
name: CI
on: [pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
```

---

## Monitoring

### Current State

- `/api/health` — Returns DB connectivity status for uptime monitoring
- No structured logging, metrics, tracing, or alerting configured

### Recommended

- Vercel Analytics for traffic monitoring
- Sentry for error tracking
- Uptime monitoring service pinging `/api/health`

---

## Ecosystem Integration

### RP OS Embassy Command Center

Environment pairing between this site and RP OS:

| rpwebsite | RP OS |
|-----------|-------|
| `REVALIDATE_SECRET` | `WEBSITE_REVALIDATE_SECRET` (same value) |
| — | `WEBSITE_REVALIDATE_URL=https://rpchurch.vercel.app/api/revalidate` |
| `TURSO_*` | `TURSO_WEBSITE_*` (same DB, different token names) |

### ECC Cache Tags

Must match between repos:

| Tag | Invalidated Content |
|-----|---------------------|
| `sermons` | Sermon list + detail |
| `events` | Event list + detail |
| `leadership` | About page leaders |
| `testimonials` | Homepage testimonials |
| `site-config` | Service times, welcome message |
| `homepage` | `/` aggregate |

### Verification

From RP OS repo:

```bash
npm run test:ecc-sync
```

This patches Turso rows, revalidates, confirms marker appears on live HTML, restores originals.