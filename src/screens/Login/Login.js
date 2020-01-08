import React, { useState, useEffect } from 'react'
import {
  View,
  Alert,
  Image,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import Auth0 from 'react-native-auth0'
import { getGenericPassword, setGenericPassword } from 'react-native-keychain'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import authCredentials from '../../auth0-credentials'

const auth0 = new Auth0(authCredentials)

export default function Login(props) {
  const [viewLogin, setViewLogin] = useState(true)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        // Gettings current securely stored credentials
        const credentials = await getGenericPassword()
        const { updatedAt, refreshToken } = JSON.parse(credentials.password)

        if (!updatedAt || !refreshToken) {
          return setIsInitialLoading(false)
        }

        console.log(credentials)

        // Checking last updated time
        const updatedAtSeconds = Math.round(new Date(updatedAt).getTime() / 1000)
        const nowSeconds = Math.round(new Date().getTime() / 1000)

        // If last updated time more than token expiration time — refreshToken
        if (nowSeconds - updatedAtSeconds > 60) {
          const freshCredentials = await auth0.auth.refreshToken({ refreshToken })

          onSuccess(Object.assign(freshCredentials, { refreshToken }))
        } else {
          props.navigation.navigate('Home')
        }
      } catch (error) {
        // XXX: THINK ABOUT IT
        alert('Error', JSON.stringify(error, null, 2))
        setIsInitialLoading(false)
      }
    }

    checkAuth()
  }, [])

  async function updateCredentials({ idToken, accessToken, refreshToken }) {
    const { updatedAt } = await auth0.auth.userInfo({ token: accessToken })

    return setGenericPassword(idToken, JSON.stringify({ accessToken, refreshToken, updatedAt }))
  }

  async function onSuccess(credentials) {
    // Store the session idToken
    await updateCredentials(credentials)

    props.navigation.navigate('Home')
  }

  function alert(title, message) {
    return Alert.alert(title, message, [{ text: 'OK' }], { cancelable: false })
  }

  if (isInitialLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' }}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  async function realmLogin(username, password) {
    try {
      const credentials = await auth0.auth.passwordRealm({
        username,
        password,
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email offline_access',
        audience: `https://${authCredentials.domain}/userinfo`,
      })
      await onSuccess(credentials)
    } catch ({ json }) {
      alert('Error', json.error_description)
    }
  }

  async function createUser(email, password) {
    try {
      await auth0.auth.createUser({
        email,
        password,
        connection: 'Username-Password-Authentication',
      })
      alert('Success', 'New user created')
    } catch ({ json }) {
      alert('Error', json.description)
    }
  }

  async function googleLogin(connection = 'google-oauth2') {
    try {
      const credentials = await auth0.webAuth.authorize({
        connection,
        scope: 'openid profile email offline_access',
        audience: `https://${authCredentials.domain}/userinfo`,
      })
      await onSuccess(credentials)
    } catch ({ error }) {
      alert('Error', error.error_description)
    }
  }

  let form = null
  if (viewLogin) {
    form = (
      <LoginForm
        realmLogin={realmLogin}
        googleLogin={googleLogin}
        switchToSignUp={() => setViewLogin(false)}
      />
    )
  } else {
    form = (
      <SignupForm
        createUser={createUser}
        googleLogin={googleLogin}
        switchToLogin={() => setViewLogin(true)}
      />
    )
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.photos}>
        <Image style={styles.photo} source={require('./images/login_photo.jpg')} />
      </View>
      <View style={styles.formContainer}>{form}</View>
    </KeyboardAvoidingView>
  )
}

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
}

Login.navigationOptions = {
  headerShown: false,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  photo: {
    width: '100%',
    height: 350,
  },
  formContainer: {
    flex: 2,
    marginTop: -15,
    paddingTop: 33,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  socialContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    marginTop: 10,
  },
})
