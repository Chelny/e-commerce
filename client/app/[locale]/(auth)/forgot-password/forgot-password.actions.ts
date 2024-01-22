"use server"

import { revalidatePath } from "next/cache"
import { flatten, minLength, object, type Output, safeParse, string, regex, EMAIL_REGEX } from "valibot"

export async function sendEmail(prevState: TFormPreviousState, formData: FormData) {
  const schema = object({
    email: string([minLength(1, "email.required"), regex(EMAIL_REGEX, "email.pattern")]),
  })

  type ForgotPasswordData = Output<typeof schema>

  const result = safeParse(schema, {
    email: formData.get("email"),
  })

  if (!result.success) {
    return {
      ...prevState,
      message: "Invalid email",
      errors: flatten(result.issues).nested,
    }
  }

  // Mutate data
  console.log(result.output)
  revalidatePath("/")

  return {
    message: "Email sent with temporary password",
  }
}
