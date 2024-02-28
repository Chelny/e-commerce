"use client"

import { useFormState, useFormStatus } from "react-dom"
import { Alert } from "@/app/[locale]/_components/Alert"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { EVariant } from "@/app/[locale]/_lib/definition/enums"
import { sendEmail } from "@/app/[locale]/(auth)/forgot-password/forgot-password.actions"
import { useTranslation } from "@/app/i18n/client"

const initialState = {
  message: "",
}

export function ForgotPasswordForm(props: TForm) {
  const { t } = useTranslation(props.page.params.locale, ["form"])
  const [state, formAction] = useFormState(sendEmail, initialState)
  const { pending } = useFormStatus()

  return (
    <form
      className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
      noValidate
      action={formAction}
    >
      {state?.status && <Alert variant={state?.status} locale={props.page.params.locale} message={state?.message} />}
      <label htmlFor="email">{t("form:label.email")}</label>
      <input
        type="email"
        id="email"
        name="email"
        className={`${state?.data?.errors?.email || state?.status === EVariant.ERROR ? "invalid" : ""}`}
        autoFocus
        required
      />
      <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.email} />
      <button type="submit" disabled={pending}>
        {t("form:button.send_email")}
      </button>
    </form>
  )
}
