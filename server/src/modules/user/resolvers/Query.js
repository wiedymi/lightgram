import { userValidator } from './validators'

const user = async (root, { id }, { db, validationErrors }) => {
  if (validationErrors) {
    throw new Error(JSON.stringify(validationErrors))
  }

  const user = await db.get({ id })

  return user
}

const users = async (root, { offset, limit }, { db }) => {
  const users = await db.paginate({}, { offset, limit })

  return users
}

export const Query = {
  user: userValidator(user),
  users,
}
