import { VerificationToken } from "@prisma/client"
import prisma from "@/app/[locale]/_lib/prisma"

export const getVerificationTokenByToken = async (token: string): Promise<VerificationToken | null> => {
  const verificationToken = await prisma.verificationToken.findUnique({ where: { token } })
  return verificationToken
}

export const getVerificationTokenByEmail = async (email: string): Promise<VerificationToken | null> => {
  const verificationToken = await prisma.verificationToken.findFirst({ where: { email } })
  return verificationToken
}
