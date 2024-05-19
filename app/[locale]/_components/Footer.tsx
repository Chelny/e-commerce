"use client"

import Link from "next/link"
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6"
import {
  ROUTE_CAREERS,
  ROUTE_COMPANY,
  ROUTE_CONTACT,
  ROUTE_FAQ,
  ROUTE_PRIVACY_POLICY,
  ROUTE_RETURNS,
  ROUTE_SHIPPING,
  ROUTE_TEAM,
  ROUTE_TERMS_OF_SERVICE,
} from "@/app/[locale]/_core"
import { cn } from "@/app/[locale]/_lib"
import { useTranslation } from "@/app/i18n/client"

type TFooterProps = {
  locale: TLocale
}

export const Footer = (props: TFooterProps): JSX.Element => {
  const { t } = useTranslation(props.locale, "common")

  return (
    <footer className={cn("p-4 bg-ecommerce-900 text-ecommerce-100", "dark:bg-ecommerce-800")}>
      <div className="2xl:w-[88rem] 2xl:mx-auto">
        <div
          className={cn(
            "grid grid-rows-app-footer-links grid-cols-app-footer-links space-y-8 pb-4 text-center",
            "md:grid-rows-app-footer-links-md md:grid-cols-app-footer-links-md md:space-x-24 md:space-y-0 md:py-6 md:text-start",
            "rtl:md:space-x-reverse"
          )}
        >
          <div className="space-y-4">
            <h3>{t("app_footer.about")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${props.locale}${ROUTE_COMPANY.PATH}`} aria-label={ROUTE_COMPANY.TITLE}>
                  {t(ROUTE_COMPANY.TITLE)}
                </Link>
              </li>
              <li>
                <Link href={`/${props.locale}${ROUTE_TEAM.PATH}`} aria-label={ROUTE_TEAM.TITLE}>
                  {t(ROUTE_TEAM.TITLE)}
                </Link>
              </li>
              <li>
                <Link href={`/${props.locale}${ROUTE_CAREERS.PATH}`} aria-label={ROUTE_CAREERS.TITLE}>
                  {t(ROUTE_CAREERS.TITLE)}
                </Link>
              </li>
              <li>
                <Link href={`/${props.locale}${ROUTE_CONTACT.PATH}`} aria-label={ROUTE_CONTACT.TITLE}>
                  {t(ROUTE_CONTACT.TITLE)}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3>{t("app_footer.support")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${props.locale}${ROUTE_FAQ.PATH}`} aria-label={ROUTE_FAQ.TITLE}>
                  {t(ROUTE_FAQ.TITLE)}
                </Link>
              </li>
              <li>
                <Link href={`/${props.locale}${ROUTE_SHIPPING.PATH}`} aria-label={ROUTE_SHIPPING.TITLE}>
                  {t(ROUTE_SHIPPING.TITLE)}
                </Link>
              </li>
              <li>
                <Link href={`/${props.locale}${ROUTE_RETURNS.PATH}`} aria-label={ROUTE_RETURNS.TITLE}>
                  {t(ROUTE_RETURNS.TITLE)}
                </Link>
              </li>
            </ul>
          </div>
          <div className={cn("flex flex-col justify-center items-center", "md:justify-end md:items-end")}>
            <ul className={cn("flex space-x-4 text-2xl", "rtl:space-x-reverse")}>
              <li>
                <Link href={"https://www.facebook.com"} target="_blank" aria-label="Facebook">
                  <FaFacebook className="brand-icon" />
                </Link>
              </li>
              <li>
                <Link href={"https://www.instagram.com"} target="_blank" aria-label="Instagram">
                  <FaInstagram className="brand-icon" />
                </Link>
              </li>
              <li>
                <Link href={"https://www.linkedin.com/in/chelny"} target="_blank" aria-label="LinkedIn">
                  <FaLinkedin className="brand-icon" />
                </Link>
              </li>
              <li>
                <Link href={"https://www.x.com/chelny"} target="_blank" aria-label="X (Twitter)">
                  <FaXTwitter className="brand-icon" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          id="copyright"
          className={cn(
            "flex flex-col-reverse pt-4 border-t border-ecommerce-700 text-ecommerce-500 text-sm text-center",
            "md:grid md:grid-cols-app-footer-copyright md:pt-2 md:text-start",
            "rlt:md:text-end"
          )}
        >
          <div>{t("app_footer.copyright", { year: new Date().getFullYear() })}</div>
          <div className={cn("flex space-x-2 justify-center", "md:space-x-4 md:justify-end", "rtl:space-x-reverse")}>
            <Link href={`/${props.locale}${ROUTE_TERMS_OF_SERVICE.PATH}`}>{t(ROUTE_TERMS_OF_SERVICE.TITLE)}</Link>
            <Link href={`/${props.locale}${ROUTE_PRIVACY_POLICY.PATH}`}>{t(ROUTE_PRIVACY_POLICY.TITLE)}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
