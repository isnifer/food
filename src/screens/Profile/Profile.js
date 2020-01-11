import React from 'react'
import { View, Text, Button, Image, SafeAreaView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import useAuth from '@/utils/auth/useAuth'
import useProfile from '@/utils/auth/useProfile'

export default function Profile({ navigation }) {
  const profile = useProfile()
  const {
    handlers: [logout],
    loading,
  } = useAuth(['logout'], { navigation })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button title={loading ? 'Logout...' : 'Logout'} disabled={loading} onPress={logout} />
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
