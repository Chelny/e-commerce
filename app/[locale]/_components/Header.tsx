"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { FaCartShopping, FaMagnifyingGlass, FaMoon, FaSun, FaUser } from "react-icons/fa6"
import { PiSignOutBold } from "react-icons/pi"
import { Avatar } from "@/app/[locale]/_components/Avatar"
import { ChangeLocale } from "@/app/[locale]/_components/ChangeLocale"
import { Button } from "@/app/[locale]/_components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/[locale]/_components/ui/dropdown-menu"
import { ROUTE_CART, ROUTE_LOGIN } from "@/app/[locale]/_core"
import { useCurrentUser } from "@/app/[locale]/_hooks"
import { useTranslation } from "@/app/i18n/client"
import styles from "./Header.module.css"

type THeaderProps = {
  locale: TLocale
}

export const Header = (props: THeaderProps): JSX.Element => {
  const pathname = usePathname()
  const { t } = useTranslation(props.locale, "common")
  const { setTheme } = useTheme()
  const [width, setWidth] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const user = useCurrentUser()

  const updateWidth = () => {
    const newWidth = window.innerWidth
    setWidth(newWidth)
  }

  const openMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen)
  }

  const handleClickSignOut = () => {
    signOut()
  }

  useEffect(() => {
    window.addEventListener("resize", updateWidth)
    updateWidth()
  }, [])

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
      <div className={styles.title}>
        <Link
          className={`!text-ecommerce-800 dark:!text-ecommerce-100 ${pathname === `/${props.locale}` ? "active" : ""}`}
          href={`/${props.locale}`}
          locale={false}
        >
          E-Commerce
        </Link>
      </div>
      <ul id="menu" className={styles.menu}>
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
        <li className={styles.menuItem}>
          <FaMagnifyingGlass className={styles.menuItemIcon} aria-label={t("app_menu.search")} />
          <span className={styles.menuItemLabel}>{t("app_menu.search")}</span>
        </li>
        <li className={styles.menuItem}>
          <Link
            className={pathname === `/${props.locale}${ROUTE_CART.PATH}` ? "active" : ""}
            href={`/${props.locale}${ROUTE_CART.PATH}`}
            locale={false}
            aria-label={t(ROUTE_CART.TITLE)}
          >
            <FaCartShopping className={styles.menuItemIcon} />
            <span className={styles.menuItemLabel}>{t(ROUTE_CART.TITLE)}</span>
          </Link>
        </li>
        {user?.email ? (
          <li className={styles.menuItem}>
            <button type="button" className="p-0 text-foreground" onClick={handleClickSignOut}>
              <PiSignOutBold className={styles.menuItemIcon} />
              <span className={styles.menuItemLabel}>{t("sign_out")}</span>
            </button>
          </li>
        ) : (
          <li className={styles.menuItem}>
            <Link
              className={pathname === `/${props.locale}${ROUTE_LOGIN.PATH}` ? "active" : ""}
              href={`/${props.locale}${ROUTE_LOGIN.PATH}`}
              locale={false}
              aria-label={t(ROUTE_LOGIN.TITLE)}
            >
              <FaUser className={styles.menuItemIcon} />
              <span className={styles.menuItemLabel}>{t(ROUTE_LOGIN.TITLE)}</span>
            </Link>
          </li>
        )}
        {/* <li className={styles.menuItem}>
            <Avatar locale={props.locale} />
        </li> */}
      </ul>
    </header>
  )
}
