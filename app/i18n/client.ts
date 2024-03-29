"use client"

import { useEffect, useState } from "react"
import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import resourcesToBackend from "i18next-resources-to-backend"
import { useCookies } from "react-cookie"
import { initReactI18next, useTranslation as useTranslationOrg, UseTranslationResponse } from "react-i18next"
import { ROUTE_HOME } from "@/app/[locale]/_core"
import { cookieName, getOptions, supportedLocales } from "./settings"

const runsOnServerSide = typeof window === "undefined"

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
  .init({
    ...getOptions(),
    lng: undefined, // Detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? supportedLocales : [],
    load: "currentOnly",
  })

export const useTranslation = (
  locale: TLocale,
  namespaces: string | string[],
  options = {}
): UseTranslationResponse<string[], undefined> => {
  const [cookies, setCookie] = useCookies([cookieName])
  const namespacesArray = Array.isArray(namespaces) ? namespaces : [namespaces]
  const ret = useTranslationOrg(namespacesArray, options)
  const { i18n } = ret

  if (runsOnServerSide && locale && i18n.resolvedLanguage !== locale) {
    i18n.changeLanguage(locale)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return
      setActiveLng(i18n.resolvedLanguage)
    }, [activeLng, i18n.resolvedLanguage])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!locale || i18n.resolvedLanguage === locale) return
      i18n.changeLanguage(locale)
    }, [locale, i18n])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (cookies[cookieName] === locale) return
      setCookie(cookieName, locale, { path: ROUTE_HOME.PATH })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locale, cookies[cookieName]])
  }

  return ret
}
