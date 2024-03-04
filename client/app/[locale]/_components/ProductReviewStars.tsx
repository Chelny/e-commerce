"use client"

import Link from "next/link"
import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6"
import { IProductReviewRating } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

type TProductReviewStars = {
  locale: TLocale
  rating: IProductReviewRating
  showProgressBar?: boolean
}

type TProductReviewProgressBar = { locale: TLocale } & IProductReviewRating

export function ProductReviewStars(props: TProductReviewStars) {
  const { t } = useTranslation(props.locale, "shop")
  const fullStars = Math.floor(props.rating.average_rating)
  const hasHalfStar = props.rating.average_rating % 1 !== 0

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
        {props.rating.average_rating && props.rating.total_reviews && (
          <>
            <div>{props.rating.average_rating}/5</div>
            <Link href="#reviews">{t("shop:item.reviews", { count: props.rating.total_reviews })}</Link>
          </>
        )}
      </div>
      {props.showProgressBar && <ProductReviewProgressBar locale={props.locale} {...props.rating} />}
    </div>
  )
}

function ProductReviewProgressBar(props: TProductReviewProgressBar) {
  const { t } = useTranslation(props.locale, "shop")
  const { total_reviews, star_ratings } = props

  const renderProgressBar = (rating: number, count: number) => (
    <div key={rating} className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2 rtl:space-x-reverse">
      <div>{t("shop:item.stars", { count: rating })}</div>
      <progress value={(count / total_reviews) * 100} max="100" aria-label={t("shop:item.stars", { count: rating })}>
        {" "}
        {(count / total_reviews) * 100}%
      </progress>
      <div className="text-end">{((count / total_reviews) * 100).toFixed(0)}%</div>
    </div>
  )

  // Generate progress bars for all ratings in descending order (5 stars to 1 star)
  const allRatings = Array.from({ length: 5 }, (_, index: number) => 5 - index)

  return (
    <div className="flex flex-col space-y-4">
      {allRatings.map((rating: number) => {
        const count = star_ratings[rating] || 0
        return renderProgressBar(rating, count)
      })}
    </div>
  )
}
