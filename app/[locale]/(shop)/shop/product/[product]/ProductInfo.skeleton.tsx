import ProductReviewStarsSkeleton from "@/app/[locale]/_components/ProductRatingStars.skeleton"
import Skeleton from "@/app/[locale]/_components/Skeleton"

const ProductInfoSkeleton = (): JSX.Element => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-[400px] h-[400px]" />
        <div className="flex gap-2">
          {Array.from(Array(4).keys()).map((_, index: number) => (
            <Skeleton key={index} className="w-[94px] h-[94px]" />
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center space-x-2 rtl:space-x-reverse">
          <h1>
            <Skeleton className="w-[384px] h-8" />
          </h1>
          <Skeleton className="w-8" />
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
          <Skeleton className="w-36" />
          <Skeleton className="w-20" />
        </div>
        <div className="flex flex-col xl:flex-row justify-between items-start gap-2 mt-2">
          <ProductReviewStarsSkeleton />
          <Skeleton className="w-48" />
        </div>
        <hr />
        <h3>
          <Skeleton className="w-1/3" />
        </h3>
        <p>
          <Skeleton className="mt-2" lines={3} />
        </p>
      </div>
    </>
  )
}

export default ProductInfoSkeleton
