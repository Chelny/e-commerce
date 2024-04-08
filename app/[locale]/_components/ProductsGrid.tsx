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
  const [isLasTPageProps, setIsLasTPageProps] = useState<boolean>(false)
  const [page, seTPageProps] = useState<number>(0)
  const { ref, inView } = useInView()

  const loadMoreUsers = useCallback(async () => {
    const nexTPageProps = page + 1
    const response = await props.fetchData(nexTPageProps)

    setProducts((prevProducts: TProduct[]) => [...prevProducts, ...response.products])
    seTPageProps(nexTPageProps)

    if (response.count >= products.length) {
      setIsLasTPageProps(true)
    }
  }, [page, props, products.length])

  useEffect(() => {
    const fetchDataInView = async () => {
      if (inView && !isLasTPageProps) {
        await loadMoreUsers()
      }
    }

    fetchDataInView()
  }, [inView, isLasTPageProps, loadMoreUsers])

  return (
    <>
      <div className="md:flex md:flex-wrap md:justify-evenly md:gap-2">
        {products.map((product: TProduct) => (
          <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
            <ProductCard locale={props.locale} product={product} />
          </Suspense>
        ))}
      </div>
      {!isLasTPageProps && <div id="infiniteScroll" ref={ref}></div>}
    </>
  )
}
