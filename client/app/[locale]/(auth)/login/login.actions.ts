"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { flatten, minLength, object, type Output, safeParse, string, regex, EMAIL_REGEX } from "valibot"
import { POST } from "@/app/[locale]/(auth)/login/api/route"
import { ROUTE_HOME } from "@/app/[locale]/_lib/site-map"

export async function login(prevState: TFormPreviousState, formData: FormData) {
  const cookieStore = cookies()

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
  // FIXME: Error response always return 200 - debug
  console.log(result.output)
  const response = await POST<LoginData>(result.output)
  console.log(response)
  // if (response.status === 200) {
  //   cookieStore.set("token", "your_token_value", { maxAge: 7200, httpOnly: true })
  //   redirect(ROUTE_HOME.PATH)
  // }
}
