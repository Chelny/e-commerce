import Skeleton from "@/app/[locale]/_components/Skeleton"

const ProductRatingProgressBarsSkeleton = (): JSX.Element => {
  return (
    <>
      {Array.from(Array(5).keys()).map((_, index: number) => (
        <div key={index} className="grid grid-cols-[3fr_5fr_2fr] items-center gap-1 space-x-1 rtl:space-x-reverse">
          <div>
            <Skeleton />
          </div>
          <Skeleton className="h-8" />
          <div>
            <span>
              <Skeleton />
            </span>
          </div>
        </div>
      ))}
    </>
  )
}

export default ProductRatingProgressBarsSkeleton
