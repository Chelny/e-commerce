import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Used for shadcn/ui
 * @param inputs
 * @returns
 */
export const cn = (...inputs: ClassValue[]): string => {
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
