import { template, sendEmail } from '@/lib'
import { MAIL } from '@/constants'

const { EMAIL_VERIFICATION } = MAIL.emails

export const emailVerification = async opt => {
  const { email } = opt
  const message = await template(EMAIL_VERIFICATION, {
    email,
  })

  const mail = await sendEmail(email, 'Email Verification', message, message)

  return mail
}
