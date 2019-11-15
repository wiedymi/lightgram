const user = async (parent, arg, { user }) => {
  const id = parent.userId
  const result = await user.get({ id })

  return result
}

export const Feed = {
  user,
}
