import { GraphQLModule } from '@graphql-modules/core'
import userModule from './user'
import authModule from './auth'
import uploadModule from './upload'
import feedModule from './feed'

const { schema } = new GraphQLModule({
  name: 'app',
  imports: [userModule, authModule, feedModule, uploadModule],
})

export default schema
