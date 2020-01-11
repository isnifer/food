import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import Badge from '@/components/Badge'
import Rating from '@/components/Rating'

function Card({ item, isFirst, navigation }) {
  const {
    id,
    name,
    address,
    photo,
    delivery,
    rating: { aggregate: rating },
  } = item

  function handlePressStore() {
    navigation.navigate('RestaurantDetails', { id })
  }

  const stylesContainer = [styles.container, isFirst && styles.containerFirst]

  return (
    <TouchableOpacity activeOpacity={0.8} style={stylesContainer} onPress={handlePressStore}>
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
      <View style={styles.infoContainer}>
        {!!rating.count && (
          <Rating rating={rating.avg.rating.toPrecision(2)} count={rating.count} />
        )}
        {delivery && <Badge title={delivery.name} />}
      </View>
    </TouchableOpacity>
  )
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
  isFirst: PropTypes.bool.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default withNavigation(Card)

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
