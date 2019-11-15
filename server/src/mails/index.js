import { MAIL } from '@/constants'
import { emailVerification } from './messages'

export const { EMAIL_VERIFICATION } = MAIL.emails

export const sendEmail = async (type, opts) => {
  switch (type) {
    case EMAIL_VERIFICATION: {
      const email = await emailVerification(opts)

      return email
    }
  }
}
