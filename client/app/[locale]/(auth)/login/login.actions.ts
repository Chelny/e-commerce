"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function login(prevState: { message: string; errors?: Record<string, string[]> }, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const validation = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validation.success) {
    return {
      message: "Invalid email or the password",
      errors: validation.error.flatten().fieldErrors,
    }
  }

  // Mutate data
  console.log(validation.data)
  revalidatePath("/")

  return {
    message: "Login successful",
  }
}
