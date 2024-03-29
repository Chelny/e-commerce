import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaTriangleExclamation } from "react-icons/fa6"
import { EAlertVariant } from "@/app/[locale]/_core"
import { useTranslation } from "@/app/i18n/client"
import styles from "./Alert.module.css"

type TAlertProps = {
  variant: EAlertVariant
  locale: TLocale
  message?: string
  children?: React.ReactNode
}

export const Alert = (props: TAlertProps): JSX.Element => {
  const { t } = useTranslation(props.locale, ["common", "form"])

  return (
    <div className={`${styles.alert} ${styles[props.variant]}`} role="alert">
      <div className={styles.iconWrapper}>
        {props.variant === EAlertVariant.INFO && <FaCircleInfo className={`${styles.icon} ${styles.infoIcon}`} />}
        {props.variant === EAlertVariant.SUCCESS && (
          <FaCircleCheck className={`${styles.icon} ${styles.successIcon}`} />
        )}
        {props.variant === EAlertVariant.WARNING && (
          <FaTriangleExclamation className={`${styles.icon} ${styles.warningIcon}`} />
        )}
        {props.variant === EAlertVariant.ERROR && (
          <FaCircleExclamation className={`${styles.icon} ${styles.errorIcon}`} />
        )}
      </div>
      <div className={styles.message}>
        {props.message && <p>{t(props.message)}</p>}
        {props.children}
      </div>
    </div>
  )
}
