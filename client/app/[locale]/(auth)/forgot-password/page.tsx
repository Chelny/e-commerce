import { ForgotPasswordForm } from "@/app/[locale]/(auth)/forgot-password/forgot-password.form"
import { useTranslation } from "@/app/i18n"

export default async function ForgotPassword({ params }: TPageProps) {
  const { t } = await useTranslation(params.locale, ["form"])

  return (
    <>
      <h1>{t("form:forgot_password")}</h1>
      <ForgotPasswordForm locale={params.locale} />
    </>
  )
}
