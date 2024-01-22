import { LoginForm } from "@/app/[locale]/(auth)/login/login.form"
import { useTranslation } from "@/app/i18n"

export default async function Login({ params }: TPageProps) {
  const { t } = await useTranslation(params.locale, ["form"])

  return (
    <>
      <h1>{t("form:login")}</h1>
      <LoginForm locale={params.locale} />
    </>
  )
}
