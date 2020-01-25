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
import CardsListItem from '@/components/CardsList/CardsListItem'

function SearchResultstList(props) {
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
      {!!props.count && <Text style={styles.counter}>{props.count} places</Text>}
      <FlatList
        data={props.items}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id} onPress={() => handleOpenRestaurant(item.id)}>
            <CardsListItem item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

SearchResultstList.propTypes = {
  loading: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  error: PropTypes.object,
}

SearchResultstList.defaultProps = {
  error: null,
}

const FILTER_STORES = gql`
  query FilterPlaces(
    $limit: Int
    $offset: Int
    $orderBy: [places_order_by!]
    $where: places_bool_exp
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
    }
    aggregate: places_aggregate(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      aggregate {
        count
      }
    }
  }
`

export default function SearchResults({ navigation }) {
  const variables = navigation.getParam('variables')
  const { loading, error, data } = useQuery(FILTER_STORES, { variables })
  const results = get(data, 'results', [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SearchResultstList loading={loading} error={error} items={results} count={results.length} />
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
    marginTop: 16,
    paddingHorizontal: 16,
  },
  listContainer: {
    marginTop: 10,
    paddingHorizontal: 12,
  },
})
