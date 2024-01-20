"use client"

import { ItemCard } from "@/app/[locale]/_components/ItemCard"
import { useTranslation } from "@/app/i18n/client"

type TItemGridProps = {
  locale: string
}

export default function ItemGrid({ locale }: TItemGridProps) {
  const { t } = useTranslation(locale, "shop")

  return (
    <div className="grid">
      <div className="flex flex-wrap justify-evenly gap-2">
        {Array(24)
          .fill(null)
          .map((_, index: number) => (
            <ItemCard
              key={index}
              locale={locale}
              item={{ id: index, imagePath: "https://picsum.photos/320" }}
            ></ItemCard>
          ))}
      </div>
      {/* <p className="justify-self-center my-16">{t("shop:no_items_found")}</p> */}
      <p className="justify-self-center my-16">{t("shop:no_more_items")}</p>
    </div>
  )
}
