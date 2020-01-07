import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Cards from '@/components/Cards'
import Categories from '@/components/Categories'
import categories from './categories'

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

export default function Home() {
  const places = useQuery(FEATURED_PLACES)
  const [search, setSearch] = useState('') // eslint-disable-line

  function onSubmitEditingSearch() {}
  function handleShowFilters() {}

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

  return (
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity onPress={handleShowFilters}>
          <Image source={require('./images/icon_filter.png')} style={styles.iconFilter} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Discovery new places</Text>
      {renderPlaces(places)}
      <Categories items={categories} />
    </SafeAreaView>
  )
}

Home.navigationOptions = {
  headerShown: false,
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
})
