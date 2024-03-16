import { TProductsPagination } from "@/app/[locale]/_core"
import { getNewArrivalsProducts } from "@/app/[locale]/_data"

export const GET_PRODUCTS = async (skip: number): Promise<TProductsPagination> => {
  const productsPromise = await getNewArrivalsProducts(skip)
  return productsPromise
}
