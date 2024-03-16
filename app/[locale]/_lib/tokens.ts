import { PasswordResetToken, TwoFactorToken, VerificationToken } from "@prisma/client"
import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"
import { getTwoFactorTokenByEmail, getVerificationTokenByEmail } from "@/app/[locale]/_data"
import prisma from "@/app/[locale]/_lib/prisma"

export const generateVerificationToken = async (email: string): Promise<VerificationToken> => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour
  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) await prisma.verificationToken.delete({ where: { identifier: existingToken.identifier } })

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verificationToken
}

export const generatePasswordResetToken = async (email: string): Promise<PasswordResetToken> => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000) // 1 hour
  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) await prisma.passwordResetToken.delete({ where: { id: existingToken.identifier } })

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return passwordResetToken
}

export const generateTwoFactorToken = async (email: string): Promise<TwoFactorToken> => {
  const token = crypto.randomInt(100_000, 1_000_000).toString()
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000) // 5 minutes
  const existingToken = await getTwoFactorTokenByEmail(email)

  if (existingToken) await prisma.twoFactorToken.delete({ where: { id: existingToken.id } })

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return twoFactorToken
}
