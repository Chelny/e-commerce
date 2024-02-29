"use client"

import { useParams, useRouter, useSelectedLayoutSegments } from "next/navigation"

type TChangeLocale = {
  className?: string
}

export function ChangeLocale(props: TChangeLocale) {
  const router = useRouter()
  const params = useParams()
  const urlSegments = useSelectedLayoutSegments()

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value
    const searchParams = new URLSearchParams(window.location.search)

    // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
    // urlSegments will contain the segments after the locale.
    // We replace the URL with the new locale and the rest of the segments.
    router.push(`/${newLocale}/${urlSegments.slice(1).join("/")}${searchParams.size > 0 ? `?${searchParams}` : ""}`, {
      scroll: false,
    })
  }

  return (
    <div className={`${props.className}`}>
      <select className="bg-transparent border-0 px-0" value={params.locale} onChange={handleLocaleChange}>
        <optgroup label="Americas">
          <option value="en-CA">🇨🇦 Canada - English (CAD $)</option>
          <option value="fr-CA">🇨🇦 Canada - Français (CAD $)</option>
          <option value="en-US">🇺🇸 United States (USD $)</option>
        </optgroup>
        <optgroup label="Asia">
          <option value="ar-SA">🇸🇦 Saudi Arabia - عربي (SAR)</option>
        </optgroup>
      </select>
    </div>
  )
}
