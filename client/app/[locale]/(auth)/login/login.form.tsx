"use client"

import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { Alert } from "@/app/[locale]/_components/Alert"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { EVariant } from "@/app/[locale]/_lib/definition/enums"
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGN_UP } from "@/app/[locale]/_lib/site-map"
import { login } from "@/app/[locale]/(auth)/login/login.actions"
import { useTranslation } from "@/app/i18n/client"

const initialState = {
  message: "",
}

export function LoginForm(props: TForm) {
  const { t } = useTranslation(props.page.params.locale, ["form"])
  const [state, formAction] = useFormState(login, initialState)
  const { pending } = useFormStatus()

  return (
    <>
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
        <label htmlFor="password">{t("form:label.password")}</label>
        <input
          type="password"
          id="password"
          name="password"
          className={`${state?.data?.errors?.password || state?.status === EVariant.ERROR ? "invalid" : ""}`}
          required
        />
        <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.password} />
        <button type="submit" disabled={pending}>
          {t("form:login")}
        </button>
        <hr />
      </form>
      <div className="flex justify-center space-x-4 rtl:space-x-reverse py-4">
        <Link href={`/${props.page.params.locale}${ROUTE_SIGN_UP.PATH}`} aria-label={t(ROUTE_SIGN_UP.TITLE)}>
          {t("form:sign_up")}
        </Link>
        <Link
          href={`/${props.page.params.locale}${ROUTE_FORGOT_PASSWORD.PATH}`}
          aria-label={t(ROUTE_FORGOT_PASSWORD.TITLE)}
        >
          {t("form:forgot_password")}
        </Link>
      </div>
    </>
  )
}
