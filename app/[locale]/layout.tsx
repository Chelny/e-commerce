import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { dir } from "i18next"
import { SessionProvider } from "next-auth/react"
import { Breadcrumbs } from "@/app/[locale]/_components/Breadcrumbs"
import { Footer } from "@/app/[locale]/_components/Footer"
import { Header } from "@/app/[locale]/_components/Header"
import { auth } from "@/app/[locale]/_lib"
import { ThemeProvider, ToastProvider } from "@/app/[locale]/_providers"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "E-Commerce Website!",
}

const LocaleLayout = async (props: TLayoutProps): Promise<JSX.Element> => {
  const session = await auth()

  return (
    <html lang={props.params.locale} dir={dir(props.params.locale)} suppressHydrationWarning>
      <body className={`${inter.className} grid grid-rows-app`}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ToastProvider locale={props.params.locale}>
              <Header locale={props.params.locale}></Header>
              <main className="overflow-x-hidden flex flex-col">
                <Breadcrumbs locale={props.params.locale} />
                {props.children}
              </main>
              <Footer locale={props.params.locale}></Footer>
            </ToastProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
