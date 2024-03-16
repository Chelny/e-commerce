"use client"

import { useRouter } from "next/navigation"
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { Currency } from "@/app/[locale]/_components/Currency"
import { calculateReducedPrice, ROUTE_SHOP, TProduct } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"
import styles from "./ProductCard.module.css"

type TProductCardProps = {
  locale: TLocale
  product: TProduct
}

export const ProductCard = (props: TProductCardProps): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation(props.locale, ["common", "shop"])

  const handleViewProductDetails = (sku: string) => {
    router.push(`/${props.locale}${ROUTE_SHOP.PATH}?product=${sku}`)
  }

  return (
    <div className="relative">
      <div
        className={`${styles.itemProductCardImage} bg-ecommerce-500`}
        // style={{ backgroundImage: `url(${props.product.image})` }}
        style={{ backgroundImage: 'url("https://picsum.photos/272/288")' }}
      >
        {/* <button className={styles.addFavouriteButton} type="button">
          <FaRegHeart />
          <FaHeart />
        </button> */}
        <button
          className={styles.viewProductButton}
          type="button"
          onClick={() => handleViewProductDetails(props.product.sku)}
        >
          {t("shop:item.view_item")}
        </button>
      </div>
      <div className="py-2 leading-loose">
        <div>{props.product.name}</div>
        <div>
          <span>
            <Currency
              locale={props.locale}
              value={calculateReducedPrice(
                props.product.price,
                props.product.discount?.active ? props.product.discount?.discount_percent || 0 : 0
              )}
            />
          </span>{" "}
          {props.product.discount?.active && (
            <span className="text-ecommerce-500 line-through">
              <Currency locale={props.locale} value={props.product.price} />
            </span>
          )}
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
