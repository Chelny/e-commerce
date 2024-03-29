"use client"

import { ChangeEvent, useEffect, useState } from "react"
import { INVENTORY_WARNING_COUNT, TProduct } from "@/app/[locale]/_core"
import { useCurrentUser } from "@/app/[locale]/_hooks"
import { useTranslation } from "@/app/i18n/client"

type TCartProps = {
  locale: TLocale
  product: TProduct | null
}

export const Cart = (props: TCartProps): JSX.Element => {
  const { t } = useTranslation(props.locale, "shop")
  const [quantity, setQuantity] = useState<number>(0)
  const user = useCurrentUser()

  const handleQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantity = +event.target.value

    if (quantity < 1) return

    if (props.product?.inventory && props.product?.inventory.quantity >= quantity) {
      setQuantity(quantity)
    }
  }

  useEffect(() => {
    if (props.product?.inventory && props.product?.inventory.quantity > 0) {
      setQuantity(1)
    }
  }, [props.product?.inventory])

  return (
    <div className="flex flex-col md:space-y-4">
      {user?.email && <div>{t("shop:cart.ship_to")} 111 main street</div>}
      {props.product?.inventory && props.product?.inventory.quantity === 0 ? (
        <p className="text-red-500">{t("shop:item.out_of_stock")}</p>
      ) : (
        props.product?.inventory &&
        props.product?.inventory.quantity <= INVENTORY_WARNING_COUNT && (
          <p className="text-red-500">
            {t("shop:cart.in_stock")} <span>{props.product?.inventory.quantity}</span>
          </p>
        )
      )}
      <input
        type="number"
        value={quantity}
        disabled={props.product?.inventory?.quantity === 0}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleQuantity(event)}
      />
      <div className="flex flex-col md:flex-row md:gap-2">
        <button type="button" className="secondary-action flex-1" disabled={props.product?.inventory?.quantity === 0}>
          {t("shop:item.add_to_cart")}
        </button>
        <button type="button" className="primary-action flex-1" disabled={props.product?.inventory?.quantity === 0}>
          {t("shop:item.buy_now")}
        </button>
      </div>
    </div>
  )
}
