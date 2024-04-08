import { ProfileForm } from "@/app/[locale]/account/profile/profile.form"
import { useTranslation } from "@/app/i18n"

const ProfilePage = async (props: TPageProps): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, "common")

  return (
    <>
      <h1>{t("site_map.profile")}</h1>
      <ProfileForm page={props} />
    </>
  )
}

export default ProfilePage
