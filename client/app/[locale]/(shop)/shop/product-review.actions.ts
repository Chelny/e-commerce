"use server"

import { revalidatePath } from "next/cache"
import { flatten, minLength, object, type Output, safeParse, string, maxLength, regex } from "valibot"
import {
  EVariant,
  PRODUCT_REVIEW_MAX_COMMENT_CHARS,
  PRODUCT_REVIEW_MAX_TITLE_CHARS,
  RATING_REGEX,
  ROUTE_SHOP,
} from "@/app/[locale]/_core"
import { POST_PRODUCT_REVIEW } from "@/app/[locale]/(shop)/shop/api/route"

export async function sendProductReview(_: TFormState, formData: FormData) {
  const schema = object({
    rating: string([regex(RATING_REGEX, "rating.required")]),
    title: string([minLength(1, "title.required"), maxLength(PRODUCT_REVIEW_MAX_TITLE_CHARS, "title.max_length")]),
    comment: string([
      minLength(1, "comment.required"),
      maxLength(PRODUCT_REVIEW_MAX_COMMENT_CHARS, "comment.max_length"),
    ]),
  })

  type ProductReviewdData = Output<typeof schema>

  const result = safeParse(schema, {
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

  // TODO: Get user id from authenticated user and product id from page params
  console.log("POST_PRODUCT_REVIEW", result.output)

  // const response = await POST_PRODUCT_REVIEW<ProductReviewdData>(result.output)
  // const data = await response.json()

  // if (!response.ok) {
  //   return {
  //     status: EVariant.ERROR,
  //     code: response.status,
  //     message: data.message,
  //   }
  // }

  // revalidatePath(ROUTE_SHOP.PATH)

  // return {
  //   status: EVariant.SUCCESS,
  //   code: response.status,
  //   message: data.message,
  // }
}
