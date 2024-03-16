"use client"

import Link from "next/link"
import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6"
import { TProductReviewRatings } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

type TProductReviewStars = {
  locale: TLocale
  ratings: TProductReviewRatings
  showProgressBar?: boolean
}

type TProductReviewProgressBar = { locale: TLocale } & TProductReviewRatings

export const ProductReviewStars = (props: TProductReviewStars): JSX.Element => {
  const { t } = useTranslation(props.locale, "shop")
  const fullStars = Math.floor(props.ratings?.average_rating ?? 0)
  const hasHalfStar = (props.ratings?.average_rating ?? 0) % 1 !== 0

  const renderStars = () => {
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
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="flex">{renderStars()}</div>
        {(props.ratings?.average_rating ?? 0) > 0 && <div>{props.ratings?.average_rating}/5</div>}
        {props.ratings?.reviews_count && (
          <Link href="#reviews">{t("shop:item.reviews", { count: props.ratings?.reviews_count })}</Link>
        )}
      </div>
      {props.showProgressBar && <ProductReviewProgressBar locale={props.locale} {...props.ratings} />}
    </div>
  )
}

const ProductReviewProgressBar = (props: TProductReviewProgressBar): JSX.Element => {
  const { t } = useTranslation(props.locale, "shop")
  const { reviews_count, ratings_count } = props

  const renderProgressBar = (rating: number, count: number) => {
    const percentage = reviews_count !== 0 ? (count / (reviews_count ?? 0)) * 100 : 0

    return (
      <div key={rating} className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2 rtl:space-x-reverse">
        <div>{t("shop:item.stars", { count: rating })}</div>
        <progress value={percentage} max="100" aria-label={t("shop:item.stars", { count: rating })}>
          {percentage.toFixed(0)}%
        </progress>
        <div className="flex rtl:flex-row-reverse">
          <span>{percentage.toFixed(0)}</span>
          <span>%</span>
        </div>
      </div>
    )
  }

  // Generate progress bars for all ratings in descending order (5 stars to 1 star)
  const allRatings = Array.from({ length: 5 }, (_, index: number) => 5 - index)

  return (
    <div className="flex flex-col space-y-4">
      {allRatings.map((rating: number) => {
        const count = (ratings_count && ratings_count[rating]) || 0
        return renderProgressBar(rating, count)
      })}
    </div>
  )
}
