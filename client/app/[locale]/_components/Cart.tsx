"use client"

import { ChangeEvent, useState } from "react"
import { INVENTORY_WARNING_COUNT, IProduct } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

type TCartProps = {
  locale: TLocale
  product: IProduct
}

export function Cart(props: TCartProps) {
  const { t } = useTranslation(props.locale, ["shop"])
  const [quantity, setQuantity] = useState<number>(1)

  const handleQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = +event.target.value

    if (quantity < props.product.inventory.quantity) {
      setQuantity(quantity)
    }
  }

  return (
    <div className="flex flex-col md:space-y-4">
      <div>{t("shop:cart.ship_to")} 111 main street</div>
      {props.product.inventory.quantity <= INVENTORY_WARNING_COUNT && (
        <div className="text-red-500">
          {t("shop:cart.in_stock")} <span>{props.product.inventory.quantity}</span>
        </div>
      )}
      <input
        type="number"
        value={quantity}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleQuantity(event)}
      />
      <div className="flex flex-col md:flex-row md:gap-2">
        <button type="button" className="secondary-action flex-1">
          {t("item.add_to_cart")}
        </button>
        <button type="button" className="primary-action flex-1">
          {t("item.buy_now")}
        </button>
      </div>
    </div>
  )
}
