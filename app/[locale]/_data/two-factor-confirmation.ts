import { TwoFactorConfirmation } from "@prisma/client"
import prisma from "@/app/[locale]/_lib/prisma"

export const getTwoFactorConfirmationByUserId = async (id: string): Promise<TwoFactorConfirmation | null> => {
  const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique({ where: { user_id: id } })
  return twoFactorConfirmation
}
