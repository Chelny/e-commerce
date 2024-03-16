import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const calculateReducedPrice = (regularPrice: number | undefined, discountPercentage: number): number => {
  if (typeof regularPrice === "undefined") return 0
  const reducedPrice = regularPrice * (1 - discountPercentage)
  return Math.round(reducedPrice * 100) / 100
}

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

/**
 * Convert date to localized date string
 * @param date
 * @returns
 */
export const formatDate = (date: Date) => {
  if (!(date instanceof Date)) return "Invalid Date"
  return date.toLocaleDateString(undefined)
}
