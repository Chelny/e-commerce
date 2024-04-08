"use server"

import { revalidatePath } from "next/cache"
import { email, flatten, minLength, object, type Output, regex, safeParse, string } from "valibot"
import { POST } from "@/app/[locale]/(auth)/forgot-password/api/route"
import { ROUTE_FORGOT_PASSWORD } from "@/app/[locale]/_core"

export const sendEmail = async (_: TFormState, formData: FormData): Promise<TFormActions> => {
  const schema = object({
    email: string([minLength(1, "email.required"), email("email.pattern")]),
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

  revalidatePath(ROUTE_FORGOT_PASSWORD.PATH)

  return data
}
