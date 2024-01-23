import { SERVER_URL } from "@/app/[locale]/_lib/constants"

export async function POST<T>(body: T) {
  const response = await fetch(`${SERVER_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  return response.json()
}
