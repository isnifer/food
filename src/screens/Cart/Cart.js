import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import PropTypes from 'prop-types'
import { gql, useQuery, useMutation } from '@apollo/client'
import { debounce } from 'lodash'

const LOAD_CART = gql`
  query {
    cart: carts {
      quantity
      product {
        id
        name
        photo
      }
    }
  }
`

const UPDATE_PRODUCT_QUANTITY = gql`
  mutation UpdateProductQuantity($productId: Int!, $quantity: Int!) {
    update_carts(where: { product_id: { _eq: $productId } }, _set: { quantity: $quantity }) {
      returning {
        productId: product_id
        quantity
      }
    }
  }
`

export default function Cart({ navigation }) {
  const { loading, error, data, refetch } = useQuery(LOAD_CART)
  const [updateProductQuantity] = useMutation(UPDATE_PRODUCT_QUANTITY)
  const [temporaryQuantity, setTemporaryQuantity] = useState({})

  function performQuantityUpdate(quantityParams) {
    return Promise.all(
      Object.entries(quantityParams).map(([productId, quantity]) =>
        updateProductQuantity({ variables: { productId: Number(productId), quantity } })
      )
    )
      .then(() => refetch())
      .then(() => setTemporaryQuantity({}))
  }

  const debouncedQuantityUpdate = useCallback(debounce(performQuantityUpdate, 1000), [])

  function handlePressUpdateProductQuantity(productId, quantity) {
    const nextState = { ...temporaryQuantity, [productId]: quantity }

    setTemporaryQuantity(nextState)

    return debouncedQuantityUpdate(nextState)
  }

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', () => {
      refetch()
    })

    return function cleanup() {
      didFocus.remove()
    }
  }, [])

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{JSON.stringify(error, null, 2)}</Text>
      </SafeAreaView>
    )
  }

  if (!data.cart.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.nothingFoundText}>You did not add any product to cart yet</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FlatList
          data={data.cart}
          style={styles.cart}
          keyExtractor={item => `${item.product.id}`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: { quantity: storeQuantity, product } }) => {
            const quantity = temporaryQuantity[product.id] || storeQuantity

            return (
              <View style={styles.cartItem}>
                <View style={styles.productNameContainer}>
                  <Text numberOfLines={1} ellipsizeMode="tail" style={styles.productName}>
                    {product.name}
                  </Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityControl}
                    onPress={() => handlePressUpdateProductQuantity(product.id, quantity + 1)}>
                    <Text style={styles.quantityControlText}>+</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityControl}
                    onPress={() => handlePressUpdateProductQuantity(product.id, quantity - 1)}>
                    <Text style={styles.quantityControlText}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
}

Cart.propTypes = {
  navigation: PropTypes.object.isRequired,
}

Cart.navigationOptions = {
  title: 'Cart',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  cartItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  productNameContainer: {
    maxWidth: '72%',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#26315F',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityControl: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  quantityControlText: {
    fontSize: 24,
    lineHeight: 27,
  },
  quantityValue: {
    marginHorizontal: 10,
  },
})
