import { NextResponse } from "next/server"
import { User } from "@prisma/client"
import { compare } from "bcryptjs"
import { EHttpResponseStatus } from "@/app/[locale]/_core"
import { getUserByEmail, getUserByEmailActive } from "@/app/[locale]/_data"

export const POST = async <T extends User>(body: T): Promise<NextResponse<TApiResponse>> => {
  const user = await getUserByEmail(body.email)

  if (!user) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "form:error.invalid_credentials.message",
      },
      { status: 401 }
    )
  }

  if (body.password && user.password) {
    // Check if the password matches the hashed one we already have
    const isPasswordValid = await compare(body.password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          status: EHttpResponseStatus.ERROR,
          message: "form:error.invalid_credentials.message",
        },
        { status: 401 }
      )
    }
  }

  // Check if the user is active
  const activeUser = await getUserByEmailActive(body.email)

  if (!activeUser) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "form:error.inactive_account.message",
      },
      { status: 403 }
    )
  }

  const { password, active, created_at, updated_at, ...updatedUser } = user

  return NextResponse.json(
    {
      status: EHttpResponseStatus.SUCCESS,
      data: updatedUser,
    },
    { status: 200 }
  )
}
