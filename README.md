# Royal Priesthood Embassy — Website

**Ministry operating system for Royal Priesthood Embassy (Thika, Kenya).**  
The official public website serving our congregation and visitors.

| Resource | URL |
|----------|-----|
| **Public website** | [rpchurch.vercel.app](https://rpchurch.vercel.app/) |
| **Kingdom Formation Academy** | [rpacademy.vercel.app](https://rpacademy.vercel.app/) |
| **Repository** | [github.com/RoyalPriesthoodTech/rpwebsite](https://github.com/RoyalPriesthoodTech/rpwebsite) |

---

## Features

### Public Website
- **Homepage** — Hero, service times, latest sermon, upcoming events, testimonials, CTA
- **Sermons** — Library with series filtering, detail pages with YouTube links
- **Events** — Upcoming and past event listings with detail pages
- **Academy** — Kingdom Formation module catalog (links to separate LMS)
- **Giving** — M-Pesa till information with allocation breakdown
- **Visit** — Service schedule, location map, FAQs, RSVP
- **About** — Church story, beliefs, values, leadership team, 2026 theme
- **Contact** — Contact form with message submission
- **Prayer** — Prayer request form with anonymous option

### Member Portal (Coming Soon)
- Dashboard, household management, giving history, discipleship progress

### Infrastructure
- Role-based access control (public / member / ops)
- Secure authentication with login lockout
- SEO metadata, sitemap, robots.txt, church JSON-LD

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 (strict) |
| **Styling** | Tailwind CSS v4 |
| **Database** | Turso LibSQL (production) / SQLite (development) |
| **ORM** | Prisma 6 |
| **Authentication** | NextAuth v5 (JWT sessions) |
| **Validation** | Zod 4 |
| **Animation** | Framer Motion, GSAP |
| **Hosting** | Vercel |
| **Icons** | Lucide React |

---

## Installation

### Prerequisites
- Node.js >= 20
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/RoyalPriesthoodTech/rpwebsite.git
cd rpwebsite

# Install dependencies
npm install

# Set up environment variables
cp apps/web/.env.example apps/web/.env

# Set up local database (SQLite)
cd apps/web
npm run db:push
npm run db:seed

# Start development server
cd ../..
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Running Locally

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint
npm run lint

# Type check
npm run type-check
```

### Database Commands

```bash
cd apps/web

# Local SQLite
npm run db:push        # Create/update schema
npm run db:seed        # Seed from content JSON
npm run db:studio      # Open Prisma Studio

# Turso production
npm run db:push:turso  # Push schema to Turso
npm run db:setup       # Push + seed (Turso)
```

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Local dev | SQLite file path |
| `TURSO_DATABASE_URL` | Production | Turso LibSQL URL |
| `TURSO_AUTH_TOKEN` | Production | Turso auth token |
| `NEXTAUTH_URL` | Yes | Canonical app URL |
| `AUTH_SECRET` | Yes | JWT signing secret |
| `REVALIDATE_SECRET` | Production | Shared secret with RP OS |
| `UPSTASH_REDIS_REST_URL` | Production | Rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Production | Rate limiting |

---

## Folder Overview

```
rpwebsite/
├── apps/web/              # Web application (Next.js 16)
│   ├── content/           # Static JSON content (sermons, events, etc.)
│   ├── prisma/            # Database schema, seeds, Turso client
│   ├── public/            # Static assets, images
│   └── src/
│       ├── app/           # Pages and API routes
│       ├── components/    # React components
│       ├── lib/           # Server utilities
│       └── types/         # TypeScript types
│
├── docs/                  # Developer documentation
├── design-inspo/          # Design reference notes
└── scripts/               # Repository scripts
```

---

## Deployment

The project is deployed on **Vercel** with automatic deployments from the `main` branch.

**Production URL:** [rpchurch.vercel.app](https://rpchurch.vercel.app)

For detailed deployment instructions, see [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

---

## Contributing

This is a private repository managed by the Royal Priesthood Tech team.

For developers and AI coding agents, please read the following before working on the codebase:

1. [AI_RULES.md](./AI_RULES.md) — AI agent instruction manual
2. [PROJECT_MEMORY.md](./PROJECT_MEMORY.md) — Current project state
3. [TASKS.md](./TASKS.md) — Active development backlog
4. [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — System architecture

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): add member login form
fix(events): correct timezone handling
docs(api): document giving endpoints
refactor(db): simplify Prisma client
```

---

## Related Projects

| Project | Description |
|---------|-------------|
| [RP OS](https://github.com/RoyalPriesthoodTech/rpos) | Embassy Command Center (CRM) |
| [RP Academy](https://github.com/RoyalPriesthoodTech/rpacademy) | Kingdom Formation LMS |