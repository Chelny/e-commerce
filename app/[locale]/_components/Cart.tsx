"use client"

import { ChangeEvent, useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { INVENTORY_WARNING_COUNT, ROUTE_PROFILE, TProduct } from "@/app/[locale]/_core"
import { useCurrentUser } from "@/app/[locale]/_hooks"
import { formatPostalCode } from "@/app/[locale]/_lib"
import { getProfile } from "@/app/[locale]/account/profile/profile.actions"
import { useTranslation } from "@/app/i18n/client"

type TCartProps = {
  locale: TLocale
  product: TProduct | null
}

export const Cart = (props: TCartProps): JSX.Element => {
  const { t } = useTranslation(props.locale, "shop")
  const [name, setName] = useState<string | null | undefined>(undefined)
  const [firstName, setFirstName] = useState<string | null | undefined>(undefined)
  const [lastName, setLastName] = useState<string | null | undefined>(undefined)
  const [addressLine1, setAddressLine1] = useState<string | null | undefined>(undefined)
  const [addressLine2, setAddressLine2] = useState<string | null | undefined>(undefined)
  const [city, setCity] = useState<string | null | undefined>(undefined)
  const [countryState, setCountryState] = useState<string | null | undefined>(undefined)
  const [country, setCountry] = useState<string | null | undefined>(undefined)
  const [postalCode, setPostalCode] = useState<string | null | undefined>(undefined)
  const [quantity, setQuantity] = useState<number>(0)
  const authUser = useCurrentUser()

  const fetchData = useCallback(async () => {
    if (authUser?.id) {
      const response = await getProfile(authUser.id)
      const data = response.data
      setName(data?.name)
      setFirstName(data?.first_name)
      setLastName(data?.last_name)
      setAddressLine1(data?.user_address?.address_line1)
      setAddressLine2(data?.user_address?.address_line2)
      setCity(data?.user_address?.city)
      setCountryState(data?.user_address?.state)
      setCountry(data?.user_address?.country)
      setPostalCode(data?.user_address?.postal_code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleQuantity = (event: ChangeEvent<HTMLInputElement>): void => {
    const quantity = +event.target.value

    if (quantity < 1) return

    if (props.product?.inventory && props.product?.inventory.quantity >= quantity) {
      setQuantity(quantity)
    }
  }

  const handleAddToCart = (): void => {
    console.log("Call add to cart hook")
  }

  const handleCheckout = (): void => {
    console.log("Checkout")
  }

  useEffect(() => {
    if (props.product?.inventory && props.product?.inventory.quantity > 0) {
      setQuantity(1)
    }
  }, [props.product?.inventory])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="flex flex-col md:space-y-4">
      <div>
        <b>{t("shop:cart.ship_to")}</b>
        <br />
        {authUser?.id && addressLine1 ? (
          <>
            {name ? name : `${firstName} ${lastName}`}
            <br />
            {addressLine1} {addressLine2}
            <br />
            {city}, {countryState}
            <br />
            {postalCode && country ? formatPostalCode(postalCode, country) : postalCode}
            <br />
            {t(`countries.${country}.country`)}
          </>
        ) : (
          <>
            <Link
              className="block my-2"
              href={`/${props.locale}${ROUTE_PROFILE.PATH}`}
              aria-label={t(ROUTE_PROFILE.TITLE)}
            >
              {t("shop:cart.set_shipping_address")}
            </Link>
          </>
        )}
      </div>
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
        <button
          type="button"
          className="secondary-action flex-1"
          disabled={props.product?.inventory?.quantity === 0}
          onClick={handleAddToCart}
        >
          {t("shop:item.add_to_cart")}
        </button>
        <button
          type="button"
          className="primary-action flex-1"
          disabled={props.product?.inventory?.quantity === 0}
          onClick={handleCheckout}
        >
          {t("shop:item.buy_now")}
        </button>
      </div>
    </div>
  )
}
