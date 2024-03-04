import Link from "next/link"
import { BannerCarousel } from "@/app/[locale]/_components/BannerCarousel"
import { ProductCarousel } from "@/app/[locale]/_components/ProductCarousel"
import {
  EProductFilterType,
  IProductsApiResponse,
  ROUTE_NEW_ARRIVALS,
  ROUTE_POPULAR,
  ROUTE_SALE,
} from "@/app/[locale]/_core"
import { GET_PRODUCTS } from "@/app/[locale]/api/route"
import { useTranslation } from "@/app/i18n"

const fetchProducts = async (filter: string): Promise<TApiResponse<IProductsApiResponse>> => {
  const response = await GET_PRODUCTS(filter)
  return response.json()
}

export default async function HomePage(props: TPage) {
  const { t } = await useTranslation(props.params.locale, ["common", "shop"])
  const jsonNewArrivals = await fetchProducts(EProductFilterType.NEW_ARRIVALS)
  const productsNewArrivals = jsonNewArrivals.data.products
  // const jsonPopular = await fetchProducts(EProductFilterType.POPULAR)
  // const productsPopular = jsonPopular.data.products
  const jsonSales = await fetchProducts(EProductFilterType.SALES)
  const productsSales = jsonSales.data.products

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
          <ProductCarousel locale={props.params.locale} products={productsNewArrivals} />
        </section>
        {/* FIXME: Fix popular logic in back-end */}
        {/* <section>
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
          <ProductCarousel locale={props.params.locale} products={productsPopular} />
        </section> */}
        <section>
          <div className="flex justify-between align-center mb-6">
            <h2 className="text-xl uppercase">{t(ROUTE_SALE.TITLE)}</h2>
            <Link href={`/${props.params.locale}${ROUTE_SALE.PATH}`} locale={false} aria-label={t(ROUTE_SALE.TITLE)}>
              {t("button.view_all")}
            </Link>
          </div>
          <ProductCarousel locale={props.params.locale} products={productsSales} />
        </section>
      </div>
    </>
  )
}
