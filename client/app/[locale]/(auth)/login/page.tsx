import Link from "next/link"
import { ROUTE_FORGOT_PASSWORD, ROUTE_SIGN_UP } from "@/app/[locale]/lib/site-map"
import { useTranslation } from "@/app/i18n"

export default async function Login({ params }: TPageProps) {
  const { t } = await useTranslation(params.locale, ["common", "authentication"])

  async function login(formData: FormData): Promise<void> {
    "use server"

    console.log("login formData=", formData)

    // const rawFormData = {
    //   email: formData.get('email'),
    //   password: formData.get('password'),
    // }
  }

  return (
    <>
      <h1>{t("authentication:form.login")}</h1>
      <form
        className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
        noValidate
        action={login}
      >
        <label htmlFor="email">{t("authentication:form.label.email")}</label>
        <input type="email" id="email" autoFocus required />
        <label htmlFor="password">{t("authentication:form.label.password")}</label>
        <input type="password" id="password" required />
        <button type="submit">{t("authentication:form.login")}</button>
        <hr />
        <div className="flex justify-center space-x-4 py-4">
          <Link href={`/${params.locale}${ROUTE_SIGN_UP.PATH}`} aria-label={t(ROUTE_SIGN_UP.TITLE)}>
            {t("authentication:form.sign_up")}
          </Link>
          <Link href={`/${params.locale}${ROUTE_FORGOT_PASSWORD.PATH}`} aria-label={t(ROUTE_FORGOT_PASSWORD.TITLE)}>
            {t("authentication:form.forgot_password")}
          </Link>
        </div>
      </form>
    </>
  )
}
