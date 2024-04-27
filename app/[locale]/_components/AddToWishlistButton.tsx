"use client"

import * as Tooltip from "@radix-ui/react-tooltip"
import { FiHeart } from "react-icons/fi"
import { classMerge } from "@/app/[locale]/_lib"
import { useTranslation } from "@/app/i18n/client"

type TAddToWishlistButtonProps = {
  locale: TLocale
  className?: string
}

export const AddToWishlistButton = (props: TAddToWishlistButtonProps): JSX.Element => {
  const { t } = useTranslation(props.locale, ["shop"])

  const handleAddToWishlist = (): void => {
    console.log("Call add to wishlist hook")
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button type="button" className={classMerge("px-2", props.className)} onClick={handleAddToWishlist}>
            <FiHeart className="w-5 h-5" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="TooltipContent" side="bottom">
            {t("shop:item.add_to_wishlist")}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
