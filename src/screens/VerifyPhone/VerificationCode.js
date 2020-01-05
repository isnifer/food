import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function VerificationCode(props) {
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState(null)

  function validatePhoneNumber() {
    setPhoneError(!phone.length)

    if (phoneError === false) {
      props.sendAnSMS(phone)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your{'\n'}phone number</Text>
      <Text style={[styles.subtitle, phoneError === true && styles.subtitleWhite]}>
        We have sent you an SMS with a code to{'\n'} number {phone}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="rgba(44,44,44,0.4)"
          returnKeyType="next"
          style={[styles.input, phoneError && styles.inputError]}
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setPhone(text.trim())}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={validatePhoneNumber}>
        <Text style={styles.buttonTitle}>Next</Text>
      </TouchableOpacity>
      <View style={styles.socialBlock}>
        <Text style={styles.socialText}>Or login with </Text>
        <TouchableOpacity style={styles.socialButton} onPress={props.googleLogin}>
          <Text style={styles.socialButtonTitle}>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

VerificationCode.propTypes = {
  sendAnSMS: PropTypes.func,
  googleLogin: PropTypes.func,
}

VerificationCode.defaultProps = {
  sendAnSMS: () => {},
  googleLogin: () => {},
}

VerificationCode.navigationOptions = {
  title: null,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontWeight: '800',
    fontSize: 35,
    textAlign: 'center',
    color: '#26315F',
    marginTop: 43,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#26315F',
    marginTop: 20,
  },
  subtitleWhite: {
    color: '#FFFFFF',
  },
  inputContainer: {
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
    backgroundColor: '#F93963',
  },
  buttonTitle: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '400',
    fontSize: 16,
    paddingTop: 14,
  },
  socialBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
  },
  socialText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#97979B',
  },
  socialButtonTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#F93963',
  },
})
