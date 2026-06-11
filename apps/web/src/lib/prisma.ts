/**
 * Royal Priesthood OS v3 - Prisma Client Singleton
 * 
 * CRITICAL: Prisma's query engine is a SINGLETON that caches the database
 * URL on first initialization. If initialized during build without env vars,
 * it will cache 'undefined' and ALL subsequent queries will fail.
 * 
 * Solution: NEVER create a real PrismaClient during build phase.
 * Use lazy initialization that delays engine creation until first query.
 */

import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

// Store for the lazily-created client
let realPrismaClient: PrismaClient | null = null

function getEnvVar(name: string): string | undefined {
  const value = process.env[name]
  if (!value || value === 'undefined' || value === '') {
    return undefined
  }
  return value
}

function createRealPrismaClient(): PrismaClient {
  const tursoUrl = getEnvVar('TURSO_DATABASE_URL')
  const tursoAuthToken = getEnvVar('TURSO_AUTH_TOKEN') || getEnvVar('DATABASE_AUTH_TOKEN')

  console.log('[Prisma] Creating real client...')
  console.log('[Prisma] TURSO_DATABASE_URL:', tursoUrl ? 'SET' : 'NOT SET')
  console.log('[Prisma] TURSO_AUTH_TOKEN:', tursoAuthToken ? 'SET' : 'NOT SET')

  const useTurso = tursoUrl && tursoAuthToken && tursoUrl.startsWith('libsql://')

  if (useTurso) {
    const adapter = new PrismaLibSQL({
      url: tursoUrl,
      authToken: tursoAuthToken,
    })

    console.log('[Prisma] Connected to Turso:', tursoUrl)

    return new PrismaClient({
      adapter,
      log: ['error'],
    })
  }

  if (process.env.NODE_ENV === 'production' && !tursoUrl) {
    throw new Error(
      'TURSO_DATABASE_URL environment variable is not set. ' +
      'Please configure it in your Vercel project settings.'
    )
  }

  console.log('[Prisma] Using local SQLite database')
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'info', 'warn', 'error'] 
      : ['error'],
  })
}

/**
 * Get or create the real Prisma client.
 * This is called ONLY when a method is actually invoked on the proxy.
 */
function getRealClient(): PrismaClient {
  if (!realPrismaClient) {
    realPrismaClient = createRealPrismaClient()
  }

  return realPrismaClient
}

/**
 * Lazy-loading Prisma client proxy.
 * Delays engine initialization until first actual query.
 * This prevents the URL_INVALID error during build.
 */
const lazyPrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const realClient = getRealClient()
    const value = realClient[prop as keyof PrismaClient]
    
    // If the property is a method, bind it to the real client
    if (typeof value === 'function') {
      return value.bind(realClient)
    }
    
    return value
  }
})

/**
 * Get the Prisma client.
 * In production, returns the lazy proxy that delays initialization.
 * In development, creates client immediately for better DX.
 */
export function getPrisma(): PrismaClient {
  // In production, always use lazy proxy to prevent build-phase initialization
  if (process.env.NODE_ENV === 'production') {
    return lazyPrismaClient
  }
  
  // In development, create immediately for better error messages and hot reload
  if (!realPrismaClient) {
    realPrismaClient = createRealPrismaClient()
  }
  return realPrismaClient
}

// Export the lazy proxy as the default prisma instance
export const prisma = lazyPrismaClient

/**
 * Transaction helper for atomic multi-table operations.
 * Use this for all writes that affect multiple tables.
 */
export async function $transaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
  const client = getPrisma()
  return client.$transaction((tx) => fn(tx as PrismaClient))
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const client = getPrisma()
    await client.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}
