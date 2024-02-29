import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SERVER_URL } from "@/app/[locale]/_core/constants"
import { cookieName, defaultLocale } from "@/app/i18n/settings"

export async function POST<T>(body: T) {
  const cookiesList = cookies()
  const acceptLanguage = cookiesList.get(cookieName)?.value ?? defaultLocale
  const response = await fetch(`${SERVER_URL}/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": acceptLanguage,
    },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  return NextResponse.json(data, { status: response.status })
}
