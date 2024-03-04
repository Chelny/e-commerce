import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function calculateReducedPrice(regularPrice: number, discountPercentage: number): number {
  const reducedPrice = regularPrice * (1 - discountPercentage)
  return Math.round(reducedPrice * 100) / 100
}

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
