import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { withNavigation } from 'react-navigation'
import TopCategory from './TopCategory'

const TOP_CATEGORIES = gql`
  {
    categories(order_by: { id: asc }, limit: 10) {
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

function Categories(props) {
  const { loading, error, data } = useQuery(TOP_CATEGORIES)

  function handleShowAllCategories() {
    props.navigation.navigate('Categories')
  }

  function handlePressCategory({ id, photo }) {
    props.navigation.navigate('Restaurants', { categoryId: id, photo })
  }

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>{JSON.stringify(error, null, 2)}</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Top Categories</Text>
        <TouchableOpacity onPress={handleShowAllCategories}>
          <Text style={styles.showAllButton}>Show all {'>'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        {data.categories.map((category, index) => (
          <TopCategory
            key={category.id}
            category={category}
            isFirst={index === 0}
            onPress={handlePressCategory}
          />
        ))}
      </ScrollView>
    </View>
  )
}

Categories.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#26315F',
  },
  showAllButton: {
    fontSize: 16,
    color: '#26315F',
  },
  categoriesContainer: {
    paddingTop: 16,
  },
})

export default withNavigation(Categories)
