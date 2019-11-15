import { split } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { config } from '@/helpers'
import { LOCAL_STORAGE } from '@/constants'
import { StateResolvers, typeDefs, getAppState } from './store'

const { REACT_APP_API, REACT_APP_API_WS } = config

const httpLink = new HttpLink({
  uri: REACT_APP_API,
})

const wsLink = new WebSocketLink({
  uri: REACT_APP_API_WS,
  options: {
    reconnect: true,
  },
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN)
  const Authorization = token ? `Bearer ${token}` : false

  if (!Authorization) {
    return {
      headers,
    }
  }

  return {
    headers: {
      ...headers,
      Authorization,
    },
  }
})

const linkError = ({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
}

const linkSub = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink,
  linkError,
)

const link = authLink.concat(linkSub)

const cache = new InMemoryCache()

const writeState = state => {
  return cache.writeData({ data: { state } })
}

const initState = () => {
  const state = {
    appState: {
      isDarkModeEnabled: true,
    },
    __typename: 'State',
  }

  writeState(state)
}

initState()

const getState = query => {
  return cache.readQuery({ query })
}

export const client = new ApolloClient({
  link,
  cache,
  resolvers: StateResolvers(getState, writeState),
  typeDefs,
})
