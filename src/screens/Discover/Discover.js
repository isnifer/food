import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import ModalFilters from '@/components/ModalFilters'
import Input from '@/components/Input'
import TopCategories from './TopCategories'
import TopPlaces from './TopPlaces'

export default function Discover() {
  const [isFiltersVisible, setFiltersVisibility] = useState(false) // eslint-disable-line

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input />
        </View>
        <TouchableOpacity onPress={() => setFiltersVisibility(true)}>
          <Image source={require('./images/icon_filter.png')} style={styles.iconFilter} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.title}>Discovery new places</Text>
        <View style={styles.topPlaces}>
          <TopPlaces />
        </View>
        <View style={styles.topCategories}>
          <TopCategories />
        </View>
      </ScrollView>
      <ModalFilters isVisible={isFiltersVisible} toggle={() => setFiltersVisibility(false)} />
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
  inputContainer: {
    flex: 1,
    marginRight: 13,
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
  topPlaces: {
    marginTop: 16,
  },
  topCategories: {
    marginTop: 32,
  },
})
