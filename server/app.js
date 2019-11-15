import { ApolloServer, config } from '@/lib'
import { auth } from '@/passport'
import schema from '@/modules'
import access from '@/access'

const middlewares = [auth, access]

const application = ApolloServer({
  schema,
  middlewares,
  engine: {
    apiKey: config.ENGINE_API_KEY,
    schemaTag: 'production',
  },
})

const port = config.PORT || 4000
application.listen({
  port,
  host: '0.0.0.0',
})

console.log(`🚀  GraphQL: http://localhost:${port + application.path}`)
console.log(`🚀  Subscriptions: ws://localhost:${port + application.subscriptions}`)
