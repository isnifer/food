import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// AppStack
import Home from './screens/Home'
import Profile from './screens/Profile'
import Restaurants from './screens/Restaurants'

// AuthStack
import Login from './screens/Login'
import VerificationCode from './screens/VerificationCode'
import PhoneVerification from './screens/PhoneVerification'

const AuthStack = createStackNavigator(
  {
    Login,
    VerificationCode,
    PhoneVerification,
  },
  { initialRouteName: 'Login' }
)
const AppStack = createStackNavigator(
  {
    Home,
    Profile,
    Restaurants,
  },
  { initialRouteName: 'Restaurants' }
)

const StackNavigator = createSwitchNavigator(
  {
    // implement this https://reactnavigation.org/docs/en/auth-flow.html
    // AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  { initialRouteName: 'App' }
)

const AppContainer = createAppContainer(StackNavigator)

export default function App() {
  return <AppContainer />
}
