"use client"

import { useTranslation } from "@/app/i18n/client"

type TFieldErrorMessage = {
  locale: TLocale
  field: [string, ...string[]] | undefined
}

export function FieldErrorMessage(fieldErrorMessageProps: TFieldErrorMessage) {
  const { t } = useTranslation(fieldErrorMessageProps.locale, ["form"])

  return (
    <p className="text-red-500 dark:text-red-600">
      {fieldErrorMessageProps.field && t(`form:errors.${fieldErrorMessageProps.field[0]}`)}
    </p>
  )
}
