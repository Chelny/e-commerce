import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaTriangleExclamation } from "react-icons/fa6"
import { EHttpResponseStatus } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"
import styles from "./Alert.module.css"

type TAlertProps = {
  variant: EHttpResponseStatus
  locale: TLocale
  title?: string
  message: string
}

export const Alert = (props: TAlertProps): JSX.Element => {
  const { t } = useTranslation(props.locale, ["common", "form"])

  return (
    <div className={`${styles.alert} ${styles[props.variant]}`} role="alert">
      <div className={styles.header}>
        {props.variant === EHttpResponseStatus.INFO && <FaCircleInfo className={`${styles.icon} ${styles.infoIcon}`} />}
        {props.variant === EHttpResponseStatus.SUCCESS && (
          <FaCircleCheck className={`${styles.icon} ${styles.successIcon}`} />
        )}
        {props.variant === EHttpResponseStatus.WARNING && (
          <FaTriangleExclamation className={`${styles.icon} ${styles.warningIcon}`} />
        )}
        {props.variant === EHttpResponseStatus.ERROR && (
          <FaCircleExclamation className={`${styles.icon} ${styles.errorIcon}`} />
        )}
        <h4 className={styles.title}>{t(props.title ? props.title : `alert.title.${props.variant}`)}</h4>
      </div>
      <p className={styles.message}>{t(props.message)}</p>
    </div>
  )
}
