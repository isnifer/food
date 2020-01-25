import React from 'react'
import { View, Text, ImageBackground, StatusBar, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { get } from 'lodash'
import { getSyncProfile } from '@/utils/auth/syncProfile'
import CardsList from '@/components/CardsList'

const RESTAURANTS_BY_CATEGORY = gql`
  query RestaurantsByCategory($id: Int!, $userId: String!) {
    category: categories_by_pk(id: $id) {
      name
      photo
      stats: places_aggregate {
        aggregate {
          count
        }
      }
      places {
        place {
          id
          name
          photo
          address
          delivery {
            name
          }
          isFavorited: favorites_aggregate(where: { user_id: { _eq: $userId } }) {
            aggregate {
              count
            }
          }
        }
      }
    }
  }
`

export default function Restaurants({ navigation }) {
  const userProfile = getSyncProfile()
  const variables = { id: navigation.getParam('categoryId'), userId: userProfile.id }

  const { loading, error, data, refetch } = useQuery(RESTAURANTS_BY_CATEGORY, { variables })
  const name = get(data, 'category.name', '')
  const places = get(data, 'category.places', [])
  const count = get(data, 'category.stats.aggregate.count', 0)
  const photo = get(data, 'category.photo', '') || navigation.getParam('photo')

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: photo }}
        blurRadius={photo ? 0 : 10}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.photoMask}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </ImageBackground>
      <CardsList loading={loading} error={error} items={places} count={count} refetch={refetch} />
    </View>
  )
}

Restaurants.propTypes = {
  navigation: PropTypes.object.isRequired,
}

Restaurants.navigationOptions = {
  headerShown: false,
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
