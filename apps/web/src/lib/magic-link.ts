import { createHmac, randomBytes, timingSafeEqual } from 'crypto'

const MAGIC_LINK_TTL_MS = 15 * 60 * 1000

function getSecret(): string {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET not configured')
  return secret
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url')
}

export function createMagicLinkToken(email: string): string {
  const exp = Date.now() + MAGIC_LINK_TTL_MS
  const nonce = randomBytes(8).toString('hex')
  const payload = `${email.toLowerCase()}:${exp}:${nonce}`
  const signature = sign(payload)
  return Buffer.from(`${payload}:${signature}`).toString('base64url')
}

export function verifyMagicLinkToken(token: string): { email: string } | null {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8')
    const parts = decoded.split(':')
    if (parts.length !== 4) return null
    const [email, expStr, nonce, signature] = parts
    const payload = `${email}:${expStr}:${nonce}`
    const expected = sign(payload)
    const a = Buffer.from(signature)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
    if (Date.now() > Number(expStr)) return null
    return { email }
  } catch {
    return null
  }
}

export function buildMagicLinkUrl(email: string, baseUrl?: string): string {
  const appUrl = baseUrl || process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const token = createMagicLinkToken(email)
  return `${appUrl}/auth/magic?token=${encodeURIComponent(token)}`
}
