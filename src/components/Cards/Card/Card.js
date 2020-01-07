import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Rating from '@/components/Rating'

export default function Card({ item, isFirst }) {
  const { name, address, photo } = item

  return (
    <View style={[styles.container, isFirst && styles.containerFirst]}>
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
      <Rating />
    </View>
  )
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
  isFirst: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    marginRight: 16,
  },
  containerFirst: {
    marginLeft: 16,
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: '900',
    color: '#26315F',
    marginTop: 16,
  },
  address: {
    fontSize: 14,
    fontWeight: '300',
    color: '#B9BDC5',
    marginTop: 10,
  },
})
