"use server"

import { EProductFilterType } from "@/app/[locale]/_core"
import { fetchData } from "@/app/[locale]/api/fetch"

export async function GET_PRODUCTS(page: number = 1) {
  const response = await fetchData(`products/?filter=${EProductFilterType.NEW_ARRIVALS}&page=${page}`)
  return response.json()
}
