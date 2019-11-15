import http from 'http'
import helmet from 'helmet'
import express from 'express'
import prerender from 'prerender-node'
import compression from 'compression'
import { applyMiddleware } from 'graphql-middleware'
import { ApolloServer as Apollo } from 'apollo-server-express'
import { Logger, initDB, getDirectives } from '@/lib'
import { CORS as cors } from '@/constants'
import { rateLimiterMiddleware } from '@/lib/middlewares'

const morgan = require('morgan')
const app = express()

const defaultSetting = {
  cors,
  middlewares: [],
  introspection: true,
  context: ({ req, connection }) => {
    if (connection) {
      return connection.context.request
    }

    return req
  },
  trace: true,
  debug: true,
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      return context
    },
  },
}

const ApolloServer = opts => {
  const settings = {
    ...defaultSetting,
    ...opts,
  }
  const { schema, middlewares, directives, ...options } = settings
  const toDirectives = directives || getDirectives(schema)
  const schemaDirectives = Object.entries(toDirectives).map(directive => {
    return {
      [directive[0]]: directive[1],
    }
  })

  const apollo = new Apollo({
    ...options,
    schema: applyMiddleware(schema, ...middlewares),
    schemaDirectives,
  })

  const path = '/graphql'

  app.use(prerender)
  app.use('/uploads', express.static('uploads'))
  app.use(express.static('public'))

  app.get('*', (req, res) => {
    const index = `${process.cwd()}/public/index.html`
    res.sendFile(index)
  })

  apollo.use = (...params) => {
    return app.use(...params)
  }

  apollo.path = apollo.graphqlPath
  apollo.subscriptions = apollo.subscriptionsPath

  const { combined, stream } = Logger

  apollo.use(rateLimiterMiddleware())
  apollo.use(helmet())
  apollo.use(compression())

  apollo.use(morgan(combined, { stream }))

  apollo.applyMiddleware({ app, path })

  const server = http.createServer(app)
  apollo.installSubscriptionHandlers(server)

  apollo.listen = (...params) => {
    initDB()

    return server.listen(...params)
  }

  return apollo
}

export { ApolloServer }
