"use client"

import { useCallback, useEffect, useRef } from "react"
// @ts-ignore
import { useFormState } from "react-dom"
import { useSearchParams } from "next/navigation"
import { verifyEmail } from "@/app/[locale]/(auth)/verify-email/verify-email.actions"
import { Alert } from "@/app/[locale]/_components/Alert"
import { Spinner } from "@/app/[locale]/_components/Spinner"
import { EAlertVariant, EHttpResponseStatus } from "@/app/[locale]/_core"

export const VerifyEmailForm = (props: TFormProps): JSX.Element => {
  const [state, formAction] = useFormState(verifyEmail, undefined)
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = useCallback(() => {
    if (state?.status === EHttpResponseStatus.SUCCESS) return
    formRef.current?.requestSubmit()
  }, [state?.status])

  useEffect(() => {
    handleSubmit()
  }, [handleSubmit])

  return (
    <form
      ref={formRef}
      className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
      noValidate
      action={formAction}
    >
      {!token ? (
        <Alert
          variant={EAlertVariant.ERROR}
          locale={props.page.params.locale}
          message="form:error.token_missing.message"
        />
      ) : state?.status ? (
        <Alert variant={state?.status} locale={props.page.params.locale} message={state?.message} />
      ) : (
        <Spinner />
      )}
      <input type="hidden" id="token" name="token" value={token ?? undefined} />
    </form>
  )
}
