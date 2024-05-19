"use client"

import * as Tooltip from "@radix-ui/react-tooltip"
import { FiHeart } from "react-icons/fi"
import { TProduct } from "@/app/[locale]/_core"
import { useCurrentUser, useWishlist } from "@/app/[locale]/_hooks"
import { cn } from "@/app/[locale]/_lib"
import { useTranslation } from "@/app/i18n/client"

type TAddToWishlistButtonProps = {
  locale: TLocale
  product: TProduct
  className?: string
}

export const AddToWishlistButton = (props: TAddToWishlistButtonProps): JSX.Element => {
  const { t } = useTranslation(props.locale, ["shop"])
  const authUser = useCurrentUser()
  const { isInWishlist, wishlistToggle } = useWishlist()

  const handleAddToWishlist = (): void => {
    if (authUser?.id) wishlistToggle(authUser.id, props.product.id)
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button type="button" className={cn("px-2", props.className)} onClick={handleAddToWishlist}>
            <FiHeart className={cn("w-5 h-5", isInWishlist(props.product.id) && "fill-current")} />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" side="bottom">
            {t(isInWishlist(props.product.id) ? "shop:item.remove_from_wishlist" : "shop:item.add_to_wishlist")}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
