import { Resend } from "resend"
import {
  SendPasswordResetEmailTemplate,
  SendTwoFactorEmailTemplate,
  VerificationEmailTemplate,
} from "@/app/[locale]/_components/EmailTemplate"
import { ROUTE_RESET_PASSWORD, ROUTE_VERIFY_EMAIL } from "@/app/[locale]/_core"

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)
const FROM_EMAIL = "onboarding@resend.dev"

export const sendVerificationEmail = async (firstName: string, email: string, token: string) => {
  const confirmLink = `http://localhost:3000${ROUTE_VERIFY_EMAIL.PATH}?token=${token}`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Confirm your email",
    react: VerificationEmailTemplate({ firstName, confirmLink }),
  })
}

export const sendPasswordResetEmail = async (firstName: string, email: string, token: string) => {
  const resetLink = `http://localhost:3000${ROUTE_RESET_PASSWORD.PATH}?token=${token}`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Reset your password",
    react: SendPasswordResetEmailTemplate({ firstName, email, resetLink }),
  })
}

export const sendTwoFactorEmail = async (firstName: string, email: string, token: string) => {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Your Two-Factor Authentication (2FA) Code",
    react: SendTwoFactorEmailTemplate({ firstName, token }),
  })
}
