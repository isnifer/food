import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function CategoryListItem({ item, onPress }) {
  function handlePressCategory() {
    return onPress({ categoryId: item.id, photo: item.photo })
  }

  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={handlePressCategory}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.photo }} resizeMode="cover" style={styles.image} />
      </View>
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  )
}

CategoryListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: 16,
  },
  imageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#rgba(0, 0, 0, .6)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  image: {
    height: 150,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#26315F',
    textAlign: 'center',
    marginTop: 5,
  },
})
