# API Documentation — Royal Priesthood Website

> **Purpose:** Document every API route in the application.
> **Last Updated:** 2026-06-28

> **Note:** API routes bypass the middleware matcher (`matcher` excludes `api`). Authentication must be handled explicitly in route handlers.

---

## POST /api/contact

Submit a contact form message.

### Method
`POST`

### Authentication
None (public)

### Rate Limiting
Yes — enforced via `enforceRateLimit(request, "contact")` using Upstash Ratelimit

### Request Body

```json
{
  "name": "string (2-100 chars, required)",
  "email": "string (email format, required)",
  "phone": "string (10-20 chars, optional, regex: /^\\+?[0-9\\s-]{10,20}$/ )",
  "message": "string (10-5000 chars, required)",
  "honeypot": "string (max 0 chars, optional — anti-spam)",
  "subject": "string (max 0 chars, optional — anti-spam)"
}
```

### Response — Success (200)

```json
{
  "success": true
}
```

### Response — Validation Error (400)

```json
{
  "error": "Invalid form data"
}
```

### Response — Rate Limited (429)

```json
{
  "error": "Too many requests. Please try again later."
}
```

### Response — Server Error (500)

```json
{
  "error": "Failed to submit"
}
```

### Database Table
`ContactSubmission` — stores `name`, `email`, `phone`, `message`

### Errors
| Status | Condition |
|--------|-----------|
| 400 | Zod validation failure (invalid fields) |
| 429 | Rate limit exceeded |
| 500 | Prisma write failure (DB unreachable) |

---

## POST /api/prayer

Submit a prayer request.

### Method
`POST`

### Authentication
None (public)

### Rate Limiting
Yes — enforced via `enforceRateLimit(request, "contact")` using Upstash Ratelimit

### Request Body

```json
{
  "name": "string (max 200 chars, optional)",
  "request": "string (1-5000 chars, required)",
  "anonymous": "boolean (optional, default false)",
  "honeypot": "string (max 0 chars, optional — anti-spam)"
}
```

### Response — Success (200)

```json
{
  "success": true
}
```

### Response — Validation Error (400)

```json
{
  "error": "Invalid form data"
}
```

### Response — Rate Limited (429)

```json
{
  "error": "Too many requests. Please try again later."
}
```

### Response — Server Error (500)

```json
{
  "error": "Failed to submit"
}
```

### Database Table
`PrayerSubmission` — stores `name` (null if anonymous), `request`, `anonymous` flag

### Errors
| Status | Condition |
|--------|-----------|
| 400 | Zod validation failure |
| 429 | Rate limit exceeded |
| 500 | Prisma write failure (DB unreachable) |

---

## POST /api/revalidate

On-demand cache invalidation from RP OS Embassy Command Center.

### Method
`POST`

### Authentication
Required — `x-revalidate-secret` header must match `REVALIDATE_SECRET` environment variable

### Rate Limiting
Yes — enforced via `enforceRateLimit(request, "api")` using Upstash Ratelimit

### Headers

| Header | Value | Required |
|--------|-------|----------|
| `x-revalidate-secret` | Shared secret (matches `REVALIDATE_SECRET` env var) | Yes |
| `Content-Type` | `application/json` | Yes |

### Request Body

```json
{
  "tags": ["sermons", "homepage"],
  "paths": ["/", "/sermons"]
}
```

Both `tags` and `paths` are optional. Defaults:
- `tags`: `[]` (empty)
- `paths`: `["/"]`

### Cache Tags

| Tag | Invalidated Content |
|-----|---------------------|
| `sermons` | Sermon list + detail |
| `events` | Event list + detail |
| `leadership` | About page leaders |
| `testimonials` | Homepage testimonials |
| `site-config` | Service times, welcome message |
| `homepage` | `/` aggregate |

### Response — Success (200)

```json
{
  "revalidated": true,
  "tags": ["sermons", "homepage"],
  "paths": ["/", "/sermons"],
  "at": "2026-06-28T05:00:00.000Z"
}
```

### Response — Unauthorized (401)

```json
{
  "error": "Unauthorized"
}
```

### Response — Bad Request (400)

```json
{
  "error": "Invalid JSON"
}
```

### Response — Rate Limited (429)

```json
{
  "error": "Too many requests. Please try again later."
}
```

### Errors
| Status | Condition |
|--------|-----------|
| 400 | Invalid JSON in request body |
| 401 | Missing or incorrect `x-revalidate-secret` |
| 429 | Rate limit exceeded |

---

## GET/POST /api/auth/[...nextauth]

NextAuth authentication handlers (Next.js catch-all route).

### Methods
`GET`, `POST`

### Authentication
Varies by provider:
- `credentials` — email + password (Zod validated)
- `magic-link` — HMAC token verification

### Endpoints

| Path | Purpose |
|------|---------|
| `/api/auth/signin` | Sign-in page (NextAuth built-in) |
| `/api/auth/callback/credentials` | Credentials provider callback |
| `/api/auth/callback/magic-link` | Magic link provider callback |
| `/api/auth/session` | Get current session |
| `/api/auth/signout` | Sign out |
| `/api/auth/csrf` | CSRF token |
| `/api/auth/providers` | List configured providers |

### Credentials Provider Behaviour
1. Zod validates email + password (email format, password min 8 chars)
2. Looks up user by email
3. Checks if account is locked (`lockedUntil > now`)
4. Verifies password with bcrypt (cost 12)
5. On failure: increments `failedLoginAttempts`, locks account after 5 failures (15 min)
6. On success: creates `AuditLog` entry (`action: LOGIN`), resets `failedLoginAttempts`

### JWT Session Shape

```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "MEMBER|ADMIN|HOSPITALITY|LEADERSHIP|CELL_LEADER",
    "memberId": "uuid (optional)",
    "mustChangePassword": false
  },
  "expires": "2026-07-28T05:00:00.000Z"
}
```

### Errors
| Status | Condition |
|--------|-----------|
| 400 | Invalid credentials format |
| 423 | Account locked (5 failed attempts, 15 min cooldown) |
| 401 | Invalid email or password |

---

## POST /api/rsvp

Submit an RSVP for a church event.

### Method
`POST`

### Authentication
None (public)

### Rate Limiting
Yes — enforced via Upstash Ratelimit

### Request Body

```json
{
  "eventId": "string (uuid, required)",
  "name": "string (required)",
  "email": "string (email format, required)",
  "phone": "string (optional)",
  "attending": "boolean (required)",
  "guests": "number (optional, default 0)"
}
```

### Response — Success (200)

```json
{
  "success": true
}
```

### Database Table
`EventRegistration` — stores RSVP data linked to `ChurchEvent`

---

## POST /api/auth/change-password

Change the authenticated user's password.

### Method
`POST`

### Authentication
Session required (JWT)

### Request Body

```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (min 8 chars, required)"
}
```

### Response — Success (200)

```json
{
  "success": true
}
```

### Behaviour
1. Validates current password with bcrypt
2. Hashes new password with bcrypt (cost 12)
3. Updates user record, sets `mustChangePassword` to `false`
4. Creates `AuditLog` entry (`action: PASSWORD_CHANGE`)

---

## GET /api/health

Health check endpoint for uptime monitoring.

### Method
`GET`

### Authentication
None

### Response

```json
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2026-06-28T05:00:00.000Z"
}
```

If database is unreachable:

```json
{
  "status": "degraded",
  "database": "disconnected",
  "timestamp": "2026-06-28T05:00:00.000Z"
}
```

---

## Rate Limiting Configuration

All public API routes use Upstash Ratelimit with the following configuration:

| Route | Category | Limit | Window |
|-------|----------|-------|--------|
| `/api/contact` | `contact` | 5 requests | 60 seconds |
| `/api/prayer` | `contact` | 5 requests | 60 seconds |
| `/api/revalidate` | `api` | 30 requests | 60 seconds |
| `/api/rsvp` | Default | 10 requests | 60 seconds |

Rate limit headers are returned as `Retry-After` on 429 responses.