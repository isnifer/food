import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

// AppStack
import Home from './Home'
import Profile from './Profile'
import Restaurants from './Restaurants'
import RestaurantDetails from './RestaurantDetails'
import Checkout from './Checkout'

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
const AppStack = createStackNavigator(
  {
    Home,
    Profile,
    Restaurants,
    RestaurantDetails,
    Checkout,
  },
  { initialRouteName: 'Home' }
)

const StackNavigator = createSwitchNavigator(
  {
    // implement this https://reactnavigation.org/docs/en/auth-flow.html
    // AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  { initialRouteName: 'Auth' }
)

export default createAppContainer(StackNavigator)
