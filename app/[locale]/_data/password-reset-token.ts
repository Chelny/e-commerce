import { PasswordResetToken } from "@prisma/client"
import prisma from "@/app/[locale]/_lib/prisma"

export const getPasswordResetTokenByToken = async (token: string): Promise<PasswordResetToken | null> => {
  const passwordResetToken = await prisma.passwordResetToken.findUnique({ where: { token } })
  return passwordResetToken
}

export const getPasswordResetTokenByEmail = async (email: string): Promise<PasswordResetToken | null> => {
  const passwordResetToken = await prisma.passwordResetToken.findFirst({ where: { email } })
  return passwordResetToken
}
