import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { startCase } from 'lodash'

export default function Input(props) {
  const [search, setSearch] = useState('') // eslint-disable-line

  function handleChange(text) {
    const value = text.trim()

    setSearch(value)
    props.onChangeText(value)
  }

  return (
    <TextInput
      style={[styles.input, props.resultsVisible && styles.inputWithResults]}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      autoCorrect={props.autoCorrect}
      autoCapitalize={props.autoCapitalize}
      clearButtonMode={props.clearButtonMode}
      returnKeyType={props.returnKeyType}
      returnKeyLabel={startCase(props.returnKeyType)}
      onChangeText={handleChange}
      onSubmitEditing={props.onSubmitEditing}
      onBlur={props.onBlur}
    />
  )
}

Input.propTypes = {
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  clearButtonMode: PropTypes.string,
  returnKeyType: PropTypes.string,
  resultsVisible: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.func,
}

Input.defaultProps = {
  placeholder: 'Search',
  placeholderTextColor: 'rgba(44,44,44,0.4)',
  autoCapitalize: 'none',
  autoCorrect: false,
  clearButtonMode: 'always',
  returnKeyType: 'search',
  resultsVisible: false,
  onSubmitEditing: () => {},
  onChangeText: () => {},
  onBlur: () => {},
}

const styles = StyleSheet.create({
  input: {
    height: 42,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#96969A',
    borderWidth: 1,
    borderColor: '#C7CAD1',
    borderRadius: 21,
  },
  inputWithResults: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
})
