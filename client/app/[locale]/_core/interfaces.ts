export interface Product {
  id: number
  brand: string
  name: string
  description: string
  sku: string
  category: ProductCategory
  colors: string
  price: number
  image: string
  discount: ProductDiscount
  inventory: ProductInventory
  created_at: string
  updated_at: string
}

export interface ProductCategory {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface ProductDiscount {
  id: number
  product: number
  name: string
  description: string
  discount_percent: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface ProductInventory {
  id: number
  product: number
  quantity: number
  created_at: string
  updated_at: string
}
