import React from 'react'
import { View, Text, ImageBackground, StatusBar, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { get } from 'lodash'
import CardsList from '@/components/CardsList'

const RESTAURANTS_BY_CATEGORY = gql`
  query RestaurantsByCategory($id: Int!) {
    category: categories_by_pk(id: $id) {
      name
      photo
      stats: places_aggregate {
        aggregate {
          count
        }
      }
      places: places_categories {
        place {
          id
          name
          photo
          address
          delivery {
            name
          }
        }
      }
    }
  }
`

export default function Restaurants({ navigation }) {
  const { loading, error, data } = useQuery(RESTAURANTS_BY_CATEGORY, {
    variables: { id: navigation.getParam('categoryId') },
  })
  const name = get(data, 'category.name', '')
  const places = get(data, 'category.places', [])
  const count = get(data, 'category.stats.aggregate.count', 0)

  const photo = get(data, 'category.photo', '').replace('3x', '2x')
  const photoPlaceholder = navigation.getParam('photo').replace('3x', '2x')

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: photo || photoPlaceholder }}
        blurRadius={photo ? 0 : 10}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.photoMask}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </ImageBackground>
      <CardsList loading={loading} error={error} items={places} count={count} />
    </View>
  )
}

Restaurants.propTypes = {
  navigation: PropTypes.object.isRequired,
}

Restaurants.navigationOptions = {
  headerTransparent: true,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 235,
  },
  photoMask: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .7)',
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
  },
})
