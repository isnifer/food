import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import MenuListProduct from './MenuListProduct'

export default function MenuListItem({ item: { name, products } }) {
  const [addedProducts, setAddedProducts] = useState({})
  const [isProductsVisible, setProductsVisibility] = useState(false)

  function handleAddProduct(productId, value) {
    setAddedProducts(Object.assign({}, addedProducts, { [productId]: value }))
  }

  function handlePressMenuItem() {
    setProductsVisibility(!isProductsVisible)
  }

  return (
    <View>
      <TouchableOpacity onPress={handlePressMenuItem} style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.counterContainer}>
          <Text style={styles.counter}>{products.length} </Text>
          <Text style={styles.arrow}>{isProductsVisible ? '↓' : '→'}</Text>
        </View>
      </TouchableOpacity>
      {isProductsVisible &&
        products.map(product => (
          <MenuListProduct
            key={product.id}
            item={product}
            isAdded={addedProducts[product.id]}
            handleAdd={handleAddProduct}
          />
        ))}
    </View>
  )
}

MenuListItem.propTypes = {
  item: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(189, 192, 200, 0.6)',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#26315F',
  },
  counterContainer: {
    flexDirection: 'row',
  },
})
