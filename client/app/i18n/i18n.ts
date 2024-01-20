import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"
import { z } from "zod"
import { zodI18nMap } from "zod-i18n-map"
import zodTranslationEN from "zod-i18n-map/locales/en/zod.json"
import zodTranslationFR from "zod-i18n-map/locales/fr/zod.json"
import { defaultLocale, defaultNamespace, supportedLocales } from "@/app/i18n/settings"

i18n
  // Load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // Learn more: https://github.com/i18next/i18next-http-backend
  // Want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // Detect user language
  // Learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  // For all options read: https://www.i18next.com/overview/configuration-options
  .init({
    supportedLngs: supportedLocales,
    fallbackLng: defaultLocale,
    ns: defaultNamespace,
    defaultNS: defaultNamespace,
    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },
    resources: {
      "en-US": { zod: zodTranslationEN },
      "en-CA": { zod: zodTranslationEN },
      "fr-CA": { zod: zodTranslationFR },
    },
  })

z.setErrorMap(zodI18nMap)

export default i18n
