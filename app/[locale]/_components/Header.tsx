"use client"

import { ForwardedRef, forwardRef, MouseEventHandler, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import * as Avatar from "@radix-ui/react-avatar"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import * as Popover from "@radix-ui/react-popover"
import { signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { FiLogOut, FiMoon, FiSearch, FiSettings, FiShoppingCart, FiSun, FiUser } from "react-icons/fi"
import { LoginForm } from "@/app/[locale]/(auth)/login/login.form"
import { ChangeLocale } from "@/app/[locale]/_components/ChangeLocale"
import { APP, BREAKPOINT_MD, ROUTE_CART, ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_SETTINGS } from "@/app/[locale]/_core"
import { useCurrentUser } from "@/app/[locale]/_hooks"
import { classMerge, nameInitials } from "@/app/[locale]/_lib"
import { useTranslation } from "@/app/i18n/client"
import styles from "./Header.module.css"

type THeaderProps = {
  locale: TLocale
}

type THeaderButtonProps = {
  locale: TLocale
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Header = (props: THeaderProps): JSX.Element => {
  const pathname = usePathname()
  const { t } = useTranslation(props.locale, "common")
  const { theme, setTheme } = useTheme()
  const [width, setWidth] = useState<number>(0)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [accountDropdownOpen, setAccountDropdownOpen] = useState<boolean>(false)
  const authUser = useCurrentUser()
  const router = useRouter()

  const updateWidth = (): void => {
    const newWidth = window.innerWidth
    setWidth(newWidth)
  }

  const openMenu = (): void => {
    setMenuOpen((prevMenuOpen: boolean) => !prevMenuOpen)
  }

  const goToLoginPage = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (width < BREAKPOINT_MD) {
      event.preventDefault()
      router.push(ROUTE_LOGIN.PATH)
    }
  }

  const goToCartPage = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (width < BREAKPOINT_MD) {
      event.preventDefault()
      router.push(ROUTE_CART.PATH)
    }
  }

  const handleClickLogOut = (): void => {
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
            <DropdownMenu.Root open={accountDropdownOpen} onOpenChange={setAccountDropdownOpen}>
              <DropdownMenu.Trigger asChild>
                <button type="button" className="IconButton">
                  <Avatar.Root className="AvatarRoot">
                    <Avatar.Image className="AvatarImage" src={authUser?.image ?? ""} />
                    <Avatar.Fallback className="AvatarFallback">{nameInitials(authUser.name)}</Avatar.Fallback>
                  </Avatar.Root>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className={classMerge("DropdownMenuContent", "min-w-[12rem]")}>
                <DropdownMenu.Arrow className="DropdownMenuArrow" />
                <DropdownMenu.Label>{t("site_map.account")}</DropdownMenu.Label>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Group>
                  <DropdownMenu.Item
                    className={classMerge("DropdownMenuItem", styles.accountMenuItem)}
                    onClick={() => setAccountDropdownOpen(false)}
                  >
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
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className={classMerge("DropdownMenuItem", styles.accountMenuItem)}
                    onClick={() => setAccountDropdownOpen(false)}
                  >
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
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator className="DropdownMenuSeparator" />
                <DropdownMenu.Item
                  className={classMerge("DropdownMenuItem", styles.accountMenuItem)}
                  onClick={handleClickLogOut}
                >
                  <FiLogOut className="me-2 h-4 w-4" />
                  <span>{t("app_menu.log_out")}</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </li>
        ) : (
          <li className={styles.menuItem}>
            <Popover.Root>
              <Popover.Trigger asChild>
                <LoginButton
                  {...props}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => goToLoginPage(event)}
                />
              </Popover.Trigger>
              <Popover.Content className="PopoverContent">
                <Popover.Arrow className="PopoverArrow" />
                <LoginForm page={{ params: props }} />
              </Popover.Content>
            </Popover.Root>
          </li>
        )}
        <li className={styles.menuItem}>
          <Popover.Root>
            <Popover.Trigger asChild>
              <CartButton {...props} onClick={(event: React.MouseEvent<HTMLButtonElement>) => goToCartPage(event)} />
            </Popover.Trigger>
            <Popover.Content className="PopoverContent">
              <Popover.Arrow className="PopoverArrow" />
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
            </Popover.Content>
          </Popover.Root>
        </li>
        <li className={styles.menuItem}>
          <button type="button" className="IconButton">
            <FiSearch className={styles.menuItemIcon} aria-label={t("app_menu.search")} />
            <span className={styles.menuItemLabel}>{t("app_menu.search")}</span>
          </button>
        </li>
        <li className={styles.menuItem}>
          <ChangeLocale />
        </li>
        <li className={styles.menuItem}>
          <button
            type="button"
            className="IconButton"
            onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
          >
            {theme === "dark" ? <FiMoon aria-hidden="true" /> : <FiSun aria-hidden="true" />}
            <span className="sr-only">{t("theme.toggle_theme")}</span>
          </button>
        </li>
      </ul>
    </header>
  )
}

const LoginButton = forwardRef((props: THeaderButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
  const { t } = useTranslation(props.locale, "common")

  return (
    <button
      ref={ref}
      type="button"
      className="IconButton"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => props.onClick(event)}
    >
      <FiUser className={styles.menuItemIcon} />
      <span className={styles.menuItemLabel}>{t(ROUTE_LOGIN.TITLE)}</span>
    </button>
  )
})

LoginButton.displayName = "LoginButton"

const CartButton = forwardRef((props: THeaderButtonProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
  const { t } = useTranslation(props.locale, "common")

  return (
    <button
      ref={ref}
      type="button"
      className="IconButton"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => props.onClick(event)}
    >
      <FiShoppingCart className={styles.menuItemIcon} />
      <span className={styles.menuItemLabel}>{t(ROUTE_CART.TITLE)}</span>
    </button>
  )
})

CartButton.displayName = "CartButton"
