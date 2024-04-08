import { NextResponse } from "next/server"
import { User, UserAddress } from "@prisma/client"
import { compare, hash } from "bcryptjs"
import { EHttpResponseStatus } from "@/app/[locale]/_core"
import { getUserByEmail, getUserById } from "@/app/[locale]/_data"
import prisma from "@/app/[locale]/_lib/prisma"

export const GET = async (id: string): Promise<NextResponse<TApiResponse>> => {
  const user = await getUserById(id)

  if (!user) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "form:error.user_not_found.message",
      },
      { status: 404 }
    )
  }

  return NextResponse.json(
    {
      status: EHttpResponseStatus.SUCCESS,
      data: user,
    },
    { status: 200 }
  )
}

export const POST = async <T extends Partial<User & { birth_date: string; current_password: string } & UserAddress>>(
  body: T
): Promise<NextResponse<TApiResponse>> => {
  let passwordData = {}

  const user = await getUserById(body.id)

  if (!user) {
    return NextResponse.json(
      {
        status: EHttpResponseStatus.ERROR,
        message: "form:error.user_not_found.message",
      },
      { status: 404 }
    )
  }

  if (body.current_password && body.password && user.password) {
    const isPasswordValid = await compare(body.current_password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          status: EHttpResponseStatus.ERROR,
          message: "form:error.invalid_current_password.message",
        },
        { status: 403 }
      )
    }

    const hashedPassword = await hash(body.password, 12)

    if (hashedPassword) {
      passwordData = { password: hashedPassword }
    } else {
      return NextResponse.json(
        {
          status: EHttpResponseStatus.ERROR,
          message: "alert.message.500",
        },
        { status: 500 }
      )
    }
  }

  // TODO:
  console.log("Update Profile", JSON.stringify(body, null, 2))
  // Update user
  // const existingUser = await prisma.user.update({
  //   where: { id: body.id },
  //   data: {
  //     first_name: body.first_name,
  //     last_name: body.last_name,
  //     gender: body.gender,
  //     birth_date: new Date(body.birth_date),
  //     email: body.email,
  //     ...passwordData,
  //     user_address: {
  //       upsert: {
  //         where: { user_id: body.id },
  //         create: {
  //           address_line1: body.address_line1,
  //           address_line2: body.address_line2,
  //           city: body.city,
  //           state: body.state,
  //           country: body.country,
  //           postal_code: body.postal_code,
  //           phone_number: body.phone_number,
  //         },
  //         update: {
  //           address_line1: body.address_line1,
  //           address_line2: body.address_line2,
  //           city: body.city,
  //           state: body.state,
  //           country: body.country,
  //           postal_code: body.postal_code,
  //           phone_number: body.phone_number,
  //         },
  //       },
  //     },
  //   },
  //   include: {
  //     user_address: true,
  //   },
  // })

  // if (!existingUser) {
  //   return NextResponse.json(
  //     {
  //       status: EHttpResponseStatus.ERROR,
  //       message: "alert.message.400",
  //     },
  //     { status: 400 }
  //   )
  // }

  return NextResponse.json(
    {
      status: EHttpResponseStatus.SUCCESS,
      message: "form:success.update_profile.message",
    },
    { status: 200 }
  )
}
