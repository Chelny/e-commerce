"use server"

import { AuthError } from "next-auth"
import { flatten, minLength, nullable, object, Output, regex, safeParse, string } from "valibot"
import { DEFAULT_LOGIN_REDIRECT, EHttpResponseStatus, EMAIL_REGEX, EOAuthProvider } from "@/app/[locale]/_core"
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail, getUserByEmail } from "@/app/[locale]/_data"
import {
  generateTwoFactorToken,
  generateVerificationToken,
  sendTwoFactorEmail,
  sendVerificationEmail,
  signIn,
} from "@/app/[locale]/_lib"
import prisma from "@/app/[locale]/_lib/prisma"

export const login = async (_: TFormState, formData: FormData): Promise<TFormActions | undefined> => {
  const schema = object({
    email: string([minLength(1, "email.required"), regex(EMAIL_REGEX, "email.pattern")]),
    password: string([minLength(1, "password.required")]),
    code: nullable(string()),
  })

  type LoginData = Output<typeof schema>

  const result = safeParse(schema, {
    email: formData.get("email"),
    password: formData.get("password"),
    code: formData.get("code"),
  })

  if (!result.success) {
    return {
      message: "Invalid email or password",
      data: {
        errors: flatten(result.issues).nested,
      },
    }
  }

  const { email, password, code } = result.output

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    // Check if user confirmed their email
    if (!existingUser.emailVerified) {
      const name = existingUser.first_name ?? existingUser.name
      const verificationToken = await generateVerificationToken(existingUser.email)
      await sendVerificationEmail(name!, verificationToken.email, verificationToken.token)

      return {
        status: EHttpResponseStatus.SUCCESS,
        message: "form:success.verify_email.message",
      }
    }

    // Check for 2FA token
    if (existingUser.two_factor_enabled && existingUser.email) {
      if (code) {
        // Verify code
        const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

        if (!twoFactorToken) {
          return {
            status: EHttpResponseStatus.ERROR,
            message: "form:error.invalid_code.message",
          }
        }

        if (twoFactorToken.token !== code) {
          return {
            status: EHttpResponseStatus.ERROR,
            message: "form:error.invalid_code.message",
          }
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date()

        if (hasExpired) {
          return {
            status: EHttpResponseStatus.ERROR,
            message: "form:error.code_expired.message",
          }
        }

        await prisma.twoFactorToken.delete({ where: { id: twoFactorToken.id } })

        const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if (existingConfirmation) await prisma.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } })

        await prisma.twoFactorConfirmation.create({
          data: {
            user_id: existingUser.id,
            expires: new Date(new Date().getTime() + 5 * 60 * 1000), // 5 minutes
          },
        })
      } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorEmail(
          existingUser.first_name ?? existingUser.name,
          twoFactorToken.email,
          twoFactorToken.token
        )

        return { twoFactor: true }
      }
    }
  }

  try {
    await signIn(EOAuthProvider.CREDENTIALS, {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: EHttpResponseStatus.ERROR,
            message: "form:error.invalid_credentials.message",
          }
        default:
          return {
            status: EHttpResponseStatus.ERROR,
            message: "form:error.generic.message",
          }
      }
    }

    throw error
  }
}
