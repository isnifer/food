import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function Product({ item }) {
  const { title, price, url } = item

  return (
    <View style={[styles.container]}>
      <Image source={{ uri: url }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  )
}

Product.propTypes = {
  item: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    marginRight: 16,
  },
  image: {
    width: 200,
    height: 120,
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#26315F',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#B9BDC5',
    marginTop: 3,
  },
})
