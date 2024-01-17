import { Suspense } from "react"
import Link from "next/link"
import { faShareAlt, faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons"
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "@/app/i18n"
import { Cart } from "@/app/[locale]/components/Cart"
import { ProductCarousel } from "@/app/[locale]/components/ProductCarousel"
import { ProductImageGallery } from "@/app/[locale]/components/ProductImageGallery"

export default async function ShopPage({ params, searchParams }: TPageProps) {
  const { t } = await useTranslation(params.locale, "shop")

  /**************************************************
   *
   * Product Details
   *
   **************************************************/

  if (searchParams.product) {
    // TODO: Move logic to client component
    // const handleSize = () => {
    //   console.log("handleSize")
    // }

    return (
      <>
        <div className="flex flex-col space-y-16">
          <div className="grid md:grid-cols-[25rem_2fr_1.5fr] md:space-x-8 space-y-8 md:space-y-0">
            <Suspense fallback={<p>Loading product...</p>}>
              <div>
                <ProductImageGallery locale={params.locale} />
              </div>
              <div>
                <div className="flex justify-between items-center space-x-2">
                  <h1>product name</h1>
                  <button className="button-link" type="button">
                    <FontAwesomeIcon icon={faShareAlt} />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <h2>$59.00</h2>
                  <span className="text-ecommerce-500 line-through">$129.98</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStarHalfAlt} />
                      <FontAwesomeIcon icon={faStarEmpty} />
                    </div>
                    <Link href="#reviews">{t("shop:product.reviews", { count: 25 })}</Link>
                  </div>
                  <button className="button-link" type="button">
                    {t("shop:product.add_to_wish_list")}
                  </button>
                </div>
                <hr />
                <h4>{t("shop:product.choose_size")}</h4>
                <div className="radio-toolbar space-y-4">
                  <input type="radio" id="size16x20in" name="size" value="16x20in" />
                  <label htmlFor="size16x20in">16x20in</label>

                  <input type="radio" id="size18x24in" name="size" value="18x24in" />
                  <label htmlFor="size18x24in">18x24in</label>

                  <input type="radio" id="size30x40in" name="size" value="30x40in" />
                  <label htmlFor="size30x40in">30x40in</label>
                </div>
                <hr />
                <h3>{t("shop:product.description")}</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe esse aliquam deserunt et quaerat
                  tempora ipsa! Nobis dolores voluptatibus laudantium ab excepturi nesciunt, libero amet adipisci enim
                  impedit laboriosam fugiat! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem
                  error vitae incidunt minima, vero cupiditate ea asperiores rerum porro recusandae mollitia ipsam id ut
                  quidem aliquam consequuntur inventore quibusdam eveniet?
                </p>
                <br />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe esse aliquam deserunt et quaerat
                  tempora ipsa! Nobis dolores voluptatibus laudantium ab excepturi nesciunt, libero amet adipisci enim
                  impedit laboriosam fugiat! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem
                  error vitae incidunt minima, vero cupiditate ea asperiores rerum porro recusandae mollitia ipsam id ut
                  quidem aliquam consequuntur inventore quibusdam eveniet?
                </p>
              </div>
              <Cart locale={params.locale} />
            </Suspense>
          </div>
          <hr />
          <section>
            <Suspense fallback={<p>Loading recommendations...</p>}>
              <h2>{t("shop:recommendations")}</h2>
              <ProductCarousel locale={params.locale} />
            </Suspense>
          </section>
          <hr />
          <section>
            <Suspense fallback={<p>Loading reviews...</p>}>
              <h2 id="reviews">{t("shop:reviews")}</h2>
              <div className="grid md:grid-cols-[1fr_3fr] md:space-x-16 space-y-8 md:space-y-0">
                <div className="space-y-8">
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStarHalfAlt} />
                      <FontAwesomeIcon icon={faStarEmpty} />
                    </div>
                    <div>4.5/5</div>
                    <div>({t("shop:product.reviews", { count: 25 })})</div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2">
                      <div>{t("shop:product.stars", { count: 5 })}</div>
                      <progress value="47" max="100" aria-label={t("shop:product.stars", { count: 5 })}>
                        {" "}
                        47%{" "}
                      </progress>
                      <div className="text-end">47%</div>
                    </div>
                    <div className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2">
                      <div>{t("shop:product.stars", { count: 4 })}</div>
                      <progress value="13" max="100" aria-label={t("shop:product.stars", { count: 4 })}>
                        {" "}
                        13%{" "}
                      </progress>
                      <div className="text-end">13%</div>
                    </div>
                    <div className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2">
                      <div>{t("shop:product.stars", { count: 3 })}</div>
                      <progress value="32" max="100" aria-label={t("shop:product.stars", { count: 3 })}>
                        {" "}
                        32%{" "}
                      </progress>
                      <div className="text-end">32%</div>
                    </div>
                    <div className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2">
                      <div>{t("shop:product.stars", { count: 2 })}</div>
                      <progress value="5" max="100" aria-label={t("shop:product.stars", { count: 2 })}>
                        {" "}
                        5%{" "}
                      </progress>
                      <div className="text-end">5%</div>
                    </div>
                    <div className="grid grid-cols-[2fr_4fr_1fr] items-center space-x-2">
                      <div>{t("shop:product.stars", { count: 1 })}</div>
                      <progress value="3" max="100" aria-label={t("shop:product.stars", { count: 1 })}>
                        {" "}
                        3%{" "}
                      </progress>
                      <div className="text-end">3%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>picture and name</div>
                    <div>rating and title</div>
                    <div>comment</div>
                  </div>
                </div>
              </div>
            </Suspense>
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

  return (
    <>
      <Suspense fallback={<p>Loading products...</p>}>
        item_locale={params.locale}
        filter={searchParams?.filter}
      </Suspense>
    </>
  )
}
