/**
 * Royal Priesthood OS v3 - NextAuth v5 Configuration
 * 
 * Credentials provider with bcrypt, JWT role injection,
 * login lockout after 5 attempts.
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { getPrisma } from './prisma'
import { verifyMagicLinkToken } from './magic-link'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const { auth, signIn, signOut, handlers } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      id: 'magic-link',
      name: 'Magic Link',
      credentials: {
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials) {
        const token = credentials?.token as string | undefined
        if (!token) return null

        const verified = verifyMagicLinkToken(token)
        if (!verified) return null

        const db = getPrisma()
        const user = await db.user.findUnique({
          where: { email: verified.email },
          include: { member: true },
        })

        if (!user || !user.isActive) return null

        await db.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date(), failedLoginAttempts: 0, lockedUntil: null },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          memberId: user.member?.id || null,
          mustChangePassword: user.mustChangePassword,
        }
      },
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) {
          return null
        }

        const { email, password } = parsed.data

        // Get Prisma client (created on first call when env vars are available)
        const db = getPrisma()

        // Find user
        const user = await db.user.findUnique({
          where: { email: email.toLowerCase() },
          include: { member: true },
        })

        if (!user || !user.isActive) {
          return null
        }

        // Check lockout
        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error(`Account locked until ${user.lockedUntil.toISOString()}`)
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.passwordHash)

        if (!isValid) {
          // Increment failed attempts
          const newAttempts = user.failedLoginAttempts + 1
          const shouldLock = newAttempts >= 5

          await db.user.update({
            where: { id: user.id },
            data: {
              failedLoginAttempts: newAttempts,
              lockedUntil: shouldLock
                ? new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
                : null,
            },
          })

          if (shouldLock) {
            throw new Error('Account locked for 15 minutes due to failed attempts')
          }

          return null
        }

        // Success - reset attempts and update last login
        await db.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: 0,
            lockedUntil: null,
            lastLogin: new Date(),
          },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          memberId: user.member?.id || null,
          mustChangePassword: user.mustChangePassword,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
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
  events: {
    async signIn({ user }) {
      try {
        // Log successful signin
        const db = getPrisma()
        await db.auditLog.create({
          data: {
            userId: user.id,
            action: 'LOGIN',
            entityType: 'User',
            entityId: user.id,
            timestamp: new Date(),
          },
        })
      } catch (error) {
        console.warn('[Auth] Failed to log signin audit:', error)
      }
    },
    async signOut() {
      // Note: token is not available in signOut event in NextAuth v5
      // Logout is tracked via middleware or client-side
      console.log('[Auth] User signed out')
    },
  },
})
