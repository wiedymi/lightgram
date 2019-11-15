import React from 'react'
import { ThemeProvider } from 'styled-components'
import { AccessProvider } from 'react-access-control'

import { ApolloProvider } from '@apollo/react-hooks'
import Router from '@/Router'
import * as theme from '@/theme'
import { client } from './Client'

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AccessProvider>
          <Router />
        </AccessProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default Root
