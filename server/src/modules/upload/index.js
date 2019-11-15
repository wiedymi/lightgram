import { GraphQLModule } from '@graphql-modules/core'
import { userService } from '@/services'
import * as typeDefs from './schema.graphql'
import * as resolvers from './resolvers'

export default new GraphQLModule({
  typeDefs,
  resolvers: { ...resolvers },
  context: {
    db: userService,
  },
})
