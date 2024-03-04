import ProductGrid from "@/app/[locale]/_components/ProductsGrid"
import { IProductsApiResponse } from "@/app/[locale]/_core"
import { GET_PRODUCTS } from "@/app/[locale]/(shop)/shop/sales/api/route"

const fetchProducts = async (): Promise<TApiResponse<IProductsApiResponse>> => {
  const response = await GET_PRODUCTS()
  return response.json()
}

export default async function SalePage(props: TPage) {
  const json = await fetchProducts()
  const products = json.data.products

  return <ProductGrid locale={props.params.locale} products={products} />
}
