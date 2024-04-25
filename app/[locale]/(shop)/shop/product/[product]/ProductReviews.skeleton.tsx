import ProductRatingProgressBarsSkeleton from "@/app/[locale]/_components/ProductRatingProgressBars.skeleton"
import ProductReviewStarsSkeleton from "@/app/[locale]/_components/ProductRatingStars.skeleton"
import Skeleton from "@/app/[locale]/_components/Skeleton"

const ProductReviewsSkeleton = (): JSX.Element => {
  return (
    <section>
      <h2>
        <Skeleton className="w-48 h-8 mb-2" />
      </h2>
      <div className="grid md:grid-cols-[1fr_3fr] md:space-x-16 rtl:md:space-x-reverse space-y-8 md:space-y-0">
        <div className="flex flex-col gap-1 space-y-4">
          <ProductReviewStarsSkeleton />
          <ProductRatingProgressBarsSkeleton />
        </div>
        <div className="space-y-8">
          {Array.from(Array(1).keys()).map((_, index: number) => (
            <div key={index} className="flex flex-col gap-2 space-y-2">
              <ProductReviewStarsSkeleton />
              <b>
                <Skeleton className="w-72" />
              </b>
              <p className="flex flex-col gap-1">
                <Skeleton lines={5} />
              </p>
              <div className="flex space-x-1 rtl:space-x-reverse">
                <span>
                  <Skeleton className="w-16" />
                </span>
                <span>
                  <Skeleton className="w-24" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductReviewsSkeleton
