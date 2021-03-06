import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import Badge from '@/components/Badge'
import Rating from '@/components/Rating'

function TopPlace({ item, isFirst, navigation }) {
  const {
    id,
    name,
    address,
    photo,
    delivery,
    rating: { aggregate },
  } = item

  function handlePressStore() {
    navigation.navigate('RestaurantDetails', { id })
  }

  const stylesContainer = [styles.container, isFirst && styles.containerFirst]
  const rating = aggregate.avg.rating ? aggregate.avg.rating.toPrecision(2) : 0

  return (
    <TouchableOpacity activeOpacity={0.8} style={stylesContainer} onPress={handlePressStore}>
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.address} numberOfLines={1}>
        {address}
      </Text>
      <View style={styles.infoContainer}>
        <Rating rating={rating} count={aggregate.count} />
        {delivery && <Badge title={delivery.name} />}
      </View>
    </TouchableOpacity>
  )
}

TopPlace.propTypes = {
  item: PropTypes.object.isRequired,
  isFirst: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default withNavigation(TopPlace)

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
    height: 200,
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
  infoContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
