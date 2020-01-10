import React from 'react'
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function FilterListItem({ item, checked, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={() => onPress(item.id)}>
      <Text style={[styles.name, checked && styles.nameActive]}>{item.name}</Text>
      {checked && (
        <Image source={require('./images/icon_checkmark.png')} style={styles.iconCheckmark} />
      )}
    </TouchableOpacity>
  )
}

FilterListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  checked: PropTypes.bool,
}

FilterListItem.defaultProps = {
  checked: false,
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(189, 192, 200, .6)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    color: '#26315F',
  },
  nameActive: {
    color: '#F93963',
  },
  iconCheckmark: {
    width: 20,
    height: 16,
  },
})
