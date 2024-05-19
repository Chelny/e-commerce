import { useEffect, useState } from "react"
import { Wishlist } from "@prisma/client"
import { addItemToWishlist, getWishlistByUserId, removeFromWishlistByProductId } from "@/app/[locale]/_data"
import { useCurrentUser } from "@/app/[locale]/_hooks/useCurrentUser"

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Wishlist[]>([])
  const authUser = useCurrentUser()

  const addToWishlist = async (userId: string, productId: string): Promise<void> => {
    const wishlistItem = await addItemToWishlist(userId, productId)
    if (wishlistItem) setWishlist((prevWishlist: Wishlist[]) => [...prevWishlist, wishlistItem])
  }

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((item: Wishlist) => item.product_id === productId)
  }

  const removeFromWishlist = async (userId: string, productId: string): Promise<void> => {
    const wishlistItem = await removeFromWishlistByProductId(userId, productId)

    if (wishlistItem) {
      setWishlist((prevWishlist: Wishlist[]) =>
        prevWishlist.filter((item: Wishlist) => !(item.product_id === productId && item.user_id === userId))
      )
    }
  }

  const wishlistToggle = async (userId: string, productId: string): Promise<void> => {
    if (isInWishlist(productId)) {
      await removeFromWishlist(userId, productId)
    } else {
      await addToWishlist(userId, productId)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (authUser?.id) {
        const wishlist = await getWishlistByUserId(authUser.id)
        if (wishlist) setWishlist(wishlist)
      }
    }

    fetchData()
  }, [authUser])

  return { wishlist, addToWishlist, isInWishlist, removeFromWishlist, wishlistToggle }
}
