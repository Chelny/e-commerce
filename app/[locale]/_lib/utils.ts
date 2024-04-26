import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ECountryCode } from "@/app/[locale]/_core"

/**
 * Merge classes
 * @param inputs
 * @returns
 */
export const classMerge = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export const calculateReducedPrice = (regularPrice: number | undefined, discountPercentage: number): number => {
  if (typeof regularPrice === "undefined") return 0
  const reducedPrice = regularPrice * (1 - discountPercentage)
  return Math.round(reducedPrice * 100) / 100
}

/**
 * Convert date to localized date string
 * @param isoString
 * @returns
 */
export const formatDate = (isoString: Date | null | undefined): string => {
  if (isoString === null || typeof isoString === "undefined") return ""

  const date = new Date(isoString)

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date")
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export const formatPhoneNumber = (input: string): string => {
  return input
    .replace(/^(\d{1})$/, "+$1")
    .replace(/^(\d{1})(\d{1,3})$/, "+$1 ($2")
    .replace(/^(\d{1})(\d{3})(\d{1,3})$/, "+$1 ($2) $3")
    .replace(/^(\d{1})(\d{3})(\d{3})(\d{1,4})/, "+$1 ($2) $3-$4")
}

export const formatPostalCode = (input: string, countryCode?: string): string => {
  if (countryCode) {
    switch (countryCode) {
      case ECountryCode.CA:
        return input
          .replace(/^([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])$/, "$1")
          .replace(/^([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])(\d)$/, "$1 $2")
          .replace(/^([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])(\d[ABCEGHJ-NPRSTV-Z])$/, "$1 $2")
          .replace(/^([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])(\d[ABCEGHJ-NPRSTV-Z]\d)$/, "$1 $2")
      case ECountryCode.US:
        return input
          .replace(/^(?!0{5})(\d{5})(?!-?0{4})$/, "$1")
          .replace(/^(?!0{5})(\d{5})(?!-?0{4})(\d{1,4})$/, "$1-$2")
      default:
        break
    }
  }

  return input
}

export const nameInitials = (name: string | null | undefined): string => {
  if (!name) return "?"
  const names = name.split(" ")
  const initials = names.map((name: string) => name.charAt(0)).join(" ")
  return initials.toUpperCase()
}

/**
 * Users must be at least 18 years old
 */
export const minimumBirthdate = (): Date => {
  const currentDate = new Date()
  const birthYear = currentDate.getFullYear() - 18
  return new Date(birthYear, currentDate.getMonth(), currentDate.getDate())
}
