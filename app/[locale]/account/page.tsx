import { Suspense } from "react"
import Link from "next/link"
import { useTranslation } from "@/app/i18n"

const AccountPage = async (props: TPageProps): Promise<JSX.Element> => {
  const { t } = await useTranslation(props.params.locale, ["common", "account"])

  return <>Account Page</>
}

export default AccountPage
