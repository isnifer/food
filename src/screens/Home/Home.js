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
import Cards from '@/components/Cards'
import Categories from '@/components/Categories'
import pictures from './pictures.json'
import categories from './categories'

export default function Discover() {
  const [search, setSearch] = useState('')

  function onSubmitEditingSearch() {}

  function handleShowFilters() {}

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
      <Cards items={pictures} />
      <Categories items={categories} />
    </SafeAreaView>
  )
}

Discover.navigationOptions = {
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
