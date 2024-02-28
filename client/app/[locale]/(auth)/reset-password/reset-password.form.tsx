"use client"

import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { redirect } from "next/navigation"
import { Alert } from "@/app/[locale]/_components/Alert"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { FieldHintMessage } from "@/app/[locale]/_components/FieldHintMessage"
import { EVariant } from "@/app/[locale]/_lib/definition/enums"
import { ROUTE_LOGIN } from "@/app/[locale]/_lib/site-map"
import { useToast } from "@/app/[locale]/_providers/toast-provider"
import { resetPassword } from "@/app/[locale]/(auth)/reset-password/reset-password.actions"
import { useTranslation } from "@/app/i18n/client"

const initialState = {
  message: "",
}

export function ResetPasswordForm(props: TForm) {
  const { t } = useTranslation(props.page.params.locale, ["form"])
  const [state, formAction] = useFormState(resetPassword, initialState)
  const [token, setToken] = useState(props.page?.searchParams.token)
  const { pending } = useFormStatus()
  const { showToast } = useToast()

  useEffect(() => {
    if (!token) redirect(ROUTE_LOGIN.PATH)
    setToken(token)
  }, [token])

  useEffect(() => {
    if (state?.status === EVariant.SUCCESS) {
      showToast(state?.message)
      redirect(ROUTE_LOGIN.PATH)
    }
  }, [state, showToast])

  return (
    <form
      className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
      noValidate
      action={formAction}
    >
      {state?.status && <Alert variant={state?.status} locale={props.page.params.locale} message={state?.message} />}
      <input type="hidden" id="token" name="token" value={token} required />
      <label htmlFor="email">{t("label.email")}</label>
      <input
        type="email"
        id="email"
        name="email"
        className={`${state?.data?.errors?.email ? "invalid" : ""}`}
        autoFocus
        required
      />
      <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.email} />
      <label htmlFor="password">{t("label.password")}</label>
      <input
        type="password"
        id="password"
        name="password"
        className={`${state?.data?.errors?.password ? "invalid" : ""}`}
        required
      />
      <FieldHintMessage locale={props.page.params.locale} keyName="password" />
      <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.password} />
      <label htmlFor="confirmPassword">{t("label.confirm_password")}</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        className={`${state?.data?.errors?.confirmPassword ? "invalid" : ""}`}
        required
      />
      <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.confirmPassword} />
      <button type="submit" disabled={pending}>
        {t("button.reset_password")}
      </button>
    </form>
  )
}
