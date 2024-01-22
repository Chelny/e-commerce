"use server"

import { revalidatePath } from "next/cache"
import { flatten, minLength, object, type Output, safeParse, string, regex, EMAIL_REGEX, custom } from "valibot"
import { PASSWORD_REGEX } from "@/app/[locale]/_lib/constants"

export async function resetPassword(prevState: TFormPreviousState, formData: FormData) {
  const schema = object({
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
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!result.success) {
    return {
      ...prevState,
      message: "Invalid email or password",
      errors: flatten(result.issues).nested,
    }
  }

  // Mutate data
  console.log(result.output)
  revalidatePath("/")

  return {
    message: "The password has been updated successfully",
  }
}
