import { singleUpload } from '@/lib'

const createPost = async (
  root,
  { file },
  { db, validationErrors, pubsub, subscriptions: { NEW_POST, COUNT_STATS } },
  { session: { user } },
) => {
  if (validationErrors) {
    throw new Error(validationErrors)
  }

  const callback = async file => {
    const createdPost = await db.create({
      time: Date.now(),
      userId: user.id,
      image: {
        small: file.url,
      },
    })

    pubsub.publish(NEW_POST, {
      feed: createdPost,
    })

    pubsub.publish(COUNT_STATS)

    return createdPost
  }

  const uploads = await singleUpload(file, { prefix: 'posts/' }, callback)

  return uploads
}

export const Mutation = {
  createPost,
}
