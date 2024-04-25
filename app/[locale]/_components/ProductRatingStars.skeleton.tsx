import Skeleton from "@/app/[locale]/_components/Skeleton"

const ProductRatingStarsSkeleton = (): JSX.Element => {
  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <div className="flex">
        <Skeleton className="w-32" />
      </div>
      <Skeleton className="w-12" />
      <Skeleton className="w-8" />
    </div>
  )
}

export default ProductRatingStarsSkeleton
