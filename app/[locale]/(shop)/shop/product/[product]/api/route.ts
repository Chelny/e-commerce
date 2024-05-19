import { NextResponse } from "next/server"
import { ProductReview } from "@prisma/client"
import {
  EHttpResponseStatus,
  MAX_PRODUCT_REVIEWS_PER_PAGE,
  TProduct,
  TProductReviewsWithRatings,
} from "@/app/[locale]/_core"
import prisma from "@/app/[locale]/_lib/prisma"

export const GET_PRODUCT = async (sku: string): Promise<TProduct> => {
  const productPromise = await prisma.product.findUnique({
    where: { sku },
    include: {
      inventory: true,
      discount: true,
      reviews: true,
    },
  })

  if (!productPromise) return {} as TProduct

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

export const GET_AUTH_USER_PRODUCT_REVIEW_COUNT = async (
  productId: string | undefined,
  userId: string | undefined
): Promise<NextResponse<TApiResponse>> => {
  const authUserReviewCount = await prisma.productReview.count({
    where: { product_id: productId, user_id: userId },
  })

  if (!authUserReviewCount) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "alert.message.400",
      },
      { status: 400 }
    )
  }

  return NextResponse.json(
    {
      status: EHttpResponseStatus.SUCCESS,
      data: authUserReviewCount,
    },
    { status: 200 }
  )
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

export const POST_PRODUCT_REVIEW = async (body: ProductReview): Promise<NextResponse<TApiResponse>> => {
  const review = await prisma.productReview.create({
    data: {
      product_id: body.product_id,
      user_id: body.user_id,
      rating: +body.rating,
      title: body.title,
      comment: body.comment,
    },
  })

  if (!review) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "alert.message.400",
      },
      { status: 400 }
    )
  }

  return NextResponse.json(
    {
      status: EHttpResponseStatus.SUCCESS,
      message: "form:success.review_added.message",
    },
    { status: 200 }
  )
}
