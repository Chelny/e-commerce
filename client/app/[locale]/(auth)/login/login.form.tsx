"use client"

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGN_UP } from "@/app/[locale]/_lib/site-map"
import { login } from "@/app/[locale]/(auth)/login/login.actions"
import { useTranslation } from "@/app/i18n/client"

type TLoginFormProps = {
  locale: string
}

const initialState = {
  message: "",
}

export function LoginForm({ locale }: TLoginFormProps) {
  const { t } = useTranslation(locale, ["common", "authentication"])
  const [state, formAction] = useFormState(login, initialState)
  const { pending } = useFormStatus()

  return (
    <form
      className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
      noValidate
      action={formAction}
    >
      <label htmlFor="email">{t("authentication:form.label.email")}</label>
      <input
        type="email"
        id="email"
        name="email"
        className="invalid:border-2 invalid:border-red-500"
        autoFocus
        required
      />
      <p className="text-red-500">{state?.errors?.email}</p>
      <label htmlFor="password">{t("authentication:form.label.password")}</label>
      <input
        type="password"
        id="password"
        name="password"
        className="invalid:border-2 invalid:border-red-500"
        required
      />
      <p className="text-red-500">{state?.errors?.password}</p>
      <button type="submit" aria-disabled={pending}>
        {t("authentication:form.login")}
      </button>
      <hr />
      <div className="flex justify-center space-x-4 py-4">
        <Link href={`/${locale}${ROUTE_SIGN_UP.PATH}`} aria-label={t(ROUTE_SIGN_UP.TITLE)}>
          {t("authentication:form.sign_up")}
        </Link>
        <Link href={`/${locale}${ROUTE_FORGOT_PASSWORD.PATH}`} aria-label={t(ROUTE_FORGOT_PASSWORD.TITLE)}>
          {t("authentication:form.forgot_password")}
        </Link>
      </div>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
