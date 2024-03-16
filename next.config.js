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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ],
  },
}

module.exports = nextConfig
