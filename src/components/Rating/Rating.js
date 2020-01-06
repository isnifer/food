import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Badge from '@/components/Badge'

export default function Rating({ rating, count }) {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.ratingContainer}>
        <Image source={require('./images/icon_star.png')} style={styles.iconStar} />
        <Text style={styles.ratingValue}> {rating} </Text>
        <Text style={styles.ratingCount}>({count} ratings)</Text>
      </View>
      <Badge title="Free delivery" />
    </View>
  )
}

Rating.propTypes = {
  rating: PropTypes.number,
  count: PropTypes.number,
}

Rating.defaultProps = {
  rating: 4.9,
  count: 120,
}

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStar: {
    width: 12,
    height: 11.49,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  ratingCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#B9BDC5',
  },
})
