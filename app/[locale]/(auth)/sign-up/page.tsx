import { SignUpForm } from "@/app/[locale]/(auth)/sign-up/sign-up.form"
import { useTranslation } from "@/app/i18n"

const SignUpPage = async (props: TPageProps): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, "common")

  return (
    <>
      <h1>{t("site_map.sign_up")}</h1>
      <SignUpForm page={props} />
    </>
  )
}

export default SignUpPage
