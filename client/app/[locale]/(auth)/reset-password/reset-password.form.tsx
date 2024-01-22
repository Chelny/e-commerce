"use client"

import { useFormState, useFormStatus } from "react-dom"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { FieldHintMessage } from "@/app/[locale]/_components/FieldHintMessage"
import { resetPassword } from "@/app/[locale]/(auth)/reset-password/reset-password.actions"
import { useTranslation } from "@/app/i18n/client"

const initialState = {
  message: "",
}

export function ResetPasswordForm({ locale }: TForm) {
  const { t } = useTranslation(locale, ["form"])
  const [state, formAction] = useFormState(resetPassword, initialState)
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
      <label htmlFor="password">{t("form:label.password")}</label>
      <input
        type="password"
        id="password"
        name="password"
        className={`${state?.errors?.password && "invalid-form-field"}`}
        required
      />
      <FieldHintMessage locale={locale} keyName="password" />
      <FieldErrorMessage locale={locale} field={state?.errors?.password} />
      <label htmlFor="confirmPassword">{t("form:label.confirm_password")}</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        className={`${state?.errors?.confirmPassword && "invalid-form-field"}`}
        required
      />
      <FieldErrorMessage locale={locale} field={state?.errors?.confirmPassword} />
      <button type="submit" aria-disabled={pending}>
        {t("form:button.reset_password")}
      </button>
    </form>
  )
}
