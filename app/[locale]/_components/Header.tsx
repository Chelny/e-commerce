"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { FiLogOut, FiMoon, FiSearch, FiSettings, FiShoppingCart, FiSun, FiUser } from "react-icons/fi"
import { LoginForm } from "@/app/[locale]/(auth)/login/login.form"
import { ChangeLocale } from "@/app/[locale]/_components/ChangeLocale"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/[locale]/_components/ui/avatar"
import { Button } from "@/app/[locale]/_components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/[locale]/_components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/[locale]/_components/ui/popover"
import { APP, ROUTE_CART, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_SETTINGS } from "@/app/[locale]/_core"
import { useCurrentUser } from "@/app/[locale]/_hooks"
import { nameInitials } from "@/app/[locale]/_lib"
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
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [accountDropdownOpen, setAccountDropdownOpen] = useState<boolean>(false)
  const authUser = useCurrentUser()

  const updateWidth = () => {
    const newWidth = window.innerWidth
    setWidth(newWidth)
  }

  const openMenu = () => {
    setMenuOpen((prevMenuOpen: boolean) => !prevMenuOpen)
  }

  const handleClickLogOut = () => {
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
          {APP.NAME}
        </Link>
      </div>
      <ul id="menu" className={styles.menu}>
        {authUser && authUser.email ? (
          <li className={styles.menuItem}>
            <DropdownMenu open={accountDropdownOpen} onOpenChange={setAccountDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  className="w-6 h-6 mx-4 my-2 rounded-full bg-ecommerce-400 dark:bg-ecommerce-600 text-foreground"
                  variant="ghost"
                >
                  <Avatar>
                    <AvatarImage src={authUser?.image ?? ""} />
                    <AvatarFallback>{nameInitials(authUser.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{t("site_map.account")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className={styles.accountMenuItem} onClick={() => setAccountDropdownOpen(false)}>
                    <FiUser className="me-2 h-4 w-4" />
                    <Link
                      className={`${styles.accountMenuItemLink} ${
                        pathname === `/${props.locale}${ROUTE_PROFILE.PATH}` ? "active" : ""
                      }`}
                      href={`/${props.locale}${ROUTE_PROFILE.PATH}`}
                      locale={false}
                      aria-label={t(ROUTE_PROFILE.TITLE)}
                    >
                      {t("site_map.profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className={styles.accountMenuItem} onClick={() => setAccountDropdownOpen(false)}>
                    <FiSettings className="me-2 h-4 w-4" />
                    <Link
                      className={`${styles.accountMenuItemLink} ${
                        pathname === `/${props.locale}${ROUTE_SETTINGS.PATH}` ? "active" : ""
                      }`}
                      href={`/${props.locale}${ROUTE_SETTINGS.PATH}`}
                      locale={false}
                      aria-label={t(ROUTE_SETTINGS.TITLE)}
                    >
                      {t("site_map.settings")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={styles.accountMenuItem} onClick={handleClickLogOut}>
                  <FiLogOut className="me-2 h-4 w-4" />
                  <span>{t("app_menu.log_out")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ) : (
          <li className={styles.menuItem}>
            <Popover>
              <PopoverTrigger>
                <FiUser className={styles.menuItemIcon} />
                <span className={styles.menuItemLabel}>{t(ROUTE_LOGIN.TITLE)}</span>
              </PopoverTrigger>
              <PopoverContent>
                <LoginForm page={{ params: props }} />
              </PopoverContent>
            </Popover>
          </li>
        )}
        <li className={styles.menuItem}>
          <Popover>
            <PopoverTrigger>
              <FiShoppingCart className={styles.menuItemIcon} />
              <span className={styles.menuItemLabel}>{t(ROUTE_CART.TITLE)}</span>
            </PopoverTrigger>
            <PopoverContent>
              <span>TODO: Implement CartPopover</span>
              <br />
              <Link
                className={pathname === `/${props.locale}${ROUTE_CART.PATH}` ? "active" : ""}
                href={`/${props.locale}${ROUTE_CART.PATH}`}
                locale={false}
                aria-label={t(ROUTE_CART.TITLE)}
              >
                {t("view_cart")}
              </Link>
            </PopoverContent>
          </Popover>
        </li>
        <li className={styles.menuItem}>
          <div className={styles.iconContainer}>
            <FiSearch className={styles.menuItemIcon} aria-label={t("app_menu.search")} />
            <span className={styles.menuItemLabel}>{t("app_menu.search")}</span>
          </div>
        </li>
        <li className={styles.menuItem}>
          <ChangeLocale />
        </li>
        <li className={styles.menuItem}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="inline-flex md:flex hover:!bg-transparent text-foreground" variant="ghost" size="icon">
                <FiSun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0 dark:rtl:!scale-x-[-1]" />
                <FiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 rtl:!scale-x-[-1] transition-all dark:rotate-0 dark:scale-100" />
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
