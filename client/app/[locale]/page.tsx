import Link from "next/link"
import { BannerCarousel } from "@/app/[locale]/_components/BannerCarousel"
import { ItemCarousel } from "@/app/[locale]/_components/ItemCarousel"
import { ROUTE_NEW_ARRIVALS, ROUTE_POPULAR, ROUTE_SALE } from "@/app/[locale]/_lib/site-map"
import { useTranslation } from "@/app/i18n"

export default async function HomePage({ params }: TPageProps) {
  const { t } = await useTranslation(params.locale, ["common", "shop"])

  return (
    <>
      <BannerCarousel locale={params.locale}></BannerCarousel>
      <div className="my-16">
        <section>
          <div className="flex justify-between align-center mb-6">
            <h2 className="text-xl uppercase">{t(ROUTE_NEW_ARRIVALS.TITLE)}</h2>
            <Link
              href={`/${params.locale}${ROUTE_NEW_ARRIVALS.PATH}`}
              locale={false}
              aria-label={t(ROUTE_NEW_ARRIVALS.TITLE)}
            >
              {t("button.view_all")}
            </Link>
          </div>
          <ItemCarousel locale={params.locale}></ItemCarousel>
        </section>
        <section>
          <div className="flex justify-between align-center mb-6">
            <h2 className="text-xl uppercase">{t(ROUTE_POPULAR.TITLE)}</h2>
            <Link href={`/${params.locale}${ROUTE_POPULAR.PATH}`} locale={false} aria-label={t(ROUTE_POPULAR.TITLE)}>
              {t("button.view_all")}
            </Link>
          </div>
          <ItemCarousel locale={params.locale}></ItemCarousel>
        </section>
        <section>
          <div className="flex justify-between align-center mb-6">
            <h2 className="text-xl uppercase">{t(ROUTE_SALE.TITLE)}</h2>
            <Link href={`/${params.locale}${ROUTE_SALE.PATH}`} locale={false} aria-label={t(ROUTE_SALE.TITLE)}>
              {t("button.view_all")}
            </Link>
          </div>
          <ItemCarousel locale={params.locale}></ItemCarousel>
        </section>
      </div>
    </>
  )
}
