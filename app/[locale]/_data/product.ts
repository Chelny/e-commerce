import { MAX_PRODUCTS_PER_PAGE, TProductsPagination } from "@/app/[locale]/_core"
import prisma from "@/app/[locale]/_lib/prisma"

export const getNewArrivalsProducts = async (skip: number = 0): Promise<TProductsPagination> => {
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

// TODO: Fetch popular products
// export const getPopularProducts = async (skip: number = 0): Promise<TProductsPagination> => {}

export const getSalesProducts = async (skip: number = 0): Promise<TProductsPagination> => {
  const [products, count] = await prisma.$transaction([
    prisma.product.findMany({
      where: {
        discount: {
          active: true,
        },
      },
      take: MAX_PRODUCTS_PER_PAGE,
      skip: skip * MAX_PRODUCTS_PER_PAGE,
      include: {
        discount: true,
      },
      orderBy: {
        created_at: "desc",
      },
    }),
    prisma.product.count(),
  ])

  return { products, count }
}
