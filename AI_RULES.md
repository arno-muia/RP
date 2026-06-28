# AI Agent Rules — Royal Priesthood Website

> **Purpose:** Permanent instruction manual for AI coding agents. Read this file first before any work.
> **Last Updated:** 2026-06-28

---

## Before Starting Any Work

As an AI coding agent, you **MUST** read these files in order before making any changes:

1. **`CONTEXT.md`** — Entry point; lists all documents to read in order
2. **`PROJECT_MANIFEST.md`** — Project vision, core principles, and constitutional rules
3. **`PROJECT_MEMORY.md`** — Current project state, known issues, and next recommended tasks
4. **`TASKS.md`** — Active backlog with priority ordering
5. **`SESSION.md`** — Current session objectives and progress
6. **`docs/ARCHITECTURE.md`** — System architecture, data flow, and design decisions
7. **`docs/DECISIONS.md`** — Architecture Decision Records (ADR) — never violate past decisions

**Do not continue until all files above have been read.**

### Before Modifying Any Code: Documentation-First Workflow

1. **Read** — Read the relevant documentation (above) to understand the current state
2. **Determine** — Identify which documentation files will be affected by your changes
3. **Implement** — Write the code changes
4. **Update** — Update all affected documentation files
5. **Verify** — Run the Documentation Checklist (below)
6. **Finish** — Only then consider the task complete

This shifts documentation from an afterthought to part of the implementation process.

---

## During Development

### Code Quality

- Use TypeScript strict mode; no `any` types unless absolutely necessary
- Follow the existing code patterns in `src/lib/` and `src/components/`
- Use Zod for all API route input validation
- Use `cn()` utility for Tailwind class merging
- Keep server components server-side; minimize `"use client"` directives
- Never hardcode secrets — always use environment variables

### Data Layer

- Always use the lazy Prisma client pattern (`getPrisma()` from `lib/prisma.ts`)
- Use `unstable_cache` with appropriate cache tags for data fetching
- Never call `dbAvailable()` inside a render path without a fallback
- Financial amounts must always be integer cents (`amountCents: Int`)
- Content layer should prefer DB-first with JSON fallback

### Authentication & Authorization

- Public routes go in `(public)/` — no auth required
- Member routes go in `(member)/` — login required
- Ops routes go in `(ops)/` — login + RBAC required
- Middleware handles auth gating at the edge — do not duplicate in pages
- API routes bypass middleware — validate auth explicitly in route handlers

---

## When Finishing Work

After completing any development task, you **MUST** perform all of the following updates:

### 1. Update `PROJECT_MEMORY.md`

- Bump `Last Updated` date
- Update `Current Version` if changed
- Move items between Completed / In Progress / Pending sections as appropriate
- Update Current Known Issues (resolve or add new)
- Update Next Recommended Tasks

### 2. Append to `docs/DEVELOPMENT_LOG.md`

Add a new entry with:
- **Date**
- **Task** — what was done
- **Files Modified** — list all changed files
- **Reason** — why the change was made
- **Implementation Details** — key technical decisions
- **Testing Performed** — what was tested
- **Problems Encountered** — any issues faced
- **Resolution** — how issues were resolved
- **Next Steps** — what comes next

**NEVER delete or modify previous entries.**

### 3. Update `TASKS.md`

- Move completed items to the Completed section
- Add new tasks discovered during development
- Reorder priorities if needed
- Update `Last Updated` date

### 4. Update `CHANGELOG.md` (if user-facing changes)

Only if the changes affect public behavior, UI, or API:
- Add a new version entry or append to the current version's `### Added / Changed / Fixed / Removed`
- Follow [Keep a Changelog](https://keepachangelog.com/) format

### 5. Update `README.md` (if public behavior changed)

Only if installation, usage, architecture, or features changed.

### 6. Update `docs/DECISIONS.md` (if architectural decisions were made)

Append a new ADR entry — never overwrite previous ADRs.

---

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | New feature or enhancement |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `refactor` | Code restructuring without behavior change |
| `perf` | Performance improvement |
| `test` | Adding or modifying tests |
| `chore` | Build, CI, dependency updates |
| `style` | Formatting, styling (not CSS) |
| `security` | Security fix |

### Scopes

| Scope | Area |
|-------|------|
| `auth` | Authentication, authorization, middleware |
| `public` | Public-facing pages and components |
| `member` | Member portal pages |
| `ops` | Operations portal pages |
| `api` | API routes |
| `db` | Prisma schema, migrations, seeds |
| `content` | JSON content layer, CMS integration |
| `ui` | UI components, design system |
| `infra` | Deployment, CI/CD, environment |
| `docs` | Documentation changes |

### Examples

```
feat(auth): add member login form
fix(events): correct timezone handling for event dates
docs(api): document giving endpoints
refactor(db): simplify Prisma client initialization
chore(infra): add GitHub Actions CI workflow
security(api): add rate limiting to contact endpoint
```

---

## Documentation Checklist

Before ending any task, verify documentation consistency:

- [ ] `README.md` updated? (if public behavior, features, or installation changed)
- [ ] `PROJECT_MEMORY.md` updated? (project state, known issues, version)
- [ ] `docs/DEVELOPMENT_LOG.md` appended? (engineering journal entry)
- [ ] `TASKS.md` updated? (completed items moved, new tasks added)
- [ ] `docs/DECISIONS.md` appended? (if an architectural decision was made)
- [ ] `CHANGELOG.md` updated? (if user-facing behavior changed)
- [ ] `docs/API.md` updated? (if API routes changed)
- [ ] `docs/DATABASE.md` updated? (if schema changed)
- [ ] `docs/DEPLOYMENT.md` updated? (if deployment processes changed)
- [ ] `SESSION.md` updated or cleared? (session tracker)
- [ ] ADR needed? (check if decisions affect architecture)

If any box is unchecked, the task is not complete.

---

## Prohibited Actions

As an AI agent, you must **NEVER**:

- ❌ **Delete historical logs** — `docs/DEVELOPMENT_LOG.md` entries are permanent
- ❌ **Rewrite completed work** — Do not change working code without a clear reason
- ❌ **Remove completed tasks** — Move them to the Completed section instead
- ❌ **Invent project state** — If you don't know something, say so; do not fabricate
- ❌ **Remove documentation without reason** — Deprecate and redirect rather than delete
- ❌ **Modify previous ADRs** — Append new decisions; never overwrite
- ❌ **Hardcode secrets** — Always use environment variables
- ❌ **Skip the PROCEDURAL CHECK** section below

---

## Procedural Check (Run Before Every Commit)

Before committing, verify:

- [ ] `PROJECT_MEMORY.md` updated
- [ ] `docs/DEVELOPMENT_LOG.md` appended
- [ ] `TASKS.md` updated
- [ ] `CHANGELOG.md` updated (if user-facing)
- [ ] `README.md` updated (if public behavior changed)
- [ ] `docs/DECISIONS.md` appended (if architectural decision made)
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run build` succeeds
- [ ] No hardcoded secrets
- [ ] No `console.log` or debug code left in
- [ ] Commit message follows Conventional Commits format
- [ ] Changes are properly scoped and documented