"use client"

import { useTranslation } from "@/app/i18n/client"

type TFieldErrorMessage = {
  locale: TLocale
  field: [string, ...string[]] | undefined
}

export const FieldErrorMessage = (fieldErrorMessageProps: TFieldErrorMessage): JSX.Element => {
  const { t } = useTranslation(fieldErrorMessageProps.locale, "form")

  return (
    <p className="text-red-500 dark:text-red-600">
      {fieldErrorMessageProps.field && t(`form:error.${fieldErrorMessageProps.field[0]}`)}
    </p>
  )
}
