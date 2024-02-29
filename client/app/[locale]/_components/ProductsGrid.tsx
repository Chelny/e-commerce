"use client"

import { ProductCard } from "@/app/[locale]/_components/ProductCard"
import { Product } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

type TProductGridProps = {
  locale: TLocale
  products: Product[]
}

export default function ProductGrid(props: TProductGridProps) {
  const { t } = useTranslation(props.locale, "shop")

  return (
    <div className="grid">
      <div className="flex flex-wrap justify-evenly gap-2">
        {props.products.map((product: Product) => (
          <ProductCard key={product.id} locale={props.locale} product={product} />
        ))}
      </div>
      {/* <p className="justify-self-center my-16">{t("shop:no_items_found")}</p> */}
      <p className="justify-self-center my-16">{t("shop:no_more_items")}</p>
    </div>
  )
}
