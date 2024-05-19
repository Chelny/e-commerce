import { Suspense } from "react"
import { GET_PRODUCT, GET_PRODUCT_REVIEWS } from "@/app/[locale]/(shop)/shop/product/[product]/api/route"
import { ProductReviewForm } from "@/app/[locale]/(shop)/shop/product/[product]/product-review.form"
import ProductInfoSkeleton from "@/app/[locale]/(shop)/shop/product/[product]/ProductInfo.skeleton"
import ProductRecommendationsSkeleton from "@/app/[locale]/(shop)/shop/product/[product]/ProductRecommendations.skeleton"
import ProductReviewsSkeleton from "@/app/[locale]/(shop)/shop/product/[product]/ProductReviews.skeleton"
import { AddToWishlistButton } from "@/app/[locale]/_components/AddToWishlistButton"
import { Currency } from "@/app/[locale]/_components/Currency"
import { ProductCarousel } from "@/app/[locale]/_components/ProductCarousel"
import { ProductImageGallery } from "@/app/[locale]/_components/ProductImageGallery"
import { ProductRatingProgressBars } from "@/app/[locale]/_components/ProductRatingProgressBars"
import { ProductRatingStars } from "@/app/[locale]/_components/ProductRatingStars"
import { ProductShipping } from "@/app/[locale]/_components/ProductShipping"
import ProductShippingSkeleton from "@/app/[locale]/_components/ProductShipping.skeleton"
import { Share } from "@/app/[locale]/_components/Share"
import { TProductReview } from "@/app/[locale]/_core"
import { formatDate, getDiscountedPrice } from "@/app/[locale]/_lib"
import { useTranslation } from "@/app/i18n"

const ProductPage = async (props: TPageProps): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, "shop")
  const product = await GET_PRODUCT(props.params.product as string)
  const productReviews = product && (await GET_PRODUCT_REVIEWS(product.id))

  return (
    <div className="flex flex-col space-y-16">
      <div className="grid xl:grid-cols-[2fr_1fr] xl:space-x-8 rtl:xl:space-x-reverse space-y-8 xl:space-y-0">
        <div className="grid xl:grid-cols-[25rem_2fr] xl:space-x-4 rtl:xl:space-x-reverse space-y-4 xl:space-y-0">
          <Suspense fallback={<ProductInfoSkeleton />}>
            <ProductImageGallery locale={props.params.locale} />
            <div>
              <div className="flex justify-between items-start space-x-2 rtl:space-x-reverse">
                <h1>{product?.name}</h1>
                <div className="flex items-center">
                  <AddToWishlistButton locale={props.params.locale} product={product} />
                  <Share locale={props.params.locale} />
                </div>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-2xl">
                  <Currency
                    locale={props.params.locale}
                    value={getDiscountedPrice(
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
              <ProductRatingStars locale={props.params.locale} ratings={productReviews?.ratings} />
              <hr />
              <h3>{t("shop:item.description")}</h3>
              <p>{product?.description}</p>
            </div>
          </Suspense>
        </div>
        <Suspense fallback={<ProductShippingSkeleton />}>
          <ProductShipping locale={props.params.locale} product={product} />
        </Suspense>
      </div>

      <hr />

      {/* RECOMMENDATIONS */}
      <Suspense fallback={<ProductRecommendationsSkeleton />}>
        <section>
          <h2>{t("shop:recommendations")}</h2>
          <ProductCarousel locale={props.params.locale} products={product?.related} />
        </section>
      </Suspense>

      <hr />

      {/* REVIEWS */}
      <Suspense fallback={<ProductReviewsSkeleton />}>
        <section>
          <h2 id="reviews">{t("shop:reviews.title")}</h2>
          <div className="grid md:grid-cols-[1fr_3fr] md:space-x-16 rtl:md:space-x-reverse space-y-8 md:space-y-0">
            <div className="flex flex-col space-y-4">
              <ProductRatingStars locale={props.params.locale} ratings={productReviews?.ratings} showProgressBar />
              <ProductRatingProgressBars locale={props.params.locale} ratings={productReviews?.ratings} />
            </div>
            <div className="space-y-8">
              <ProductReviewForm page={props} productId={product?.id} />

              {productReviews?.reviews && productReviews.reviews.length > 0 ? (
                productReviews?.reviews?.map((review: TProductReview) => (
                  <div key={review.id} className="space-y-2">
                    <ProductRatingStars locale={props.params.locale} ratings={{ average_rating: review.rating }} />
                    <b>{review.title}</b>
                    <p>{review.comment}</p>
                    <div className="flex space-x-1 rtl:space-x-reverse text-sm italic">
                      <span>{review.user?.first_name ?? review.user?.name}</span>
                      <span>{formatDate(review.created_at)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>{t("shop:reviews.no_comments")}</p>
              )}
            </div>
          </div>
        </section>
      </Suspense>
    </div>
  )
}

export default ProductPage
