import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { POST_LOGIN } from "@/app/[locale]/(auth)/login/api/route"
import { EHttpResponseStatus } from "@/app/[locale]/_core"

export default {
  providers: [
    // FIXME: Allow guest users
    // Credentials({
    //   name: "Guest",
    //   credentials: {},
    //   async authorize() {
    //     const response = await POST_LOGIN_GUEST()
    //     const data = await response.json()

    //     if (data.status === EHttpResponseStatus.SUCCESS) return data.data

    //     return null
    //   },
    // }),
    Credentials({
      async authorize(credentials: Partial<Record<string, unknown>>) {
        // @ts-ignore
        const response = await POST_LOGIN(credentials)
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
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig
