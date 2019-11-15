import { useSubscription, useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'

const creator = fn => {
  return query => {
    return (variables = {}, opts = {}) => fn(query, { ...opts, variables })
  }
}

export const createSubscription = creator(useSubscription)
export const createQuery = creator(useQuery)
export const createMutation = creator(useMutation)
export const createLazyQuery = creator(useLazyQuery)
