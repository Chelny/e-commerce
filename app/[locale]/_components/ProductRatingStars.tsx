"use client"

import Link from "next/link"
import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6"
import { TProductReviewRatings } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

type TProductRatingStars = {
  locale: TLocale
  ratings: TProductReviewRatings
  showProgressBar?: boolean
}

export const ProductRatingStars = (props: TProductRatingStars): JSX.Element => {
  const { t } = useTranslation(props.locale, "shop")
  const fullStars = Math.floor(props.ratings?.average_rating ?? 0)
  const hasHalfStar = (props.ratings?.average_rating ?? 0) % 1 !== 0

  const renderStars = (): JSX.Element[] => {
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-star-${i}`} />)
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfStroke key="half" />)
    }

    const remainingStars = 5 - stars.length

    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} />)
    }

    return stars
  }

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <div className="flex">{renderStars()}</div>
      {(props.ratings?.average_rating ?? 0) > 0 && <div>{props.ratings?.average_rating}/5</div>}
      {typeof props.ratings?.reviews_count !== "undefined" && (
        <Link href="#reviews">{t("shop:item.reviews", { count: props.ratings?.reviews_count })}</Link>
      )}
    </div>
  )
}
