import { useTranslation } from "@/app/i18n"

const TermsOfServicePage = async (props: TPageProps): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, ["common", "legal"])

  return (
    <>
      <h1>{t("site_map.terms_of_service")}</h1>

      <section>
        <h2>{t("legal:terms_of_service.introduction.title")}</h2>
        <p>{t("legal:terms_of_service.introduction.content")}</p>
      </section>

      <section>
        <h2>{t("legal:terms_of_service.acceptance.title")}</h2>
        <p>{t("legal:terms_of_service.acceptance.content")}</p>
      </section>

      <section>
        <h2>{t("legal:terms_of_service.use_of_website.title")}</h2>
        <p>{t("legal:terms_of_service.use_of_website.content")}</p>
      </section>

      <section>
        <h2>{t("legal:terms_of_service.user_responsibility.title")}</h2>
        <p>{t("legal:terms_of_service.user_responsibility.content")}</p>
      </section>

      <section>
        <h2>{t("legal:terms_of_service.account_termination.title")}</h2>
        <p>{t("legal:terms_of_service.account_termination.content")}</p>
      </section>

      <section>
        <h2>{t("legal:terms_of_service.changes_to_terms.title")}</h2>
        <p>{t("legal:terms_of_service.changes_to_terms.content")}</p>
      </section>

      <section>
        <h2>{t("legal:terms_of_service.contact_us.title")}</h2>
        <p>{t("legal:terms_of_service.contact_us.content")}</p>
      </section>
    </>
  )
}

export default TermsOfServicePage
