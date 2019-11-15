const user = async (parent, arg, { userService }) => {
  const id = parent.userId
  const result = await userService.get({ id })

  return result
}

export const Feed = {
  user,
}
