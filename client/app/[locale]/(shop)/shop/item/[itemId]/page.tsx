import { Suspense } from "react"
// import { BannerCarousel } from '@/app/[locale]/components/BannerCarousel'
import { ShopMenu } from "@/app/[locale]/components/ShopMenu"
import { useTranslation } from "@/app/i18n"

export default async function ProductPage({ params }: TPageProps) {
  const { t } = await useTranslation(params.locale, "product")

  return (
    <>
      {/* <BannerCarousel locale={params.locale}></BannerCarousel> */}
      <ShopMenu locale={params.locale}></ShopMenu>
      <Suspense fallback={<p>Loading feed...</p>}>item_locale={params.locale}</Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        {/* Category: {params.categoryId}
        Product: {params.itemId} */}
      </Suspense>
    </>
  )
}
