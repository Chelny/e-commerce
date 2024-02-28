import { SignUpForm } from "@/app/[locale]/(auth)/sign-up/sign-up.form"
import { useTranslation } from "@/app/i18n"

export default async function SignUp(props: TPage) {
  const { t } = await useTranslation(props.params.locale, ["form"])

  return (
    <>
      <h1>{t("form:sign_up")}</h1>
      <SignUpForm page={props} />
    </>
  )
}
