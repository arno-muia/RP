# Database Documentation — Royal Priesthood Website

> **Purpose:** Document database schema, models, relationships, and constraints.
> **Last Updated:** 2026-06-28

---

## Overview

| Aspect | Detail |
|--------|--------|
| **ORM** | Prisma 6.6 |
| **Production DB** | Turso LibSQL (LibSQL protocol via `@prisma/adapter-libsql`) |
| **Development DB** | SQLite file (`prisma/dev.db`) |
| **Schema declaration** | `provider = "postgresql"` (for Turso LibSQL compatibility at runtime) |
| **Total Models** | 35 |
| **Total Enums** | 37 |
| **Migration Strategy** | Currently `db:push` only (Prisma migrations not yet adopted) |

---

## Domain Overview

Models are organized into 13 domains:

| Domain | Models | Status |
|--------|--------|--------|
| Identity | `User`, `Member` | Active (backend complete) |
| Household | `Household`, `HouseholdMember` | Active (schema only) |
| Attendance | `ServiceSession`, `Attendance` | Active (schema only) |
| Visitors | `Visitor`, `FollowUp` | Active (schema only) |
| Cell Groups | `CellGroup`, `CellGroupMembership` | Active (schema only) |
| Giving | `GivingTransaction`, `GivingCampaign` | Active (schema only) |
| Discipleship/LMS | `DiscipleshipModule`, `DiscipleshipLesson`, `MemberProgress`, `Quiz`, `QuizQuestion` | Active (schema only) |
| Events | `ChurchEvent`, `EventRegistration` | Active (schema only) |
| Volunteers | `VolunteerRole`, `VolunteerAssignment` | Active (schema only) |
| Pastoral Care | `CareCase`, `CareNote` | Active (schema only) |
| Communications | `Announcement`, `MessageLog` | Active (schema only) |
| Prayer (Ops) | `PrayerRequest` | Active (schema only) |
| Audit/System | `AuditLog`, `SystemConfig` | Active (schema only) |
| Public Website | `SermonSeries`, `PublicSermon`, `WebsiteLeader`, `WebsiteTestimonial`, `WebsiteAcademyModule`, `ContactSubmission`, `PrayerSubmission` | Active (in use) |

---

## Enums (37)

### Identity & Roles
| Enum | Values |
|------|--------|
| `UserRole` | `ADMIN`, `HOSPITALITY`, `LEADERSHIP`, `CELL_LEADER`, `MEMBER` |
| `Gender` | `MALE`, `FEMALE` |
| `MaritalStatus` | `SINGLE`, `MARRIED`, `DIVORCED`, `WIDOWED` |
| `DiscipleshipLevel` | `SEEKER`, `NEW_BELIEVER`, `DISCIPLE`, `LEADER`, `MINISTER` |
| `MemberStatus` | `ACTIVE`, `INACTIVE`, `TRANSFERRED`, `DECEASED` |

### Household
| Enum | Values |
|------|--------|
| `HouseholdRole` | `HEAD`, `SPOUSE`, `CHILD`, `EXTENDED` |
| `HouseholdStatus` | `ACTIVE`, `INACTIVE` |

### Attendance
| Enum | Values |
|------|--------|
| `SessionType` | `SUNDAY_SERVICE`, `MIDWEEK`, `SPECIAL_EVENT`, `ONLINE` |
| `SessionStatus` | `DRAFT`, `OPEN`, `CLOSED`, `CANCELLED` |
| `CheckInMethod` | `QR_SCAN`, `MANUAL_ENTRY`, `SELF_CHECKIN`, `ADMIN_BULK` |

### Visitors
| Enum | Values |
|------|--------|
| `VisitorSource` | `INVITE`, `SOCIAL_MEDIA`, `WALK_IN`, `EVENT`, `ONLINE` |
| `FollowUpStatus` | `PENDING`, `CONTACTED`, `VISITED`, `CONNECTED`, `ASSIMILATED` |
| `FollowUpType` | `FIRST_VISIT`, `PHONE_CALL`, `CELL_GROUP_INVITE`, `PASTORAL_VISIT` |
| `FollowUpTaskStatus` | `PENDING`, `COMPLETED`, `OVERDUE`, `CANCELLED` |

### Cell Groups
| Enum | Values |
|------|--------|
| `CellGroupStatus` | `ACTIVE`, `INACTIVE`, `FULL` |
| `CellGroupRole` | `MEMBER`, `ASSISTANT_LEADER`, `LEADER` |
| `CellGroupMembershipStatus` | `ACTIVE`, `INACTIVE`, `TRANSFERRED` |

### Giving (Integer Cents)
| Enum | Values |
|------|--------|
| `GivingMethod` | `M_PESA`, `BANK_TRANSFER`, `CASH`, `CHEQUE`, `CARD`, `OTHER` |
| `GivingFund` | `TITHE`, `OFFERING`, `MISSIONS`, `BUILDING`, `SPECIAL`, `SEED` |
| `TransactionStatus` | `PENDING`, `COMPLETED`, `FAILED`, `REFUNDED` |
| `RecurringFrequency` | `WEEKLY`, `MONTHLY` |

### Discipleship/LMS
| Enum | Values |
|------|--------|
| `ProgressStatus` | `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED` |
| `QuestionType` | `MULTIPLE_CHOICE`, `TRUE_FALSE`, `FILL_BLANK`, `MATCHING` |

### Events
| Enum | Values |
|------|--------|
| `ChurchEventType` | `SERVICE`, `FELLOWSHIP`, `OUTREACH`, `CONFERENCE`, `FUNDRAISER`, `OTHER` |
| `ChurchEventStatus` | `DRAFT`, `PUBLISHED`, `CANCELLED`, `COMPLETED` |

### Volunteers
| Enum | Values |
|------|--------|
| `PaymentStatus` | `PENDING`, `PAID`, `WAIVED` |
| `AssignmentStatus` | `ACTIVE`, `INACTIVE`, `PENDING_APPROVAL` |

### Pastoral Care
| Enum | Values |
|------|--------|
| `CareCaseType` | `BEREAVEMENT`, `ILLNESS`, `FINANCIAL_CRISIS`, `MARITAL`, `SPIRITUAL`, `OTHER` |
| `CarePriority` | `LOW`, `MEDIUM`, `HIGH`, `URGENT` |
| `CareCaseStatus` | `OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED` |

### Communications
| Enum | Values |
|------|--------|
| `AnnouncementPriority` | `LOW`, `NORMAL`, `HIGH`, `URGENT` |
| `TargetAudience` | `ALL`, `MEMBERS`, `LEADERS`, `CELL_LEADERS`, `YOUTH`, `NEWCOMERS` |
| `MessageType` | `SMS`, `EMAIL`, `PUSH` |
| `MessageStatus` | `QUEUED`, `SENT`, `DELIVERED`, `FAILED` |

### Prayer & Audit
| Enum | Values |
|------|--------|
| `PrayerCategory` | `HEALING`, `FINANCIAL`, `RELATIONSHIP`, `SPIRITUAL`, `FAMILY`, `MINISTRY`, `OTHER` |
| `PrayerStatus` | `ACTIVE`, `ANSWERED`, `CLOSED` |
| `AuditAction` | 30+ actions covering login, CRUD, security events |

---

## Key Models

### Identity Domain

#### User
| Field | Type | Notes |
|-------|------|-------|
| id | String (uuid) | Primary key |
| email | String | Unique |
| passwordHash | String | bcrypt cost 12 |
| name | String | |
| role | UserRole | Default: `MEMBER` |
| isActive | Boolean | Default: true |
| mustChangePassword | Boolean | Default: true |
| failedLoginAttempts | Int | Default: 0 |
| lockedUntil | DateTime? | Nullable (lockout mechanism) |
| lastLogin | DateTime? | |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |

**Relations:** 1:1 with `Member`; 1:N with `AuditLog`, permissions to create/update members, households, visitors, etc.

#### Member
| Field | Type | Notes |
|-------|------|-------|
| id | String (uuid) | Primary key |
| firstName | String | |
| lastName | String | |
| email | String? | Unique |
| phone | String? | |
| gender | Gender? | |
| dateOfBirth | DateTime? | |
| maritalStatus | MaritalStatus? | |
| membershipDate | DateTime? | |
| baptismDate | DateTime? | |
| discipleshipLevel | DiscipleshipLevel | Default: `SEEKER` |
| status | MemberStatus | Default: `ACTIVE` |
| cellGroupId | String? | FK to CellGroup |
| householdId | String? | FK to Household |
| userId | String? | Unique, FK to User |
| consentGiven | Boolean | Default: false |
| createdAt | DateTime | Auto |
| updatedAt | DateTime | Auto |
| deletedAt | DateTime? | Soft delete |

### Household Domain (First-Class)

#### Household
| Field | Type | Notes |
|-------|------|-------|
| id | String (uuid) | Primary key |
| householdName | String? | |
| address | Json? | `{ street, city, postalCode, country }` |
| phone | String? | |
| email | String? | |
| anniversaryDate | DateTime? | |
| status | HouseholdStatus | Default: `ACTIVE` |
| deletedAt | DateTime? | Soft delete |

**Key Design Decision:** Household is a first-class domain entity (ADR-007). Families are operational units for giving, care, and check-in. `HouseholdMember` join table enables role-based membership.

#### HouseholdMember
| Field | Type | Notes |
|-------|------|-------|
| householdId | String | Composite PK, FK |
| memberId | String | Unique, Composite PK, FK |
| role | HouseholdRole | Default: `EXTENDED` |
| canPickUp | Boolean | Child pickup permission |
| isPrimaryContact | Boolean | Default: false |
| joinedAt | DateTime | Auto |

### Public Website Domain (Active)

These models are actively used by the content layer and seeded from JSON:

#### PublicSermon
| Field | Type | Notes |
|-------|------|-------|
| id | String (uuid) | Primary key |
| slug | String | Unique |
| title | String | |
| description | String | |
| seriesSlug | String | |
| seriesTitle | String | |
| scripture | String? | |
| speaker | String | |
| date | DateTime | |
| videoUrl | String | YouTube URL |
| audioUrl | String? | |
| notesUrl | String? | |
| thumbnailUrl | String | |
| duration | String? | |
| tags | Json? | String array |
| isPublished | Boolean | Default: true |

#### SermonSeries
| Field | Type | Notes |
|-------|------|-------|
| id | String (uuid) | Primary key |
| slug | String | Unique |
| title | String | |
| description | String | |
| imageUrl | String | |
| sermonCount | Int | Default: 0 |
| sortOrder | Int | Default: 0 |
| isPublished | Boolean | Default: true |

#### ChurchEvent
| Field | Type | Notes |
|-------|------|-------|
| id | String (uuid) | Primary key |
| title | String | |
| description | String? | |
| type | ChurchEventType | |
| startDateTime | DateTime | |
| endDateTime | DateTime? | |
| location | String? | |
| imageUrl | String? | |
| status | ChurchEventStatus | Default: `DRAFT` |
| registrationRequired | Boolean | Default: false |
| costCents | Int? | Integer cents |
| maxAttendees | Int? | |

#### ContactSubmission
| Field | Type | Notes |
|-------|------|-------|
| id | String (uuid) | Primary key |
| name | String | |
| email | String | |
| phone | String? | |
| message | String | |
| createdAt | DateTime | Auto |

#### PrayerSubmission
| Field | Type | Notes |
|-------|------|-------|
| id | String (uuid) | Primary key |
| name | String? | Null if anonymous |
| request | String | |
| anonymous | Boolean | Default: false |
| createdAt | DateTime | Auto |

---

## Key Relationships

```
User 1:1 Member
Member N:1 Household
Household 1:N HouseholdMember
Household 1:N GivingTransaction
Member N:1 CellGroup
CellGroup 1:N CellGroupMembership
ServiceSession 1:N Attendance
ServiceSession 1:N Visitor
Visitor 1:N FollowUp
Member 1:N GivingTransaction
DiscipleshipModule 1:N DiscipleshipLesson
DiscipleshipLesson 1:1 Quiz
Quiz 1:N QuizQuestion
Member N:N DiscipleshipLesson (via MemberProgress)
ChurchEvent 1:N EventRegistration
CareCase 1:N CareNote
User 1:N AuditLog
User 1:N SystemConfig
```

---

## Constraints & Indexes

- Unique constraints: `User.email`, `Member.email`, `Member.userId`, `HouseholdMember.memberId`, `ServiceSession.qrToken`, `Visitor.convertedToMemberId`, `CellGroupMembership.memberId`, `Quiz.lessonId`, `Attendance(memberId, sessionId)`, `Attendance(visitorId, sessionId)`, `MemberProgress(memberId, lessonId)`
- Indexes on all foreign keys, status fields, date fields, and query paths
- Soft delete pattern: `deletedAt` fields on `Member`, `Household`, and other entity models
- Financial invariant: all monetary values stored as `Int` (smallest currency unit)

---

## Seed Process

The seed script (`prisma/seed.ts`) populates:

1. `SystemConfig` — site configuration (hero image, service times, welcome message, beliefs, values, FAQs)
2. `PublicSermon` — 8 sermons from JSON
3. `SermonSeries` — 6 series from JSON
4. `ChurchEvent` — 6 events from JSON
5. `WebsiteLeader` — 7 leadership bios from JSON
6. `WebsiteTestimonial` — 3 testimonials from JSON
7. `WebsiteAcademyModule` — 6 modules from JSON
8. Admin user: `admin@royalpriesthood.church` (password set via `SEED_ADMIN_PASSWORD` env var)