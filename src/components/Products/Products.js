import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Product from './Product'

export default function Products(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Items</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.items.map(item => (
          <Product key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  )
}

Products.propTypes = {
  items: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginLeft: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#26315F',
    marginBottom: 14,
  },
})
