import { SignUpForm } from "@/app/[locale]/(auth)/sign-up/sign-up.form"
import { useTranslation } from "@/app/i18n"

export default async function SignUp({ params }: TPageProps) {
  const { t } = await useTranslation(params.locale, ["form"])

  return (
    <>
      <h1>{t("form:sign_up")}</h1>
      <SignUpForm locale={params.locale} />
    </>
  )
}
