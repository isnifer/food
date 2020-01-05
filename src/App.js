import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './screens/Home'
import Login from './screens/Login'
import Profile from './screens/Profile'
import VerificationCode from './screens/VerificationCode'
import PhoneVerification from './screens/PhoneVerification'

const StackNavigator = createStackNavigator(
  {
    Home,
    Login,
    Profile,
    VerificationCode,
    PhoneVerification,
  },
  {
    initialRouteName: 'Login',
  }
)

const AppContainer = createAppContainer(StackNavigator)

export default function App() {
  return <AppContainer />
}
