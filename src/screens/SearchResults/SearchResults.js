import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
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
        <Text style={styles.nothingFoundText}>Nothing Found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {!!props.count && (
        <Text style={styles.counter}>
          {declensionFilter(props.count, { 1: '@ place found', other: '@ places found' })}
        </Text>
      )}
      <FlatList
        data={props.items}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id} onPress={() => props.onOpenRestaurant(item.id)}>
            <CardsListItem item={item} refetch={props.refetch} />
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

const FILTER_PLACES = gql`
  query FilterPlaces(
    $limit: Int
    $offset: Int
    $orderBy: [places_order_by!]
    $where: places_bool_exp
    $userId: String!
  ) {
    results: places(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
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
    aggregate: places_aggregate(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
  }
`

export default function SearchResults({ navigation }) {
  const userProfile = getSyncProfile()

  const variables = { ...navigation.getParam('variables'), userId: userProfile.id }
  const { loading, error, data, refetch } = useQuery(FILTER_PLACES, { variables })
  const results = get(data, 'results', [])

  function handleOpenRestaurant(id) {
    navigation.navigate('RestaurantDetails', { id })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SearchResultstList
        loading={loading}
        error={error}
        items={results}
        count={results.length}
        refetch={refetch}
        onOpenRestaurant={handleOpenRestaurant}
      />
    </View>
  )
}

SearchResults.propTypes = {
  navigation: PropTypes.object.isRequired,
}

SearchResults.navigationOptions = {
  title: 'Search Results',
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
  nothingFoundText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#26315F',
    marginTop: 16,
    textAlign: 'center',
  },
})
