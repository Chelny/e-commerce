import Skeleton from "@/app/[locale]/_components/Skeleton"
import styles from "./ProductCard.module.css"

export default function ProductCardSkeleton() {
  return (
    <div className="relative">
      <div className={`${styles.itemProductCardImage} bg-ecommerce-500`}></div>
      <div className="py-2 leading-loose">
        <div className="py-4">
          <Skeleton className="w-full h-[1rem]" />
        </div>
        <div>
          <span className="py-4">
            <Skeleton className="w-[12rem] h-[1rem]" />
          </span>
        </div>
      </div>
    </div>
  )
}
