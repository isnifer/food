import React, { useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client'

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

let navi

export default function Order({ navigation }) {
  const { loading, error, data, refetch } = useQuery(LOAD_CART)

  useEffect(() => {
    function SUPER_DUPER_CALL() {
      console.log('didFocus')
      refetch()
    }

    const didFocus = navigation.addListener('didFocus', SUPER_DUPER_CALL)

    return function cleanup() {
      console.log('cleanup')

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
        <Text style={styles.title}>Order Screen</Text>
        <FlatList
          data={data.cart}
          style={styles.results}
          keyExtractor={item => `${item.product.id}`}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: { quantity, product } }) => (
            <View style={styles.cartItem}>
              <Text numberOfLines={1} ellipsizeMode="tail">
                {product.name} ({quantity})
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

Order.propTypes = {
  navigation: PropTypes.object.isRequired,
}

Order.navigationOptions = {
  title: 'Cart',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#26315F',
  },
})
