"use client"

import { useEffect, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import * as Tooltip from "@radix-ui/react-tooltip"
import { FaShare } from "react-icons/fa6"
import { TfiClose } from "react-icons/tfi"
import { useTranslation } from "@/app/i18n/client"

type TShareProps = {
  locale: TLocale
}

export const Share = (props: TShareProps): JSX.Element => {
  const { t } = useTranslation(props.locale, ["common", "shop"])
  const [productLink, setProductLink] = useState<string>("")

  useEffect(() => {
    setProductLink(window.location.href)
  }, [])

  return (
    <Dialog.Root>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Dialog.Trigger asChild>
              <button type="button" className="px-2">
                <FaShare className="w-5 h-5" />
              </button>
            </Dialog.Trigger>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className="TooltipContent" side="bottom">
              {t("shop:item.share")}
              <Tooltip.Arrow className="TooltipArrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{t("shop:item.share")}</Dialog.Title>
          <input className="w-full" defaultValue={productLink} />
          <Dialog.Close asChild>
            <button type="button" className="IconButton CloseIconButton" aria-label={t("button.close")}>
              <TfiClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
