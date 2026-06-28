# Events Management

> **Purpose:** Business logic for church events.
> **Last Updated:** 2026-06-28
> **Status:** JSON + DB Complete, CRUD delegated to RP OS

---

## Overview

Events are published on the public website to inform visitors and members about upcoming church activities. Event CRUD is managed through RP OS Herald's Desk.

## User Stories

### As a visitor, I want to:
- See upcoming events on the homepage
- Browse all events on the events page
- View event details (date, time, location, description, poster)
- RSVP to events that require registration

### As a staff member, I want to:
- Create, edit, and delete events through RP OS
- Set registration requirements and attendee limits
- See event status (draft, published, cancelled, completed)

## Data Sources

1. **Primary:** Turso database (`ChurchEvent` model) — written by RP OS
2. **Fallback:** `content/events.json` — used when DB is unavailable at build time

## Event Status Mapping

| DB Status | Display Status |
|-----------|----------------|
| `PUBLISHED` + future date | `upcoming` |
| `PUBLISHED` + past date | `ongoing` |
| `COMPLETED` | `past` |
| `DRAFT` | Hidden from public |
| `CANCELLED` | Hidden from public |

## Acceptance Criteria

- [ ] Upcoming events displayed on homepage (limited)
- [ ] Full event listing at `/events` with upcoming/past tabs
- [ ] Event detail page at `/events/[slug]` with poster, date, time, location
- [ ] RSVP form for events with `registrationRequired: true`
- [ ] Events render from DB when available, JSON fallback otherwise
- [ ] Cache invalidated on `events` tag via RP OS webhook