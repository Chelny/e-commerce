"use client"

import { useContext } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import * as Tooltip from "@radix-ui/react-tooltip"
import { FiShoppingCart } from "react-icons/fi"
import { AddToWishlistButton } from "@/app/[locale]/_components/AddToWishlistButton"
import { Currency } from "@/app/[locale]/_components/Currency"
import { ROUTE_SHOP, TProduct } from "@/app/[locale]/_core"
import { cn, getDiscountedPrice } from "@/app/[locale]/_lib"
import { CartContext } from "@/app/[locale]/_providers"
import { useTranslation } from "@/app/i18n/client"
import styles from "./ProductCard.module.css"

type TProductCardProps = {
  locale: TLocale
  product: TProduct
}

export const ProductCard = (props: TProductCardProps): JSX.Element => {
  const router = useRouter()
  const { t } = useTranslation(props.locale, ["common", "shop"])
  const { isInCart, updateCart } = useContext(CartContext)

  const handleUpdateCart = (): void => {
    updateCart(props.product.id)
  }

  const handleViewProductDetails = (sku: string): void => {
    router.push(`/${props.locale}${ROUTE_SHOP.PATH}/product/${sku}`)
  }

  return (
    <div className="relative">
      <div className={`${styles.productCard} bg-ecommerce-500`}>
        <Image
          className={styles.productCardImage}
          src="https://picsum.photos/272/272"
          priority
          width={272}
          height={272}
          alt={props.product.name}
        />
        <AddToWishlistButton locale={props.locale} product={props.product} className={styles.addToWishlistButton} />
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button type="button" className={styles.addToCartButton} onClick={handleUpdateCart}>
                <FiShoppingCart className={cn(styles.icon, isInCart(props.product.id) && "fill-current")} />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="TooltipContent" side="bottom">
                {t("shop:item.add_to_cart")}
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <button
          type="button"
          className={styles.viewProductButton}
          onClick={() => handleViewProductDetails(props.product.sku)}
        >
          {t("shop:item.view_item")}
        </button>
      </div>
      <div className="py-2 leading-loose">
        <div>{props.product.name}</div>
        <div>
          <Currency
            locale={props.locale}
            value={getDiscountedPrice(props.product.price, props.product.discount?.discount_percent)}
          />
          &nbsp;
          {props.product.discount?.active && (
            <span className="text-ecommerce-500 line-through">
              <Currency locale={props.locale} value={props.product.price} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
