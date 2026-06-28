# Release Checklist — Royal Priesthood Website

> **Purpose:** Production release verification checklist.
> **Last Updated:** 2026-06-28
> **Applies To:** v4.x

---

## Pre-Release

### Code Quality

- [ ] `npm run lint` passes with no errors
- [ ] `npm run type-check` passes with no errors
- [ ] `npm run build` succeeds (production build)
- [ ] All new code follows project coding standards (see `PROJECT_MANIFEST.md`)

### Testing

- [ ] Unit tests pass (if applicable)
- [ ] Integration tests pass (if applicable)
- [ ] E2E tests pass (if applicable)
- [ ] Manual smoke test of public pages
- [ ] Manual smoke test of API routes
- [ ] Mobile responsive verification

### Security

- [ ] No hardcoded secrets or credentials in code
- [ ] Environment variables documented in `.env.example`
- [ ] API rate limiting configured
- [ ] Authentication gating verified for member/ops routes
- [ ] Security headers present (HSTS, X-Frame-Options, etc.)

### Database

- [ ] Schema changes reviewed and tested
- [ ] Prisma migrations ready (not `db:push` for production)
- [ ] Seed data verified
- [ ] Rollback plan documented

## Release

### Documentation

- [ ] `README.md` reviewed and updated
- [ ] `CHANGELOG.md` updated with release notes
- [ ] `PROJECT_MEMORY.md` updated with new version state
- [ ] `docs/API.md` updated if API routes changed
- [ ] `docs/DATABASE.md` updated if schema changed
- [ ] `docs/DEPLOYMENT.md` updated if processes changed

### Versioning

- [ ] Version bumped in root `package.json`
- [ ] Version bumped in `apps/web/package.json`
- [ ] Git tag created for version

### Deployment

- [ ] Vercel production build verified (preview deploy)
- [ ] Environment variables configured in Vercel
- [ ] Turso database reachable from production
- [ ] Custom domain DNS verified
- [ ] SSL/TLS certificate valid
- [ ] `robots.txt` correct for production (no disallowed public paths)

### Monitoring

- [ ] `/api/health` returns healthy
- [ ] Uptime monitoring configured (if applicable)
- [ ] Error tracking configured (if applicable)

## Post-Release

- [ ] Production smoke test
- [ ] RP OS ECC sync test (`npm run test:ecc-sync` from RP OS repo)
- [ ] Rollback procedure documented and tested
- [ ] Release announced to stakeholders