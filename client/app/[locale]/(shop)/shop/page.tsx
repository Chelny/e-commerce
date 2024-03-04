import { FaShare } from "react-icons/fa6"
import { Cart } from "@/app/[locale]/_components/Cart"
import { Currency } from "@/app/[locale]/_components/Currency"
import { ProductCarousel } from "@/app/[locale]/_components/ProductCarousel"
import { ProductImageGallery } from "@/app/[locale]/_components/ProductImageGallery"
import ProductGrid from "@/app/[locale]/_components/ProductsGrid"
import { ProductReviewStars } from "@/app/[locale]/_components/ProductReviewStars"
import {
  IProduct,
  IProductReview,
  IProductReviewRating,
  IProductsApiResponse,
  calculateReducedPrice,
} from "@/app/[locale]/_core"
import { GET, GET_PRODUCT_RATING } from "@/app/[locale]/(shop)/shop/api/route"
import { useTranslation } from "@/app/i18n"
import { ProductReviewForm } from "@/app/[locale]/(shop)/shop/product-review.form"

const fetchProduct = async (id: number): Promise<TApiResponse<IProduct>> => {
  const response = await GET(id)
  return response.json()
}

const fetchProductRating = async (id: number): Promise<IProductReviewRating> => {
  const response = await GET_PRODUCT_RATING(id)
  return response.json()
}

const fetchProducts = async (): Promise<TApiResponse<IProductsApiResponse>> => {
  const response = await GET()
  return response.json()
}

export default async function ShopPage(props: TPage) {
  const { t } = await useTranslation(props.params.locale, "shop")

  /**************************************************
   *
   * IProduct Details
   *
   **************************************************/

  if (props.searchParams.product) {
    const productJson = await fetchProduct(+props.searchParams.product)
    const product = productJson.data

    const productRating = await fetchProductRating(+props.searchParams.product)

    const relatedProductsJson = await fetchProducts()
    const relatedProducts = relatedProductsJson.data.products

    return (
      <>
        <div className="flex flex-col space-y-16">
          <div className="grid md:grid-cols-[25rem_2fr_1.75fr] md:space-x-8 rtl:md:space-x-reverse space-y-8 md:space-y-0">
            <ProductImageGallery locale={props.params.locale} />
            <div>
              <div className="flex justify-between items-center space-x-2 rtl:space-x-reverse">
                <h1>{product.name}</h1>
                <button className="button-link" type="button">
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
                </span>
                {product.discount && product.discount.active && (
                  <span className="text-ecommerce-500 line-through">
                    <Currency locale={props.params.locale} value={product.price} />
                  </span>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start">
                <ProductReviewStars locale={props.params.locale} rating={productRating} />
                <button type="button" className="button-link">
                  {t("shop:item.add_to_wish_list")}
                </button>
              </div>
              <hr />
              <h3>{t("shop:item.description")}</h3>
              <p>{product.description}</p>
            </div>
            <Cart locale={props.params.locale} product={product} />
          </div>

          {/* RECOMMENDATIONS */}
          <hr />

          <section>
            <h2>{t("shop:recommendations")}</h2>
            <ProductCarousel locale={props.params.locale} products={relatedProducts} />
          </section>

          {/* REVIEWS */}
          {productRating.total_reviews > 0 && (
            <>
              <hr />

              <section>
                <h2 id="reviews">{t("shop:reviews")}</h2>
                <div className="grid md:grid-cols-[1fr_3fr] md:space-x-16 rtl:md:space-x-reverse space-y-8 md:space-y-0">
                  <ProductReviewStars locale={props.params.locale} rating={productRating} showProgressBar />
                  <div className="space-y-8">
                    <ProductReviewForm page={props} />

                    {product.reviews.map((review: IProductReview) => (
                      <div key={review.id} className="space-y-2">
                        <ProductReviewStars
                          locale={props.params.locale}
                          rating={{ average_rating: review.rating } as IProductReviewRating}
                        />
                        <b>{review.title}</b>
                        <p>{review.comment}</p>
                        <div className="space-x-2 text-sm italic">
                          <span>
                            {review.user.first_name} {review.user.last_name}
                          </span>
                          <span>{review.created_at}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
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
  const products = productsJson.data.products

  return <ProductGrid locale={props.params.locale} products={products} />
}
