/**
 * Edge-compatible auth config for middleware
 * Does NOT import prisma to avoid libsql bundling issues
 */

import NextAuth from 'next-auth'
import { z } from 'zod'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// Edge-compatible auth - no database calls
export const { auth } = NextAuth({
  trustHost: true,
  providers: [], // Empty for middleware - just session validation
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.memberId = user.memberId
        token.mustChangePassword = user.mustChangePassword
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
        session.user.memberId = token.memberId as string | null
        session.user.mustChangePassword = Boolean(token.mustChangePassword)
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
})
