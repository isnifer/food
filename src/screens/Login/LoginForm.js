import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'

export default function LoginForm(props) {
  const [isLogin, setFormState] = useState(true)

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
      return isLogin ? props.login(email, password) : props.signup(email, password)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} ehavior="padding" enabled>
      <Text style={styles.title}>{isLogin ? 'Welcome back' : 'Hello there'}</Text>
      <Text style={styles.subtitle}>{isLogin ? 'Login to your account' : 'Create an account'}</Text>
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
          <Text style={styles.buttonTitle}>{isLogin ? 'Login' : 'Sign up'}</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
        <View style={styles.signupBlock}>
          <Text style={styles.signupText}>
            {isLogin ? `Don${"'"}t have an account? ` : 'Already have an account? '}
          </Text>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => setFormState(state => !state)}>
            <Text style={styles.signupButtonTitle}>{isLogin ? 'Sign up' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.googleBlock}>
          <Text style={styles.signupText}>Or login with </Text>
          <TouchableOpacity style={styles.signupButton} onPress={props.google}>
            <Text style={styles.signupButtonTitle}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  google: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 33,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginTop: 30,
  },
  googleBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
