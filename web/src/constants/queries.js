import gql from 'graphql-tag'

export const USERS = gql`
  query {
    users(offset: 0, limit: 10) {
      docs {
        id
        username
        email
      }
    }
  }
`
export const FEED = gql`
  query feed($offset: Int! = 0, $limit: Int! = 10) {
    feed(offset: $offset, limit: $limit) {
      docs {
        id
        image {
          small
        }
        body
        user {
          username
        }
        time
      }
      totalDocs
    }
  }
`
