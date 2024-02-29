function toMoneyValue(locale: TLocale, value: number, currency: string = "USD") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)
}

export function Currency({ locale, value, currency }: { locale: TLocale; value: number; currency?: string }) {
  return <>{toMoneyValue(locale, value, currency)}</>
}
