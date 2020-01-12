import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { get } from 'lodash'
import declensionFilter from '@/utils/declensionFilter'
import Badge from '@/components/Badge'
import MenuList from './MenuList'
// import FeaturePickup from './FeaturePickup'

const RESTAURANT = gql`
  query Restaurant($id: Int!) {
    restaurant: places_by_pk(id: $id) {
      id
      name
      photo
      address
      delivery {
        name
      }
      ratings: ratings_aggregate {
        aggregate {
          count
          avg {
            rating
          }
        }
      }
    }
  }
`

export default function RestaurantDetails({ navigation }) {
  const id = navigation.getParam('id')
  const { loading, error, data } = useQuery(RESTAURANT, { variables: { id } })

  if (loading) {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator />
      </View>
    )
  }

  if (error) {
    return (
      <View>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator />
      </View>
    )
  }

  const restaurant = get(data, 'restaurant') || {}
  const rating = get(restaurant, 'ratings.aggregate.avg.rating') || 0
  const ratingCount = get(restaurant, 'ratings.aggregate.count')
  const countText = declensionFilter(ratingCount, { 1: '@ vote', other: '@ votes' })

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={{ uri: restaurant.photo }} style={styles.image}>
        <SafeAreaView style={styles.photoMask}>
          <View style={styles.safeContainer}>
            <Badge title="Free Delivery" />
            <Text style={styles.name}>{restaurant.name}</Text>
            <View style={styles.addressContainer}>
              <Image
                source={require('@/components/CardsList/CardsListItem/images/icon_location.png')}
                style={styles.iconLocation}
              />
              <Text style={styles.address}> {restaurant.address}</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsRating}>
              <View style={styles.statsItemContainer}>
                <View style={styles.statsTitle}>
                  <Image
                    source={require('@/components/Rating/images/icon_star.png')}
                    style={styles.iconStar}
                  />
                  <Text style={styles.ratingValue}>{rating ? rating.toPrecision(2) : 0}</Text>
                </View>
                <Text style={styles.ratingCount}>{countText}</Text>
              </View>
            </View>
            <View style={styles.statsBookmarks}>
              <View style={styles.statsItemContainer}>
                <View style={styles.statsTitle}>
                  <Image
                    source={require('./images/icon_bookmark.png')}
                    style={styles.iconBookmark}
                  />
                  <Text style={styles.ratingValue}> 90k</Text>
                </View>
                <Text style={styles.ratingCount}>favorites</Text>
              </View>
            </View>
            <View style={styles.statsPhotos}>
              <View style={styles.statsItemContainer}>
                <View style={styles.statsTitle}>
                  <Image source={require('./images/icon_photo.png')} style={styles.iconPhoto} />
                  <Text style={styles.ratingValue}> 250</Text>
                </View>
                <Text style={styles.ratingCount}>photos</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      {/* <FeaturePickup /> */}
      <MenuList placeId={id} />
    </ScrollView>
  )
}

RestaurantDetails.propTypes = {
  navigation: PropTypes.object.isRequired,
}

RestaurantDetails.navigationOptions = {
  headerShown: false,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
  },
  photoMask: {
    flex: 1,
    height: 355,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },
  safeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 32,
    paddingHorizontal: 12,
  },
  name: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 19,
  },
  address: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E3E7EF',
  },
  iconLocation: {
    width: 11,
    height: 16,
    tintColor: '#E3E7EF',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 12,
    paddingHorizontal: 5,
    paddingVertical: 16,
    borderTopWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  statsTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 3,
  },
  statsRating: {
    flex: 1,
  },
  iconStar: {
    width: 12,
    height: 12,
    tintColor: '#FFFFFF',
  },
  iconBookmark: {
    width: 9,
    height: 13,
  },
  iconPhoto: {
    width: 12,
    height: 10,
  },
  ratingValue: {
    color: '#FFFFFF',
    marginLeft: 2,
  },
  ratingCount: {
    color: '#FFFFFF',
  },
  statsBookmarks: {
    flex: 1.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  statsPhotos: {
    flex: 1,
  },
  statsItemContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
