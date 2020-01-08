import React from 'react'
import { View, Text, ImageBackground, StatusBar, StyleSheet } from 'react-native'
import CardsList from '@/components/CardsList'
import pictures from './pictures.json'

const uri = [
  'https://images.unsplash.com/photo-1542528406-f04308dcf0a1?ixlib=rb-1.2.1',
  'ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60',
].join('&')

const restaurants = [
  ...pictures,
  ...pictures.map(item => ({ ...item, id: item.id + 10 })),
  ...pictures.map(item => ({ ...item, id: item.id + 20 })),
  ...pictures.map(item => ({ ...item, id: item.id + 30 })),
  ...pictures.map(item => ({ ...item, id: item.id + 40 })),
  ...pictures.map(item => ({ ...item, id: item.id + 50 })),
]

export default function Restaurants() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={{ uri }} style={styles.image}>
        <Text style={styles.title}>Turkish{'\n'}Restaurants</Text>
      </ImageBackground>
      <CardsList items={restaurants} />
    </View>
  )
}

Restaurants.navigationOptions = {
  headerShown: false,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 235,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .2)',
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
  },
})
