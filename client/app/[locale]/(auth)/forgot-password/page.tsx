import { ForgotPasswordForm } from "@/app/[locale]/(auth)/forgot-password/forgot-password.form"
import { useTranslation } from "@/app/i18n"

export default async function ForgotPassword(props: TPage) {
  const { t } = await useTranslation(props.params.locale, ["form"])

  return (
    <>
      <h1>{t("form:forgot_password")}</h1>
      <ForgotPasswordForm page={props} />
    </>
  )
}
