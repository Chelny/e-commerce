"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaCartShopping, FaMagnifyingGlass, FaMoon, FaSun, FaUser } from "react-icons/fa6"
import { useTheme } from "next-themes"
import { Button } from "@/app/[locale]/_components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/[locale]/_components/ui/dropdown-menu"
import { ChangeLocale } from "@/app/[locale]/_components/ChangeLocale"
import { ROUTE_CART, ROUTE_LOGIN } from "@/app/[locale]/_lib/site-map"
import { useTranslation } from "@/app/i18n/client"
import styles from "./Header.module.css"

type THeaderProps = {
  locale: TLocale
}

export function Header({ locale }: THeaderProps) {
  const pathname = usePathname()
  const { t } = useTranslation(locale, "common")
  const { setTheme } = useTheme()
  const [width, setWidth] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", updateWidth)
    updateWidth()
  }, [])

  const updateWidth = () => {
    const newWidth = window.innerWidth
    setWidth(newWidth)
  }

  const openMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen)
  }

  return (
    <header className={`${styles.header}${menuOpen ? ` ${styles.menuOpened}` : ""}`}>
      <div className={styles.menuIconContainer}>
        <div
          className={styles.menuIcon}
          role="button"
          aria-controls="menu"
          aria-expanded={menuOpen ? "true" : "false"}
          onClick={openMenu}
        >
          <div className={styles.menuIconTopBar}></div>
          <div className={styles.menuIconBottomBar}></div>
          <span className="sr-only">{t("app_menu.toggle_menu")}</span>
        </div>
      </div>
      <h1 className={styles.title}>
        <Link
          className={`!text-ecommerce-800 dark:!text-ecommerce-100 ${pathname === `/${locale}` ? "active" : ""}`}
          href={`/${locale}`}
          locale={false}
        >
          E-Commerce
        </Link>
      </h1>
      <ul id="menu" className={styles.menu}>
        <li className={styles.menuItem}>
          <FaMagnifyingGlass className={styles.menuItemIcon} aria-label={t("app_menu.search")} />
          <span className={styles.menuItemLabel}>{t("app_menu.search")}</span>
        </li>
        <li className={styles.menuItem}>
          <Link
            className={`app-menu-link ${pathname === `/${locale}${ROUTE_CART.PATH}` ? "active" : ""}`}
            href={`/${locale}${ROUTE_CART.PATH}`}
            locale={false}
            aria-label={t(ROUTE_CART.TITLE)}
          >
            <FaCartShopping className={styles.menuItemIcon} />
            <span className={styles.menuItemLabel}>{t(ROUTE_CART.TITLE)}</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link
            className={`app-menu-link ${pathname === `/${locale}${ROUTE_LOGIN.PATH}` ? "active" : ""}`}
            href={`/${locale}${ROUTE_LOGIN.PATH}`}
            locale={false}
            aria-label={t(ROUTE_LOGIN.TITLE)}
          >
            <FaUser className={styles.menuItemIcon} />
            <span className={styles.menuItemLabel}>{t(ROUTE_LOGIN.TITLE)}</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <ChangeLocale />
        </li>
        <li className={styles.menuItem}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="inline-flex md:flex hover:!bg-transparent text-foreground" variant="ghost" size="icon">
                <FaSun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 dark:rtl:!scale-x-[-1]" />
                <FaMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 rtl:!scale-x-[-1] transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">{t("theme.toggle_theme")}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-ecommerce-100 dark:bg-ecommerce-900" align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>{t("theme.light")}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>{t("theme.dark")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </header>
  )
}
