import { useTranslation } from "@/app/i18n"

export default async function ResetPassword({ params, searchParams }: TPageProps) {
  const { t } = await useTranslation(params.locale, ["common", "form"])

  async function resetPassword(formData: FormData): Promise<void> {
    "use server"

    console.log("resetPassword formData=", formData)

    // const rawFormData = {
    //   email: formData.get('email'),
    //   password: formData.get('password'),
    // }
  }

  return (
    <>
      <h1>{t("form:reset_password")}</h1>
      <form
        className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
        noValidate
        action={resetPassword}
      >
        <label htmlFor="email">{t("form:label.email")}</label>
        <input type="email" id="email" autoFocus required />
        <label htmlFor="password">{t("form:label.password")}</label>
        <input type="password" id="password" required />
        <label htmlFor="confirmPassword">{t("form:label.confirm_password")}</label>
        <input type="password" id="confirmPassword" required />
        <button type="submit">{t("form:button.reset_password")}</button>
      </form>
    </>
  )
}
