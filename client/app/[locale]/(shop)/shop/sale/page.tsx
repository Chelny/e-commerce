import { Suspense } from "react"
import { useTranslation } from "@/app/i18n"

export default async function SalePage({ params, searchParams }: TPageProps) {
  const { t } = await useTranslation(params.locale, "shop")

  return (
    <>
      <Suspense fallback={<p>Loading products...</p>}>
        item_locale={params.locale}
        filter={searchParams?.filter}
      </Suspense>
    </>
  )
}
