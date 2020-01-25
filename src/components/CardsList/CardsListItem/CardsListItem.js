import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation'
import { gql, useMutation } from '@apollo/client'
import { getSyncProfile } from '@/utils/auth/syncProfile'
import Rating from '@/components/Rating'
import Spacer from '@/components/Spacer'

const ADD_FAVORITE = gql`
  mutation AddFavorite($id: Int!, $userId: String!) {
    insert_place_favorites(objects: { place_id: $id, user_id: $userId }) {
      affected_rows
    }
  }
`

const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($id: Int!, $userId: String!) {
    delete_place_favorites(where: { place_id: { _eq: $id }, user_id: { _eq: $userId } }) {
      affected_rows
    }
  }
`

function CardsListItem({ item: { id, name, address, photo, isFavorited }, refetch, navigation }) {
  const userProfile = getSyncProfile()

  const variables = { id, userId: userProfile.id }

  const [addFavorite] = useMutation(ADD_FAVORITE, { variables })
  const [removeFavorite] = useMutation(REMOVE_FAVORITE, { variables })

  function handleManageBookmark() {
    if (isFavorited.aggregate.count) {
      return removeFavorite().then(() => refetch())
    }

    return addFavorite().then(() => refetch())
  }

  function handleOpenRestaurant() {
    navigation.navigate('RestaurantDetails', { id })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleOpenRestaurant}>
      <Image source={{ uri: photo }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <View style={styles.titlesContainer}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.addressContainer}>
              <Image source={require('./images/icon_location.png')} style={styles.iconLocation} />
              <Text style={styles.address}>{address}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleManageBookmark}>
            <Image
              source={require('./images/icon_bookmark.png')}
              style={[isFavorited.aggregate.count && styles.iconBookmarkSelected]}
            />
          </TouchableOpacity>
        </View>
        <Spacer />
        <Rating />
      </View>
    </TouchableOpacity>
  )
}

CardsListItem.propTypes = {
  item: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default withNavigation(CardsListItem)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingLeft: 16,
    marginTop: 6,
    marginBottom: 16,
    marginHorizontal: 6,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderRadius: 8,
    flexDirection: 'row',
  },
  image: {
    width: 98,
    height: 98,
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titlesContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '900',
    color: '#26315F',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexShrink: 1,
    marginTop: 6,
  },
  address: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B9BDC5',
    flex: 1,
    flexShrink: 1,
    marginLeft: 5,
  },
  iconLocation: {
    width: 11,
    height: 16,
  },
  iconBookmarkSelected: {
    tintColor: 'orange',
  },
})
