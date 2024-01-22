"use client"

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGN_UP } from "@/app/[locale]/_lib/site-map"
import { login } from "@/app/[locale]/(auth)/login/login.actions"
import { useTranslation } from "@/app/i18n/client"

const initialState = {
  message: "",
}

export function LoginForm({ locale }: TForm) {
  const { t } = useTranslation(locale, ["form"])
  const [state, formAction] = useFormState(login, initialState)
  const { pending } = useFormStatus()

  return (
    <>
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
        <FieldErrorMessage locale={locale} field={state?.errors?.password} />
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
        <button type="submit" aria-disabled={pending}>
          {t("form:login")}
        </button>
        <hr />
      </form>
      <div className="flex justify-center space-x-4 py-4">
        <Link href={`/${locale}${ROUTE_SIGN_UP.PATH}`} aria-label={t(ROUTE_SIGN_UP.TITLE)}>
          {t("form:sign_up")}
        </Link>
        <Link href={`/${locale}${ROUTE_FORGOT_PASSWORD.PATH}`} aria-label={t(ROUTE_FORGOT_PASSWORD.TITLE)}>
          {t("form:forgot_password")}
        </Link>
      </div>
    </>
  )
}
