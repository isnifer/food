import React, { useState, useRef } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default function LoginForm(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const passwordInput = useRef(null)
  const onSubmitEditingUsername = () => {
    passwordInput.current.focus()
  }

  function validateLogin() {
    if (!email.length) {
      setUsernameError(true)
    }
    if (!password.length) {
      setPasswordError(true)
    }

    if (emailError === false && passwordError === false) {
      props.realmLogin(email, password)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(44,44,44,0.4)"
          returnKeyType="next"
          onSubmitEditing={onSubmitEditingUsername}
          style={[styles.input, emailError && styles.inputError]}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setEmail(text.trim())}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(44,44,44,0.4)"
          secureTextEntry
          returnKeyType="go"
          autoCapitalize="none"
          autoCorrect={false}
          style={[styles.input, passwordError && styles.inputError]}
          ref={passwordInput}
          onChangeText={text => setPassword(text.trim())}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={validateLogin}>
          <Text style={styles.buttonTitle}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
        <View style={styles.signupBlock}>
          <Text style={styles.signupText}>Don{"'"}t have an account? </Text>
          <TouchableOpacity style={styles.signupButton} onPress={props.switchToSignUp}>
            <Text style={styles.signupButtonTitle}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

LoginForm.propTypes = {
  realmLogin: PropTypes.func.isRequired,
  switchToSignUp: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: '800',
    textAlign: 'center',
    color: '#26315F',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#96969A',
    marginTop: 10,
    fontWeight: '300',
  },
  inputContainer: {
    flex: 3,
    flexDirection: 'column',
    paddingHorizontal: 30,
    marginTop: 35,
  },
  input: {
    height: 48,
    backgroundColor: '#ECEDF1',
    borderRadius: 24,
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#96969A',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  buttonContainer: {
    marginTop: 28,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F93963',
  },
  buttonTitle: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '400',
    fontSize: 16,
    paddingTop: 14,
  },
  forgotPassword: {
    fontSize: 18,
    fontWeight: '600',
    color: '#26315F',
    textAlign: 'center',
    marginTop: 34,
  },
  signupBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
  },
  signupText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#97979B',
  },
  signupButtonTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#F93963',
  },
})
