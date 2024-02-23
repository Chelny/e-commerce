import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { dir } from "i18next"
import { Breadcrumbs } from "@/app/[locale]/_components/Breadcrumbs"
import { Footer } from "@/app/[locale]/_components/Footer"
import { Header } from "@/app/[locale]/_components/Header"
import { supportedLocales } from "@/app/i18n/settings"
import { ThemeProvider } from "@/app/[locale]/_providers/theme-provider"
import "@/app/globals.css"

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
    <html lang={params.locale} dir={dir(params.locale)} suppressHydrationWarning>
      <body className={`${inter.className} grid grid-rows-app`}>
        <ThemeProvider attribute="class" enableSystem={false} disableTransitionOnChange>
          <Header locale={params.locale}></Header>
          <main className="overflow-x-hidden flex flex-col">
            <Breadcrumbs locale={params.locale} />
            {children}
          </main>
          <Footer locale={params.locale}></Footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
