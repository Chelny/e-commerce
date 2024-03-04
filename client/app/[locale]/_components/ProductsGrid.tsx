"use client"

import { ProductCard } from "@/app/[locale]/_components/ProductCard"
import { IProduct } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

type TProductGridProps = {
  locale: TLocale
  products: IProduct[]
}

export default function ProductGrid(props: TProductGridProps) {
  const { t } = useTranslation(props.locale, "shop")

  return (
    <div className="grid">
      <div className="flex flex-wrap justify-evenly gap-2">
        {props.products.map((product: IProduct) => (
          <ProductCard key={product.id} locale={props.locale} product={product} />
        ))}
      </div>
      {/* <p className="justify-self-center my-16">{t("shop:no_items_found")}</p> */}
      <p className="justify-self-center my-16">{t("shop:no_more_items")}</p>
    </div>
  )
}

// import { useState, useRef, useEffect } from "react"
// import { ProductCard } from "@/app/[locale]/_components/ProductCard"
// import { IProduct } from "@/app/[locale]/_core"
// import { useTranslation } from "@/app/i18n/client"

// type TProductGridProps = {
//   locale: TLocale
//   // products?: IProduct[]
//   fetchProducts?: (pageNumber: number) => Promise<IProduct[]>
// }

// export default function ProductGrid(props: TProductGridProps) {
//   const { t } = useTranslation(props.locale, "shop")
//   const [loadedProducts, setLoadedProducts] = useState<IProduct[]>([])
//   const [pageNumber, setPageNumber] = useState<number>(1) // Initial page number
//   const containerRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     // Load initial products when the component mounts
//     loadProducts()
//   }, [])

//   const loadProducts = async () => {
//     try {
//       if (props.fetchProducts) {
//         // Fetch products from the API using the provided function
//         const newProducts = await props.fetchProducts(pageNumber)
//         // Update loaded products
//         setLoadedProducts((prevProducts) => [...prevProducts, ...newProducts])
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error)
//     }
//   }

//   const handleScroll = () => {
//     if (
//       containerRef.current &&
//       containerRef.current.scrollHeight - containerRef.current.scrollTop === containerRef.current.clientHeight
//     ) {
//       // User has scrolled to the bottom
//       // Increment the page number and load more products
//       setPageNumber((prevPage) => prevPage + 1)
//       loadProducts()
//     }
//   }

//   useEffect(() => {
//     // Attach scroll event listener when the component mounts
//     const container = containerRef.current
//     if (container) {
//       container.addEventListener("scroll", handleScroll)
//     }

//     // Remove the event listener when the component unmounts
//     return () => {
//       if (container) {
//         container.removeEventListener("scroll", handleScroll)
//       }
//     }
//   }, [])

//   return (
//     <div className="grid" ref={containerRef} style={{ overflowY: "auto", maxHeight: "400px" }}>
//       <div className="flex flex-wrap justify-evenly gap-2">
//         {loadedProducts.map((product: IProduct) => (
//           <ProductCard key={product.id} locale={props.locale} product={product} />
//         ))}
//       </div>
//     </div>
//   )
// }
