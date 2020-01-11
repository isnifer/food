import Auth0 from 'react-native-auth0'
import { setGenericPassword } from 'react-native-keychain'
import authCredentials from './auth0-credentials'
import { setProfileInfo } from './manageProfileInfo'

const auth0 = new Auth0(authCredentials)

export default async function updateCredentials({ idToken, accessToken, refreshToken }) {
  const { updatedAt, ...userInfo } = await auth0.auth.userInfo({ token: accessToken })

  await setProfileInfo({
    email: userInfo.name,
    name: userInfo.nickname,
    picture: userInfo.picture,
  })

  return setGenericPassword(idToken, JSON.stringify({ accessToken, refreshToken, updatedAt }))
}
