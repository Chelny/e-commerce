"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTE_HOME, SITE_MAP, TSiteMap } from "@/app/[locale]/_lib/site-map"
import { useTranslation } from "@/app/i18n/client"

type TBreadcrumbsProps = {
  locale: TLocale
}

export function Breadcrumbs({ locale }: TBreadcrumbsProps) {
  const { t } = useTranslation(locale, ["common"])
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path: string) => path)
  // Exclude locale-like strings from the pathNames
  const filteredPathNames = pathNames.filter((path: string) => !path.match(/[a-z]{2}-[A-Z]{2}/))
  const separator = <span className="text-ecommerce-500 rtl:scale-x-[-1]">/</span>
  const listClasses = "hover:underline mx-2"
  const activeClasses = "hover:no-underline !font-medium"

  const findRouteByPath = (routes: TSiteMap[], path: string): TSiteMap[] => {
    for (const route of routes) {
      if (path === ROUTE_HOME.PATH) break
      if (route.path === path) return [route]

      if (route.children && route.children.length > 0) {
        const childMatch: TSiteMap[] = findRouteByPath(route.children, path)
        if (childMatch.length > 0) return [route, ...childMatch]
      }
    }

    return []
  }

  const breadcrumbTrail = findRouteByPath(SITE_MAP, `/${filteredPathNames.join("/")}`)

  return (
    <div id="breadcrumbs">
      <ul className={`flex ${breadcrumbTrail.length !== 0 && "px-4 py-5"}`}>
        {breadcrumbTrail.map((route: TSiteMap, index: number) => {
          const isLast: boolean = index === breadcrumbTrail.length - 1

          return (
            <React.Fragment key={index}>
              <li>
                {isLast ? (
                  <span className={`${listClasses} ${activeClasses}`}>{t(route.title)}</span>
                ) : (
                  <Link className={listClasses} href={route.path} aria-label={t(route.title)}>
                    {t(route.title)}
                  </Link>
                )}
              </li>
              {isLast ? null : separator}
            </React.Fragment>
          )
        })}
      </ul>
    </div>
  )
}
