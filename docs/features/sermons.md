# Sermons

> **Purpose:** Business logic for sermon library.
> **Last Updated:** 2026-06-28
> **Status:** Complete

---

## Overview

The sermon library displays published sermons from Royal Priesthood Embassy. Sermons are organized by series and include video links, audio, and notes.

## User Stories

### As a visitor, I want to:
- Browse all published sermons sorted by date (newest first)
- Filter sermons by series
- Read sermon details (title, speaker, date, scripture, description)
- Watch or listen to sermons via YouTube
- View related sermons from the same series

## Data Sources

1. **Primary:** Turso database (`PublicSermon` model, `SermonSeries` model) — written by RP OS
2. **Fallback:** `content/sermons.json`, `content/series.json` — used when DB is unavailable

## Acceptance Criteria

- [ ] Sermon list at `/sermons` shows all published sermons, sorted by date
- [ ] Series filter chips allow narrowing by series
- [ ] Sermon detail at `/sermons/[slug]` shows full sermon info
- [ ] Related sermons section shows other sermons from same series
- [ ] Static generation via `generateStaticParams` from JSON at build time
- [ ] Cache invalidated on `sermons` tag via RP OS webhook
- [ ] Empty states for series with no sermons (e.g., "gift-series" with 0 sermons)

## Known Issues

- **Video playback:** Links point to YouTube channel URL, not per-sermon video IDs
- **Thumbnails:** Use generic images, not sermon-specific artwork

## Content Inventory

| File | Records | Key Fields |
|------|---------|------------|
| `content/sermons.json` | 8 | slug, title, series, speaker, date, videoUrl |
| `content/series.json` | 6 | slug, title, sermonCount (includes 1 with 0 sermons) |