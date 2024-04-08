"use client"

import { useEffect, useState } from "react"
// @ts-ignore
import { useFormState, useFormStatus } from "react-dom"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { login } from "@/app/[locale]/(auth)/login/login.actions"
import { Alert } from "@/app/[locale]/_components/Alert"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { Social } from "@/app/[locale]/_components/Social"
import { EHttpResponseStatus, ROUTE_FORGOT_PASSWORD, ROUTE_SIGN_UP } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

export const LoginForm = (props: TFormProps): JSX.Element => {
  const { t } = useTranslation(props.page.params.locale, "form")
  const [state, formAction] = useFormState(login, undefined)
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)
  const { pending } = useFormStatus()
  const searchParams = useSearchParams()
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "form:error.duplicate_email.message" : ""

  useEffect(() => {
    if (state?.twoFactor) {
      setShowTwoFactor(true)
    }
  }, [state?.twoFactor])

  return (
    <>
      <form
        className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
        noValidate
        action={formAction}
      >
        {(state?.status || urlError) && (
          <Alert variant={state?.status} locale={props.page.params.locale} message={state?.message || urlError} />
        )}

        {/* Login */}
        <div className={!showTwoFactor ? "flex flex-col space-y-2" : "hidden"}>
          <label htmlFor="email">{t("label.email")}</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${state?.data?.errors?.email || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""}`}
            autoFocus
            required
          />
          <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.email} />
          <label htmlFor="password">{t("label.password")}</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`${
              state?.data?.errors?.password || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
            }`}
            required
          />
          <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.password} />
          <div className="flex justify-end">
            <Link
              href={`/${props.page.params.locale}${ROUTE_FORGOT_PASSWORD.PATH}`}
              aria-label={t(ROUTE_FORGOT_PASSWORD.TITLE)}
            >
              {t("forgot_password")}
            </Link>
          </div>
        </div>

        {/* 2FA Code */}
        {showTwoFactor && (
          <>
            <label htmlFor="code">{t("label.code")}</label>
            <input
              type="text"
              id="code"
              name="code"
              className={`${state?.data?.errors?.code || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""}`}
              autoFocus
            />
            <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.code} />
          </>
        )}

        <button type="submit" disabled={pending}>
          {t(`button.${showTwoFactor ? "confirm" : "login"}`)}
        </button>
        <Social />
        <hr />
      </form>
      <div className="flex justify-center mt-8">
        <Link href={`/${props.page.params.locale}${ROUTE_SIGN_UP.PATH}`} aria-label={t(ROUTE_SIGN_UP.TITLE)}>
          {t("sign_up")}
        </Link>
      </div>
    </>
  )
}
