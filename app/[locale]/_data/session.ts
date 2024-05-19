import { Session } from "@prisma/client"
import prisma from "@/app/[locale]/_lib/prisma"

export const createSession = async (sessionToken: string, userId: string, expires: Date): Promise<Session> => {
  const session = await prisma.session.create({
    data: {
      sessionToken,
      userId,
      expires,
    },
  })
  return session
}

export const getSessionBySessionToken = async (sessionToken: string): Promise<Session | null> => {
  const session = await prisma.session.findUnique({
    where: { sessionToken: sessionToken },
  })
  return session
}
