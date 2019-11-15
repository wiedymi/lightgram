const feed = async (root, { offset, limit }, { db, validationErrors }) => {
  if (validationErrors) {
    throw new Error(JSON.stringify(validationErrors))
  }

  const posts = await db.paginate({}, { offset, limit })

  return posts
}

export const Query = {
  feed,
}
