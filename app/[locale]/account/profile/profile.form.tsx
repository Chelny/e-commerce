"use client"

import { ChangeEvent, useCallback, useEffect, useState } from "react"
// @ts-ignore
import { useFormState, useFormStatus } from "react-dom"
import Image from "next/image"
import { Gender } from "@prisma/client"
import { Alert } from "@/app/[locale]/_components/Alert"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { FieldHintMessage } from "@/app/[locale]/_components/FieldHintMessage"
import { InputMask } from "@/app/[locale]/_components/InputMask"
import {
  CANADA_PROVINCES,
  COUNTRIES,
  ECountryCode,
  EHttpResponseStatus,
  EOAuthProvider,
  US_STATES,
} from "@/app/[locale]/_core"
import { EInputType, useCurrentUser } from "@/app/[locale]/_hooks"
import { formatDate } from "@/app/[locale]/_lib"
import { getProfile, updateProfile } from "@/app/[locale]/account/profile/profile.actions"
import { useTranslation } from "@/app/i18n/client"

export const ProfileForm = (props: TFormProps): JSX.Element => {
  const { t } = useTranslation(props.page.params.locale, "form")
  const [state, formAction] = useFormState(updateProfile, undefined)
  const { pending } = useFormStatus()
  const authUser = useCurrentUser()
  const [id, setId] = useState<string | null | undefined>(undefined)
  const [image, setImage] = useState<string | null | undefined>(undefined)
  const [name, setName] = useState<string | null | undefined>(undefined)
  const [firstName, setFirstName] = useState<string | null | undefined>(undefined)
  const [lastName, setLastName] = useState<string | null | undefined>(undefined)
  const [gender, setGender] = useState<string | null | undefined>(undefined)
  const [birthDate, setBirthDate] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null | undefined>(undefined)
  const [addressLine1, setAddressLine1] = useState<string | null | undefined>(undefined)
  const [addressLine2, setAddressLine2] = useState<string | null | undefined>(undefined)
  const [city, setCity] = useState<string | null | undefined>(undefined)
  const [countryState, setCountryState] = useState<string | null | undefined>(undefined)
  const [country, setCountry] = useState<string | null | undefined>(undefined)
  const [postalCode, setPostalCode] = useState<string | null | undefined>(undefined)
  const [phoneNumber, setPhoneNumber] = useState<string | null | undefined>(undefined)
  const [provider, setProvider] = useState<string | null | undefined | EOAuthProvider>(undefined)
  const [stateOptions, setStateOptions] = useState<string[]>([])

  const fetchData = useCallback(async () => {
    if (authUser?.id) {
      const response = await getProfile(authUser.id)
      const data = response.data
      setId(data?.id)
      setName(data?.name)
      setFirstName(data?.first_name)
      setLastName(data?.last_name)
      setGender(data?.gender)
      setBirthDate(formatDate(data?.birth_date))
      setEmail(data?.email)
      setImage(data?.image)
      setProvider(data?.accounts.length !== 0 ? data?.accounts[0].provider : EOAuthProvider.CREDENTIALS)
      setAddressLine1(data?.user_address?.address_line1)
      setAddressLine2(data?.user_address?.address_line2)
      setCity(data?.user_address?.city)
      setCountryState(data?.user_address?.state)
      setCountry(data?.user_address?.country)
      setPostalCode(data?.user_address?.postal_code)
      setPhoneNumber(data?.user_address?.phone_number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    switch (country) {
      case ECountryCode.CA:
        setStateOptions(CANADA_PROVINCES)
        break
      case ECountryCode.US:
        setStateOptions(US_STATES)
        break
      default:
        setStateOptions([])
        break
    }
  }, [country])

  return (
    <form className="flex flex-col w-account-form md:w-account-form-md" noValidate action={formAction}>
      {state?.status && <Alert variant={state?.status} locale={props.page.params.locale} message={state?.message} />}

      <div className="flex flex-col space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
        {/* Personal Information */}
        <div className="flex flex-col">
          <input type="hidden" id="id" name="id" value={id ?? ""} readOnly />

          <h2 className="my-4">{t("personal_information")}</h2>

          {/* TODO: Image */}
          {/* <Image src={image ?? ""} width={200} height={200} alt={email ?? ""} /> */}
          {/* <input type="file" id="image" name="image" value={image ?? ""} onChange={(e) => setImage(e.target.files && e.target.files[0].filename)} readOnly={provider !== EOAuthProvider.CREDENTIALS} /> */}

          {provider !== EOAuthProvider.CREDENTIALS ? (
            <>
              <label htmlFor="name">{t("label.name")}</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`${
                  state?.data?.errors?.name || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
                }`}
                value={name ?? ""}
                readOnly
                required
              />
              <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.name} />
            </>
          ) : (
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
                  value={firstName ?? ""}
                  autoFocus
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
                  value={lastName ?? ""}
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                />
                <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.last_name} />
              </div>
            </div>
          )}

          <label htmlFor="gender">{t("label.gender")}</label>
          <div className="grid md:grid-cols-[1fr_1fr_1fr]">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <label className="radio-button" htmlFor="genderMale">
                <input
                  type="radio"
                  id="genderMale"
                  name="gender"
                  value={Gender.M}
                  checked={gender === Gender.M}
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                />
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
                <input
                  type="radio"
                  id="genderFemale"
                  name="gender"
                  value={Gender.F}
                  checked={gender === Gender.F}
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                />
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
                <input
                  type="radio"
                  id="genderOther"
                  name="gender"
                  value={Gender.X}
                  checked={gender === Gender.X}
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                />
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
            className={`${
              state?.data?.errors?.birth_date || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
            }`}
            value={birthDate ?? ""}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setBirthDate(e.target.value)}
          />
          <FieldHintMessage locale={props.page.params.locale} keyName="birth_date" />
          <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.birth_date} />
        </div>

        {/* Login Information */}
        <div className="flex flex-col">
          <h2 className="my-4">{t("login_information")}</h2>

          <label htmlFor="email">{t("label.email")}</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${state?.data?.errors?.email || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""}`}
            value={email ?? ""}
            readOnly={provider !== EOAuthProvider.CREDENTIALS}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.email} />

          {provider === EOAuthProvider.CREDENTIALS && (
            <>
              <label htmlFor="password">{t("label.current_password")}</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className={`${
                  state?.data?.errors?.current_password || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
                }`}
                autoComplete="new-password"
              />
              <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.current_password} />

              <div className="grid md:grid-cols-[1fr_1fr] md:space-x-2 rtl:space-x-reverse space-y-2 md:space-y-0">
                <div className="flex flex-col">
                  <label htmlFor="password">{t("label.new_password")}</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`${
                      state?.data?.errors?.password || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
                    }`}
                    autoComplete="new-password"
                  />
                  <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.password} />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="confirmPassword">{t("label.confirm_new_password")}</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`${
                      state?.data?.errors?.confirm_password || state?.status === EHttpResponseStatus.ERROR
                        ? "invalid"
                        : ""
                    }`}
                  />
                  <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.confirm_password} />
                </div>
              </div>
              <FieldHintMessage locale={props.page.params.locale} keyName="password" />
            </>
          )}
        </div>

        {/* Contact Information */}
        <div className="flex flex-col">
          <h2 className="my-4">{t("contact_information")}</h2>

          <div className="grid md:grid-cols-[2fr_1fr] md:space-x-2 rtl:md:space-x-reverse space-y-2 md:space-y-0">
            <div className="flex flex-col">
              <label htmlFor="addressLine1">{t("label.address_line1")}</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                className={`${
                  state?.data?.errors?.address_line1 || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
                }`}
                value={addressLine1 ?? ""}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAddressLine1(e.target.value)}
              />
              <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.address_line1} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="addressLine2">{t("label.address_line2")}</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                className={`${
                  state?.data?.errors?.address_line2 || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
                }`}
                value={addressLine2 ?? ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAddressLine2(e.target.value)}
              />
              <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.address_line2} />
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_1fr] md:space-x-2 rtl:md:space-x-reverse  space-y-2 md:space-y-0">
            <div className="flex flex-col">
              <label htmlFor="country">{t("label.country")}</label>
              <select
                id="country"
                name="country"
                className={`${
                  state?.data?.errors?.country || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
                }`}
                value={country ?? ""}
                required
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setCountry(e.target.value)}
              >
                <option value="">{t("placeholder.country")}</option>
                {COUNTRIES.map((code: string) => (
                  <option key={code} value={code}>
                    {t(`countries.${code}.country`)}
                  </option>
                ))}
              </select>
              <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.country} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="state">{t("label.state")}</label>
              <select
                id="state"
                name="state"
                className={`${
                  state?.data?.errors?.state || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
                }`}
                value={countryState ?? ""}
                required
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setCountryState(e.target.value)}
              >
                <option value="">{t("placeholder.state")}</option>
                {stateOptions.map((code: string) => (
                  <option key={code} value={code}>
                    {t(`countries.${country}.regions.${code}`)}
                  </option>
                ))}
              </select>
              <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.state} />
            </div>
          </div>

          <div className="grid md:grid-cols-[2fr_1fr] md:space-x-2 rtl:md:space-x-reverse space-y-2 md:space-y-0">
            <div className="flex flex-col">
              <label htmlFor="city">{t("label.city")}</label>
              <input
                type="text"
                id="city"
                name="city"
                className={`${
                  state?.data?.errors?.city || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
                }`}
                value={city ?? ""}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
              />
              <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.city} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="postalCode">{t("label.postal_code")}</label>
              <InputMask
                type={EInputType.POSTAL_CODE}
                name="postalCode"
                className={`${
                  state?.data?.errors?.postal_code || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
                }`}
                value={postalCode ?? ""}
                countryCode={country ?? ""}
                onChange={setPostalCode}
              />
              <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.postal_code} />
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_1fr]">
            <div className="flex flex-col">
              <label htmlFor="phoneNumber">{t("label.phone_number")}</label>
              <InputMask
                type={EInputType.PHONE_NUMBER}
                name="phoneNumber"
                className={`${
                  state?.data?.errors?.phone_number || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
                }`}
                value={phoneNumber ?? ""}
                onChange={setPhoneNumber}
              />
              <FieldHintMessage locale={props.page.params.locale} keyName="phone_number" />
              <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.phone_number} />
            </div>
          </div>
        </div>
      </div>

      <button type="submit" disabled={pending}>
        {t("button.update")}
      </button>
    </form>
  )
}
