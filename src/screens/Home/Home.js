import React, { Component } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import ModalLogin from '../../components/ModalLogin'

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    title: 'Home',
    headerLeft: () => false,
  }

  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
    }
  }

  onAuth = (credentials, profile) => {
    this.setState({ modalVisible: false }, () =>
      this.props.navigation.navigate('Profile', { credentials, profile })
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.setState({ modalVisible: true })} title="Log In" />
        <ModalLogin modalVisible={this.state.modalVisible} onAuth={this.onAuth} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
