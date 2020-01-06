import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import CardsListItem from './CardsListItem'

export default function CardsList(props) {
  function handleOpenRestaurant() {}

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>122 places</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
        {props.items.map(item => (
          <TouchableOpacity key={item.id} onPress={handleOpenRestaurant}>
            <CardsListItem item={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

CardsList.propTypes = {
  items: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FB',
    padding: 10,
  },
  counter: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: 6,
    marginLeft: 6,
  },
  listContainer: {
    marginTop: 10,
  },
})
