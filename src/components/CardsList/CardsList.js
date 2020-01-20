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
import { withNavigation } from 'react-navigation'
import CardsListItem from './CardsListItem'

function CardsList(props) {
  function handleOpenRestaurant(id) {
    props.navigation.navigate('RestaurantDetails', { id })
  }

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
        <Text>{JSON.stringify(props.error)}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!!props.count && <Text style={styles.counter}>{props.count} places</Text>}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
        {props.items.map(({ place }) => (
          <TouchableOpacity key={place.id} onPress={() => handleOpenRestaurant(place.id)}>
            <CardsListItem item={place} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

CardsList.propTypes = {
  navigation: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  error: PropTypes.object,
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

export default withNavigation(CardsList)
