"use client"

import { useFormState, useFormStatus } from "react-dom"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { sendEmail } from "@/app/[locale]/(auth)/forgot-password/forgot-password.actions"
import { useTranslation } from "@/app/i18n/client"

const initialState = {
  message: "",
}

export function ForgotPasswordForm({ locale }: TForm) {
  const { t } = useTranslation(locale, ["form"])
  const [state, formAction] = useFormState(sendEmail, initialState)
  const { pending } = useFormStatus()

  return (
    <form
      className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
      noValidate
      action={formAction}
    >
      <label htmlFor="email">{t("form:label.email")}</label>
      <input
        type="email"
        id="email"
        name="email"
        className={`${state?.errors?.email && "invalid-form-field"}`}
        autoFocus
        required
      />
      <FieldErrorMessage locale={locale} field={state?.errors?.email} />
      <button type="submit" aria-disabled={pending}>
        {t("form:button.send_email")}
      </button>
    </form>
  )
}
