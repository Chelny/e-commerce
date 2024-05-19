"use client"

import { createContext, ReactNode, useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { TCartWithProduct } from "@/app/[locale]/_core"
import { addItemToCart, getCartBySessionId, removeFromCartByProductId, updateCartItem } from "@/app/[locale]/_data"

export const CartContext = createContext<{
  cart: TCartWithProduct[]
  isInCart: (productId: string | undefined) => boolean
  cartItemQuantity: (productId: string | undefined) => number
  addToCart: (productId: string | undefined, quantity?: number) => void
  removeFromCart: (productId: string | undefined, quantity?: number) => void
  updateCart: (productId: string | undefined) => void
}>({
  cart: [],
  isInCart: (_) => false,
  cartItemQuantity: (_) => 0,
  addToCart: (_) => {},
  removeFromCart: (_) => {},
  updateCart: (_) => {},
})

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()
  const [cart, setCart] = useState<TCartWithProduct[]>([])

  const isInCart = (productId: string | undefined): boolean => {
    if (typeof productId === "undefined") return false
    return cart.some((cart: TCartWithProduct) => cart.product_id === productId)
  }

  const cartItemQuantity = (productId: string | undefined): number => {
    if (typeof productId === "undefined") return 0

    const existingCartItem = getCartItemByProductId(productId)
    return existingCartItem?.quantity ?? 0
  }

  const addToCart = async (productId: string | undefined, quantity: number = 1): Promise<void> => {
    if (typeof productId === "undefined") return Promise.reject()

    const existingCartItem = getCartItemByProductId(productId)

    if (existingCartItem) {
      await updateCartItem(existingCartItem?.id, { increment: quantity })
    } else if (session?.user.id) {
      await addItemToCart(session.user.id, productId, quantity)
    }

    await fetchCart()
  }

  const removeFromCart = async (productId: string | undefined, quantity: number = 1): Promise<void> => {
    if (typeof productId === "undefined") return Promise.reject()

    const existingCartItem = getCartItemByProductId(productId)

    if (existingCartItem) {
      // If quantity is 0, remove the item from the cart
      if (quantity === 0) {
        await removeFromCartByProductId(existingCartItem.id)
      } else if (existingCartItem.quantity > 1) {
        await updateCartItem(existingCartItem.id, { decrement: quantity })
      }
    }

    await fetchCart()
  }

  const updateCart = async (productId: string | undefined): Promise<void> => {
    if (typeof productId === "undefined") return Promise.reject()

    if (isInCart(productId)) {
      await removeFromCart(productId)
    } else {
      await addToCart(productId)
    }
  }

  const getCartItemByProductId = (productId: string | undefined): TCartWithProduct | undefined => {
    if (typeof productId === "undefined") return undefined
    return cart.find((cart: TCartWithProduct) => cart.product_id === productId)
  }

  const fetchCart = useCallback(async () => {
    if (session?.user.id) {
      const userCart = await getCartBySessionId(session.user.id)
      setCart(userCart)
    }
  }, [session])

  useEffect(() => {
    fetchCart()
  }, [session, fetchCart])

  return (
    <CartContext.Provider value={{ cart, isInCart, cartItemQuantity, addToCart, removeFromCart, updateCart }}>
      {children}
    </CartContext.Provider>
  )
}
