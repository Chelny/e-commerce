"use client"

import { useState, useEffect, Suspense } from "react"
import { useInView } from "react-intersection-observer"
import { ProductCard } from "@/app/[locale]/_components/ProductCard"
import ProductCardSkeleton from "@/app/[locale]/_components/ProductCard.skeleton"
import { EProductFilterType, IProduct } from "@/app/[locale]/_core"
import { GET_PRODUCTS } from "@/app/[locale]/(shop)/shop/api/route"

type TProductGridProps = {
  locale: TLocale
  initialProducts: IProduct[]
  filter?: EProductFilterType
}

export default function ProductGrid(props: TProductGridProps) {
  const [products, setProducts] = useState<IProduct[]>(props.initialProducts)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const { ref, inView } = useInView()

  const loadMoreUsers = async () => {
    const nextPage = page + 1
    const { data } = await GET_PRODUCTS(props.filter, nextPage)
    const { products: nextProducts, total_pages, current_page } = data

    setProducts([...products, ...nextProducts])
    setPage(nextPage)

    if (current_page >= total_pages) {
      setIsLastPage(true)
    }
  }

  useEffect(() => {
    if (inView && !isLastPage) {
      loadMoreUsers()
    }
  }, [inView])

  return (
    <>
      <div className="md:flex md:flex-wrap md:justify-evenly md:gap-2">
        {products.map((product: IProduct) => (
          <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
            <ProductCard locale={props.locale} product={product} />
          </Suspense>
        ))}
      </div>
      {!isLastPage && <div id="infiniteScroll" ref={ref}></div>}
    </>
  )
}
