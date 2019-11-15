import { createService, createSchema } from '@/lib'

const uploadSchema = createSchema(
  {
    userId: {
      type: String,
    },
    size: {
      tiny: String,
      small: String,
      large: String,
    },
    extension: {
      type: String,
    },
  },
  { collection: 'uploads' },
)

export const uploadService = createService('Upload', uploadSchema)
