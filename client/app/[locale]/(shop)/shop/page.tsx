import Link from "next/link"
import { FaShare, FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6"
import { Cart } from "@/app/[locale]/_components/Cart"
import { Currency } from "@/app/[locale]/_components/Currency"
import { ProductCarousel } from "@/app/[locale]/_components/ProductCarousel"
import { ProductImageGallery } from "@/app/[locale]/_components/ProductImageGallery"
import ProductGrid from "@/app/[locale]/_components/ProductsGrid"
import { Product, calculateReducedPrice } from "@/app/[locale]/_core"
import { GET } from "@/app/[locale]/(shop)/shop/api/route"
import { useTranslation } from "@/app/i18n"

const fetchProduct = async (id: number): Promise<TApiResponse<Product>> => {
  const response = await GET(id)
  return response.json()
}

const fetchProducts = async (): Promise<TApiResponse<Product[]>> => {
  const response = await GET()
  return response.json()
}

export default async function ShopPage(props: TPage) {
  const { t } = await useTranslation(props.params.locale, "shop")

  /**************************************************
   *
   * Product Details
   *
   **************************************************/

  if (props.searchParams.product) {
    const productJson = await fetchProduct(+props.searchParams.product)
    const product = productJson.data

    const relatedProductsJson = await fetchProducts()
    const relatedProducts = relatedProductsJson.data

    return (
      <>
        <div className="flex flex-col space-y-16">
          <div className="grid md:grid-cols-[25rem_2fr_1.75fr] md:space-x-8 rtl:md:space-x-reverse space-y-8 md:space-y-0">
            <ProductImageGallery locale={props.params.locale} />
            <div>
              <div className="flex justify-between items-center space-x-2 rtl:space-x-reverse">
                <h1>{product.name}</h1>
                <button className="link-button" type="button">
                  <FaShare />
                </button>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-2xl">
                  <Currency
                    locale={props.params.locale}
                    value={calculateReducedPrice(
                      product.price,
                      product.discount && product.discount.active ? product.discount.discount_percent : 0
                    )}
                  />
                </span>{" "}
                {product.discount && product.discount.active && (
                  <span className="text-ecommerce-500 line-through">
                    <Currency locale={props.params.locale} value={product.price} />
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="flex">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfStroke />
                    <FaRegStar />
                  </div>
                  <Link href="#reviews">{t("shop:item.reviews", { count: 25 })}</Link>
                </div>
                <button className="link-button" type="button">
                  {t("shop:item.add_to_wish_list")}
                </button>
              </div>
              <hr />
              <h3>{t("shop:item.description")}</h3>
              <p>{product.description}</p>
            </div>
            <Cart locale={props.params.locale} product={product} />
          </div>

          <hr />

          {/* RECOMMENDATIONS */}
          <section>
            <h2>{t("shop:recommendations")}</h2>
            <ProductCarousel locale={props.params.locale} products={relatedProducts} />
          </section>

          <hr />

          {/* REVIEWS */}
          <section>
            <h2 id="reviews">{t("shop:reviews")}</h2>
            <div className="grid md:grid-cols-[1fr_3fr] md:space-x-16 rtl:md:space-x-reverse space-y-8 md:space-y-0">
              <div className="space-y-8">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="flex">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfStroke />
                    <FaRegStar />
                  </div>
                  <div>4.5/5</div>
                  <div>({t("shop:item.reviews", { count: 25 })})</div>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2 rtl:space-x-reverse">
                    <div>{t("shop:item.stars", { count: 5 })}</div>
                    <progress value="47" max="100" aria-label={t("shop:item.stars", { count: 5 })}>
                      {" "}
                      47%{" "}
                    </progress>
                    <div className="text-end">47%</div>
                  </div>
                  <div className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2 rtl:space-x-reverse">
                    <div>{t("shop:item.stars", { count: 4 })}</div>
                    <progress value="13" max="100" aria-label={t("shop:item.stars", { count: 4 })}>
                      {" "}
                      13%{" "}
                    </progress>
                    <div className="text-end">13%</div>
                  </div>
                  <div className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2 rtl:space-x-reverse">
                    <div>{t("shop:item.stars", { count: 3 })}</div>
                    <progress value="32" max="100" aria-label={t("shop:item.stars", { count: 3 })}>
                      {" "}
                      32%{" "}
                    </progress>
                    <div className="text-end">32%</div>
                  </div>
                  <div className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2 rtl:space-x-reverse">
                    <div>{t("shop:item.stars", { count: 2 })}</div>
                    <progress value="5" max="100" aria-label={t("shop:item.stars", { count: 2 })}>
                      {" "}
                      5%{" "}
                    </progress>
                    <div className="text-end">5%</div>
                  </div>
                  <div className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2 rtl:space-x-reverse">
                    <div>{t("shop:item.stars", { count: 1 })}</div>
                    <progress value="3" max="100" aria-label={t("shop:item.stars", { count: 1 })}>
                      {" "}
                      3%{" "}
                    </progress>
                    <div className="text-end">3%</div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div>name</div>
                  <div>rating and title</div>
                  <div>comment</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    )
  }

  /**************************************************
   *
   * Products List
   *
   **************************************************/

  const productsJson = await fetchProducts()
  const products = productsJson.data

  return <ProductGrid locale={props.params.locale} products={products} />
}
