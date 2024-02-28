import ItemGrid from "@/app/[locale]/_components/ItemsGrid"
import { useTranslation } from "@/app/i18n"

export default async function SalePage(props: TPage) {
  const { t } = await useTranslation(props.params.locale, "shop")

  return <ItemGrid locale={props.params.locale} />
}
