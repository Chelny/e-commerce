import { NextResponse } from "next/server"
import { EHttpResponseStatus } from "@/app/[locale]/_core"
import { getUserByEmail } from "@/app/[locale]/_data"
import { sendPasswordResetEmail } from "@/app/[locale]/_lib/email"
import { generatePasswordResetToken } from "@/app/[locale]/_lib/tokens"

const POST = async <T>(body: T): Promise<NextResponse<TApiResponse<TFormActions>>> => {
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

  const passwordResetToken = await generatePasswordResetToken(existingUser.email)
  await sendPasswordResetEmail(existingUser.first_name, passwordResetToken.email, passwordResetToken.token)

  return NextResponse.json(
    {
      status: EHttpResponseStatus.SUCCESS,
      message: "form:success.reset_email_sent.message",
    },
    { status: 200 }
  )
}

export { POST }
