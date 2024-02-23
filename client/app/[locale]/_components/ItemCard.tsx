"use client"

import { Suspense } from "react"
// import Image from 'next/image'
import { useRouter } from "next/navigation"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { Currency } from "@/app/[locale]/_components/Currency"
import { ROUTE_SHOP } from "@/app/[locale]/_lib/site-map"
import { useTranslation } from "@/app/i18n/client"
import styles from "./ItemCard.module.css"

type TItemCardProps = {
  locale: string
  item: {
    id: number
    imagePath: string
  }
}

export function ItemCard({ locale, item }: TItemCardProps) {
  const router = useRouter()
  const { t } = useTranslation(locale, ["common", "shop"])

  const handleViewItemDetails = (id: number) => {
    router.push(`/${locale}${ROUTE_SHOP.PATH}?item=${id}`)
  }

  return (
    <div className="relative">
      <div
        className={`${styles.itemItemCardImage} bg-ecommerce-500`}
        style={{ backgroundImage: `url(${item.imagePath})` }}
      >
        <button className={styles.addFavouriteButton} type="button">
          <FaRegHeart />
          {/* <FaHeart /> */}
        </button>
        <button className={styles.viewItemButton} type="button" onClick={() => handleViewItemDetails(item.id)}>
          {t("shop:item.view_item")}
        </button>
      </div>
      <div className="py-2 leading-loose">
        <div>Lorem ipsum</div>
        <div>
          <span>
            <Currency locale={locale} value={6222} />
          </span>{" "}
          <span className="text-ecommerce-500 line-through">
            <Currency locale={locale} value={499.99} />
          </span>
        </div>
        {/* <div className="grid grid-cols-[1fr_1fr] space-x-2 rtl:space-x-reverse text-white">
          <button type="button" className="p-1 bg-ecommerce-700">
            {t("shop:add_to_cart")}
          </button>
          <button type="button" className="p-1 bg-ecommerce-900">
            {t("shop:buy_now")}
          </button>
        </div> */}
      </div>
    </div>
  )
}
