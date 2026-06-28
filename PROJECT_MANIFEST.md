# Project Manifest — Royal Priesthood Website

> **Purpose:** Canonical description of project identity, principles, and long-term goals. This document changes rarely and serves as the project's constitution.
> **Last Updated:** 2026-06-28
> **Maintained By:** Royal Priesthood Tech Team
> **Applies To:** v4.x

---

## Vision

A unified digital platform for Royal Priesthood Embassy that serves three constituencies:

- **Visitors and the public** — discover service times, sermons, events, and giving
- **Members** — manage households, track giving, progress through discipleship
- **Staff and ministry leaders** — operate check-in, pastoral care, reporting, and CRM

## Core Principles

### 1. Persistent Knowledge

Documentation is not an afterthought — it is a first-class deliverable. Every development task must update the relevant documentation before being considered complete. The documentation is designed to survive conversation resets and personnel changes.

### 2. Source of Truth in Code

Documentation is always derived from and verified against the actual source code. We do not fabricate features or document aspirational behavior. If documentation contradicts code, the code wins.

### 3. Progressive Enhancement

The system grows in capability over time through planned phases (see [docs/ROADMAP.md](./docs/ROADMAP.md)). Each phase builds on the previous without breaking existing functionality. The schema anticipates future needs (35 models for a 13-domain ministry OS) without requiring all UIs to exist immediately.

### 4. Research-Validated Architecture

All architectural decisions are validated against the May 2026 deep research report. Five non-negotiable corrections govern every decision:

1. **Keep Expo through Phase 3** — hybrid mobile, not PWA-only
2. **Household as first-class domain** — `Household` + `HouseholdMember` models from day one
3. **Kenya DPA before production migration** — ODPC registration, SCCs, compliance
4. **Integer cents for money** — never Prisma Decimal on SQLite
5. **20-week / 740-hour timeline** — not 16 weeks

### 5. Ecosystem Mindset

This project is one of three products (RP Website, RP OS, RP Academy) that share infrastructure and data. We avoid duplicating functionality. CMS admin lives in RP OS. LMS lives in RP Academy. This project is the public face.

### 6. Security by Default

Authentication is enforced at the middleware layer. Public APIs are rate-limited. Secrets are never hardcoded. HSTS and security headers are deployed from day one — before sensitive data exists.

### 7. AI-Assisted Development

The repository is structured for effective collaboration between human developers and AI coding agents. Clear entry points (CONTEXT.md), mandatory reading orders, and permanent instruction manuals (AI_RULES.md) ensure every AI session starts with complete context.

## Major Architectural Constraints

| Constraint | Rationale | Violation Risk |
|------------|-----------|----------------|
| Turso LibSQL (not Postgres) | Edge replication, integer-cent money, v3 continuity | Schema incompatible with Postgres |
| NextAuth v5 self-hosted | No per-MAU cost, JWT roles | Breaking change to migrate providers |
| JSON content fallback | Build-time resilience without DB | All new data fetchers must follow this pattern |
| Route groups (public/member/ops) | Three-layer security model | Authentication bypass |
| Integer cents for all money | SQLite has no reliable Decimal | Financial calculation errors |
| ECC integration for CMS | Avoid duplicating RP OS admin UI | Data inconsistency between apps |

## Definition of Done

A feature is considered complete when:

- [ ] Code implements the feature according to specification
- [ ] Feature works in local development environment
- [ ] All existing tests pass (or new tests added if applicable)
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
- [ ] Relevant documentation updated (see Documentation Checklist)
- [ ] Architectural decisions documented (if applicable)
- [ ] No hardcoded secrets or credentials
- [ ] No dead code or debug artifacts left behind
- [ ] Commit message follows Conventional Commits format

## Long-Term Roadmap

| Horizon | Goal |
|---------|------|
| **Phase 1** (Weeks 1-4) | Public marketing site + auth backend |
| **Phase 2** (Weeks 5-10) | Core operations: check-in, giving, cell groups |
| **Phase 3** (Weeks 11-16) | Engagement: events, LMS, notifications, PWA |
| **Phase 4** (Weeks 17-20) | Compliance, launch, training, legacy decommission |

See [docs/ROADMAP.md](./docs/ROADMAP.md) for detailed week-by-week plan.

## Coding Standards

- **TypeScript:** Strict mode enabled. No `any` types unless absolutely necessary.
- **Components:** Server components by default. Minimize `"use client"` directives.
- **Validation:** Zod for all API route input validation.
- **Styling:** Tailwind CSS v4 with `cn()` utility for class merging.
- **Data access:** Lazy Prisma client pattern (`getPrisma()` from `lib/prisma.ts`).
- **Financial amounts:** Always integer cents (`amountCents: Int`).
- **Content layer:** DB-first with JSON fallback.
- **Secrets:** Never hardcoded — always environment variables.