"use client"

// @ts-ignore
import { useFormState, useFormStatus } from "react-dom"
import { useSearchParams } from "next/navigation"
import { resetPassword } from "@/app/[locale]/(auth)/reset-password/reset-password.actions"
import { Alert } from "@/app/[locale]/_components/Alert"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { FieldHintMessage } from "@/app/[locale]/_components/FieldHintMessage"
import { EAlertVariant } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

export const ResetPasswordForm = (props: TFormProps): JSX.Element => {
  const { t } = useTranslation(props.page.params.locale, "form")
  const [state, formAction] = useFormState(resetPassword, undefined)
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { pending } = useFormStatus()

  return (
    <form
      className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
      noValidate
      action={formAction}
    >
      {!token && (
        <Alert
          variant={EAlertVariant.ERROR}
          locale={props.page.params.locale}
          message="form:error.token_missing.message"
        />
      )}
      {state?.status && <Alert variant={state?.status} locale={props.page.params.locale} message={state?.message} />}

      <input type="hidden" id="token" name="token" value={token ?? undefined} required />
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
