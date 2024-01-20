import { headers } from "next/headers"
import Link from "next/link"
import { ROUTE_HOME } from "@/app/[locale]/_lib/site-map"

export default function NotFound() {
  const headersList = headers()
  const locale = headersList.get("locale")

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource locale={locale}</p>
      {/* <Link href={`/${locale}${ROUTE_HOME.PATH}`} aria-label={t(ROUTE_HOME.TITLE)}>Return Home</Link> */}
      <Link href={`/${locale}${ROUTE_HOME.PATH}`}>Return Home</Link>
    </div>
  )
}
