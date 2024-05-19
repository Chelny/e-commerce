"use server"

import { Wishlist } from "@prisma/client"
import prisma from "@/app/[locale]/_lib/prisma"

export const getWishlistByUserId = async (userId: string): Promise<Wishlist[]> => {
  const wishlist = await prisma.wishlist.findMany({ where: { user_id: userId } })
  return wishlist
}

export const addItemToWishlist = async (userId: string, productId: string): Promise<Wishlist> => {
  const item = await prisma.wishlist.create({
    data: {
      user_id: userId,
      product_id: productId,
    },
  })

  return item
}

export const removeFromWishlistByProductId = async (userId: string, productId: string): Promise<Wishlist> => {
  const item = await prisma.wishlist.delete({
    where: {
      unique_product_for_user: {
        user_id: userId,
        product_id: productId,
      },
    },
  })

  return item
}
