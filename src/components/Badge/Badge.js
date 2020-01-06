import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function Badge(props) {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  )
}

Badge.propTypes = {
  title: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#F93963',
    borderRadius: 10,
    paddingTop: 4,
    paddingBottom: 5,
    paddingHorizontal: 7,
  },
  title: {
    fontSize: 8,
    fontWeight: '600',
    color: '#FFFFFF',
  },
})
