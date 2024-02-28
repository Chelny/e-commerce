"use client"

import Link from "next/link"
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6"
import {
  ROUTE_ABOUT,
  ROUTE_CAREERS,
  ROUTE_COMPANY,
  ROUTE_CONTACT,
  ROUTE_FAQS,
  ROUTE_PRIVACY_POLICY,
  ROUTE_RETURNS,
  ROUTE_SHIPPING,
  ROUTE_SUPPORT,
  ROUTE_TEAM,
  ROUTE_TERMS_OF_SERVICE,
} from "@/app/[locale]/_lib/site-map"
import { useTranslation } from "@/app/i18n/client"

type TFooterProps = {
  locale: TLocale
}

export function Footer({ locale }: TFooterProps) {
  const { t } = useTranslation(locale, ["common"])

  return (
    <footer className="p-4 bg-ecommerce-900 dark:bg-ecommerce-800 text-ecommerce-100">
      <div className="grid grid-rows-app-footer-links md:grid-rows-app-footer-links-md grid-cols-app-footer-links md:grid-cols-app-footer-links-md md:space-x-24 rtl:md:space-x-reverse space-y-8 md:space-y-0 pb-4 md:py-6 text-center md:text-start">
        <div className="space-y-4">
          <h3>{t(ROUTE_ABOUT.TITLE)}</h3>
          <ul className="space-y-2">
            <li>
              <Link href={`/${locale}${ROUTE_COMPANY.PATH}`} aria-label={ROUTE_COMPANY.TITLE}>
                {t(ROUTE_COMPANY.TITLE)}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}${ROUTE_TEAM.PATH}`} aria-label={ROUTE_TEAM.TITLE}>
                {t(ROUTE_TEAM.TITLE)}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}${ROUTE_CAREERS.PATH}`} aria-label={ROUTE_CAREERS.TITLE}>
                {t(ROUTE_CAREERS.TITLE)}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}${ROUTE_CONTACT.PATH}`} aria-label={ROUTE_CONTACT.TITLE}>
                {t(ROUTE_CONTACT.TITLE)}
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3>{t(ROUTE_SUPPORT.TITLE)}</h3>
          <ul className="space-y-2">
            <li>
              <Link href={`/${locale}${ROUTE_FAQS.PATH}`} aria-label={ROUTE_FAQS.TITLE}>
                {t(ROUTE_FAQS.TITLE)}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}${ROUTE_SHIPPING.PATH}`} aria-label={ROUTE_SHIPPING.TITLE}>
                {t(ROUTE_SHIPPING.TITLE)}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}${ROUTE_RETURNS.PATH}`} aria-label={ROUTE_RETURNS.TITLE}>
                {t(ROUTE_RETURNS.TITLE)}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center md:justify-end items-center md:items-end">
          <ul className="flex space-x-4 rtl:space-x-reverse text-2xl">
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
              <Link href={"https://www.twitter.com/chelny"} target="_blank" aria-label="Twitter">
                <FaXTwitter className="brand-icon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        id="copyright"
        className="flex flex-col-reverse md:grid md:grid-cols-app-footer-copyright pt-4 md:pt-2 border-t border-ecommerce-700 text-ecommerce-500 text-sm text-center md:text-start rlt:md:text-end"
      >
        <div>{t("app_footer.copyright", { year: new Date().getFullYear() })}</div>
        <div className="flex space-x-2 rtl:space-x-reverse md:space-x-4 justify-center md:justify-end">
          <Link href={`/${locale}${ROUTE_TERMS_OF_SERVICE.PATH}`}>{t(ROUTE_TERMS_OF_SERVICE.TITLE)}</Link>
          <Link href={`/${locale}${ROUTE_PRIVACY_POLICY.PATH}`}>{t(ROUTE_PRIVACY_POLICY.TITLE)}</Link>
        </div>
      </div>
    </footer>
  )
}
