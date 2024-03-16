import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig } from "next-auth"
import { EOAuthProvider, ROUTE_AUTH_ERROR, ROUTE_LOGIN } from "@/app/[locale]/_core"
import { getTwoFactorConfirmationByUserId, getUserById } from "@/app/[locale]/_data"
import authConfig from "@/app/[locale]/_lib/authentication.config"
import prisma from "@/app/[locale]/_lib/prisma"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: ROUTE_LOGIN.PATH,
    error: ROUTE_AUTH_ERROR.PATH,
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== EOAuthProvider.CREDENTIALS) return true

      // Prevent sign in without email verification
      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified) return false

      if (existingUser.two_factor_enabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) return false

        // Delete 2FA confirmation for next sign in
        await prisma.twoFactorConfirmation.delete({ where: { id: twoFactorConfirmation.id } })
      }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const foundUserById = await getUserById(token.sub)
      if (!foundUserById) return token

      token.role = foundUserById.role

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
} satisfies NextAuthConfig)
