import { IUser } from "@/app/[locale]/_core"

export interface IProduct {
  id: number
  brand: string
  name: string
  description: string
  sku: string
  category: IProductCategory
  colors: string
  price: number
  image: string
  discount: IProductDiscount
  inventory: IProductInventory
  reviews: IProductReview[]
  created_at: string
  updated_at: string
}

export interface IProductCategory {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface IProductDiscount {
  id: number
  product: number
  name: string
  description: string
  discount_percent: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface IProductInventory {
  id: number
  product: number
  quantity: number
  created_at: string
  updated_at: string
}

export interface IProductReview {
  id: number
  user: IUser
  product: number
  rating: number
  title: string
  comment: string
  created_at: string
  updated_at: string
}

export interface IProductReviewRating {
  total_reviews: number
  average_rating: number
  star_ratings: Record<number, number>
}

export interface IProductsApiResponse {
  products: IProduct[]
  total_count: number
  total_pages: number
  current_page: number
}
