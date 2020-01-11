import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function Category({ category: { name, photo, ...category }, isFirst, onPress }) {
  const places = category.places_aggregate.aggregate.count
  const stylesContainer = [styles.container, isFirst && styles.containerFirst]

  return (
    <TouchableOpacity style={stylesContainer} onPress={() => onPress({ id: category.id, photo })}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.subtitle}>{places} places</Text>
    </TouchableOpacity>
  )
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  isFirst: PropTypes.bool,
}

Category.defaultProps = {
  isFirst: false,
}

const styles = StyleSheet.create({
  container: {
    width: 88,
    marginRight: 16,
  },
  containerFirst: {
    marginLeft: 16,
  },
  imageContainer: {
    width: 88,
    height: 88,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#26315F',
    marginTop: 9,
  },
  subtitle: {
    fontSize: 14,
    color: '#B9BDC5',
    marginTop: 5,
  },
})
