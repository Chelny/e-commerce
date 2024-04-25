"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useParams, useRouter, useSelectedLayoutSegments } from "next/navigation"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { IoLanguage } from "react-icons/io5"
import { classMerge } from "@/app/[locale]/_lib"

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

    // Fix to remove route groups from URL segments
    const filteredSegments = urlSegments.filter((segment: string) => !/\(.*?\)/.test(segment))

    router.push(`/${newLocale}/${filteredSegments.join("/")}${searchParams.size > 0 ? `?${searchParams}` : ""}`, {
      scroll: false,
    })
  }

  useEffect(() => {
    setSelectedLanguage(params.locale as string)
  }, [params.locale, setSelectedLanguage])

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={classMerge(
            "DropdownMenuTriggerButton",
            "flex gap-2 px-4 py-2 text-foreground hover:bg-transparent"
          )}
        >
          <IoLanguage className="h-[1.2rem] w-[1.2rem]" /> <span>{dropdownLabel}</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={classMerge("DropdownMenuContent", "min-w-[8rem]")}>
        <DropdownMenu.Arrow className="DropdownMenuArrow" />
        <DropdownMenu.RadioGroup value={dropdownValue} onValueChange={handleLocaleChange}>
          {dropdownOptions.map((option: TDropdownOptions) => (
            <DropdownMenu.RadioItem key={option.value} className="DropdownMenuRadioItem" value={option.value}>
              {option.label}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
