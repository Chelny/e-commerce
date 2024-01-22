import { ResetPasswordForm } from "@/app/[locale]/(auth)/reset-password/reset-password.form"
import { useTranslation } from "@/app/i18n"

export default async function ResetPassword({ params, searchParams }: TPageProps) {
  const { t } = await useTranslation(params.locale, ["common", "form"])

  return (
    <>
      <h1>{t("form:reset_password")}</h1>
      <ResetPasswordForm locale={params.locale} />
    </>
  )
}
