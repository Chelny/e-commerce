function toMoneyValue(locale: string, value: number, currency: string = 'USD', decimals: number = 2) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value)
}

export function Currency({
  locale,
  value,
  currency,
  decimals,
}: {
  locale: string
  value: number
  currency?: string
  decimals?: number
}) {
  return <>{ toMoneyValue(locale, value, currency, decimals) }</>
}