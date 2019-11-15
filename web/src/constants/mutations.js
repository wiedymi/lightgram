import gql from 'graphql-tag'

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      username
      email
      id
      token
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        email
        username
        role
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation createPost($file: Upload!) {
    createPost(file: $file) {
      image {
        small
      }
      user {
        username
      }
    }
  }
`
