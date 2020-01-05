import React, { useState, useRef } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default function LoginForm(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const passwordInput = useRef(null)
  const onSubmitEditingUsername = () => {
    passwordInput.current.focus()
  }

  function validateLogin() {
    if (!username.length) {
      setUsernameError(true)
    }
    if (!password.length) {
      setPasswordError(true)
    }

    if (usernameError === false && passwordError === false) {
      props.realmLogin(username, password)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email or username"
          placeholderTextColor="rgba(44,44,44,0.4)"
          returnKeyType="next"
          onSubmitEditing={onSubmitEditingUsername}
          style={[styles.input, usernameError && styles.inputError]}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setUsername(text.trim())}
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={validateLogin}>
          <Text style={styles.button}>LOG IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

LoginForm.propTypes = {
  realmLogin: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flex: 3,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    color: '#333333',
    paddingHorizontal: 10,
    borderColor: '#eaeaea',
    borderWidth: 1.0,
  },
  inputError: {
    borderColor: '#ff0000',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#d34a2e',
    paddingVertical: 20,
    justifyContent: 'center',
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '400',
    fontSize: 20,
  },
})
