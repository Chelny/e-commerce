"use server"

import { flatten, object, Output, safeParse, string } from "valibot"
import { POST } from "@/app/[locale]/(auth)/verify-email/api/route"

const verifyEmail = async (_: TFormState, formData: FormData): Promise<TFormActions> => {
  const schema = object({
    token: string(),
  })

  type VerifyEmailData = Output<typeof schema>

  const result = safeParse(schema, {
    token: formData.get("token"),
  })

  if (!result.success) {
    return {
      message: "Invalid token",
      data: {
        errors: flatten(result.issues).nested,
      },
    }
  }

  const response = await POST<VerifyEmailData>(result.output)
  const data = await response.json()

  return data
}

export { verifyEmail }
