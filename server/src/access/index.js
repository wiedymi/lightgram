import { shield } from 'graphql-shield'
import { Query, Mutation, User } from './resolvers'

export default shield({
  Query,
  Mutation,
  User,
})
