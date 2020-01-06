import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import CardsListItem from './CardsListItem'

export default function CardsList(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>122 places</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
        {props.items.map(item => (
          <CardsListItem key={item.id} item={item} />
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
  },
  listContainer: {
    marginTop: 16,
  },
})
