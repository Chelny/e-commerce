import ItemGrid from "@/app/[locale]/_components/ItemsGrid"
import { useTranslation } from "@/app/i18n"

export default async function SalePage({ params, searchParams }: TPageProps) {
  const { t } = await useTranslation(params.locale, "shop")

  return <ItemGrid locale={params.locale} />
}
