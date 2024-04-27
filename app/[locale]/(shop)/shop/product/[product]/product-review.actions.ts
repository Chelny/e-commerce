"use server"

import { revalidatePath } from "next/cache"
import { flatten, maxLength, minLength, object, type Output, regex, safeParse, string } from "valibot"
import {
  GET_AUTH_USER_PRODUCT_REVIEW_COUNT,
  POST_PRODUCT_REVIEW,
} from "@/app/[locale]/(shop)/shop/product/[product]/api/route"
import {
  PRODUCT_REVIEW_MAX_COMMENT_CHARS,
  PRODUCT_REVIEW_MAX_TITLE_CHARS,
  RATING_REGEX,
  ROUTE_SHOP,
} from "@/app/[locale]/_core"

export const getAuthUserProductReviewCount = async (
  productId: string | undefined,
  userId: string | undefined
): Promise<TApiResponse<number>> => {
  const response = await GET_AUTH_USER_PRODUCT_REVIEW_COUNT(productId, userId)
  const data = await response.json()
  return data
}

export const sendProductReview = async (_: TFormState, formData: FormData): Promise<TFormActions> => {
  const schema = object({
    product_id: string(),
    user_id: string(),
    rating: string([regex(RATING_REGEX, "rating.required")]),
    title: string([minLength(1, "title.required"), maxLength(PRODUCT_REVIEW_MAX_TITLE_CHARS, "title.max_length")]),
    comment: string([
      minLength(1, "comment.required"),
      maxLength(PRODUCT_REVIEW_MAX_COMMENT_CHARS, "comment.max_length"),
    ]),
  })

  type ProductReviewdData = Output<typeof schema>

  const result = safeParse(schema, {
    product_id: formData.get("productId"),
    user_id: formData.get("userId"),
    rating: formData.get("rating"),
    title: formData.get("title"),
    comment: formData.get("comment"),
  })

  if (!result.success) {
    return {
      message: "Invalid fields",
      data: {
        errors: flatten(result.issues).nested,
      },
    }
  }

  // @ts-ignore
  const response = await POST_PRODUCT_REVIEW<ProductReviewdData>(result.output)
  const data = await response.json()

  revalidatePath(ROUTE_SHOP.PATH)

  return data
}
