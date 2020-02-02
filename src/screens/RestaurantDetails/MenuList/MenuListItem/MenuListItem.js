import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { gql, useMutation } from '@apollo/client'
import MenuListProduct from './MenuListProduct'

const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductToCart($productId: Int!, $quantity: Int!) {
    insert_carts(objects: { product_id: $productId, quantity: $quantity }) {
      returning {
        product_id
        quantity
      }
    }
  }
`

const REMOVE_PRODUCT_FROM_CART = gql`
  mutation DeleteProductFromCart($productId: Int!) {
    delete_carts(where: { product_id: { _eq: $productId } }) {
      returning {
        product_id
      }
    }
  }
`

export default function MenuListItem({ item: { name, products } }) {
  const [addedProducts, setAddedProducts] = useState({})
  const [isProductsVisible, setProductsVisibility] = useState(false)

  const [addProductToCart, { data }] = useMutation(ADD_PRODUCT_TO_CART)
  const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART)

  function handleAddProduct(productId, value) {
    setAddedProducts(Object.assign({}, addedProducts, { [productId]: value }))

    if (value) {
      addProductToCart({ variables: { productId, quantity: 1 } })
    } else {
      removeProductFromCart({ variables: { productId } })
    }
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
