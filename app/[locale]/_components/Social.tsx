"use client"

import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa6"
import { FcGoogle } from "react-icons/fc"
import { DEFAULT_LOGIN_REDIRECT } from "@/app/[locale]/_core"

export const Social = (): JSX.Element => {
  const handleClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <button
        type="button"
        className="tertiary-action flex justify-center w-full gap-x-2"
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="tertiary-action flex justify-center w-full gap-x-2"
        onClick={() => handleClick("github")}
      >
        <FaGithub className="w-5 h-5" />
      </button>
    </div>
  )
}
