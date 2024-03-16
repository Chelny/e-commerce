import { Suspense } from "react"
import { GET_PRODUCT, GET_PRODUCT_REVIEWS, GET_PRODUCTS } from "@/app/[locale]/(shop)/shop/api/route"
import { ProductReviewForm } from "@/app/[locale]/(shop)/shop/product-review.form"
import { Cart } from "@/app/[locale]/_components/Cart"
import { Currency } from "@/app/[locale]/_components/Currency"
import { ProductCarousel } from "@/app/[locale]/_components/ProductCarousel"
import { ProductImageGallery } from "@/app/[locale]/_components/ProductImageGallery"
import { ProductReviewStars } from "@/app/[locale]/_components/ProductReviewStars"
import { ProductGrid } from "@/app/[locale]/_components/ProductsGrid"
import { Share } from "@/app/[locale]/_components/Share"
import { calculateReducedPrice, formatDate, TProductReview, TProductsPagination } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n"

const fetchProducts = async (skip: number): Promise<TProductsPagination> => {
  "use server"

  const response = await GET_PRODUCTS(skip)
  return response
}

const ShopPage = async (props: TPage): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, "shop")

  /**************************************************
   *
   * Product Details
   *
   **************************************************/

  if (props.searchParams.product) {
    const product = await GET_PRODUCT(props.searchParams.product as string)
    const productReviews = await GET_PRODUCT_REVIEWS(product.id)

    return (
      <div className="flex flex-col space-y-16">
        <div className="grid md:grid-cols-[2fr_1fr] md:space-x-8 rtl:md:space-x-reverse space-y-8 md:space-y-0">
          <div className="grid md:grid-cols-[25rem_2fr] md:space-x-4 rtl:md:space-x-reverse space-y-4 md:space-y-0">
            <Suspense fallback={<>Loading product...</>}>
              <ProductImageGallery locale={props.params.locale} />
              <div>
                <div className="flex justify-between items-center space-x-2 rtl:space-x-reverse">
                  <h1>{product?.name}</h1>
                  <Share />
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-2xl">
                    <Currency
                      locale={props.params.locale}
                      value={calculateReducedPrice(
                        product?.price,
                        product?.discount && product?.discount.active ? product?.discount.discount_percent : 0
                      )}
                    />
                  </span>
                  {product?.discount && product?.discount.active && (
                    <span className="text-ecommerce-500 line-through">
                      <Currency locale={props.params.locale} value={product?.price} />
                    </span>
                  )}
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start">
                  <ProductReviewStars locale={props.params.locale} ratings={productReviews?.ratings} />
                  <button type="button" className="button-link">
                    {t("shop:item.add_to_wish_list")}
                  </button>
                </div>
                <hr />
                <h3>{t("shop:item.description")}</h3>
                <p>{product?.description}</p>
              </div>
            </Suspense>
          </div>
          <Suspense fallback={<>Loading cart...</>}>
            <Cart locale={props.params.locale} product={product} />
          </Suspense>
        </div>

        <hr />

        {/* RECOMMENDATIONS */}
        <Suspense fallback={<>Loading recommendation...</>}>
          <section>
            <h2>{t("shop:recommendations")}</h2>
            <ProductCarousel locale={props.params.locale} products={product?.related} />
          </section>
        </Suspense>

        <hr />

        {/* REVIEWS */}
        <Suspense fallback={<>Loading reviews...</>}>
          <section>
            <h2 id="reviews">{t("shop:reviews")}</h2>
            <div className="grid md:grid-cols-[1fr_3fr] md:space-x-16 rtl:md:space-x-reverse space-y-8 md:space-y-0">
              <ProductReviewStars locale={props.params.locale} ratings={productReviews?.ratings} showProgressBar />
              <div className="space-y-8">
                <ProductReviewForm page={props} />

                {productReviews?.reviews?.map((review: TProductReview) => (
                  <div key={review.id} className="space-y-2">
                    <ProductReviewStars locale={props.params.locale} ratings={{ average_rating: review.rating }} />
                    <b>{review.title}</b>
                    <p>{review.comment}</p>
                    <div className="space-x-2 text-sm italic">
                      <span>{review.user?.name}</span>
                      <span>{formatDate(review.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Suspense>
      </div>
    )
  }

  /**************************************************
   *
   * Products List
   *
   **************************************************/

  const response = await fetchProducts(0)

  return <ProductGrid locale={props.params.locale} initialProducts={response.products} fetchData={fetchProducts} />
}

export default ShopPage
