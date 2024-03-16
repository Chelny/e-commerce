"use client"

import { useTranslation } from "@/app/i18n/client"

type TFieldHintMessage = {
  locale: TLocale
  keyName: string
}

export const FieldHintMessage = (fieldHintMessageProps: TFieldHintMessage): JSX.Element => {
  const { t } = useTranslation(fieldHintMessageProps.locale, "form")

  return <p className="text-ecommerce-500 text-sm">{t(`form:hint.${fieldHintMessageProps.keyName}`)}</p>
}
