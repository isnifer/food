import { useState, useEffect } from 'react'
import Auth0 from 'react-native-auth0'
import { getGenericPassword } from 'react-native-keychain'
import authCredentials from './auth0-credentials'
import updateCredentials from './updateCredentials'

const auth0 = new Auth0(authCredentials)

export default function useAuthCheck({ navigation }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        // Gettings current securely stored credentials
        const credentials = await getGenericPassword()
        if (!credentials) {
          return setLoading(false)
        }

        const { updatedAt, refreshToken } = JSON.parse(credentials.password)
        if (!updatedAt || !refreshToken) {
          return setLoading(false)
        }

        // Checking last updated time
        const updatedAtSeconds = Math.round(new Date(updatedAt).getTime() / 1000)
        const nowSeconds = Math.round(new Date().getTime() / 1000)

        // If last updated time more than token expiration time — refreshToken
        if (nowSeconds - updatedAtSeconds > 100) {
          const freshCredentials = await auth0.auth.refreshToken({ refreshToken })
          await updateCredentials(Object.assign(freshCredentials, { refreshToken }))
        }

        navigation.navigate('App')
      } catch (error) {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return loading
}
