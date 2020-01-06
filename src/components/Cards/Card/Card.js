import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Rating from '@/components/Rating'

export default function Card(props) {
  return (
    <View style={[styles.container, props.isFirst && styles.containerFirst]}>
      <Image source={props.pictureURI} style={styles.image} />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
      <Rating />
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
})
