/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    // locales: ["en-US", "en-CA", "fr-CA"],
    locales: ["en", "fr"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    // defaultLocale: "en-US",
    defaultLocale: "en",
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    domains: ["picsum.photos"],
  },
}

module.exports = nextConfig
