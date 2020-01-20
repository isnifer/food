import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import { useLazyQuery } from '@apollo/client'
import { debounce } from 'lodash'
import Input from '@/components/Input'

function SearchInputResults({ searchQuery, loading, error, data, onPress }) {
  if (loading) {
    return (
      <View style={styles.results}>
        <View style={[styles.searchResultItem, styles.searchResultItemFirst]}>
          <Text style={styles.searchResultItemTitle}>Loading...</Text>
        </View>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.results}>
        <Text>{JSON.stringify(error, null, 2)}</Text>
      </View>
    )
  }

  if (searchQuery && data && data.results) {
    return (
      <FlatList
        data={data.results}
        style={styles.results}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.searchResultItem, !index && styles.searchResultItemFirst]}
            onPress={() => onPress(item.id)}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.searchResultItemTitle}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    )
  }

  return null
}

SearchInputResults.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  data: PropTypes.object,
}

SearchInputResults.defaultProps = {
  error: null,
  data: null,
}

function SearchInput({ query, navigation }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [handleSearch, { loading, error, data }] = useLazyQuery(query, {
    variables: {
      query: `%${searchQuery}%`,
    },
  })

  function handlePressPlaces(id) {
    navigation.navigate('RestaurantDetails', { id })
  }

  function handleSubmitEditing() {
    navigation.navigate('SearchResults', { query, searchQuery })
  }

  const resultsVisible = !!searchQuery && (loading || !!data)
  const handleDebouncedSearch = debounce(handleSearch, 600, { trailing: true, maxWait: 1000 })

  function onChangeSerchQuery(searchQueryString) {
    setSearchQuery(searchQueryString.trim())

    handleDebouncedSearch()
  }

  return (
    <View style={styles.container}>
      <Input
        resultsVisible={resultsVisible}
        onChangeText={onChangeSerchQuery}
        onSubmitEditing={handleSubmitEditing}
      />
      <SearchInputResults
        searchQuery={searchQuery}
        loading={loading}
        error={error}
        data={data}
        onPress={handlePressPlaces}
      />
    </View>
  )
}

SearchInput.propTypes = {
  query: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {},
  results: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#C7CAD1',
    borderBottomLeftRadius: 21,
    borderBottomRightRadius: 21,
    maxHeight: 42 * 5 - 1,
  },
  searchResultItem: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: '#C7CAD1',
  },
  searchResultItemFirst: {
    borderTopWidth: 0,
  },
  searchResultItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#26315F',
  },
})

export default withNavigation(SearchInput)
