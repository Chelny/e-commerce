import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SERVER_URL } from "@/app/[locale]/_core/constants"
import { cookieName, defaultLocale } from "@/app/i18n/settings"

export async function GET(id?: number) {
  const cookiesList = cookies()
  const acceptLanguage = cookiesList.get(cookieName)?.value ?? defaultLocale

  let endpoint = "products/"
  if (id) endpoint += `${id}/`

  const response = await fetch(`${SERVER_URL}/${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": acceptLanguage,
    },
  })
  const data = await response.json()

  return NextResponse.json(data, { status: response.status })
}
