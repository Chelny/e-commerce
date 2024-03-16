"use client"

import { Suspense, useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { ProductCard } from "@/app/[locale]/_components/ProductCard"
import { ProductCardSkeleton } from "@/app/[locale]/_components/ProductCard.skeleton"
import { TProduct, TProductsPagination } from "@/app/[locale]/_core"

type TProductGridProps = {
  locale: TLocale
  initialProducts: TProduct[]
  fetchData: (skip: number) => Promise<TProductsPagination>
}

export const ProductGrid = (props: TProductGridProps): JSX.Element => {
  const [products, setProducts] = useState<TProduct[]>(props.initialProducts)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
  const { ref, inView } = useInView()

  const loadMoreUsers = useCallback(async () => {
    const nextPage = page + 1
    const response = await props.fetchData(nextPage)

    setProducts((prevProducts: TProduct[]) => [...prevProducts, ...response.products])
    setPage(nextPage)

    if (response.count >= products.length) {
      setIsLastPage(true)
    }
  }, [page, props, products.length])

  useEffect(() => {
    const fetchDataInView = async () => {
      if (inView && !isLastPage) {
        await loadMoreUsers()
      }
    }

    fetchDataInView()
  }, [inView, isLastPage, loadMoreUsers])

  return (
    <>
      <div className="md:flex md:flex-wrap md:justify-evenly md:gap-2">
        {products.map((product: TProduct) => (
          <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
            <ProductCard locale={props.locale} product={product} />
          </Suspense>
        ))}
      </div>
      {!isLastPage && <div id="infiniteScroll" ref={ref}></div>}
    </>
  )
}
