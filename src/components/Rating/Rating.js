import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import declensionFilter from '@/utils/declensionFilter'

export default function Rating({ rating, count }) {
  const countText = declensionFilter(count, { 1: '@ vote', other: '@ votes' })

  return (
    <View style={styles.ratingContainer}>
      <Image source={require('./images/icon_star.png')} style={styles.iconStar} />
      <Text style={styles.ratingValue}> {rating} </Text>
      {!!count && <Text style={styles.ratingCount}>({countText})</Text>}
    </View>
  )
}

Rating.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  count: PropTypes.number,
}

Rating.defaultProps = {
  rating: 0,
  count: 0,
}

const styles = StyleSheet.create({
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
