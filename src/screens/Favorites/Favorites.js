import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import { gql, useQuery } from '@apollo/client'
import { get } from 'lodash'
import { getSyncProfile } from '@/utils/auth/syncProfile'
import declensionFilter from '@/utils/declensionFilter'
import CardsListItem from '@/components/CardsList/CardsListItem'

function SearchResultstList(props) {
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

  if (!props.items.length) {
    return (
      <View style={styles.container}>
        <Text>Nothing Found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!!props.count && (
        <Text style={styles.counter}>
          {declensionFilter(props.count, { 1: '@ favorite place', other: '@ favorite places' })}
        </Text>
      )}
      <FlatList
        data={props.items}
        keyExtractor={item => `${item.place.id}`}
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
        renderItem={({ item: { place } }) => (
          <TouchableOpacity key={place.id} onPress={() => props.onOpenRestaurant(place.id)}>
            <CardsListItem item={place} refetch={props.refetch} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

SearchResultstList.propTypes = {
  onOpenRestaurant: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
  error: PropTypes.object,
}

SearchResultstList.defaultProps = {
  error: null,
}

const FAVORITES = gql`
  query Favorites($userId: String!) {
    favorites: place_favorites(where: { user_id: { _eq: $userId } }) {
      place {
        id
        name
        photo
        address
        delivery {
          name
        }
        price {
          name
        }
        rating: ratings_aggregate {
          aggregate {
            count
            avg {
              rating
            }
          }
        }
        isFavorited: favorites_aggregate(where: { user_id: { _eq: $userId } }) {
          aggregate {
            count
          }
        }
      }
    }
  }
`

export default function Favorites({ navigation }) {
  const userProfile = getSyncProfile()
  const variables = { userId: userProfile.id }

  const { loading, error, data, refetch } = useQuery(FAVORITES, { variables })
  const favorites = get(data, 'favorites', [])

  function handleOpenRestaurant(id) {
    navigation.navigate('RestaurantDetails', { id })
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SearchResultstList
        loading={loading}
        error={error}
        items={favorites}
        count={favorites.length}
        refetch={refetch}
        onOpenRestaurant={handleOpenRestaurant}
      />
    </SafeAreaView>
  )
}

Favorites.propTypes = {
  navigation: PropTypes.object.isRequired,
}

Favorites.navigationOptions = {
  title: 'Favorites',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  counter: {
    fontSize: 18,
    fontWeight: '600',
    color: '#26315F',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  listContainer: {
    marginTop: 10,
    paddingHorizontal: 12,
  },
})
