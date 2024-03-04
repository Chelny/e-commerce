import { EProductFilterType } from "@/app/[locale]/_core"
import { fetchData } from "@/app/[locale]/api/fetch"

export async function GET_PRODUCTS(page: number = 1) {
  return fetchData(`products/?filter=${EProductFilterType.SALES}&page=${page}`)
}
