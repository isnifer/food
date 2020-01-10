import React, { useEffect, useState } from 'react'
import { View, Text, Button, Image, Alert, SafeAreaView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { getGenericPassword, setGenericPassword } from 'react-native-keychain'
import Auth0 from 'react-native-auth0'
import authCredentials from '@/auth0-credentials'
import { getProfileInfo } from '@/utils/manageProfileInfo'

const auth0 = new Auth0(authCredentials)

export default function Profile({ navigation }) {
  const [profile, setProfile] = useState({})
  const [isLogoutInProgress, setLogoutStatus] = useState(false)

  useEffect(() => {
    getProfileInfo().then(setProfile)
  }, [])

  async function handleLogout() {
    setLogoutStatus(true)

    try {
      const credentials = await getGenericPassword()
      const { refreshToken } = JSON.parse(credentials.password)

      await auth0.auth.revoke({ refreshToken })
      await setGenericPassword(
        '',
        JSON.stringify({ accessToken: null, refreshToken: null, updatedAt: null })
      )
    } catch (error) {
      Alert.alert('Can not logout now', error, [{ text: 'OK' }], { cancelable: false })
    } finally {
      setLogoutStatus(false)
    }

    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title={isLogoutInProgress ? 'Logout...' : 'Logout'}
          disabled={isLogoutInProgress}
          onPress={handleLogout}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.header}>Welcome {profile.name}</Text>
        <Image source={{ uri: profile.picture }} style={{ width: 100, height: 100 }} />
      </View>
    </SafeAreaView>
  )
}

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
})
