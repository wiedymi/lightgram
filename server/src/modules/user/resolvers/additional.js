import jwt from 'jsonwebtoken'
import { config } from '@/lib'

const token = async parent => {
  const id = parent.id
  const result = await jwt.sign({ id }, config.JWT_SECRET)

  return result
}

export const User = {
  token,
}
