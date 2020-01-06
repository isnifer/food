import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Rating from '@/components/Rating'
import Spacer from '@/components/Spacer'

export default function CardsListItem({ item }) {
  const { title, subtitle, url } = item

  function handleAddBookmark() {}

  return (
    <View style={styles.container}>
      <Image source={{ uri: url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.titlesContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.subtitleContainer}>
              <Image source={require('./images/icon_location.png')} style={styles.iconLocation} />
              <Text style={styles.subtitle}> {subtitle}</Text>
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
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderRadius: 8,
    marginHorizontal: 6,
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
  titlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#26315F',
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B9BDC5',
  },
  iconLocation: {
    width: 11,
    height: 16,
  },
})
