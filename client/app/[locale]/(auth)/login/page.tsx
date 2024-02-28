import { LoginForm } from "@/app/[locale]/(auth)/login/login.form"
import { useTranslation } from "@/app/i18n"

export default async function Login(props: TPage) {
  const { t } = await useTranslation(props.params.locale, ["form"])

  return (
    <>
      <h1>{t("form:login")}</h1>
      <LoginForm page={props} />
    </>
  )
}
