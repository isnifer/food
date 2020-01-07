import React from 'react'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { getGenericPassword } from 'react-native-keychain'
import AppContainer from './screens'

const httpLink = createHttpLink({ uri: 'https://com-isnifer-food.herokuapp.com/v1/graphql' })

const authLink = setContext(async (_, { headers }) => {
  let credentials = {}

  try {
    credentials = await getGenericPassword()
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error) // eslint-disable-line no-console
  }

  return {
    headers: {
      ...headers,
      authorization: credentials.username ? `Bearer ${credentials.username}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  )
}
