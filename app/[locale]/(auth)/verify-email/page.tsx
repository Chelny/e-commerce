import Link from "next/link"
import { VerifyEmailForm } from "@/app/[locale]/(auth)/verify-email/verify-email.form"
import { ROUTE_LOGIN } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n"

const VerifyEmailPage = async (props: TPageProps) => {
  const { t } = await useTranslation(props.params.locale, "common")

  return (
    <>
      <h1>{t("site_map.verify_email")}</h1>
      <VerifyEmailForm page={props} />
      <Link href={`/${props.params.locale}${ROUTE_LOGIN.PATH}`} locale={false}>
        {t("button.return_login")}
      </Link>
    </>
  )
}

export default VerifyEmailPage
