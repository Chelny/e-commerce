"use client"

import { useTranslation } from "@/app/i18n/client"

type TFieldHintMessage = {
  locale: string
  keyName: string
}

export function FieldHintMessage({ locale, keyName }: TFieldHintMessage) {
  const { t } = useTranslation(locale, ["form"])

  return <p className="text-ecommerce-500 text-sm">{t(`form:hint.${keyName}`)}</p>
}
