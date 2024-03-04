import { EApiMethod } from "@/app/[locale]/_core"
import { fetchData } from "@/app/[locale]/api/fetch"

export async function GET(id?: number) {
  let endpoint = "products"
  if (id) endpoint += `/${id}`
  return fetchData(endpoint)
}

export async function GET_PRODUCT_RATING(id: number) {
  return fetchData(`products/reviews-by-product-id/${id}`)
}

// TODO: Get product reviews by product ID
// export async function POST_PRODUCT_REVIEWS() {
//   return fetchData("products/reviews")
// }

export async function POST_PRODUCT_REVIEW<T>(body: T) {
  return fetchData("products/reviews", { method: EApiMethod.POST, body: JSON.stringify(body) })
}
