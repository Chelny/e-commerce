"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { flatten, minLength, object, type Output, safeParse, string, regex, EMAIL_REGEX } from "valibot"
import { EVariant } from "@/app/[locale]/_lib/definition/enums"
import { ROUTE_HOME } from "@/app/[locale]/_lib/site-map"
import { POST } from "@/app/[locale]/(auth)/login/api/route"

export async function login(_: TFormState, formData: FormData) {
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
      message: "Invalid email or password",
      data: {
        errors: flatten(result.issues).nested,
      },
    }
  }

  const response = await POST<LoginData>(result.output)
  const data = await response.json()

  if (!response.ok) {
    return {
      status: EVariant.ERROR,
      code: response.status,
      message: data.message,
    }
  }

  cookieStore.set("accessToken", data.access_token, { maxAge: 7200, httpOnly: true })
  cookieStore.set("refreshToken", data.refresh_token, { maxAge: 2592000, httpOnly: true })
  redirect(ROUTE_HOME.PATH)
}
