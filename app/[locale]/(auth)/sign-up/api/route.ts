import { NextResponse } from "next/server"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { EHttpResponseStatus } from "@/app/[locale]/_core"
import { getUserByEmail } from "@/app/[locale]/_data"
import { generateVerificationToken, sendVerificationEmail } from "@/app/[locale]/_lib"
import prisma from "@/app/[locale]/_lib/prisma"

export const POST = async <T extends User & { birth_date: string }>(body: T): Promise<NextResponse<TApiResponse>> => {
  // Check if there is an existing account associated with the provided email
  const foundUserByEmail = await getUserByEmail(body.email)

  if (foundUserByEmail) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "form:error.duplicate_account.message",
      },
      { status: 409 }
    )
  }

  // Create user
  const hashedPassword = body.password && (await hash(body.password, 12))

  if (!hashedPassword) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "alert.message.500",
      },
      { status: 500 }
    )
  }

  const newUser = await prisma.user.create({
    data: {
      first_name: body.first_name,
      last_name: body.last_name,
      gender: body.gender,
      birth_date: new Date(body.birth_date),
      email: body.email,
      password: hashedPassword,
    },
  })

  if (!newUser) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "alert.message.400",
      },
      { status: 400 }
    )
  }

  const { password, active, created_at, updated_at, ...user } = newUser

  const verificationToken = await generateVerificationToken(newUser.email)
  await sendVerificationEmail(newUser.first_name ?? "[first_name]", verificationToken.email, verificationToken.token)

  return NextResponse.json(
    {
      status: EHttpResponseStatus.SUCCESS,
      message: "form:success.verify_email.message",
      data: user,
    },
    { status: 201 }
  )
}
