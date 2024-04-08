import { NextResponse } from "next/server"
import { User } from "@prisma/client"
import { EHttpResponseStatus } from "@/app/[locale]/_core"
import { getUserByEmail } from "@/app/[locale]/_data"
import { generatePasswordResetToken, sendPasswordResetEmail } from "@/app/[locale]/_lib"

export const POST = async <T extends User>(body: T): Promise<NextResponse<TApiResponse<TFormActions>>> => {
  const existingUser = await getUserByEmail(body.email)

  if (!existingUser) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "form:error.email_not_found.message",
      },
      { status: 404 }
    )
  }

  const name = existingUser.first_name ?? existingUser.name
  const passwordResetToken = await generatePasswordResetToken(existingUser.email)
  await sendPasswordResetEmail(name!, passwordResetToken.email, passwordResetToken.token)

  return NextResponse.json(
    {
      status: EHttpResponseStatus.SUCCESS,
      message: "form:success.reset_email_sent.message",
    },
    { status: 200 }
  )
}
