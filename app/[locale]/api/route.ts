import { TProductsPagination } from "@/app/[locale]/_core"
import { getNewArrivalsProducts, getSalesProducts } from "@/app/[locale]/_data"

export const GET_PRODUCTS = async (): Promise<Record<string, TProductsPagination>> => {
  try {
    const newArrivalsPromise = await getNewArrivalsProducts()
    const salesPromise = getSalesProducts()
    const [newArrivals, sales] = await Promise.all([newArrivalsPromise, salesPromise])

    return { newArrivals, sales }
  } catch (error) {
    return {
      newArrivals: {
        products: [],
        count: 0,
      },
      sales: {
        products: [],
        count: 0,
      },
    }
  }
}
