import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { get } from 'lodash'
import Products from '@/components/Products'
import MenuListItem from './MenuListItem'

const RESTAURANT_MENU = gql`
  query Menu($id: Int!) {
    menu: product_categories(where: { place_id: { _eq: $id } }) {
      id
      name
      products {
        id
        name
        photo
        price
        calories
      }
      products_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export default function MenuList(props) {
  const { loading, error, data } = useQuery(RESTAURANT_MENU, { variables: { id: props.placeId } })

  function handleShowAllMenuItems() {}

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    )
  }

  const products = get(data.menu, [0, 'products']) || []

  if (!products.length) {
    return (
      <View style={{ flex: 1, marginTop: 150, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 32, fontWeight: '700', color: '#26315F', textAlign: 'center' }}>
          Sorry, but restaurant did not provide menu for us yet
        </Text>
      </View>
    )
  }

  return (
    <View>
      <Products items={products} />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Full Menu</Text>
          <TouchableOpacity onPress={handleShowAllMenuItems}>
            <Text style={styles.showAllButton}>Show all {'→'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
          {data.menu.map(item => (
            <MenuListItem key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

MenuList.propTypes = {
  placeId: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#26315F',
  },
  showAllButton: {
    fontSize: 16,
    color: '#F93963',
  },
  listContainer: {
    marginTop: 10,
  },
})
