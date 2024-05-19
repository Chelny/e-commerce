import {
  Cart,
  OrderItems,
  Prisma,
  Product,
  ProductDiscount,
  ProductInventory,
  ProductReview,
  User,
} from "@prisma/client"

export type TProduct = Product & {
  inventory?: ProductInventory | null
  discount?: ProductDiscount | null
  reviews?: ProductReview[] | []
  cart?: Cart | null
  order_items?: OrderItems | null

  // Not in schema
  related?: TProduct[] | []
  ratings?: TProductReviewRatings | undefined
}

export type TProductReview = Prisma.ProductReviewGetPayload<{
  include: {
    product: true
    user: true
  }
}>

export type TProductReviewRatings =
  | {
      reviews_count?: number | undefined
      average_rating?: number | null
      ratings_count?: Record<number, number> | undefined
    }
  | undefined

export type TProductReviewsWithRatings =
  | {
      reviews: TProductReview[] | []
      ratings: TProductReviewRatings | undefined
    }
  | undefined

export type TProductsPagination = {
  products: TProduct[] | []
  count: number
}

export type TCartWithProduct = Prisma.CartGetPayload<{
  include: {
    product: {
      include: {
        inventory: true
        discount: true
      }
    }
  }
}>
