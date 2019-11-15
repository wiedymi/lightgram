import gql from 'graphql-tag'

export const typeDefs = gql`
  type appState {
    isDarkModeEnabled: Boolean
  }
`

export const getAppState = gql`
  query {
    state @client {
      appState {
        isDarkModeEnabled
      }
    }
  }
`

export const StateResolvers = (getState, writeState) => {
  return {
    Mutation: {
      updateAppState (_, appState) {
        const state = getState(getAppState)

        const newState = {
          ...state,
          appState: Object.assign({}, state.appState, appState),
        }

        writeState(newState)
        return newState
      },
    },
  }
}
