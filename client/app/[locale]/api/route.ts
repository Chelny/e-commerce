import { IProduct } from "@/app/[locale]/_core"
import { fetchData } from "@/app/[locale]/api/fetch"

export function GET_PRODUCTS(filter: string) {
  return fetchData<IProduct>(`products/?filter=${filter}&page=1`)
}
