const toMoneyValue = (locale: TLocale, value: number, currency: string = "USD"): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)
}

export const Currency = ({
  locale,
  value,
  currency,
}: {
  locale: TLocale
  value: number
  currency?: string
}): JSX.Element => {
  return <>{toMoneyValue(locale, value, currency)}</>
}
