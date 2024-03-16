import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { EApiMethod, SERVER_URL } from "@/app/[locale]/_core"
import { cookieName, defaultLocale } from "@/app/i18n/settings"

const fetchData = async <T>(
  endpoint: string,
  request: RequestInit = { method: EApiMethod.GET } as RequestInit
): Promise<NextResponse<T>> => {
  const cookiesList = cookies()
  const acceptLanguage = cookiesList.get(cookieName)?.value ?? defaultLocale
  const response = await fetch(`${SERVER_URL}/${endpoint}/`, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": acceptLanguage,
      ...request.headers,
    },
    body: request.body,
  })
  const data = await response.json()

  return NextResponse.json(data, { status: response.status })
}

export { fetchData }
