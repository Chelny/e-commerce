"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams, useRouter, useSelectedLayoutSegments } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import { IoLanguage } from "react-icons/io5"
import { Button } from "@/app/[locale]/_components/ui/button"

type TDropdownOptions = {
  label: string
  value: string
}

export const ChangeLocale = (): JSX.Element => {
  const router = useRouter()
  const params = useParams()
  const urlSegments = useSelectedLayoutSegments()
  const [dropdownLabel, setDropdownLabel] = useState<string>("")
  const [dropdownValue, setDropdownValue] = useState<string>("")

  const dropdownOptions = useMemo(() => {
    return [
      { label: "English - USA 🇺🇸", value: "en-US" },
      { label: "English - Canada 🇨🇦", value: "en-CA" },
      { label: "Français - Canada 🇨🇦", value: "fr-CA" },
      { label: "عربي - Saudi Arabia 🇸🇦", value: "ar-SA" },
    ]
  }, [])

  const setSelectedLanguage = useCallback(
    (locale: string) => {
      const selectedLanguage = dropdownOptions.find((option: TDropdownOptions) => option.value === locale)

      if (selectedLanguage) {
        setDropdownLabel(selectedLanguage.label)
        setDropdownValue(selectedLanguage.value)
      } else {
        setDropdownLabel(dropdownOptions[0].label)
        setDropdownValue(dropdownOptions[0].value)
      }
    },
    [dropdownOptions]
  )

  const handleLocaleChange = (newLocale: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    setSelectedLanguage(newLocale)

    // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
    // urlSegments will contain the segments after the locale.
    // We replace the URL with the new locale and the rest of the segments.
    router.push(`/${newLocale}/${urlSegments.join("/")}${searchParams.size > 0 ? `?${searchParams}` : ""}`, {
      scroll: false,
    })
  }

  useEffect(() => {
    setSelectedLanguage(params.locale as string)
  }, [params.locale, setSelectedLanguage])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-2 text-foreground hover:bg-transparent" variant="ghost">
          <IoLanguage className="h-[1.2rem] w-[1.2rem]" /> <span>{dropdownLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background rounded-md p-4">
        <DropdownMenuRadioGroup value={dropdownValue} onValueChange={handleLocaleChange}>
          {dropdownOptions.map((option: TDropdownOptions) => (
            <DropdownMenuRadioItem key={option.value} className="py-2 hover:cursor-pointer" value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
