import { MAX_PRODUCTS_PER_PAGE, TProductsPagination } from "@/app/[locale]/_core"
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
