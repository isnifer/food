import React from 'react'
import { Image } from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

// AppStack
import Checkout from './Checkout'
import Categories from './Categories'
import Restaurants from './Restaurants'
import RestaurantDetails from './RestaurantDetails'
import SearchResults from './SearchResults'

// TabNavigator
import Discover from './Discover'
import Cart from './Cart'
import Favorites from './Favorites'
import Profile from './Profile'

// AuthStack
import Login from './Login'
import VerificationCode from './VerificationCode'
import PhoneVerification from './PhoneVerification'

const AuthStack = createStackNavigator(
  {
    Login,
    VerificationCode,
    PhoneVerification,
  },
  { initialRouteName: 'Login' }
)

const icons = {
  Discover: require('./Discover/images/icon_explore.png'),
  Cart: require('./Discover/images/icon_order.png'),
  Favorites: require('./Discover/images/icon_favorites.png'),
  Profile: require('./Discover/images/icon_profile.png'),
}

const TabNavigator = createBottomTabNavigator(
  {
    Discover,
    Cart,
    Favorites,
    Profile,
  },
  {
    initialRouteName: 'Discover',
    order: ['Discover', 'Cart', 'Favorites', 'Profile'],
    defaultNavigationOptions: ({ navigation: { state } }) => ({
      // eslint-disable-next-line
      tabBarIcon: ({ focused, tintColor }) => (
        <Image source={icons[state.routeName]} size={25} style={{ tintColor }} />
      ),
    }),
    tabBarOptions: {
      activeTintColor: '#F93963',
      inactiveTintColor: '#96969A',
    },
  }
)

const AppStack = createStackNavigator(
  {
    Tabs: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => {
        const { routeName } = navigation.state.routes[navigation.state.index]

        return {
          title: routeName,
          headerShown: routeName !== 'Discover' && routeName !== 'Profile',
        }
      },
    },
    Checkout,
    Categories,
    Restaurants,
    RestaurantDetails,
    SearchResults,
  },
  { initialRouteName: 'Tabs' }
)

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
  },
  { initialRouteName: 'Auth' }
)

export default createAppContainer(SwitchNavigator)
