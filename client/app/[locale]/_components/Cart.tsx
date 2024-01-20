"use client"

import { ChangeEvent, useState } from "react"
import { useTranslation } from "@/app/i18n/client"

type TCartProps = {
  locale: string
}

export function Cart({ locale }: TCartProps) {
  const { t } = useTranslation(locale, ["shop"])
  const [quantity, setQuantity] = useState<number>(1)

  const handleQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO: Make sure that value <= number of stock
    console.log("handleQuantity", event.target.value)
    setQuantity(+event.target.value)
  }

  return (
    <div className="flex flex-col md:space-y-4">
      <div>deliver to address: 111 main street</div>
      <span>in stock: 15</span>
      <input
        type="number"
        value={quantity}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleQuantity(event)}
      />
      <button className="secondary-action" type="button">
        {t("item.add_to_cart")}
      </button>
      <button className="primary-action" type="button">
        {t("item.buy_now")}
      </button>
    </div>
  )
}
