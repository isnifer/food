import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function MenuListProduct({ item, isAdded, handleAdd }) {
  const [photoVisible, setPhotoVisibility] = useState(false)

  const { id, name, price, photo } = item

  function handlePressIconAdd() {
    handleAdd(id, !isAdded)
  }

  function handlePressMenuItem() {
    setPhotoVisibility(state => !state)
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlePressMenuItem} style={styles.container}>
      <View style={styles.menuItem}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
        <TouchableOpacity onPress={handlePressIconAdd}>
          <Image
            source={
              isAdded ? require('./images/icon_checked.png') : require('./images/icon_plus.png')
            }
          />
        </TouchableOpacity>
      </View>
      {photoVisible && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: photo }} style={styles.image} />
        </View>
      )}
    </TouchableOpacity>
  )
}

MenuListProduct.propTypes = {
  item: PropTypes.object.isRequired,
  handleAdd: PropTypes.func.isRequired,
  isAdded: PropTypes.bool,
}

MenuListProduct.defaultProps = {
  isAdded: false,
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(189, 192, 200, 0.6)',
  },
  menuItem: {
    padding: 16,
    backgroundColor: '#F7F8FA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  image: {
    height: 300,
  },
})
