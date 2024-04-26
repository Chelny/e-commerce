import Skeleton from "@/app/[locale]/_components/Skeleton"

const ProductImageGallerySkeleton = (): JSX.Element => {
  return (
    <div className="overflow-hidden space-y-2">
      <Skeleton className="w-[400px] h-[400px]" />
      <div className="flex gap-2">
        {Array.from(Array(4).keys()).map((_, index: number) => (
          <Skeleton key={index} className="w-[94px] h-[94px]" />
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallerySkeleton
