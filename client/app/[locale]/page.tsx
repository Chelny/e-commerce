import Link from "next/link"
import { BannerCarousel } from "@/app/[locale]/_components/BannerCarousel"
import { ProductCarousel } from "@/app/[locale]/_components/ProductCarousel"
import { Product, ROUTE_NEW_ARRIVALS, ROUTE_POPULAR, ROUTE_SALE } from "@/app/[locale]/_core"
import { GET } from "@/app/[locale]/api/route"
import { useTranslation } from "@/app/i18n"

const fetchProducts = async (): Promise<TApiResponse<Product[]>> => {
  const response = await GET()
  return response.json()
}

export default async function HomePage(props: TPage) {
  const { t } = await useTranslation(props.params.locale, ["common", "shop"])
  const json = await fetchProducts()
  const products = json.data

  return (
    <>
      <BannerCarousel locale={props.params.locale}></BannerCarousel>
      <div className="mt-8 mb-16 p-4">
        <section>
          <div className="flex justify-between align-center mb-6">
            <h2 className="text-xl uppercase">{t(ROUTE_NEW_ARRIVALS.TITLE)}</h2>
            <Link
              href={`/${props.params.locale}${ROUTE_NEW_ARRIVALS.PATH}`}
              locale={false}
              aria-label={t(ROUTE_NEW_ARRIVALS.TITLE)}
            >
              {t("button.view_all")}
            </Link>
          </div>
          <ProductCarousel locale={props.params.locale} products={products} />
        </section>
        <section>
          <div className="flex justify-between align-center mb-6">
            <h2 className="text-xl uppercase">{t(ROUTE_POPULAR.TITLE)}</h2>
            <Link
              href={`/${props.params.locale}${ROUTE_POPULAR.PATH}`}
              locale={false}
              aria-label={t(ROUTE_POPULAR.TITLE)}
            >
              {t("button.view_all")}
            </Link>
          </div>
          <ProductCarousel locale={props.params.locale} products={products} />
        </section>
        <section>
          <div className="flex justify-between align-center mb-6">
            <h2 className="text-xl uppercase">{t(ROUTE_SALE.TITLE)}</h2>
            <Link href={`/${props.params.locale}${ROUTE_SALE.PATH}`} locale={false} aria-label={t(ROUTE_SALE.TITLE)}>
              {t("button.view_all")}
            </Link>
          </div>
          <ProductCarousel locale={props.params.locale} products={products} />
        </section>
      </div>
    </>
  )
}
