import gql from 'graphql-tag'

export const NEW_POST = gql`
  subscription {
    subPosts {
      id
      image {
        small
      }
      user {
        email
        username
      }
      time
    }
  }
`

export const STATS = gql`
  subscription {
    stats {
      users
      posts
    }
  }
`
