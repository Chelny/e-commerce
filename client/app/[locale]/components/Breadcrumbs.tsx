"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "@/app/i18n/client"

type TBreadcrumbsProps = {
  locale: string
}

const Breadcrumbs = ({ locale }: TBreadcrumbsProps) => {
  const { t } = useTranslation(locale, ["common"])
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path: string) => path)
  // Exclude locale-like strings from the pathNames
  const filteredPathNames = pathNames.filter((path: string) => !path.match(/[a-z]{2}-[A-Z]{2}/))
  const separator = <span>/</span>
  const listClasses = "hover:underline mx-2"
  const activeClasses = "!font-medium"

  return (
    <div id="breadcrumbs">
      <ul className="flex px-4 py-5">
        <li>
          <Link className={listClasses} href={"/"}>
            {t("app_menu.home")}
          </Link>
        </li>
        {filteredPathNames.length > 0 && separator}
        {filteredPathNames.map((link, index) => {
          const href = `/${pathNames.join("/")}`
          const itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
          const linkTitle = link.replace(/-/g, "_")

          return (
            <React.Fragment key={index}>
              <li>
                <Link className={itemClasses} href={href}>
                  {t(`breadcrumbs.${linkTitle}`)}
                </Link>
              </li>
              {filteredPathNames.length !== index + 1 && separator}
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export default Breadcrumbs
