/**
 * Prisma client for CLI scripts (seed, db push) against Turso or local SQLite.
 */
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

export function createScriptPrisma(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN

  const useTurso =
    tursoUrl?.startsWith('libsql://') &&
    tursoAuthToken &&
    tursoAuthToken.length > 10

  if (useTurso) {
    const adapter = new PrismaLibSQL({
      url: tursoUrl!,
      authToken: tursoAuthToken,
    })
    return new PrismaClient({ adapter, log: ['warn', 'error'] })
  }

  return new PrismaClient({ log: ['warn', 'error'] })
}
