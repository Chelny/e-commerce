import { ProductCardSkeleton } from "@/app/[locale]/_components/ProductCard.skeleton"
import Skeleton from "@/app/[locale]/_components/Skeleton"

const ProductCarouselSkeleton = (): JSX.Element => {
  return (
    <div className="relative">
      <div className="hidden md:flex md:justify-end md:items-center md:space-x-4 rtl:md:space-x-reverse md:pb-2">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-8 h-8" />
      </div>

      <div className="flex gap-4 pb-2 overflow-hidden">
        {Array.from(Array(20).keys()).map((_, index: number) => (
          <div key={index}>
            <ProductCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCarouselSkeleton
