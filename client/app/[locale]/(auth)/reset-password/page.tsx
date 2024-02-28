import { ResetPasswordForm } from "@/app/[locale]/(auth)/reset-password/reset-password.form"
import { useTranslation } from "@/app/i18n"

export default async function ResetPassword(props: TPage) {
  const { t } = await useTranslation(props.params.locale, ["common", "form"])

  return (
    <>
      <h1>{t("form:reset_password")}</h1>
      <ResetPasswordForm page={props} />
    </>
  )
}
