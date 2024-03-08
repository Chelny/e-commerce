import ProductGrid from "@/app/[locale]/_components/ProductsGrid"
import { EProductFilterType, IProductsApiResponse } from "@/app/[locale]/_core"
import { GET_PRODUCTS } from "@/app/[locale]/(shop)/shop/api/route"

const fetchProducts = async (): Promise<TApiResponse<IProductsApiResponse>> => {
  return await GET_PRODUCTS(EProductFilterType.SALES)
}

export default async function SalePage(props: TPage) {
  const { data } = await fetchProducts()
  const { products } = data

  return <ProductGrid locale={props.params.locale} initialProducts={products} filter={EProductFilterType.SALES} />
}
