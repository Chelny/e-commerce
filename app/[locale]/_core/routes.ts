/**************************************************
 * Routes List
 **************************************************/

export const ROUTE_HOME = { TITLE: "site_map.home", PATH: "/" }
export const ROUTE_LOGIN = { TITLE: "site_map.login", PATH: "/login" }
export const ROUTE_SIGN_UP = { TITLE: "site_map.sign_up", PATH: "/sign-up" }
export const ROUTE_VERIFY_EMAIL = { TITLE: "site_map.verify_email", PATH: "/verify-email" }
export const ROUTE_FORGOT_PASSWORD = { TITLE: "site_map.forgot_password", PATH: "/forgot-password" }
export const ROUTE_RESET_PASSWORD = { TITLE: "site_map.reset_password", PATH: "/reset-password" }
export const ROUTE_AUTH_ERROR = { TITLE: "site_map.auth_error", PATH: "/error" }
export const ROUTE_ACCOUNT = { TITLE: "site_map.account", PATH: "/account" }
export const ROUTE_PROFILE = { TITLE: "site_map.profile", PATH: `${ROUTE_ACCOUNT.PATH}/profile` }
export const ROUTE_SETTINGS = { TITLE: "site_map.settings", PATH: `${ROUTE_ACCOUNT.PATH}/settings` }
export const ROUTE_SHOP = { TITLE: "site_map.shop", PATH: "/shop" }
export const ROUTE_NEW_ARRIVALS = { TITLE: "site_map.new_arrivals", PATH: `${ROUTE_SHOP.PATH}/new-arrivals` }
export const ROUTE_POPULAR = { TITLE: "site_map.popular", PATH: `${ROUTE_SHOP.PATH}/popular` }
export const ROUTE_SALE = { TITLE: "site_map.sales", PATH: `${ROUTE_SHOP.PATH}/sales` }
export const ROUTE_CART = { TITLE: "site_map.cart", PATH: "/cart" }
export const ROUTE_CHECKOUT = { TITLE: "site_map.checkout", PATH: "/checkout" }
export const ROUTE_COMPANY = { TITLE: "site_map.company", PATH: "/company" }
export const ROUTE_TEAM = { TITLE: "site_map.team", PATH: "/team" }
export const ROUTE_CAREERS = { TITLE: "site_map.careers", PATH: "/careers" }
export const ROUTE_CONTACT = { TITLE: "site_map.contact", PATH: "/contact" }
export const ROUTE_FAQ = { TITLE: "site_map.faq", PATH: "/faq" }
export const ROUTE_SHIPPING = { TITLE: "site_map.shipping", PATH: "/shipping" }
export const ROUTE_RETURNS = { TITLE: "site_map.returns", PATH: "/returns" }
export const ROUTE_TERMS_OF_SERVICE = { TITLE: "site_map.terms_of_service", PATH: "/terms-of-service" }
export const ROUTE_PRIVACY_POLICY = { TITLE: "site_map.privacy_policy", PATH: "/privacy-policy" }

/**************************************************
 * Authentication
 **************************************************/

export const API_AUTH_PREFIX = "/api/auth"

export const AUTH_ROUTES = [
  ROUTE_LOGIN.PATH,
  ROUTE_SIGN_UP.PATH,
  ROUTE_AUTH_ERROR.PATH,
  ROUTE_FORGOT_PASSWORD.PATH,
  ROUTE_RESET_PASSWORD.PATH,
]

export const PROTECTED_ROUTES = [ROUTE_ACCOUNT.PATH, ROUTE_SETTINGS.PATH]

export const DEFAULT_LOGIN_REDIRECT = ROUTE_HOME.PATH

/**************************************************
 * Site Map
 **************************************************/

export type TSiteMap = {
  title: string
  path: string
  children?: TSiteMap[]
}

export const SITE_MAP = [
  {
    title: ROUTE_HOME.TITLE,
    path: ROUTE_HOME.PATH,
    children: [
      {
        title: ROUTE_LOGIN.TITLE,
        path: ROUTE_LOGIN.PATH,
        children: [
          {
            title: ROUTE_SIGN_UP.TITLE,
            path: ROUTE_SIGN_UP.PATH,
          },
          {
            title: ROUTE_FORGOT_PASSWORD.TITLE,
            path: ROUTE_FORGOT_PASSWORD.PATH,
            children: [
              {
                title: ROUTE_RESET_PASSWORD.TITLE,
                path: ROUTE_RESET_PASSWORD.PATH,
              },
            ],
          },
          {
            title: ROUTE_AUTH_ERROR.TITLE,
            path: ROUTE_AUTH_ERROR.PATH,
          },
        ],
      },
      {
        title: ROUTE_ACCOUNT.TITLE,
        path: ROUTE_ACCOUNT.PATH,
        children: [
          {
            title: ROUTE_PROFILE.TITLE,
            path: ROUTE_PROFILE.PATH,
          },
          {
            title: ROUTE_SETTINGS.TITLE,
            path: ROUTE_SETTINGS.PATH,
          },
        ],
      },
      {
        title: ROUTE_SHOP.TITLE,
        path: ROUTE_SHOP.PATH,
        children: [
          {
            title: ROUTE_NEW_ARRIVALS.TITLE,
            path: ROUTE_NEW_ARRIVALS.PATH,
          },
          {
            title: ROUTE_POPULAR.TITLE,
            path: ROUTE_POPULAR.PATH,
          },
          {
            title: ROUTE_SALE.TITLE,
            path: ROUTE_SALE.PATH,
          },
          // TODO: Get item's name and URL
          // {
          //   title: "site_map.item_name",
          //   path: `${ROUTE_SHOP.PATH}/item/$param`,
          // },
        ],
      },
      {
        title: ROUTE_CART.TITLE,
        path: ROUTE_CART.PATH,
      },
      {
        title: ROUTE_CHECKOUT.TITLE,
        path: ROUTE_CHECKOUT.PATH,
      },
      {
        title: ROUTE_COMPANY.TITLE,
        path: ROUTE_COMPANY.PATH,
      },
      {
        title: ROUTE_TEAM.TITLE,
        path: ROUTE_TEAM.PATH,
      },
      {
        title: ROUTE_CAREERS.TITLE,
        path: ROUTE_CAREERS.PATH,
      },
      {
        title: ROUTE_CONTACT.TITLE,
        path: ROUTE_CONTACT.PATH,
      },
      {
        title: ROUTE_FAQ.TITLE,
        path: ROUTE_FAQ.PATH,
      },
      {
        title: ROUTE_SHIPPING.TITLE,
        path: ROUTE_SHIPPING.PATH,
      },
      {
        title: ROUTE_RETURNS.TITLE,
        path: ROUTE_RETURNS.PATH,
      },
      {
        title: ROUTE_TERMS_OF_SERVICE.TITLE,
        path: ROUTE_TERMS_OF_SERVICE.PATH,
      },
      {
        title: ROUTE_PRIVACY_POLICY.TITLE,
        path: ROUTE_PRIVACY_POLICY.PATH,
      },
    ],
  },
]
