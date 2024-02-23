"use client"

import { useFormState, useFormStatus } from "react-dom"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { signUp } from "@/app/[locale]/(auth)/sign-up/sign-up.actions"
import { useTranslation } from "@/app/i18n/client"
import { FieldHintMessage } from "@/app/[locale]/_components/FieldHintMessage"

const initialState = {
  message: "",
}

export function SignUpForm({ locale }: TForm) {
  const { t } = useTranslation(locale, ["form"])
  const [state, formAction] = useFormState(signUp, initialState)
  const { pending } = useFormStatus()

  return (
    <form
      className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
      noValidate
      action={formAction}
    >
      <div className="grid md:grid-cols-[1fr_1fr] md:space-x-2 rtl:md:space-x-reverse">
        <div className="flex flex-col">
          <label htmlFor="firstName">{t("form:label.first_name")}</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`${state?.errors?.firstName ? "invalid-form-field" : ""}`}
            autoFocus
            required
          />
          <FieldErrorMessage locale={locale} field={state?.errors?.firstName} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName">{t("form:label.last_name")}</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`${state?.errors?.lastName ? "invalid-form-field" : ""}`}
            required
          />
          <FieldErrorMessage locale={locale} field={state?.errors?.lastName} />
        </div>
      </div>
      <label htmlFor="gender">{t("form:label.gender")}</label>
      <div className="grid md:grid-cols-[1fr_1fr_1fr]">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <label className="radio-button" htmlFor="genderMale">
            <input type="radio" id="genderMale" name="gender" value="M" required />
            {t("form:label.gender_male")}
            <span className={`${state?.errors?.gender ? "invalid-form-field" : ""}`}></span>
          </label>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <label className="radio-button" htmlFor="genderFemale">
            <input type="radio" id="genderFemale" name="gender" value="F" />
            {t("form:label.gender_female")}
            <span className={`${state?.errors?.gender ? "invalid-form-field" : ""}`}></span>
          </label>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <label className="radio-button" htmlFor="genderOther">
            <input type="radio" id="genderOther" name="gender" value="O" />
            {t("form:label.gender_other")}
            <span className={`${state?.errors?.gender ? "invalid-form-field" : ""}`}></span>
          </label>
        </div>
      </div>
      <FieldErrorMessage locale={locale} field={state?.errors?.gender} />
      <label htmlFor="birthDate">{t("form:label.birth_date")}</label>
      <input
        type="date"
        id="birthDate"
        name="birthDate"
        className={`${state?.errors?.birthDate ? "invalid-form-field" : ""}`}
        required
      />
      <FieldHintMessage locale={locale} keyName="birth_date" />
      <FieldErrorMessage locale={locale} field={state?.errors?.birthDate} />
      <label htmlFor="email">{t("form:label.email")}</label>
      <input
        type="email"
        id="email"
        name="email"
        className={`${state?.errors?.email ? "invalid-form-field" : ""}`}
        required
      />
      <FieldErrorMessage locale={locale} field={state?.errors?.email} />
      <div className="grid md:grid-cols-[1fr_1fr] md:space-x-2 rtl:space-x-reverse space-y-2 md:space-y-0">
        <div className="flex flex-col">
          <label htmlFor="password">{t("form:label.password")}</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`${state?.errors?.password ? "invalid-form-field" : ""}`}
            required
          />
          <FieldErrorMessage locale={locale} field={state?.errors?.password} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword">{t("form:label.confirm_password")}</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`${state?.errors?.confirmPassword ? "invalid-form-field" : ""}`}
            required
          />
          <FieldErrorMessage locale={locale} field={state?.errors?.confirmPassword} />
        </div>
      </div>
      <FieldHintMessage locale={locale} keyName="password" />
      <button type="submit" aria-disabled={pending}>
        {t("form:sign_up")}
      </button>
      <p className="text-sm text-gray-500">{t("form:agreement_text")}</p>
    </form>
  )
}
