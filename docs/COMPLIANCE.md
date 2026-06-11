# Kenya DPA 2019 — Compliance Checklist

**Blocking issue before production data migration.** Turso and Supabase are both US-hosted; cross-border transfer requires formal safeguards.

## Pre-migration (required)

- [ ] Register as **Data Controller** with [ODPC](https://www.odpc.go.ke/)
- [ ] Appoint **Data Protection Officer** (church staff acceptable)
- [ ] Execute **Turso DPA** with Standard Contractual Clauses (Module 2: Controller → Processor)
- [ ] Complete **Transfer Impact Assessment** (data categories, purpose, safeguards)
- [ ] Document **breach notification** procedure (72-hour ODPC reporting)
- [ ] Privacy policy published on public site

## Technical measures

- [ ] TLS in transit (Vercel + Turso default)
- [ ] Consent capture at visitor registration and member signup (existing v3 pattern)
- [ ] Append-only `AuditLog` (7-year retention design for financial actions)
- [ ] Member portal: data subject rights (access, rectification, export, erasure request)
- [ ] Application-layer encryption for pastoral notes (recommended)

## Ongoing

- [ ] Annual compliance review
- [ ] Staff training on data handling
- [ ] Vendor DPA review on Turso/Vercel/Resend contract changes

## Penalties (reference)

Non-compliance: up to **KES 5,000,000** or **1% annual turnover** (ODPC enforcement, 2025–2026).
