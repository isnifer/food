import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function FeaturePickup() {
  function handleOrderNow() {}

  return (
    <View style={styles.container}>
      <View style={styles.titlesContainer}>
        <Text style={styles.title}>New! Try Pickup</Text>
        <Text style={styles.subtitle}>Pickup on your time. Your order is ready when you are.</Text>
      </View>
      <TouchableOpacity onPress={handleOrderNow} style={styles.buttonContainer}>
        <Text style={styles.button}>Order now</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 0, 56, .19)',
  },
  titlesContainer: {
    flex: 1,
    marginRight: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F93963',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#26315F',
    marginTop: 4,
  },
  buttonContainer: {
    borderRadius: 6,
    backgroundColor: '#F93963',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
})
