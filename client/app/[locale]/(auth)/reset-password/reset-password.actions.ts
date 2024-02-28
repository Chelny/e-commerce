"use server"

import { redirect } from "next/navigation"
import { flatten, minLength, object, type Output, safeParse, string, regex, EMAIL_REGEX, custom } from "valibot"
import { PASSWORD_REGEX } from "@/app/[locale]/_lib/constants"
import { POST } from "@/app/[locale]/(auth)/reset-password/api/route"
import { ROUTE_LOGIN } from "@/app/[locale]/_lib/site-map"

export async function resetPassword(_: TFormState, formData: FormData) {
  const schema = object({
    token: string([minLength(1)]),
    email: string([minLength(1, "email.required"), regex(EMAIL_REGEX, "email.pattern")]),
    password: string([minLength(1, "password.required"), regex(PASSWORD_REGEX, "password.pattern")]),
    confirmPassword: string([
      minLength(1, "confirm_password.required"),
      regex(PASSWORD_REGEX, "confirm_password.pattern"),
      custom((input: string) => formData.get("password") === input, "confirm_password.match"),
    ]),
  })

  type ResetPasswordData = Output<typeof schema>

  const result = safeParse(schema, {
    token: formData.get("token"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!result.success) {
    return {
      message: "Invalid email or password",
      data: {
        errors: flatten(result.issues).nested,
      },
    }
  }

  const response = await POST<ResetPasswordData>(result.output)
  const data = await response.json()

  if (!response.ok) {
    return {
      status: "error",
      code: response.status,
      message: data.message,
    }
  }

  redirect(ROUTE_LOGIN.PATH)
}
