import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './screens/Home'
import Login from './screens/Login'
import Profile from './screens/Profile'
import VerifyPhone from './screens/VerifyPhone'
import VerificationCode from './screens/VerificationCode'

const StackNavigator = createStackNavigator(
  {
    Home,
    Login,
    Profile,
    VerifyPhone,
    VerificationCode,
  },
  {
    initialRouteName: 'VerifyPhone',
  }
)

const AppContainer = createAppContainer(StackNavigator)

export default function App() {
  return <AppContainer />
}
