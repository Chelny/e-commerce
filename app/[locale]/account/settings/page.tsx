import { useTranslation } from "@/app/i18n"

const SettingsPage = async (props: TPageProps): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, "common")

  return (
    <>
      <h1>{t("site_map.settings")}</h1>
      Nothing to see here
      {/* <SettingsForm page={props} /> */}
    </>
  )
}

export default SettingsPage
