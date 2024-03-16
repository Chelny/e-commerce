import { NextResponse } from "next/server"
import { EHttpResponseStatus } from "@/app/[locale]/_core"
import { getUserByEmail, getVerificationTokenByToken } from "@/app/[locale]/_data"
import prisma from "@/app/[locale]/_lib/prisma"

const POST = async <T>(body: T): Promise<NextResponse<TApiResponse>> => {
  // Check token validity
  const existingToken = await getVerificationTokenByToken(body.token)

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

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  })

  await prisma.verificationToken.delete({
    where: { identifier: existingToken.identifier },
  })

  return NextResponse.json(
    {
      status: EHttpResponseStatus.SUCCESS,
      message: "form:success.verified_email.message",
    },
    { status: 200 }
  )
}

export { POST }
