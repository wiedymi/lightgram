import { singleUpload, multiUpload } from '@/lib'
import { uploadValidator, uploadManyValidator } from './validators'

const upload = async (root, { file }, { validationErrors }) => {
  if (validationErrors) {
    throw new Error(validationErrors)
  }

  const callback = async file => {
    return file
  }

  const uploads = await singleUpload(file, { prefix: 'avatars/' }, callback)

  return uploads
}

const uploadMany = async (root, { files }, { validationErrors }) => {
  if (validationErrors) {
    throw new Error(validationErrors)
  }

  return multiUpload(files)
}

export const Mutation = {
  upload: uploadValidator(upload),
  uploadMany: uploadManyValidator(uploadMany),
}
