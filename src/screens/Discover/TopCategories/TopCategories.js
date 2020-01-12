import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { withNavigation } from 'react-navigation'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine } from 'rn-placeholder'
import { range } from 'lodash'
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

// eslint-disable-next-line
function renderContent({ loading, data, handlePressCategory }) {
  if (loading) {
    return (
      <View style={{ flexDirection: 'row', paddingTop: 16 }}>
        {range(5).map(item => (
          <View key={item} style={{ paddingLeft: 16 }}>
            <Placeholder Animation={Shine} style={{ width: 88, marginLeft: item ? 88 : 0 }}>
              <PlaceholderMedia style={{ width: 88, height: 88 }} />
              <PlaceholderLine style={{ width: 44, marginTop: 9, height: 10 }} />
              <PlaceholderLine style={{ width: 66, height: 10 }} />
            </Placeholder>
          </View>
        ))}
      </View>
    )
  }

  return (
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
  )
}

function Categories(props) {
  const { loading, error, data } = useQuery(TOP_CATEGORIES)

  function handleShowAllCategories() {
    props.navigation.navigate('Categories')
  }

  function handlePressCategory({ id, photo }) {
    props.navigation.navigate('Restaurants', { categoryId: id, photo })
  }

  if (error) {
    return <Text>{JSON.stringify(error, null, 2)}</Text>
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Top Categories</Text>
        <TouchableOpacity onPress={handleShowAllCategories}>
          <Text style={styles.showAllButton}>Show all {'>'}</Text>
        </TouchableOpacity>
      </View>
      {renderContent({ loading, data, handlePressCategory })}
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
