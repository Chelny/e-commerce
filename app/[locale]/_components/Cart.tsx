import { ChangeEvent, useContext, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { RiDeleteBin7Line } from "react-icons/ri"
import { Currency } from "@/app/[locale]/_components/Currency"
import { ROUTE_CART, TCartWithProduct } from "@/app/[locale]/_core"
import { cn, getDiscountedPrice } from "@/app/[locale]/_lib"
import { CartContext } from "@/app/[locale]/_providers"
import { useTranslation } from "@/app/i18n/client"

type TCartProps = {
  locale: TLocale
}

export const Cart = (props: TCartProps): JSX.Element => {
  const { t } = useTranslation(props.locale, "shop")
  const pathname = usePathname()
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [previousQuantities, setPreviousQuantities] = useState<Record<string, number>>({})
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null)
  const { cart, isInCart, addToCart, removeFromCart } = useContext(CartContext)

  const handleQuantity = (event: ChangeEvent<HTMLInputElement>, cartItem: TCartWithProduct): void => {
    const quantity = +event.target.value

    if (quantity < 0) return

    if (cartItem.product?.inventory && cartItem.product?.inventory.quantity >= quantity) {
      setQuantities({
        ...quantities,
        [cartItem.id]: quantity,
      })

      if (debounceTimeout) {
        clearTimeout(debounceTimeout)
      }

      const timeout = setTimeout(() => {
        const previousQuantity = previousQuantities[cartItem.id] || 0

        if (isInCart(cartItem.product.id)) {
          if (quantity === 0) {
            removeFromCart(cartItem.product.id, quantity)
          } else if (quantity < previousQuantity) {
            const decrementNumber = previousQuantity - quantity
            removeFromCart(cartItem.product.id, decrementNumber)
          } else if (quantity > previousQuantity) {
            const incrementNumber = quantity - previousQuantity
            addToCart(cartItem.product.id, incrementNumber)
          }
        } else {
          addToCart(cartItem.product.id, quantity)
        }

        setPreviousQuantities({
          ...previousQuantities,
          [cartItem.id]: quantity,
        })
      }, 1000)

      setDebounceTimeout(timeout)
    }
  }

  const handleRemoveCartItem = (cartItem: TCartWithProduct): void => {
    removeFromCart(cartItem.product.id, 0)
  }

  const subtotal = (): number => {
    return cart.reduce((acc, cartItem) => {
      const quantity = quantities[cartItem.id] || 0
      const discountedPrice = getDiscountedPrice(cartItem.product.price, cartItem.product.discount?.discount_percent)
      return acc + discountedPrice * quantity
    }, 0)
  }

  useEffect(() => {
    const initialQuantities: Record<string, number> = {}

    cart.forEach((cartItem) => {
      initialQuantities[cartItem.id] = cartItem.quantity
    })

    setQuantities(initialQuantities)
    setPreviousQuantities(initialQuantities)
  }, [cart])

  return (
    <div>
      <div
        className={cn(
          "flex flex-row items-center py-1 border-b border-solid mb-4",
          "border-ecommerce-300",
          "dark:border-ecommerce-600"
        )}
      >
        <h3 className="flex-grow">{t("shop:cart.shopping_cart")}</h3>
        <div>{t("shop:cart.items_count", { count: cart.length })}</div>
      </div>
      <div className="flex flex-col gap-4">
        {cart.map((cartItem: TCartWithProduct, index: number) => (
          <div key={index} className="grid grid-cols-[4rem_1fr_5rem_6rem_max-content] gap-4 items-center">
            <Image
              src={cartItem.product.image ?? "https://placehold.co/64x64/webp?text=no+image"}
              priority
              width={64}
              height={64}
              alt={cartItem.product.name}
            />
            <div>
              <b>{cartItem.product.name}</b>
              <div className="text-sm">
                <Currency
                  locale={props.locale}
                  value={getDiscountedPrice(cartItem.product.price, cartItem.product.discount?.discount_percent)}
                />
                {cartItem.product.discount?.active && (
                  <span className="text-ecommerce-500 line-through">
                    <Currency locale={props.locale} value={cartItem.product.price} />
                  </span>
                )}
              </div>
            </div>
            <div>
              <input
                className="w-[5rem]"
                type="number"
                value={quantities[cartItem.id] || 0}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleQuantity(event, cartItem)}
              />
            </div>
            <div className="text-end">
              <Currency
                locale={props.locale}
                value={
                  getDiscountedPrice(cartItem.product.price, cartItem.product.discount?.discount_percent) *
                  quantities[cartItem.id]
                }
              />
            </div>
            <div>
              <button className="text-red-500" onClick={() => handleRemoveCartItem(cartItem)}>
                <RiDeleteBin7Line />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "flex flex-row justify-end items-center py-4 border-t border-solid mt-4",
          "border-ecommerce-300",
          "dark:border-ecommerce-600"
        )}
      >
        <div>{t("shop:cart.subtotal")}:</div>
        <div className="ms-2 font-bold">
          <Currency locale={props.locale} value={subtotal()} />
        </div>
      </div>
      <div className="text-end">
        <Link
          className={pathname === `/${props.locale}${ROUTE_CART.PATH}` ? "active" : ""}
          href={`/${props.locale}${ROUTE_CART.PATH}`}
          locale={false}
          aria-label={t(ROUTE_CART.TITLE)}
        >
          {t("shop:cart.view_cart")}
        </Link>
      </div>
    </div>
  )
}
