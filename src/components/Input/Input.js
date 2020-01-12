import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function Input(props) {
  const [search, setSearch] = useState('') // eslint-disable-line

  function handleChange(text) {
    const value = text.trim()

    setSearch(value)
    props.onChangeText(value)
  }

  return (
    <TextInput
      style={styles.input}
      returnKeyType={props.returnKeyType}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      autoCorrect={props.autoCorrect}
      autoCapitalize={props.autoCapitalize}
      onChangeText={handleChange}
      onSubmitEditing={props.onSubmitEditing}
    />
  )
}

Input.propTypes = {
  returnKeyType: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
}

Input.defaultProps = {
  returnKeyType: 'search',
  placeholder: 'Search',
  placeholderTextColor: 'rgba(44,44,44,0.4)',
  autoCapitalize: 'none',
  autoCorrect: false,
  onSubmitEditing: () => {},
  onChangeText: () => {},
}

const styles = StyleSheet.create({
  input: {
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#96969A',
    borderWidth: 1,
    borderColor: '#C7CAD1',
  },
})
