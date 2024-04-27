"use server"

import { custom, flatten, minLength, object, type Output, regex, safeParse, string } from "valibot"
import { POST } from "@/app/[locale]/(auth)/reset-password/api/route"
import { PASSWORD_REGEX } from "@/app/[locale]/_core"

export const resetPassword = async (_: TFormState, formData: FormData): Promise<TFormActions> => {
  const schema = object({
    token: string([minLength(1)]),
    password: string([minLength(1, "password.required"), regex(PASSWORD_REGEX, "password.pattern")]),
    confirmPassword: string([
      minLength(1, "confirm_password.required"),
      regex(PASSWORD_REGEX, "confirm_password.pattern"),
      custom((value: string) => formData.get("password") === value, "confirm_password.match"),
    ]),
  })

  type ResetPasswordData = Output<typeof schema>

  const result = safeParse(schema, {
    token: formData.get("token"),
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

  // @ts-ignore
  const response = await POST<ResetPasswordData>(result.output)
  const data = await response.json()

  return data
}
