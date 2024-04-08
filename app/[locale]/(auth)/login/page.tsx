import { LoginForm } from "@/app/[locale]/(auth)/login/login.form"
import { useTranslation } from "@/app/i18n"

const LoginPage = async (props: TPageProps): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, "common")

  return (
    <>
      <h1>{t("site_map.login")}</h1>
      <LoginForm page={props} />
    </>
  )
}

export default LoginPage
