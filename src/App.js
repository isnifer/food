import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from 'apollo-link-context'
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
  // connectToDevTools: true,
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
