"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LOCALE_REGEX, ROUTE_HOME } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

const NotFound = (): JSX.Element => {
  const pathname = usePathname()
  const locale = pathname.split("/").find((path: string) => path.match(LOCALE_REGEX))
  const { t } = useTranslation(locale, "common")

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-full p-4">
      <h2>{t("page.not_found.title")}</h2>
      <p>{t("page.not_found.message")}</p>
      <Link href={`/${locale}${ROUTE_HOME.PATH}`} locale={false}>
        {t("button.return_home")}
      </Link>
    </div>
  )
}

export default NotFound
