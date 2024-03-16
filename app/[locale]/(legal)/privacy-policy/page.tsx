import { useTranslation } from "@/app/i18n"

const PrivacyPolicyPage = async (props: TPage): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, ["common", "legal"])

  return (
    <>
      <h1>{t("site_map.privacy_policy")}</h1>

      <section>
        <h2>{t("legal:privacy_policy.collection_of_information.title")}</h2>
        <p>{t("legal:privacy_policy.collection_of_information.content")}</p>
      </section>

      <section>
        <h2>{t("legal:privacy_policy.use_of_information.title")}</h2>
        <p>{t("legal:privacy_policy.use_of_information.content")}</p>
      </section>

      <section>
        <h2>{t("legal:privacy_policy.protection_of_information.title")}</h2>
        <p>{t("legal:privacy_policy.protection_of_information.content")}</p>
      </section>

      <section>
        <h2>{t("legal:privacy_policy.data_retention.title")}</h2>
        <p>{t("legal:privacy_policy.data_retention.content")}</p>
      </section>

      <section>
        <h2>{t("legal:privacy_policy.third_party_links.title")}</h2>
        <p>{t("legal:privacy_policy.third_party_links.content")}</p>
      </section>

      <section>
        <h2>{t("legal:privacy_policy.data_retention.title")}</h2>
        <p>{t("legal:privacy_policy.data_retention.content")}</p>
      </section>

      <section>
        <h2>{t("legal:privacy_policy.privacy_policy_changes.title")}</h2>
        <p>{t("legal:privacy_policy.privacy_policy_changes.content")}</p>
      </section>

      <section>
        <h2>{t("legal:privacy_policy.contact_information.title")}</h2>
        <p>{t("legal:privacy_policy.contact_information.content")}</p>
      </section>
    </>
  )
}

export default PrivacyPolicyPage
