"use client"

import { useTranslation } from "@/app/i18n/client"

type TFieldHintMessage = {
  locale: TLocale
  keyName: string
}

export function FieldHintMessage(fieldHintMessageProps: TFieldHintMessage) {
  const { t } = useTranslation(fieldHintMessageProps.locale, ["form"])

  return <p className="text-ecommerce-500 text-sm">{t(`form:hint.${fieldHintMessageProps.keyName}`)}</p>
}
