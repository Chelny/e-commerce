"use server"

import { revalidatePath } from "next/cache"
import { flatten, minLength, object, type Output, safeParse, string, regex, EMAIL_REGEX } from "valibot"
import { EVariant } from "@/app/[locale]/_lib/definition/enums"
import { ROUTE_FORGOT_PASSWORD } from "@/app/[locale]/_lib/site-map"
import { POST } from "@/app/[locale]/(auth)/forgot-password/api/route"

export async function sendEmail(_: TFormState, formData: FormData) {
  const schema = object({
    email: string([minLength(1, "email.required"), regex(EMAIL_REGEX, "email.pattern")]),
  })

  type ForgotPasswordData = Output<typeof schema>

  const result = safeParse(schema, {
    email: formData.get("email"),
  })

  if (!result.success) {
    return {
      message: "Invalid email",
      data: {
        errors: flatten(result.issues).nested,
      },
    }
  }

  const response = await POST<ForgotPasswordData>(result.output)
  const data = await response.json()

  if (!response.ok) {
    return {
      status: EVariant.ERROR,
      code: response.status,
      message: data.message,
    }
  }

  revalidatePath(ROUTE_FORGOT_PASSWORD.PATH)

  return {
    status: EVariant.SUCCESS,
    code: response.status,
    message: data.message,
  }
}
