import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default function ProfileScreen({ navigation: { state } }) {
  const { profile } = state.params

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome {profile.name}</Text>
      <Image source={{ uri: profile.picture }} style={{ width: 100, height: 100 }} />
      <Text>{JSON.stringify(profile, null, 2)}</Text>
    </View>
  )
}

ProfileScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

ProfileScreen.navigationOptions = ({ navigation }) => ({
  title: 'Profile',
  headerLeft: () => <Button title="Logout" onPress={() => navigation.navigate('Home')} />,
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
