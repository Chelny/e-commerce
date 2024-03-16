"use client"

import { createContext, FC, ReactNode, useContext, useState } from "react"
import { useTranslation } from "@/app/i18n/client"

type TToastProvider = {
  children: ReactNode
  locale: TLocale
}

interface ToastContextProps {
  showToast: (message: string) => void
  hideToast: () => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const ToastProvider: FC<TToastProvider> = (props: TToastProvider) => {
  const { t } = useTranslation(props.locale, "form")
  const [message, setMessage] = useState<string | null>(null)
  const [show, setShow] = useState<boolean>(false)

  const showToast = (message: string): void => {
    setMessage(t(message))
    setShow(true)
    setTimeout(() => {
      hideToast()
    }, 5000)
  }

  const hideToast = (): void => {
    setShow(false)
    setTimeout(() => {
      setMessage(null)
    }, 700) // Adjust the duration to match your transition duration
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {props.children}
      {message && (
        <div
          className={`fixed z-30 left-4 md:left-[unset] right-4 p-4 rounded shadow-card bg-ecommerce-400 dark:bg-ecommerce-600 transition-toast duration-700 ease-in-out ${
            show ? "bottom-4 opacity-100" : "bottom-[-100%] opacity-0"
          }`}
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within a ToastProvider")
  return context
}
