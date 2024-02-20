import { NextResponse } from "next/server"
import { SERVER_URL } from "@/app/[locale]/_lib/constants"

export async function POST<T>(body: T) {
  const response = await fetch(`${SERVER_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  return NextResponse.json(data, { status: response.status })
}
