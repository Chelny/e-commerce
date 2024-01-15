"use client"

import Link from "next/link"
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "@/app/i18n/client"

type TFooterProps = {
  locale: string
}

export function Footer({ locale }: TFooterProps) {
  const { t } = useTranslation(locale, ["common", "about", "support"])

  return (
    <footer className="p-4 bg-ecommerce-900 text-ecommerce-100">
      <div className="grid grid-rows-app-footer-links md:grid-rows-app-footer-links-md grid-cols-app-footer-links md:grid-cols-app-footer-links-md md:space-x-24 space-y-8 md:space-y-0 pb-4 md:py-6 text-center md:text-start">
        <div className="space-y-4">
          <h3>{t("app_footer.about")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href={`/${locale}/company`}>{t("about:company.title")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/team`}>{t("about:meet_the_team.title")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/careers`}>{t("about:careers.title")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/contact-us`}>{t("about:contact_us.title")}</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3>{t("app_footer.support")}</h3>
          <ul className="space-y-2">
            <li>
              <Link href={`/${locale}/faq`}>{t("support:faqs.title")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/shipping`}>{t("support:shipping.title")}</Link>
            </li>
            <li>
              <Link href={`/${locale}/exchanges-and-returns`}>{t("support:returns.title")}</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center md:justify-end items-center md:items-end">
          <ul className="flex space-x-4 text-2xl">
            <li>
              <Link href={"https://www.facebook.com"} target="_blank" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
            </li>
            <li>
              <Link href={"https://www.instagram.com"} target="_blank" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </li>
            <li>
              <Link href={"https://www.linkedin.com/in/chelny"} target="_blank" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
            </li>
            <li>
              <Link href={"https://www.twitter.com/chelny"} target="_blank" aria-label="Twitter">
                <FontAwesomeIcon icon={faXTwitter} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        id="copyright"
        className="flex flex-col-reverse md:grid md:grid-cols-app-footer-copyright pt-4 md:pt-2 border-t border-ecommerce-700 text-ecommerce-500 text-sm text-center md:text-start"
      >
        <div>{t("app_footer.copyright", { year: new Date().getFullYear() })}</div>
        <div className="flex space-x-2 md:space-x-4 justify-center md:justify-end">
          <Link href={`/${locale}/terms-of-service`}>{t("app_footer.terms_of_service")}</Link>
          <Link href={`/${locale}/privacy-policy`}>{t("app_footer.privacy_policy")}</Link>
        </div>
      </div>
    </footer>
  )
}
