import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Modal from 'react-native-modal'
import FilterList from './FilterList'

const cuisines = [
  { id: 1, name: 'American' },
  { id: 2, name: 'Turkish' },
  { id: 3, name: 'Asia' },
  { id: 4, name: 'Fast Food' },
  { id: 5, name: 'Pizza' },
  { id: 6, name: 'Desserds' },
  { id: 7, name: 'Mexican' },
]

const sortBy = [
  { id: 1, name: 'Top Rated' },
  { id: 2, name: 'Nearest Me' },
  { id: 3, name: 'Cost High to Low' },
  { id: 4, name: 'Cost Low to High' },
]

const filters = [
  { id: 1, name: 'Open Now' },
  { id: 3, name: 'Credit Card' },
  { id: 4, name: 'Free Delivery' },
]

const prices = [
  { id: 1, name: 'Cheap Eats' },
  { id: 2, name: 'Mid-range' },
  { id: 3, name: 'Fine Dining' },
]

export default function Filters(props) {
  const [selectedCuisines, setCuisine] = useState({})
  const [selectedSort, setSort] = useState('')
  const [selectedFilters, setFilters] = useState({})
  const [selectedPrices, setPrices] = useState({})

  function handleResetFilters() {
    props.toggle()
  }

  function handleApplyFilters() {
    props.toggle()
  }

  return (
    <Modal style={styles.modal} isVisible={props.isVisible} onBackButtonPress={props.toggle}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleResetFilters}>
              <Text style={styles.buttonReset}>Reset</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={handleApplyFilters}>
              <Text style={styles.buttonDone}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>CUISINES</Text>
            <FilterList
              type="tags"
              items={cuisines}
              selected={selectedCuisines}
              onPress={setCuisine}
            />
          </View>
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>SORT BY</Text>
            <FilterList type="radio" items={sortBy} selected={selectedSort} onPress={setSort} />
          </View>
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>FILTER</Text>
            <FilterList
              type="checkbox"
              items={filters}
              selected={selectedFilters}
              onPress={setFilters}
            />
          </View>
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>PRICE</Text>
            <FilterList type="tags" items={prices} selected={selectedPrices} onPress={setPrices} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

Filters.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(189, 192, 200, .6)',
  },
  buttonReset: {
    fontSize: 18,
    fontWeight: '600',
    color: '#26315F',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#26315F',
  },
  buttonDone: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F93963',
  },
  filterGroup: {
    paddingVertical: 16,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C7CAD1',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
})
