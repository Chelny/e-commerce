"use client"

import { ReactNode, useEffect } from "react"
import { AuthError } from "next-auth"
import { signIn, useSession } from "next-auth/react"
import { EHttpResponseStatus } from "@/app/[locale]/_core"

export const GuestSessionProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const { status } = useSession()

  // FIXME: Allow guest users
  // useEffect(() => {
  //   const guestSession = async () => {
  //     try {
  //       await signIn("Guest")
  //     } catch (error) {
  //       if (error instanceof AuthError) {
  //         switch (error.type) {
  //           case "CredentialsSignin":
  //             return {
  //               status: EHttpResponseStatus.ERROR,
  //               message: "form:error.invalid_credentials.message",
  //             }
  //           default:
  //             return {
  //               status: EHttpResponseStatus.ERROR,
  //               message: "form:error.generic.message",
  //             }
  //         }
  //       }

  //       throw error
  //     }
  //   }

  //   if (status === "unauthenticated") guestSession()
  // }, [status])

  return <>{children}</>
}
