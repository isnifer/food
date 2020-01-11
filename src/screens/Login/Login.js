import React from 'react'
import { View, StatusBar, ImageBackground, KeyboardAvoidingView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import useAuth from '@/utils/auth/useAuth'
import useAuthCheck from '@/utils/auth/useAuthCheck'
import LoginForm from './LoginForm'

export default function Login({ navigation }) {
  const authCheckInProgress = useAuthCheck({ navigation })
  const {
    handlers: [login, signup, google],
    loading,
  } = useAuth(['login', 'signup', 'google'], { navigation })

  if (authCheckInProgress) {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.photo} source={require('./images/login_photo.jpg')} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground style={styles.photo} source={require('./images/login_photo.jpg')}>
        <View style={{ flex: 0.4 }} />
        <LoginForm loading={loading} login={login} signup={signup} google={google} />
      </ImageBackground>
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
  },
  photo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
})
