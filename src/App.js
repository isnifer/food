import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './screens/Home'
import Profile from './screens/Profile'

const AppNavigator = createStackNavigator({ Home, Profile }, { initialRouteName: 'Home' })
const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return <AppContainer />
}
