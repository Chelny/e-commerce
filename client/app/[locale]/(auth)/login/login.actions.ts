"use server"

import { revalidatePath } from "next/cache"
import { email, flatten, minLength, object, type Output, safeParse, string, regex, EMAIL_REGEX } from "valibot"

export async function login(prevState: TFormPreviousState, formData: FormData) {
  const schema = object({
    email: string([minLength(1, "email.required"), regex(EMAIL_REGEX, "email.pattern")]),
    password: string([minLength(1, "password.required")]),
  })

  type LoginData = Output<typeof schema>

  const result = safeParse(schema, {
    email: formData.get("email"),
    password: formData.get("password"),
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
    message: "Login successful",
  }
}
