import { shield } from 'graphql-shield'
import { Query, Mutation } from './resolvers'

export default shield({
  Query,
  Mutation,
})
