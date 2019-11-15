import { or } from 'graphql-shield'
import { isGuest, isAuthenticated } from './permissions'

export const Query = {
  users: isGuest,
  feed: or(isGuest, isAuthenticated),
}

export const Mutation = {
  createUser: isGuest,
}
