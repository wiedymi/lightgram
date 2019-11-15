import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '@/lib'

const login = async (root, { username, password }, { db }) => {
  const user = await db.get({ username })

  if (!user) {
    throw new Error('Incorrect username or password')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (isMatch) {
    const token = await jwt.sign({ id: user.id }, config.JWT_SECRET)

    return { user: user.toObject(), token }
  }

  throw new Error('Incorrect username or password')
}

export const Query = {
  login,
}
