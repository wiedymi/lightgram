const createUser = async (root, args, context) => {
  const { email, username, password } = args
  const { db, pubsub, subscriptions, mail } = context
  const { REGISTERED_USER } = subscriptions
  const { sendEmail, EMAIL_VERIFICATION } = mail

  const isExist = await db.get({ email })
  const isUsername = await db.get({ username })

  if (isUsername || isExist) {
    throw new Error('The user is exist already')
  }

  const createdUser = await db.create({
    email,
    username,
    password,
  })

  pubsub.publish(REGISTERED_USER, {
    users: createdUser,
  })

  sendEmail(EMAIL_VERIFICATION, { email })

  return createdUser
}

export const Mutation = {
  createUser,
}
