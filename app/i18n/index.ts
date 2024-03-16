import { createInstance, TFunction } from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import { initReactI18next } from "react-i18next/initReactI18next"
import { getOptions } from "./settings"

const initI18next = async (locale: TLocale, namespaces: string[]): Promise<any> => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(locale, namespaces))
  return i18nInstance
}

const useTranslation = async (
  locale: TLocale,
  namespaces: string | string[],
  options: any = {}
): Promise<{ t: TFunction<string[], any>; i18n: any }> => {
  const namespacesArray = Array.isArray(namespaces) ? namespaces : [namespaces]
  const i18nextInstance = await initI18next(locale, namespacesArray)
  return {
    t: i18nextInstance.getFixedT(locale, namespacesArray, options.keyPrefix),
    i18n: i18nextInstance,
  }
}

export { useTranslation }
