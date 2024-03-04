import { EApiMethod } from "@/app/[locale]/_core"
import { fetchData } from "@/app/[locale]/api/fetch"

export async function POST<T>(body: T) {
  return fetchData("users/reset-password", { method: EApiMethod.POST, body: JSON.stringify(body) })
}
