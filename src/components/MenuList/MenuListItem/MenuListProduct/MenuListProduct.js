import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function MenuListProduct({ item, isAdded, handleAdd }) {
  const { id, name, price } = item

  function handlePressMenuItem() {
    handleAdd(id, !isAdded)
  }

  return (
    <TouchableOpacity onPress={handlePressMenuItem} style={styles.container}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
      <Image
        source={isAdded ? require('./images/icon_checked.png') : require('./images/icon_plus.png')}
      />
    </TouchableOpacity>
  )
}

MenuListProduct.propTypes = {
  item: PropTypes.object.isRequired,
  isAdded: PropTypes.bool.isRequired,
  handleAdd: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F7F8FA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(189, 192, 200, 0.6)',
  },
  name: {
    fontSize: 16,
    color: '#26315F',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B9BDC5',
  },
})
