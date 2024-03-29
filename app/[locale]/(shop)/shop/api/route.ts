import {
  MAX_PRODUCT_REVIEWS_PER_PAGE,
  MAX_PRODUCTS_PER_PAGE,
  TProduct,
  TProductReview,
  TProductReviewsWithRatings,
  TProductsPagination,
} from "@/app/[locale]/_core"
import prisma from "@/app/[locale]/_lib/prisma"

export const GET_PRODUCTS = async (skip: number = 0): Promise<TProductsPagination> => {
  const [products, count] = await prisma.$transaction([
    prisma.product.findMany({
      take: MAX_PRODUCTS_PER_PAGE, // Limit the number of records to return
      skip: skip * MAX_PRODUCTS_PER_PAGE, // Offset to skip the first N records (for pagination)
      orderBy: {
        created_at: "desc",
      },
    }),
    prisma.product.count(),
  ])

  return { products, count }
}

export const GET_PRODUCT = async (sku: string): Promise<TProduct | null> => {
  const productPromise = await prisma.product.findUnique({
    where: { sku },
    include: {
      inventory: true,
      discount: true,
      reviews: true,
    },
  })

  if (!productPromise) return null

  const colors = productPromise.colors.split(";") // Split the colors string into an array

  const relatedProducts = await prisma.product.findMany({
    where: {
      // Related products from the same category or same color
      OR: [{ category_id: productPromise.category_id }, ...colors.map((color) => ({ colors: { contains: color } }))],
      NOT: {
        id: productPromise.id, // Exclude the current product from related products
      },
    },
    take: 10,
    include: {
      discount: true,
    },
    orderBy: {
      created_at: "desc",
    },
  })

  const productWithRelated = {
    ...productPromise,
    related: relatedProducts,
  }

  return productWithRelated
}

export const GET_PRODUCT_REVIEWS = async (productId: string): Promise<TProductReviewsWithRatings> => {
  const productReviewsPromise = await prisma.productReview.findMany({
    where: { product_id: productId },
    take: MAX_PRODUCT_REVIEWS_PER_PAGE,
    skip: 0,
    include: {
      product: true,
      user: true,
    },
    orderBy: {
      created_at: "desc",
    },
  })

  const groupReviews = await prisma.productReview.groupBy({
    where: { product_id: productId },
    by: ["rating"],
    _count: true,
  })

  const productReviewRating = await prisma.productReview.aggregate({
    where: { product_id: productId },
    _count: { id: true },
    _avg: { rating: true },
  })

  const totalReviews = productReviewRating._count.id
  const averageRating = productReviewRating._avg.rating
  const starRatings = Object.fromEntries(groupReviews.map((group) => [group.rating, group._count]))

  return {
    reviews: productReviewsPromise,
    ratings: {
      reviews_count: totalReviews,
      average_rating: averageRating,
      ratings_count: starRatings,
    },
  }
}

export const POST_PRODUCT_REVIEW = async (input: TProductReview): Promise<void> => {
  await prisma.productReview.create({
    data: {
      product_id: input.product.id,
      user_id: input.user.id,
      rating: input.rating,
      title: input.title,
      comment: input.comment,
    },
  })
}
