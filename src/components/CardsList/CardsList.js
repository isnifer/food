import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import CardsListItem from './CardsListItem'

export default function CardsList(props) {
  function handleOpenRestaurant() {}

  if (props.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  if (props.error) {
    return (
      <View style={styles.container}>
        <Text>{props.error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!!props.count && <Text style={styles.counter}>{props.count} places</Text>}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
        {props.items.map(({ place }) => (
          <TouchableOpacity key={place.id} onPress={handleOpenRestaurant}>
            <CardsListItem item={place} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

CardsList.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  error: PropTypes.string,
}

CardsList.defaultProps = {
  error: null,
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
