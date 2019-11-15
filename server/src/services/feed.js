import mongoosePaginate from 'mongoose-paginate-v2'
import { createService, createSchema } from '@/lib'

const feedSchema = createSchema(
  {
    userId: {
      type: String,
    },
    image: {
      tiny: String,
      small: String,
      large: String,
    },
    body: {
      type: String,
    },
  },
  { collection: 'posts' },
)

feedSchema.plugin(mongoosePaginate)

export const feedService = createService('Feed', feedSchema)
