import Skeleton from "@/app/[locale]/_components/Skeleton"

export default function ItemCarouselSkeleton() {
  return (
    <div className="keen-slider pb-2">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="keen-slider__slide space-y-6">
            <div className="space-y-2">
              <Skeleton className="w-[30ch] h-[1.25rem]" />
              <Skeleton className="w-[45ch] h-[1rem]" />
            </div>
          </div>
        ))}
    </div>
  )
}
