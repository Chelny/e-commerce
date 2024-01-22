"use server"

import { revalidatePath } from "next/cache"
import { email, flatten, minLength, object, type Output, safeParse, string, regex, custom } from "valibot"
import { NAME_REGEX, PASSWORD_REGEX } from "@/app/[locale]/_lib/constants"

export async function signUp(prevState: TFormPreviousState, formData: FormData) {
  // The user must be at least 18 years old
  const currentDate = new Date()
  const birthYear = currentDate.getFullYear() - 18
  const birthdate = new Date(birthYear, currentDate.getMonth(), currentDate.getDate())

  const schema = object({
    firstName: string([minLength(1, "first_name.required"), regex(NAME_REGEX, "first_name.pattern")]),
    lastName: string([minLength(1, "last_name.required"), regex(NAME_REGEX, "last_name.pattern")]),
    gender: string("gender.required"),
    birthDate: string([
      minLength(1, "birth_date.required"),
      custom((input: string) => new Date(input) <= birthdate, "birth_date.max"),
    ]),
    email: string([minLength(1, "email.required"), email("email.pattern")]),
    password: string([minLength(1, "password.required"), regex(PASSWORD_REGEX, "password.pattern")]),
    confirmPassword: string([
      minLength(1, "confirm_password.required"),
      regex(PASSWORD_REGEX, "confirm_password.pattern"),
      custom((input: string) => formData.get("password") === input, "confirm_password.match"),
    ]),
  })

  type SignUpData = Output<typeof schema>

  const result = safeParse(schema, {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    gender: formData.get("gender"),
    birthDate: formData.get("birthDate"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!result.success) {
    return {
      ...prevState,
      message: "Invalid field(s)",
      errors: flatten(result.issues).nested,
    }
  }

  // Mutate data
  console.log(result.output)
  revalidatePath("/")

  return {
    message: "Sign up successful",
  }
}
