import { NextResponse } from "next/server"
import { compare } from "bcryptjs"
import { randomBytes } from "crypto"
import { EHttpResponseStatus } from "@/app/[locale]/_core"
import {
  createGuestUser,
  createSession,
  getSessionBySessionToken,
  getUserByEmail,
  getUserByEmailActive,
} from "@/app/[locale]/_data"

export const POST_LOGIN = async (body: { email: string; password: string }): Promise<NextResponse<TApiResponse>> => {
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

// FIXME: Allow guest users
// export const POST_LOGIN_GUEST = async (): Promise<NextResponse<TApiResponse>> => {
//   const user = await createGuestUser()

//   if (!user) {
//     return NextResponse.json(
//       {
//         status: EHttpResponseStatus.ERROR,
//         message: "alert.message.400",
//       },
//       { status: 400 }
//     )
//   }

//   const sessionToken = randomBytes(32).toString("hex")
//   const userId = user.id
//   const expirationDate = new Date()
//   expirationDate.setDate(expirationDate.getDate() + 30) // 30 days from current date
//   const expires = expirationDate
//   const existingSession = await getSessionBySessionToken(sessionToken)
//   if (!existingSession) await createSession(sessionToken, userId, expires)

//   return NextResponse.json(
//     {
//       status: EHttpResponseStatus.SUCCESS,
//       data: user,
//     },
//     { status: 200 }
//   )
// }
