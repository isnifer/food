import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  Modal,
  Alert,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import Auth0 from 'react-native-auth0'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import authCredentials from '../../auth0-credentials'

const auth0 = new Auth0(authCredentials)

export default function LoginModal(props) {
  async function onSuccess(credentials) {
    try {
      const profile = await auth0.auth.userInfo({ token: credentials.accessToken })
      props.onAuth(credentials, profile)
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

  async function webAuth(connection) {
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
    form = <LoginForm realmLogin={realmLogin} />
  } else {
    form = <SignupForm createUser={createUser} />
  }

  return (
    <Modal animationType="slide" transparent={false} visible={props.modalVisible}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} source={require('./images/logo.png')} />
          <Text style={styles.title}>Auth0</Text>
        </View>
        <View style={styles.tabContainer}>
          <Button onPress={() => setViewLogin(true)} title="Log In" />
          <Button onPress={() => setViewLogin(false)} title="Sign up" />
        </View>
        <View style={styles.socialContainer}>
          <TouchableHighlight onPress={() => webAuth('facebook')}>
            <Image style={styles.socialIcon} source={require('./images/facebook.png')} />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => webAuth('google-oauth2')}>
            <Image style={styles.socialIcon} source={require('./images/google.png')} />
          </TouchableHighlight>
        </View>
        <View style={styles.formContainer}>{form}</View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

LoginModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    flex: 2,
  },
  headerContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
  },
  socialContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    marginTop: 10,
    width: 100,
    textAlign: 'center',
    fontSize: 16,
  },
  socialIcon: {
    marginTop: 10,
  },
})
