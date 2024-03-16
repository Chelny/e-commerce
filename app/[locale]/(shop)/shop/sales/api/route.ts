import { TProductsPagination } from "@/app/[locale]/_core"
import { getSalesProducts } from "@/app/[locale]/_data"

export const GET_PRODUCTS = async (skip: number): Promise<TProductsPagination> => {
  const productsPromise = await getSalesProducts(skip)
  return productsPromise
}
