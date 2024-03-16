"use server"

import { Gender } from "@prisma/client"
import { custom, email, enum_, flatten, minLength, object, type Output, regex, safeParse, string } from "valibot"
import { POST } from "@/app/[locale]/(auth)/sign-up/api/route"
import { NAME_REGEX, PASSWORD_REGEX } from "@/app/[locale]/_core"

const signUp = async (_: TFormState, formData: FormData): Promise<TFormActions> => {
  // The user must be at least 18 years old
  const currentDate = new Date()
  const birthYear = currentDate.getFullYear() - 18
  const birthdate = new Date(birthYear, currentDate.getMonth(), currentDate.getDate())

  const schema = object({
    first_name: string([minLength(1, "first_name.required"), regex(NAME_REGEX, "first_name.pattern")]),
    last_name: string([minLength(1, "last_name.required"), regex(NAME_REGEX, "last_name.pattern")]),
    gender: enum_(Gender, "gender.required"),
    birth_date: string([
      minLength(1, "birth_date.required"),
      custom((input: string) => new Date(input) <= birthdate, "birth_date.max"),
    ]),
    email: string([minLength(1, "email.required"), email("email.pattern")]),
    password: string([minLength(1, "password.required"), regex(PASSWORD_REGEX, "password.pattern")]),
    confirm_password: string([
      minLength(1, "confirm_password.required"),
      regex(PASSWORD_REGEX, "confirm_password.pattern"),
      custom((input: string) => formData.get("password") === input, "confirm_password.match"),
    ]),
  })

  type SignUpData = Output<typeof schema>

  const result = safeParse(schema, {
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    gender: formData.get("gender"),
    birth_date: formData.get("birthDate"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirmPassword"),
  })

  if (!result.success) {
    return {
      message: "Invalid fields",
      data: {
        errors: flatten(result.issues).nested,
      },
    }
  }

  const response = await POST<SignUpData>(result.output)
  const data = await response.json()

  return data
}

export { signUp }
