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
import { useQuery } from '@apollo/client'
import { get } from 'lodash'

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

  return (
    <View style={styles.container}>
      {!!props.count && <Text style={styles.counter}>{props.count} places</Text>}
      <FlatList
        data={props.items}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id} onPress={handleOpenRestaurant}>
            <Text>{item.name}</Text>
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

export default function SearchResults({ navigation }) {
  const query = navigation.getParam('query')
  const searchQuery = navigation.getParam('searchQuery')

  const { loading, error, data } = useQuery(query, { variables: { query: `%${searchQuery}%` } })

  const results = get(data, 'results', [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Results for {'"'}
          {searchQuery}
          {'"'}
        </Text>
      </View>
      <SearchResultstList loading={loading} error={error} items={results} count={results.length} />
    </View>
  )
}

SearchResults.propTypes = {
  navigation: PropTypes.object.isRequired,
}

SearchResults.navigationOptions = {
  headerShown: false,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .7)',
    height: 100,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
  },
})
