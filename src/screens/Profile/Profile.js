import React from 'react'
import { View, Text, TouchableOpacity, Image, SafeAreaView, StyleSheet } from 'react-native'
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
        <TouchableOpacity activeOpacity={0.6} disabled={loading} onPress={logout}>
          <Text style={styles.buttonLogout}>{loading ? 'Logout...' : 'Logout'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome, {profile.name}!</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: profile.picture }} style={styles.image} />
        </View>
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
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(189, 192, 200, 0.6)',
  },
  buttonLogout: {
    fontSize: 16,
    fontWeight: '600',
    color: '#26315F',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#26315F',
  },
  imageContainer: {
    marginTop: 10,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 255,
    height: 255,
    borderRadius: 20,
  },
})
