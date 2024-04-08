import { useState } from "react"
import { ECountryCode } from "@/app/[locale]/_core"

export enum EInputType {
  PHONE_NUMBER = "PHONE_NUMBER",
  POSTAL_CODE = "POSTAL_CODE",
}

type TUseInputMaskProps = {
  type: EInputType
  value: string
  countryCode?: ECountryCode | string
}

export const useInputMask = (props: TUseInputMaskProps) => {
  const [rawValue, setRawValue] = useState<string>(props.value)

  const formatPhoneNumber = (input: string): string => {
    return input
      .replace(/^(\d{1})$/, "+$1")
      .replace(/^(\d{1})(\d{1,3})$/, "+$1 ($2)")
      .replace(/^(\d{1})(\d{3})(\d{1,3})$/, "+$1 ($2) $3")
      .replace(/^(\d{1})(\d{3})(\d{3})(\d{1,4})/, "+$1 ($2) $3-$4")
  }

  const formatZipCode = (input: string, countryCode?: string): string => {
    if (countryCode) {
      switch (countryCode) {
        case ECountryCode.CA:
          return input
            .replace(/^([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])$/, "$1")
            .replace(/^([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])(\d)$/, "$1 $2")
            .replace(/^([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])(\d[ABCEGHJ-NPRSTV-Z])$/, "$1 $2")
            .replace(/^([ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z])(\d[ABCEGHJ-NPRSTV-Z]\d)$/, "$1 $2")
        case ECountryCode.US:
          return input
            .replace(/^(?!0{5})(\d{5})(?!-?0{4})$/, "$1")
            .replace(/^(?!0{5})(\d{5})(?!-?0{4})(\d{1,4})$/, "$1-$2")
        default:
          break
      }
    }

    return input
  }

  const formattedValue = ((): string => {
    switch (props.type) {
      case EInputType.PHONE_NUMBER:
        return formatPhoneNumber(rawValue)
      case EInputType.POSTAL_CODE:
        return formatZipCode(rawValue, props.countryCode)
      default:
        return rawValue
    }
  })()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value

    switch (props.type) {
      case EInputType.PHONE_NUMBER:
        inputValue = inputValue.replace(/\D/g, "")
        break
      case EInputType.POSTAL_CODE:
        switch (props.countryCode) {
          case ECountryCode.CA:
            // Raw value: A9A9A9
            inputValue = inputValue.toUpperCase().replace(/[\W_]/g, "")
            break
          case ECountryCode.US:
            // Raw value: 99999 OR 99999-9999
            inputValue = inputValue.replace(/^(?!0{5})(\d{5})(?!-?0{4})(\d{1,})/, "$1-$2")
            break
          default:
            inputValue = e.target.value
            break
        }
        break
      default:
        inputValue = e.target.value
        break
    }

    setRawValue(inputValue)
  }

  return { rawValue, formattedValue, handleChange }
}
