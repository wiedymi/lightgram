import { GraphQLModule } from '@graphql-modules/core'
import { pubsub } from '@/lib'
import { userService } from '@/services'
import { SUBCSRIPTIONS } from '@/constants'
import { sendEmail, EMAIL_VERIFICATION } from '@/mails'
import * as typeDefs from './schema.graphql'
import * as resolvers from './resolvers'

const { user: subscriptions } = SUBCSRIPTIONS

export default new GraphQLModule({
  typeDefs,
  resolvers: { ...resolvers },
  context: {
    pubsub,
    subscriptions,
    db: userService,
    mail: {
      sendEmail,
      EMAIL_VERIFICATION,
    },
  },
})
