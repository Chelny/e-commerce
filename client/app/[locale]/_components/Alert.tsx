import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaTriangleExclamation } from "react-icons/fa6"
import { EVariant } from "@/app/[locale]/_core/enums"
import { useTranslation } from "@/app/i18n/client"
import styles from "./Alert.module.css"

type TAlertProps = {
  variant: EVariant
  locale: TLocale
  title?: string
  message: string
}

export function Alert(props: TAlertProps) {
  const { t } = useTranslation(props.locale, ["common"])

  return (
    <div className={`${styles.alert} ${styles[props.variant]}`} role="alert">
      <div className={styles.header}>
        {props.variant === EVariant.INFO && <FaCircleInfo className={`${styles.icon} ${styles.infoIcon}`} />}
        {props.variant === EVariant.SUCCESS && <FaCircleCheck className={`${styles.icon} ${styles.successIcon}`} />}
        {props.variant === EVariant.WARNING && (
          <FaTriangleExclamation className={`${styles.icon} ${styles.warningIcon}`} />
        )}
        {props.variant === EVariant.ERROR && <FaCircleExclamation className={`${styles.icon} ${styles.errorIcon}`} />}
        <h4 className={styles.title}>{t(props.title ? props.title : `alert.title.${props.variant}`)}</h4>
      </div>
      <p className={styles.message}>{t(props.message)}</p>
    </div>
  )
}
