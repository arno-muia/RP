# Feature Specifications

> **Purpose:** Business logic documentation for major features. These describe what features do and why, not how they're implemented.
> **Last Updated:** 2026-06-28
> **Maintained By:** Product Team

---

This directory contains feature specifications for the Royal Priesthood Website.

Each document describes the business logic, user stories, acceptance criteria, and design rationale for a major feature area.

## Index

| Feature | Status | Document |
|---------|--------|----------|
| Authentication & Login | Backend complete, UI stub | [`authentication.md`](./authentication.md) |
| Events Management | JSON + DB, CRUD in RP OS | [`events.md`](./events.md) |
| Academy / LMS | Marketing page only, LMS in separate app | [`academy.md`](./academy.md) |
| Giving | Informational only, M-Pesa display | [`giving.md`](./giving.md) |
| Member Portal | Stubs only, not implemented | [`member-portal.md`](./member-portal.md) |
| Notifications | Not implemented | [`notifications.md`](./notifications.md) |
| Sermons | Working with JSON fallback | [`sermons.md`](./sermons.md) |
| Service Times & Visit | Working | [`visit.md`](./visit.md) |

---

## Feature Lifecycle

Each feature goes through these stages:

1. **Proposed** — Idea documented, awaiting prioritization
2. **In Development** — Being implemented in code
3. **Complete** — Implemented, documented, tested
4. **Deprecated** — Replaced by another feature or removed

Status is tracked in the feature document header.