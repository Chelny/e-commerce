import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { dir } from "i18next"
import { config } from "@fortawesome/fontawesome-svg-core"
import { Breadcrumbs } from "@/app/[locale]/_components/Breadcrumbs"
import { Footer } from "@/app/[locale]/_components/Footer"
import { Header } from "@/app/[locale]/_components/Header"
import { supportedLocales } from "@/app/i18n/settings"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "@/app/globals.css"

config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Commerce Application",
  description: "Buy everything at low price!",
}

export async function generateStaticParams() {
  return supportedLocales.map((locale: string) => ({ locale }))
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  return (
    <html lang={params.locale} dir={dir(params.locale)}>
      <body
        className={`${inter.className} grid grid-rows-app bg-ecommerce-100 dark:bg-ecommerce-900 text-ecommerce-800 dark:text-ecommerce-200`}
      >
        <Header locale={params.locale}></Header>
        <main className="overflow-x-hidden flex flex-col">
          <Breadcrumbs locale={params.locale} />
          {children}
        </main>
        <Footer locale={params.locale}></Footer>
      </body>
    </html>
  )
}
