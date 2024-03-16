interface VerificationEmailTemplateProps {
  firstName: string
  confirmLink: string
}

interface SendPasswordResetEmailTemplateProps {
  firstName: string
  email: string
  resetLink: string
}

interface SendTwoFactorEmailTemplateProps {
  firstName: string
  token: string
}

export const VerificationEmailTemplate = ({ firstName, confirmLink }: VerificationEmailTemplateProps) => (
  <div>
    <p>
      Hello {firstName},<br />
      <br />
      Thank you for signing up! To complete your registration, please verify your email address by clicking the
      following link: <a href={confirmLink}>confirm email</a> or by copy-paste the following URL in a browser:{" "}
      {confirmLink}. Please note that the verification token will expire an hour after receiving this message.
      <br />
      <br />
      If you did not sign up to our website or if you believe your account has been compromised, please contact our
      support team immediately.
      <br />
      <br />
      Best regards,
      <br />
      E-commerce
    </p>
  </div>
)

export const SendPasswordResetEmailTemplate = ({
  firstName,
  email,
  resetLink,
}: SendPasswordResetEmailTemplateProps) => (
  <div>
    <p>
      Hello {firstName},<br />
      <br />
      We&apos;ve received a request to reset the password for the account associated with the email {email}.<br />
      <br />
      You can reset your password by clicking the following link: <a href={resetLink}>reset password</a> or by
      copy-paste the following URL in a browser: {resetLink}. Please note that the password will expire an hour after
      receiving this message.
      <br />
      <br />
      If you did not request a new password or if you believe your account has been compromised, please contact our
      support team immediately.
      <br />
      <br />
      Best regards,
      <br />
      E-commerce
    </p>
  </div>
)

export const SendTwoFactorEmailTemplate = ({ firstName, token }: SendTwoFactorEmailTemplateProps) => (
  <div>
    <p>
      Hello {firstName},<br />
      <br />
      To complete the login process, please use the following 2FA code: ${token}
      <br />
      <br />
      If you did not request this code or if you believe your account has been compromised, please contact our support
      team immediately.
      <br />
      <br />
      Best regards,
      <br />
      E-commerce
    </p>
  </div>
)
