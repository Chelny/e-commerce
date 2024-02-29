"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LOCALE_REGEX, ROUTE_HOME } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

export default function NotFound() {
  const paths = usePathname()
  const locale = paths.split("/").find((path: string) => path.match(LOCALE_REGEX))
  const { t } = useTranslation(locale, ["common"])

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-full p-4">
      <h1>{t("page.not_found.title")}</h1>
      <p>{t("page.not_found.message")}</p>
      <Link href={`/${locale}${ROUTE_HOME.PATH}`}>{t("page.not_found.return_home")}</Link>
    </div>
  )
}
