import { createId } from "@paralleldrive/cuid2"
import { User } from "@prisma/client"
import { EOAuthProvider } from "@/app/[locale]/_core"
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

export const createGuestUser = async (): Promise<User | null> => {
  const sessionId = createId()
  const guestUser = {
    id: sessionId,
    name: `guest_${sessionId}`,
    email: `guest_${sessionId}`,
    image: undefined,
    provider: EOAuthProvider.GUEST,
  }
  const user = await prisma.user.create({
    data: {
      name: guestUser.name,
      email: guestUser.email,
      image: guestUser.image,
    },
  })

  return user
}
