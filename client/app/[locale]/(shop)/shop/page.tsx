import Link from "next/link"
import { FaShare, FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6"
import { useTranslation } from "@/app/i18n"
import { Cart } from "@/app/[locale]/_components/Cart"
import { ItemCarousel } from "@/app/[locale]/_components/ItemCarousel"
import { ItemImageGallery } from "@/app/[locale]/_components/ItemImageGallery"
import ItemGrid from "@/app/[locale]/_components/ItemsGrid"
import { dir } from "i18next"

export default async function ShopPage(props: TPage) {
  const { t } = await useTranslation(props.params.locale, "shop")

  /**************************************************
   *
   * Item Details
   *
   **************************************************/

  if (props.searchParams.item) {
    // TODO: Move logic to client component
    // const handleSize = () => {
    //   console.log("handleSize")
    // }

    return (
      <>
        <div className="flex flex-col space-y-16">
          <div className="grid md:grid-cols-[25rem_2fr_1.5fr] md:space-x-8 rtl:md:space-x-reverse space-y-8 md:space-y-0">
            <div>
              <ItemImageGallery locale={props.params.locale} />
            </div>
            <div>
              <div className="flex justify-between items-center space-x-2 rtl:space-x-reverse">
                <h1>item name</h1>
                <button className="link-button" type="button">
                  <FaShare />
                </button>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h2>$59.00</h2>
                <span className="text-ecommerce-500 line-through">$129.98</span>
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
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe esse aliquam deserunt et quaerat tempora
                ipsa! Nobis dolores voluptatibus laudantium ab excepturi nesciunt, libero amet adipisci enim impedit
                laboriosam fugiat! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem error vitae
                incidunt minima, vero cupiditate ea asperiores rerum porro recusandae mollitia ipsam id ut quidem
                aliquam consequuntur inventore quibusdam eveniet?
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe esse aliquam deserunt et quaerat tempora
                ipsa! Nobis dolores voluptatibus laudantium ab excepturi nesciunt, libero amet adipisci enim impedit
                laboriosam fugiat! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem error vitae
                incidunt minima, vero cupiditate ea asperiores rerum porro recusandae mollitia ipsam id ut quidem
                aliquam consequuntur inventore quibusdam eveniet?
              </p>
            </div>
            <Cart locale={props.params.locale} />
          </div>
          <hr />
          <section>
            <h2>{t("shop:recommendations")}</h2>
            <ItemCarousel locale={props.params.locale} />
          </section>
          <hr />
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
                  <div>picture and name</div>
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
   * Items List
   *
   **************************************************/

  return <ItemGrid locale={props.params.locale} />
}
