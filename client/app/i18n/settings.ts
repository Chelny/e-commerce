export const defaultLocale = 'en-US'
export const supportedLocales = [defaultLocale, 'en-CA', 'fr-CA']
export const defaultNamespace = 'common'
export const cookieName = 'e_commerce_locale'

export function getOptions(locale: string = defaultLocale, namespaces: string | string[] = defaultNamespace) {
  const namespacesArray = Array.isArray(namespaces) ? namespaces : [namespaces]
  return {
    // debug: true,
    supportedLngs: supportedLocales,
    lng: locale,
    fallbackLng: defaultLocale,
    ns: namespacesArray,
    defaultNS: defaultNamespace,
    fallbackNS: defaultNamespace,
  }
}
