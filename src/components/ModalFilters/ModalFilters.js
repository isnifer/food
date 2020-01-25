import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { get, find, merge } from 'lodash'
import { useQuery, gql } from '@apollo/client'
import { withNavigation } from 'react-navigation'
import Modal from 'react-native-modal'
import passFilterValue from '@/utils/passFilterValue'
import FilterList from './FilterList'

const TOP_CATEGORIES = gql`
  {
    categories(order_by: { places_aggregate: { count: desc } }, limit: 6) {
      id
      name
      photo
      places_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

const orderBy = [
  {
    id: 1,
    name: 'Top Rated',
    variables: {
      orderBy: { ratings_aggregate: { avg: { rating: 'asc' } } },
    },
  },
  {
    id: 3,
    name: 'Cost High to Low',
    variables: {
      orderBy: { price: { value: 'desc' } },
    },
  },
  {
    id: 4,
    name: 'Cost Low to High',
    variables: {
      orderBy: { price: { value: 'asc' } },
    },
  },
]

const LOAD_DELIVERIES = gql`
  query {
    deliveries: delivery_types(order_by: { price: asc }) {
      id
      name
    }
  }
`

const LOAD_PRICES = gql`
  query {
    prices {
      id
      name
    }
  }
`

function Filters({ isVisible, toggle, navigation }) {
  const categories = useQuery(TOP_CATEGORIES)
  const deliveries = useQuery(LOAD_DELIVERIES)
  const prices = useQuery(LOAD_PRICES)

  const [selectedCategories, setCategories] = useState({})
  const [selectedSort, setSort] = useState('')
  const [selectedDeliveries, setDeliveries] = useState({})
  const [selectedPrices, setPrices] = useState({})

  function handleResetFilters() {
    toggle()

    navigation.navigate('Discover')
  }

  function handleApplyFilters() {
    toggle()

    let filters = {}

    if (passFilterValue(selectedCategories)) {
      filters = merge({}, filters, {
        where: {
          categories: {
            _or: Object.keys(selectedCategories).map(id => ({
              category_id: { _eq: Number(id) },
            })),
          },
        },
      })
    }

    if (passFilterValue(selectedSort)) {
      filters = merge({}, filters, get(find(orderBy, { id: selectedSort }), 'variables'))
    }

    if (passFilterValue(selectedDeliveries)) {
      filters = merge({}, filters, {
        where: {
          _or: Object.keys(selectedDeliveries).map(id => ({ delivery_id: { _eq: Number(id) } })),
        },
      })
    }

    if (passFilterValue(selectedPrices)) {
      filters = merge({}, filters, {
        where: { _or: Object.keys(selectedPrices).map(id => ({ price_id: { _eq: Number(id) } })) },
      })
    }

    if (passFilterValue(filters)) {
      navigation.navigate('SearchResults', { variables: filters })
    }
  }

  return (
    <Modal style={styles.modal} isVisible={isVisible} onBackButtonPress={toggle}>
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
            {categories.data && (
              <FilterList
                type="tags"
                items={categories.data.categories}
                selected={selectedCategories}
                onPress={setCategories}
              />
            )}
          </View>
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>SORT BY</Text>
            <FilterList type="radio" items={orderBy} selected={selectedSort} onPress={setSort} />
          </View>
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>DELIVERY</Text>
            {deliveries.data && (
              <FilterList
                type="checkbox"
                items={deliveries.data.deliveries}
                selected={selectedDeliveries}
                onPress={setDeliveries}
              />
            )}
          </View>
          <View style={styles.filterGroup}>
            <Text style={styles.filterTitle}>PRICE</Text>
            {prices.data && (
              <FilterList
                type="tags"
                items={prices.data.prices}
                selected={selectedPrices}
                onPress={setPrices}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

Filters.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
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

export default withNavigation(Filters)
