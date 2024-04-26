import Skeleton from "@/app/[locale]/_components/Skeleton"

const CartSkeleton = (): JSX.Element => {
  return (
    <div className="flex flex-col md:space-y-4">
      <Skeleton className="w-48 h-8 mb-2" />
      <Skeleton className="w-96" lines={4} />
      <Skeleton className="h-12" />
      <div className="flex flex-col md:flex-row md:gap-2">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
    </div>
  )
}

export default CartSkeleton
