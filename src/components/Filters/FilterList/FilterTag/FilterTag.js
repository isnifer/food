import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function FilterTag({ item, checked, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={() => onPress(item.id)}>
      <Text style={[styles.name, checked && styles.nameActive]}>{item.name}</Text>
    </TouchableOpacity>
  )
}

FilterTag.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  checked: PropTypes.bool,
}

FilterTag.defaultProps = {
  checked: false,
}

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C7CAD1',
    borderWidth: 1,
    borderColor: '#C7CAD1',
    borderRadius: 15,
    paddingHorizontal: 13,
    paddingTop: 8,
    paddingBottom: 7,
  },
  nameActive: {
    color: '#F93963',
    borderColor: '#F93963',
  },
})
