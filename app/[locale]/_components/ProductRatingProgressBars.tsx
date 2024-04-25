"use client"

import { TProductReviewRatings } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

type TProductRatingProgressBars = {
  locale: TLocale
  ratings: TProductReviewRatings
}

export const ProductRatingProgressBars = (props: TProductRatingProgressBars): JSX.Element => {
  const { t } = useTranslation(props.locale, "shop")

  const renderProgressBar = (rating: number, count: number) => {
    const percentage = props.ratings?.reviews_count !== 0 ? (count / (props.ratings?.reviews_count ?? 0)) * 100 : 0

    return (
      <div key={rating} className="grid grid-cols-[3fr_5fr_2fr] items-center space-x-2 rtl:space-x-reverse">
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
        const count = (props.ratings?.ratings_count && props.ratings?.ratings_count[rating]) || 0
        return renderProgressBar(rating, count)
      })}
    </div>
  )
}
