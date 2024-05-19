import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "@auth/core/jwt"
import { UserRole } from "@prisma/client"
import { EOAuthProvider } from "@/app/[locale]/_core"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }

  interface User {
    provider?: EOAuthProvider;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: UserRole | null
  }
}