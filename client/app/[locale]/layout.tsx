import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { dir } from "i18next"
import { Breadcrumbs } from "@/app/[locale]/_components/Breadcrumbs"
import { Footer } from "@/app/[locale]/_components/Footer"
import { Header } from "@/app/[locale]/_components/Header"
import { ThemeProvider } from "@/app/[locale]/_providers/theme-provider"
import { ToastProvider } from "@/app/[locale]/_providers/toast-provider"
import { supportedLocales } from "@/app/i18n/settings"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "E-Commerce Website!",
}

export async function generateStaticParams() {
  return supportedLocales.map((locale: TLocale) => ({ locale }))
}

export default function LocaleLayout(props: TLayout) {
  return (
    <html lang={props.params.locale} dir={dir(props.params.locale)} suppressHydrationWarning>
      <body className={`${inter.className} grid grid-rows-app`}>
        <ThemeProvider attribute="class" enableSystem={false} disableTransitionOnChange>
          <ToastProvider>
            <Header locale={props.params.locale}></Header>
            <main className="overflow-x-hidden flex flex-col">
              <Breadcrumbs locale={props.params.locale} />
              {props.children}
            </main>
            <Footer locale={props.params.locale}></Footer>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
