import { userService, feedService } from '@/services'

const feed = async (root, { offset, limit }, { db, validationErrors }) => {
  if (validationErrors) {
    throw new Error(JSON.stringify(validationErrors))
  }

  const posts = await db.paginate({}, { offset, limit, sort: { time: -1 } })

  return posts
}

const stats = async () => {
  const users = await userService.count()
  const posts = await feedService.count()

  return {
    users,
    posts,
  }
}

export const Query = {
  feed,
  stats,
}
