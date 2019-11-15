import nodemailer from 'nodemailer'
import { MAIL } from '@/constants'
import { Logger, config } from '@/lib'

const { setting } = MAIL
class Mail {
  constructor(to, subject, text, html, attachments) {
    this.send = async () => {
      try {
        const transporter = nodemailer.createTransport(setting)

        const info = await transporter.sendMail({
          from: config.MAIL_FROM,
          to,
          subject,
          text,
          html,
          attachments,
        })

        return info
      } catch (err) {
        Logger.error(err.stack)
      }
    }
  }
}

export const sendEmail = async (...options) => {
  const email = new Mail(...options)

  const result = await email.send()

  return result
}
