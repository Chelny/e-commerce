"use client"

import { useTranslation } from "@/app/i18n/client"

type TFieldErrorMessage = {
  locale: string
  field: [string, ...string[]] | undefined
}

export function FieldErrorMessage({ locale, field }: TFieldErrorMessage) {
  const { t } = useTranslation(locale, ["form"])

  return <p className="text-red-500">{field && t(`form:errors.${field[0]}`)}</p>
}
