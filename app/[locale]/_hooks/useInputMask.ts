import { Dispatch, SetStateAction, useState } from "react"
import { ECountryCode } from "@/app/[locale]/_core"
import { formatPhoneNumber, formatPostalCode } from "@/app/[locale]/_lib"

export enum EInputType {
  PHONE_NUMBER = "PHONE_NUMBER",
  POSTAL_CODE = "POSTAL_CODE",
}

type TUseInputMaskProps = {
  type: EInputType
  value: string
  countryCode?: ECountryCode | string
  onChange: Dispatch<SetStateAction<string | null | undefined>>
}

export const useInputMask = (props: TUseInputMaskProps) => {
  const [rawValue, setRawValue] = useState<string>(props.value)

  const formattedValue = ((): string => {
    switch (props.type) {
      case EInputType.PHONE_NUMBER:
        return formatPhoneNumber(props.value)
      case EInputType.POSTAL_CODE:
        return formatPostalCode(props.value, props.countryCode)
      default:
        return props.value
    }
  })()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let inputValue = e.target.value

    switch (props.type) {
      case EInputType.PHONE_NUMBER:
        inputValue = inputValue.replace(/[\D]/g, "")
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
    props.onChange(inputValue)
  }

  return { rawValue, formattedValue, handleChange }
}
