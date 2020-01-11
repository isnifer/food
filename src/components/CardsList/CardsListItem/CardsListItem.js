import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Rating from '@/components/Rating'
import Spacer from '@/components/Spacer'

export default function CardsListItem({ item: { name, address, photo } }) {
  function handleAddBookmark() {}

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <View style={styles.titlesContainer}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.addressContainer}>
              <Image source={require('./images/icon_location.png')} style={styles.iconLocation} />
              <Text style={styles.address}>{address}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleAddBookmark}>
            <Image source={require('./images/icon_bookmark.png')} />
          </TouchableOpacity>
        </View>
        <Spacer />
        <Rating />
      </View>
    </View>
  )
}

CardsListItem.propTypes = {
  item: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingLeft: 16,
    marginTop: 6,
    marginBottom: 16,
    marginHorizontal: 6,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderRadius: 8,
    flexDirection: 'row',
  },
  image: {
    width: 98,
    height: 98,
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titlesContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '900',
    color: '#26315F',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexShrink: 1,
    marginTop: 6,
  },
  address: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B9BDC5',
    flex: 1,
    flexShrink: 1,
    marginLeft: 5,
  },
  iconLocation: {
    width: 11,
    height: 16,
  },
})
