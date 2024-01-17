import { useTranslation } from "@/app/i18n"

export default async function ForgotPassword({ params }: TPageProps) {
  const { t } = await useTranslation(params.locale, ["common", "authentication"])

  async function sendEmail(formData: FormData): Promise<void> {
    "use server"

    console.log("sendEmail formData=", formData)

    // const rawFormData = {
    //   email: formData.get('email'),
    // }
  }

  return (
    <>
      <h1>{t("authentication:form.forgot_password")}</h1>
      <form
        className="flex flex-col space-y-2 w-authentication-form md:w-authentication-form-md"
        noValidate
        action={sendEmail}
      >
        <label htmlFor="email">{t("authentication:form.label.email")}</label>
        <input type="email" id="email" autoFocus required />
        <button type="submit">{t("authentication:form.button.send_email")}</button>
      </form>
    </>
  )
}
