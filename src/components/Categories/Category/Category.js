import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const categoryIcons = {
  Pizza: {
    icon: require('./images/pizza.png'),
    width: 44,
    height: 44,
  },
  Burgers: {
    icon: require('./images/hamburger.png'),
    width: 44,
    height: 36,
  },
  Steak: {
    icon: require('./images/meat.png'),
    width: 44,
    height: 35,
  },
  Pasta: {
    icon: require('./images/spaguetti.png'),
    width: 44,
    height: 44,
  },
}

export default function Category({ category: { name, ...category }, isFirst }) {
  const { icon, width, height } = categoryIcons[name]
  const places = category.places_aggregate.aggregate.count

  return (
    <View style={[styles.container, isFirst && styles.containerFirst]}>
      <View style={styles.imageContainer}>
        <Image source={icon} style={{ width, height }} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.subtitle}>{places} places</Text>
    </View>
  )
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
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
