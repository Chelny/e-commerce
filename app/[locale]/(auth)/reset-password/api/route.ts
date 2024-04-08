import { NextResponse } from "next/server"
import { PasswordResetToken, User } from "@prisma/client"
import { hash } from "bcryptjs"
import { EHttpResponseStatus } from "@/app/[locale]/_core"
import { getPasswordResetTokenByToken, getUserByEmail } from "@/app/[locale]/_data"
import prisma from "@/app/[locale]/_lib/prisma"

export const POST = async <T extends User & PasswordResetToken>(body: T): Promise<NextResponse<TApiResponse>> => {
  // Check token validity
  const existingToken = await getPasswordResetTokenByToken(body.token)

  if (!existingToken) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "form:error.token_missing.message",
      },
      { status: 404 }
    )
  }

  // Check token expiration date
  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "form:error.token_expired.message",
      },
      { status: 410 }
    )
  }

  // Validate user and token
  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "form:error.email_not_found.message",
      },
      { status: 404 }
    )
  }

  if (body.password) {
    // Update password in database
    const hashedPassword = await hash(body.password, 12)

    await prisma.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    })
  }

  await prisma.passwordResetToken.delete({ where: { id: existingToken.id } })

  return NextResponse.json(
    {
      status: EHttpResponseStatus.SUCCESS,
      message: "form:success.password_updated.message",
    },
    { status: 200 }
  )
}
