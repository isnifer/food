import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useQuery, gql } from '@apollo/client'
import Cards from '@/components/Cards'
import Categories from '@/components/Categories'
import Filters from '@/components/Filters'

const FEATURED_PLACES = gql`
  {
    places(order_by: { id: asc }, limit: 5) {
      id
      name
      address
      photo
    }
  }
`
const TOP_CATEGORIES = gql`
  {
    categories(order_by: { id: asc }, limit: 5) {
      id
      name
      places_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export default function Discover() {
  const places = useQuery(FEATURED_PLACES)
  const categories = useQuery(TOP_CATEGORIES)
  const [search, setSearch] = useState('') // eslint-disable-line
  const [isFiltersVisible, setFiltersVisibility] = useState(false) // eslint-disable-line

  function onSubmitEditingSearch() {}

  // eslint-disable-next-line
  function renderPlaces({ loading, error, data }) {
    if (loading) {
      return <Text>Loading...</Text>
    }

    if (error) {
      return <Text>{JSON.stringify(error, null, 2)}</Text>
    }

    return <Cards items={data.places} />
  }

  // eslint-disable-next-line
  function renderCategories({ loading, error, data }) {
    if (loading) {
      return <Text>Loading...</Text>
    }

    if (error) {
      return <Text>{JSON.stringify(error, null, 2)}</Text>
    }

    return <Categories items={data.categories} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="rgba(44,44,44,0.4)"
          returnKeyType="next"
          onSubmitEditing={onSubmitEditingSearch}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setSearch(text.trim())}
        />
        <TouchableOpacity onPress={() => setFiltersVisibility(true)}>
          <Image source={require('./images/icon_filter.png')} style={styles.iconFilter} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.title}>Discovery new places</Text>
        {renderPlaces(places)}
        <View style={styles.categories}>{renderCategories(categories)}</View>
      </ScrollView>
      <Filters isVisible={isFiltersVisible} toggle={() => setFiltersVisibility(false)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 42,
    margin: 16,
  },
  input: {
    flex: 1,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    marginRight: 13,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '300',
    color: '#96969A',
    borderWidth: 1,
    borderColor: '#C7CAD1',
  },
  iconFilter: {
    width: 42,
    height: 42,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#26315F',
    marginHorizontal: 16,
  },
  categories: {
    marginTop: 10,
  },
})
