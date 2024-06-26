"use client"

// @ts-ignore
import { useFormState, useFormStatus } from "react-dom"
import { Gender } from "@prisma/client"
import { signUp } from "@/app/[locale]/(auth)/sign-up/sign-up.actions"
import { Alert } from "@/app/[locale]/_components/Alert"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { FieldHintMessage } from "@/app/[locale]/_components/FieldHintMessage"
import { EHttpResponseStatus } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"

export const SignUpForm = (props: TFormProps): JSX.Element => {
  const { t } = useTranslation(props.page.params.locale, "form")
  const [state, formAction] = useFormState(signUp, undefined)
  const { pending } = useFormStatus()

  return (
    <form
      className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
      noValidate
      action={formAction}
    >
      {state?.status && <Alert variant={state?.status} locale={props.page.params.locale} message={state?.message} />}
      <div className="grid md:grid-cols-[1fr_1fr] md:space-x-2 rtl:md:space-x-reverse space-y-2 md:space-y-0">
        <div className="flex flex-col">
          <label htmlFor="firstName">{t("label.first_name")}</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`${
              state?.data?.errors?.first_name || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
            }`}
            autoFocus
            required
          />
          <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.first_name} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName">{t("label.last_name")}</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`${
              state?.data?.errors?.last_name || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
            }`}
            required
          />
          <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.last_name} />
        </div>
      </div>

      <label htmlFor="gender">{t("label.gender")}</label>
      <div className="grid md:grid-cols-[1fr_1fr_1fr]">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <label className="radio-button" htmlFor="genderMale">
            <input type="radio" id="genderMale" name="gender" value={Gender.M} required />
            {t("label.gender_male")}
            <span
              className={`${
                state?.data?.errors?.gender || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
              }`}
            ></span>
          </label>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <label className="radio-button" htmlFor="genderFemale">
            <input type="radio" id="genderFemale" name="gender" value={Gender.F} />
            {t("label.gender_female")}
            <span
              className={`${
                state?.data?.errors?.gender || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
              }`}
            ></span>
          </label>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <label className="radio-button" htmlFor="genderOther">
            <input type="radio" id="genderOther" name="gender" value={Gender.X} />
            {t("label.gender_other")}
            <span
              className={`${
                state?.data?.errors?.gender || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
              }`}
            ></span>
          </label>
        </div>
      </div>
      <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.gender} />

      <label htmlFor="birthDate">{t("label.birth_date")}</label>
      <input
        type="date"
        id="birthDate"
        name="birthDate"
        className={`${state?.data?.errors?.birth_date || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""}`}
        required
      />
      <FieldHintMessage locale={props.page.params.locale} keyName="birth_date" />
      <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.birth_date} />

      <label htmlFor="email">{t("label.email")}</label>
      <input
        type="email"
        id="email"
        name="email"
        className={`${state?.data?.errors?.email || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""}`}
        required
      />
      <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.email} />

      <div className="grid md:grid-cols-[1fr_1fr] md:space-x-2 rtl:space-x-reverse space-y-2 md:space-y-0">
        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword">{t("label.confirm_password")}</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`${
              state?.data?.errors?.confirm_password || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
            }`}
            required
          />
          <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.confirm_password} />
        </div>
      </div>
      <FieldHintMessage locale={props.page.params.locale} keyName="password" />

      <button type="submit" disabled={pending}>
        {t("button.sign_up")}
      </button>

      <p className="text-sm text-gray-500">{t("agreement_text")}</p>
    </form>
  )
}
