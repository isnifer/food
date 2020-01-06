import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Badge from '@/components/Badge'

export default function Card(props) {
  return (
    <View style={[styles.container, props.isFirst && styles.containerFirst]}>
      <Image source={props.pictureURI} style={styles.image} />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.ratingContainer}>
          <Image source={require('./images/icon_star.png')} style={styles.iconStar} />
          <Text style={styles.ratingValue}> 4.9 </Text>
          <Text style={styles.ratingCount}>(120 ratings)</Text>
        </View>
        <Badge title="Free delivery" />
      </View>
    </View>
  )
}

Card.propTypes = {
  pictureURI: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  isFirst: PropTypes.bool.isRequired,
}

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
    height: 250,
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#26315F',
    marginTop: 16,
  },
  subtitle: {
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
