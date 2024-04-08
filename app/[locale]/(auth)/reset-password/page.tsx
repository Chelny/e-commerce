import { ResetPasswordForm } from "@/app/[locale]/(auth)/reset-password/reset-password.form"
import { useTranslation } from "@/app/i18n"

const ResetPasswordPage = async (props: TPageProps): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, "common")

  return (
    <>
      <h1>{t("site_map.reset_password")}</h1>
      <ResetPasswordForm page={props} />
    </>
  )
}

export default ResetPasswordPage
