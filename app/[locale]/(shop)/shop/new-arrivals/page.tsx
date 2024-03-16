import { GET_PRODUCTS } from "@/app/[locale]/(shop)/shop/new-arrivals/api/route"
import { ProductGrid } from "@/app/[locale]/_components/ProductsGrid"
import { TProductsPagination } from "@/app/[locale]/_core"

const fetchProducts = async (skip: number): Promise<TProductsPagination> => {
  "use server"

  const response = await GET_PRODUCTS(skip)
  return response
}

const NewArrivalsPage = async (props: TPage): Promise<JSX.Element> => {
  const response = await fetchProducts(0)

  return <ProductGrid locale={props.params.locale} initialProducts={response.products} fetchData={fetchProducts} />
}

export default NewArrivalsPage
