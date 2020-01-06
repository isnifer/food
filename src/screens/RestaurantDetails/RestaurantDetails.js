import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native'
import PropTypes from 'prop-types'
import Badge from '@/components/Badge'
import Products from '@/components/Products'
import MenuList from '@/components/MenuList'
import FeaturePickup from './FeaturePickup'
import products from './products.json'
import categories from './categories.json'

const uri = [
  'https://images.unsplash.com/photo-1532768907235-78653b7dc71d?ixlib=rb-1.2.1&',
  'ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
].join('&')

export default function RestaurantDetails({ navigation: { state } }) {
  const { name = 'Cuotro Formaggie Soup', address = '299 Levent\\Besiktas' } = state.params || {}

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={{ uri }} style={styles.image}>
        <SafeAreaView>
          <View style={styles.safeContainer}>
            <Badge title="Free Delivery" />
            <Text style={styles.name}>{name}</Text>
            <View style={styles.addressContainer}>
              <Image
                source={require('@/components/CardsList/CardsListItem/images/icon_location.png')}
                style={styles.iconLocation}
              />
              <Text style={styles.address}> {address}</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsRating}>
              <View style={styles.statsTitle}>
                <Image
                  source={require('@/components/Rating/images/icon_star.png')}
                  style={styles.iconStar}
                />
                <Text style={styles.ratingValue}> 4.9</Text>
              </View>
              <Text style={styles.ratingCount}>210 ratings</Text>
            </View>
            <View style={styles.statsBookmarks}>
              <View style={styles.statsBookmarksContainer}>
                <View style={styles.statsTitle}>
                  <Image
                    source={require('./images/icon_bookmark.png')}
                    style={styles.iconBookmark}
                  />
                  <Text style={styles.ratingValue}> 90k</Text>
                </View>
                <Text style={styles.ratingCount}>210 ratings</Text>
              </View>
            </View>
            <View style={styles.statsPhotos}>
              <View style={styles.statsPhotosContainer}>
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
      <FeaturePickup />
      <Products items={products} />
      <MenuList items={categories} />
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
    height: 355,
  },
  safeContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 75,
    paddingHorizontal: 12,
  },
  name: {
    fontSize: 30,
    color: '#FFFFFF',
    width: '70%',
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
    marginTop: 38,
    paddingTop: 16,
    paddingBottom: 10,
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
  statsBookmarksContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  statsPhotosContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})
