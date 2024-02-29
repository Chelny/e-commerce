import ProductGrid from "@/app/[locale]/_components/ProductsGrid"
import { Product } from "@/app/[locale]/_core"
import { GET } from "@/app/[locale]/(shop)/shop/popular/api/route"
import { useTranslation } from "@/app/i18n"

const fetchProducts = async (): Promise<TApiResponse<Product[]>> => {
  const response = await GET()
  return response.json()
}

export default async function PopularPage(props: TPage) {
  const { t } = await useTranslation(props.params.locale, "shop")
  const json = await fetchProducts()
  const products = json.data

  return <ProductGrid locale={props.params.locale} products={products} />
}
