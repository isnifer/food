import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function Category({ category, isFirst }) {
  const { icon, title, places, width, height } = category

  return (
    <View style={[styles.container, isFirst && styles.containerFirst]}>
      <View style={styles.imageContainer}>
        <Image source={icon} style={{ width, height }} />
      </View>
      <Text style={styles.title}>{title}</Text>
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
  title: {
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
