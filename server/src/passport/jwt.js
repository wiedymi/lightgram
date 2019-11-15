/* eslint-disable require-atomic-updates */
import jwt from 'jsonwebtoken'
import { ROLES } from '@/constants'
import { jwtVerify, config } from '@/lib'
import { userService } from '@/services'

const { GUEST } = ROLES

const auth = async (resolve, root, args, context, info) => {
  const Authorization = context.headers.authorization || false

  context.user = {
    role: GUEST,
  }

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const isVerified = jwtVerify(token)

    if (isVerified) {
      const { id } = await jwt.decode(token, config.JWT_SECRET)
      const user = await userService.get({ id })
      if (user) {
        context.user = {
          role: user.role,
          id: user.id,
        }

        return resolve(root, args, context, info)
      }
    }

    return resolve(root, args, context, info)
  }

  return resolve(root, args, context, info)
}

export { auth }
