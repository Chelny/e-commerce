import ProductCarouselSkeleton from "@/app/[locale]/_components/ProductCarousel.skeleton"
import Skeleton from "@/app/[locale]/_components/Skeleton"

const ProductRecommendationsSkeleton = (): JSX.Element => {
  return (
    <section>
      <h2>
        <Skeleton className="w-72 h-8" />
      </h2>
      <ProductCarouselSkeleton />
    </section>
  )
}

export default ProductRecommendationsSkeleton
