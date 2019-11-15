import React from 'react'
import { getUsers } from '@/graphql'
import { useAccess } from '@/helpers'
import { ErrorMessage } from './styles'

const Component = () => {
  const { data, loading, error } = getUsers()

  const { isLoaded, hasAccess } = useAccess({
    permissions: {
      'go:read': true,
      'users:read': true,
    },
  })

  const usersAccess = hasAccess('users:read')

  if (!usersAccess) {
    return <div>No access...</div>
  }

  if (loading && isLoaded) {
    return <div>Loading...</div>
  }

  if (error) {
    return <ErrorMessage>Server is not available</ErrorMessage>
  }

  const users = data.users.docs.map(({ username, email, id }) => {
    return (
      <div key={id}>
        <h2>{username}</h2>
        <h4>{email}</h4>
      </div>
    )
  })

  return <div>{users}</div>
}

export default Component
