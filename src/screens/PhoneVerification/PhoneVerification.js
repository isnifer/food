import React, { useState, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'

export default function VerificationCode() {
  const [number1, setNumber1] = useState('')
  const number1Ref = useRef(null)

  const [number2, setNumber2] = useState('')
  const number2Ref = useRef(null)

  const [number3, setNumber3] = useState('')
  const number3Ref = useRef(null)

  const [number4, setNumber4] = useState('')
  const number4Ref = useRef(null)

  function recentCode() {
    console.log('recentCode')
  }

  function handleSetNumber1(codePart) {
    setNumber1(codePart)
    number2Ref.current.focus()
  }

  function handleSetNumber2(codePart) {
    setNumber2(codePart)
    number3Ref.current.focus()
  }

  function handleSetNumber3(codePart) {
    setNumber3(codePart)
    number4Ref.current.focus()
  }

  function handleSetNumber4(codePart) {
    setNumber4(codePart)

    if (number1 && number2 && number3 && codePart) {
      alert('You have entered code:', [number1, number2, number3, codePart].join(''))
    }
  }

  function alert(title, message) {
    return Alert.alert(title, message, [{ text: 'OK' }], { cancelable: false })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Verification</Text>
      <Text style={styles.subtitle}>Enter your OTP code here</Text>
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus
          caretHidden
          maxLength={1}
          returnKeyType="next"
          style={[
            styles.input,
            number1 && styles.inputFilled,
            !number1 && number1Ref.current && number1Ref.current.isFocused() && styles.inputFocused,
          ]}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          ref={number1Ref}
          onChangeText={handleSetNumber1}
        />
        <TextInput
          caretHidden
          maxLength={1}
          returnKeyType="next"
          style={[
            styles.input,
            number2 && styles.inputFilled,
            !number2 && number2Ref.current && number2Ref.current.isFocused() && styles.inputFocused,
          ]}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          ref={number2Ref}
          onChangeText={handleSetNumber2}
        />
        <TextInput
          caretHidden
          maxLength={1}
          returnKeyType="next"
          style={[
            styles.input,
            number3 && styles.inputFilled,
            !number3 && number3Ref.current && number3Ref.current.isFocused() && styles.inputFocused,
          ]}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          ref={number3Ref}
          onChangeText={handleSetNumber3}
        />
        <TextInput
          caretHidden
          maxLength={1}
          returnKeyType="next"
          style={[
            styles.input,
            number4 && styles.inputFilled,
            !number4 && number4Ref.current && number4Ref.current.isFocused() && styles.inputFocused,
          ]}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          ref={number4Ref}
          onChangeText={handleSetNumber4}
        />
      </View>
      <View style={styles.socialBlock}>
        <Text style={styles.socialText}>Didn{"'"}t you receive any code?</Text>
        <TouchableOpacity style={styles.socialButton} onPress={recentCode}>
          <Text style={styles.socialButtonTitle}>Resent new code</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: 70,
  },
  input: {
    height: 48,
    width: 48,
    backgroundColor: '#ECEDF1',
    borderRadius: 24,
    marginHorizontal: 17,
    fontSize: 20,
    fontWeight: '900',
    color: '#96969A',
    textAlign: 'center',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  inputFilled: {
    backgroundColor: '#F93963',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 26,
  },
  inputFocused: {
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  socialBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  socialText: {
    fontSize: 18,
    fontWeight: '300',
    color: '#97979B',
  },
  socialButton: {
    marginTop: 10,
  },
  socialButtonTitle: {
    fontSize: 18,
    fontWeight: '300',
    color: '#F93963',
  },
})
