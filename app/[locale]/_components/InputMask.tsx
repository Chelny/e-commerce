import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { ECountryCode } from "@/app/[locale]/_core"
import { EInputType, useInputMask } from "@/app/[locale]/_hooks"

type TInputMaskProps = {
  type: EInputType
  name: string
  className: string
  value: string
  countryCode?: ECountryCode | string
  onChange: Dispatch<SetStateAction<string | null | undefined>>
}

export const InputMask = (props: TInputMaskProps): JSX.Element => {
  const [inputType, setInputType] = useState<string>("text")
  const { rawValue, formattedValue, handleChange } = useInputMask({ ...props, onChange: props.onChange })

  useEffect(() => {
    switch (props.type) {
      case EInputType.PHONE_NUMBER:
        setInputType("tel")
        break
      default:
        setInputType("text")
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleChange({ target: { value: props.value } } as ChangeEvent<HTMLInputElement>)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value, props.countryCode])

  return (
    <>
      <input
        type={inputType}
        id={props.name}
        className={props.className}
        value={formattedValue}
        onChange={handleChange}
      />
      <input type="hidden" name={props.name} value={rawValue} onChange={handleChange} />
    </>
  )
}
