import { User } from "@prisma/client"
import prisma from "@/app/[locale]/_lib/prisma"

export const getUserById = async (id: string | undefined): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { id }, include: { user_address: true, accounts: true } })
  return user
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}

export const getUserByEmailActive = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email, active: true } })
  return user
}
