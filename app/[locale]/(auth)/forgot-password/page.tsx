import { ForgotPasswordForm } from "@/app/[locale]/(auth)/forgot-password/forgot-password.form"
import { useTranslation } from "@/app/i18n"

const ForgotPasswordPage = async (props: TPage): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, "common")

  return (
    <>
      <h1>{t("site_map.forgot_password")}</h1>
      <ForgotPasswordForm page={props} />
    </>
  )
}

export default ForgotPasswordPage
