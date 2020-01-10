import React, { useEffect, useState } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { getProfileInfo } from '@/utils/manageProfileInfo'

export default function ProfileScreen() {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    getProfileInfo().then(setProfile)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome {profile.name}</Text>
      <Image source={{ uri: profile.picture }} style={{ width: 100, height: 100 }} />
    </View>
  )
}

ProfileScreen.navigationOptions = ({ navigation }) => ({
  title: 'Profile',
  headerLeft: () => <Button title="Logout" onPress={() => navigation.navigate('Login')} />,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: '300',
    padding: 20,
  },
})
