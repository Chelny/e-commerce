"use server"

import { Cart } from "@prisma/client"
import { TCartWithProduct } from "@/app/[locale]/_core"
import prisma from "@/app/[locale]/_lib/prisma"

type TIncrementDecrement = {
  increment?: number
  decrement?: number
}

export const getCartBySessionId = async (sessionId: string): Promise<TCartWithProduct[]> => {
  const cart = await prisma.cart.findMany({
    where: { session_id: sessionId },
    include: {
      product: {
        include: {
          inventory: true,
          discount: true,
        },
      },
    },
  })
  return cart
}

export const getCartItemBySessionId = async (sessionId: string, productId: string): Promise<Cart | null> => {
  const item = await prisma.cart.findFirst({ where: { session_id: sessionId, product_id: productId } })
  return item
}

export const addItemToCart = async (sessionId: string, productId: string, quantity: number = 1): Promise<Cart> => {
  const item = await prisma.cart.create({
    data: {
      session_id: sessionId,
      product_id: productId,
      quantity,
    },
  })

  return item
}

export const updateCartItem = async (id: string, action: TIncrementDecrement): Promise<Cart> => {
  const item = await prisma.cart.update({ where: { id }, data: { quantity: action } })
  return item
}

export const removeFromCartByProductId = async (id: string): Promise<void> => {
  await prisma.cart.delete({ where: { id } })
}
