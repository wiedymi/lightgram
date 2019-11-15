import { singleUpload } from '@/lib'

const createPost = async (root, { file }, { db, validationErrors }, { session: { user } }) => {
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

    return createdPost
  }

  const uploads = await singleUpload(file, { prefix: 'posts/' }, callback)

  return uploads
}

export const Mutation = {
  createPost,
}
