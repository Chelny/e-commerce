import { BannerCarousel } from "@/app/[locale]/components/BannerCarousel"
import { ProductCarousel } from "@/app/[locale]/components/ProductCarousel"
import { ShopMenu } from "@/app/[locale]/components/ShopMenu"
import { useTranslation } from "@/app/i18n"

export default async function HomePage({ params }: TPageProps) {
  const { t } = await useTranslation(params.locale, ["home", "shop"])

  return (
    <>
      <BannerCarousel locale={params.locale}></BannerCarousel>
      <ShopMenu locale={params.locale}></ShopMenu>
      <section>
        <h2 className="mb-2 text-xl uppercase">{t("shop:new_arrivals.title")}</h2>
        <ProductCarousel locale={params.locale}></ProductCarousel>
      </section>
      <section>
        <h2 className="mb-2 text-xl uppercase">{t("shop:sale.title")}</h2>
        <ProductCarousel locale={params.locale}></ProductCarousel>
      </section>
    </>
  )
}
