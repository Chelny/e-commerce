import Skeleton from "@/app/[locale]/_components/Skeleton"
import styles from "./ProductCard.module.css"

export const ProductCardSkeleton = (): JSX.Element => {
  return (
    <div className="relative">
      <Skeleton className={styles.itemProductCardImage} />
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
