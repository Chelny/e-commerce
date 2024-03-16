import Skeleton from "@/app/[locale]/_components/Skeleton"

const BannerCarouselSkeleton = (): JSX.Element => {
  return (
    <div className="relative">
      <Skeleton className="w-full h-96" />
    </div>
  )
}

export default BannerCarouselSkeleton
