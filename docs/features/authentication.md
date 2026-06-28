# Authentication & Login

> **Purpose:** Business logic and user stories for authentication.
> **Last Updated:** 2026-06-28
> **Status:** Backend Complete, UI Stub

---

## Overview

Authentication provides secure access to member and ops portals. The system supports email/password login with magic link as a secondary provider.

## User Stories

### As a visitor, I want to:
- Sign in with my email and password
- Reset my password if I forget it
- Be locked out temporarily after too many failed attempts (security)

### As a staff/admin, I want to:
- Have a magic link sent to my email for passwordless login
- Be forced to change password on first login
- See my role reflected in what I can access

## Authentication Flow

```
Visitor → Login Page → Enter Credentials
  → Valid? → JWT Session Created (30-day)
  → Invalid? → Attempt Count +1
  → 5 Failures? → Account Locked (15 min)
  → First Login? → Must Change Password
```

## Acceptance Criteria

- [ ] Login form validates email format and password length (min 8 chars)
- [ ] Successful login creates JWT session with role
- [ ] Failed attempts increment counter
- [ ] Account locks after 5 consecutive failures for 15 minutes
- [ ] First-time login forces password change
- [ ] Audit log entry created on successful login
- [ ] Magic link generation works (email sending not yet wired)

## Current State

| Component | Status |
|-----------|--------|
| Auth backend (credentials) | Complete |
| Auth backend (magic link) | Complete (library) |
| JWT role injection | Complete |
| Login lockout | Complete |
| Audit logging | Complete |
| Login UI | Complete |
| Magic link email sending | Not wired (needs Resend) |
| `/auth/magic` page | Complete |
| `/change-password` page | Complete |