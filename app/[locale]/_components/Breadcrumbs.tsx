"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LOCALE_REGEX, ROUTE_HOME, SITE_MAP, TSiteMap } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"
import styles from "./Breadcrumbs.module.css"

type TBreadcrumbsProps = {
  locale: TLocale
}

export const Breadcrumbs = (props: TBreadcrumbsProps): JSX.Element => {
  const { t } = useTranslation(props.locale, "common")
  const pathname = usePathname()
  const pathNames = pathname.split("/").filter((path: string) => path)
  // Exclude locale-like strings from the pathNames
  const filteredPathNames = pathNames.filter((path: string) => !path.match(LOCALE_REGEX))
  const separator = <span className={styles.separator}>/</span>

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
    <ul className={`${styles.list} ${breadcrumbTrail.length > 0 ? styles.padding : ""}`}>
      {breadcrumbTrail.map((route: TSiteMap, index: number) => {
        const isLast: boolean = index === breadcrumbTrail.length - 1

        return (
          <Fragment key={index}>
            <li className={styles.listItem}>
              {isLast ? (
                <span className={`${styles.listItemLink} ${styles.listItemLinkActive}`}>{t(route.title)}</span>
              ) : (
                <Link className={styles.listItemLink} href={route.path} aria-label={t(route.title)}>
                  {t(route.title)}
                </Link>
              )}
            </li>
            {isLast ? null : separator}
          </Fragment>
        )
      })}
    </ul>
  )
}
