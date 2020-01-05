import React, { useState } from 'react'
import { View, Alert, Image, StatusBar, KeyboardAvoidingView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Auth0 from 'react-native-auth0'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import authCredentials from '../../auth0-credentials'

const auth0 = new Auth0(authCredentials)
const pictureURI = [
  'https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1',
  'ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
].join('&')

export default function Login(props) {
  async function onSuccess(credentials) {
    try {
      const profile = await auth0.auth.userInfo({ token: credentials.accessToken })
      props.navigation.navigate('Profile', { credentials, profile })
    } catch ({ json }) {
      alert('Error', json.error_description)
    }
  }

  function alert(title, message) {
    return Alert.alert(title, message, [{ text: 'OK' }], { cancelable: false })
  }

  async function realmLogin(username, password) {
    try {
      const credentials = await auth0.auth.passwordRealm({
        username,
        password,
        realm: 'Username-Password-Authentication',
        scope: 'openid profile email',
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
        scope: 'openid profile email',
        audience: `https://${authCredentials.domain}/userinfo`,
      })
      await onSuccess(credentials)
    } catch ({ error }) {
      alert('Error', error.error_description)
    }
  }

  const [viewLogin, setViewLogin] = useState(true)

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
      <StatusBar hidden />
      <View style={styles.photos}>
        <Image style={styles.photo} source={{ uri: pictureURI }} />
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
