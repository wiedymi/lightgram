import jwt from 'jsonwebtoken'
import { config } from '@/lib'
const { JWT_SECRET } = config

export const jwtVerify = token => {
  try {
    jwt.verify(token, JWT_SECRET)
    return true
  } catch (err) {
    return false
  }
}
