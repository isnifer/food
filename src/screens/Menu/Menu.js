import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Menu() {
  return (
    <View style={styles.container}>
      <Text>Menu</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
