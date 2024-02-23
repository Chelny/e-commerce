"use client"

import { useParams, useRouter, useSelectedLayoutSegments } from "next/navigation"

export function ChangeLocale({ className }: { className?: string }) {
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
    <div className={`${className}`}>
      <select className="bg-transparent border-0 px-0" value={params.locale} onChange={handleLocaleChange}>
        <optgroup label="Americas">
          <option value="en-CA">🇨🇦 Canada (English)</option>
          <option value="fr-CA">🇨🇦 Canada (Français)</option>
          <option value="en-US">🇺🇸 United States</option>
        </optgroup>
        <optgroup label="Asia">
          <option value="ar-SA">🇸🇦 Saudi Arabia (عربي)</option>
        </optgroup>
      </select>
    </div>
  )
}
