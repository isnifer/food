import { useState } from 'react'
import { Alert } from 'react-native'
import invariant from 'invariant'
import Auth0 from 'react-native-auth0'
import { getGenericPassword, setGenericPassword } from 'react-native-keychain'
import authCredentials from './auth0-credentials'
import updateCredentials from './updateCredentials'

const auth0 = new Auth0(authCredentials)

function alert(title, message) {
  return Alert.alert(title, message, [{ text: 'OK' }], { cancelable: false })
}

async function login(username, password) {
  return auth0.auth
    .passwordRealm({
      username,
      password,
      realm: 'Username-Password-Authentication',
      scope: 'openid profile email offline_access',
      audience: `https://${authCredentials.domain}/userinfo`,
    })
    .then(updateCredentials)
}

async function signup(email, password) {
  return auth0.auth
    .createUser({
      email,
      password,
      connection: 'Username-Password-Authentication',
    })
    .then(() => login(email, password))
}

async function google() {
  return auth0.webAuth
    .authorize({
      connection: 'google-oauth2',
      scope: 'openid profile email offline_access',
      audience: `https://${authCredentials.domain}/userinfo`,
    })
    .then(updateCredentials)
}

async function logout() {
  const credentials = await getGenericPassword()
  const { refreshToken } = JSON.parse(credentials.password)

  await auth0.auth.revoke({ refreshToken })
  await setGenericPassword(
    '',
    JSON.stringify({ accessToken: null, refreshToken: null, updatedAt: null })
  )
}

const availableTypes = { login, signup, google, logout }

export default function useAuth(types, { navigation, onSuccess, onError = alert } = {}) {
  invariant(navigation || onSuccess, 'You should `navigation` prop or `onSuccess` callback')

  const [loading, setLoading] = useState(false)

  function wrapAuthHandler(authHandler, type) {
    return async function doAuth(email, password) {
      try {
        setLoading(true)

        await authHandler(email, password)

        if (navigation) {
          navigation.navigate(type === 'logout' ? 'Login' : 'App')
        } else {
          onSuccess()
        }
      } catch (error) {
        onError(JSON.stringify(error, null, 2))
      } finally {
        setLoading(false)
      }
    }
  }

  const handlers = types.map(type => {
    const handler = availableTypes[type]

    invariant(handler, `You tried to do login by incorrect type: ${type}`)

    return wrapAuthHandler(handler, type)
  })

  return { handlers, loading }
}
