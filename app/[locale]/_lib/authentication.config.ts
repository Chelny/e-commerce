import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { POST } from "@/app/[locale]/(auth)/login/api/route"
import { EHttpResponseStatus, ROUTE_LOGIN } from "@/app/[locale]/_core"

export default {
  providers: [
    Credentials({
      async authorize(credentials: Partial<Record<string, unknown>>) {
        const response = await POST(credentials)
        const data = await response.json()

        if (data.status === EHttpResponseStatus.SUCCESS) return data.data

        return null
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
} satisfies NextAuthConfig
