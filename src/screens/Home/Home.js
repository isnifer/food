import React, { useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import ModalLogin from '../../components/ModalLogin'

export default function HomeScreen(props) {
  const [modalVisible, setModalVisible] = useState(false)

  function onAuth(credentials, profile) {
    setModalVisible(false)

    props.navigation.navigate('Profile', { credentials, profile })
  }

  return (
    <View style={styles.container}>
      <Button onPress={() => setModalVisible(true)} title="Log In" />
      <ModalLogin modalVisible={modalVisible} onAuth={onAuth} />
    </View>
  )
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

HomeScreen.navigationOptions = {
  title: 'Home',
  headerLeft: () => false,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
