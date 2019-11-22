import { GraphQLModule } from '@graphql-modules/core'
import { pubsub } from '@/lib'
import { feedService, userService } from '@/services'
import { SUBCSRIPTIONS } from '@/constants'
import { sendEmail, EMAIL_VERIFICATION } from '@/mails'
import * as typeDefs from './schema.graphql'
import * as resolvers from './resolvers'

const { feed: subscriptions } = SUBCSRIPTIONS

export default new GraphQLModule({
  typeDefs,
  resolvers: { ...resolvers },
  context: {
    pubsub,
    subscriptions,
    db: feedService,
    userService,
    mail: {
      sendEmail,
      EMAIL_VERIFICATION,
    },
  },
})
