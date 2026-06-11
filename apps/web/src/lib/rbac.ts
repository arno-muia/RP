/**
 * Route access control — shared by middleware and layouts.
 */

export const PUBLIC_PATH_PREFIXES = [
  '/',
  '/about',
  '/sermons',
  '/giving',
  '/events',
  '/visit',
  '/learn',
  '/check-in',
  '/login',
  '/privacy',
  '/terms',
  '/request-prayer',
  '/forgot-password',
  '/change-password',
  '/auth/magic',
] as const

export const OPS_PATH_PREFIXES = [
  '/ops',
  '/members',
  '/visitors',
  '/groups',
  '/care',
  '/reports',
  '/settings',
  '/volunteers',
  '/announcements',
  '/users',
  '/admin',
] as const

export const MEMBER_PATH_PREFIXES = [
  '/dashboard',
  '/member-dashboard',
  '/profile',
  '/household',
  '/giving-history',
  '/attendance',
  '/discipleship',
  '/prayer',
  '/volunteer',
  '/my-group',
  '/certificates',
] as const

const OPS_FULL_ACCESS_ROLES = ['ADMIN', 'HOSPITALITY', 'LEADERSHIP'] as const

/** CELL_LEADER: groups + attendance oversight only */
const CELL_LEADER_OPS_PREFIXES = ['/ops/groups', '/ops/attendance', '/ops', '/groups'] as const

export function isPublicPath(pathname: string): boolean {
  if (pathname === '/') return true
  return PUBLIC_PATH_PREFIXES.some(
    (prefix) => prefix !== '/' && (pathname === prefix || pathname.startsWith(`${prefix}/`))
  )
}

export function isOpsPath(pathname: string): boolean {
  return OPS_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

export function isMemberPath(pathname: string): boolean {
  return MEMBER_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )
}

export function canAccessOpsRoute(pathname: string, role: string | undefined): boolean {
  if (!role) return false
  if (OPS_FULL_ACCESS_ROLES.includes(role as (typeof OPS_FULL_ACCESS_ROLES)[number])) {
    return true
  }
  if (role === 'CELL_LEADER') {
    return CELL_LEADER_OPS_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
  }
  return false
}

export function getDefaultRedirectForRole(role: string | undefined): string {
  switch (role) {
    case 'ADMIN':
    case 'HOSPITALITY':
    case 'LEADERSHIP':
      return '/ops'
    case 'CELL_LEADER':
      return '/ops/groups'
    case 'MEMBER':
    default:
      return '/dashboard'
  }
}
