import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { getGenericPassword } from 'react-native-keychain'
import { getSyncProfile } from './utils/auth/syncProfile'
import AppContainer from './screens'

const httpLink = createHttpLink({ uri: 'https://com-isnifer-food.herokuapp.com/v1/graphql' })

const authLink = setContext(async (_, { headers }) => {
  let credentials = {}

  const { id } = getSyncProfile()

  try {
    credentials = await getGenericPassword()
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error) // eslint-disable-line no-console
  }

  // console.log(`Bearer ${credentials.username}`)

  return {
    headers: {
      ...headers,
      authorization: credentials.username ? `Bearer ${credentials.username}` : '',
      'x-hasura-user-id': id,
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
