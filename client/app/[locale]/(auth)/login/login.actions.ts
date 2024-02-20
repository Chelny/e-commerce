"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { flatten, minLength, object, type Output, safeParse, string, regex, EMAIL_REGEX } from "valibot"
import { POST } from "@/app/[locale]/(auth)/login/api/route"
import { ROUTE_HOME, ROUTE_LOGIN } from "@/app/[locale]/_lib/site-map"

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

  const response = await POST<LoginData>(result.output)
  const data = await response.json()

  if (response.ok) {
    cookieStore.set("accessToken", data.access_token, { maxAge: 7200, httpOnly: true })
    cookieStore.set("refreshToken", data.refresh_token, { maxAge: 2592000, httpOnly: true })
    revalidatePath(ROUTE_LOGIN.PATH)
    redirect(ROUTE_HOME.PATH)
  }

  return {
    ...prevState,
    message: data.message,
    errors: {
      form: data.message,
    },
  }
}
