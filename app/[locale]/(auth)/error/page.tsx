import Link from "next/link"
import { ROUTE_LOGIN } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n"

const AuthErrorPage = async (props: TPage): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, "common")

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-full p-4">
      <h2>{t("page.auth_error.title")}</h2>
      <Link href={`/${props.params.locale}${ROUTE_LOGIN.PATH}`} locale={false}>
        {t("button.return_login")}
      </Link>
    </div>
  )
}

export default AuthErrorPage
