import React, { Component } from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

export default class ProfileScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.credentials = props.navigation.state.params.credentials
    this.profile = props.navigation.state.params.profile
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    headerLeft: () => <Button title="Logout" onPress={() => navigation.navigate('Home')} />,
  })

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome {this.profile.name}</Text>
        <Image source={{ uri: this.profile.picture }} style={{ width: 100, height: 100 }} />
        <Text>{JSON.stringify(this.profile, null, 2)}</Text>
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
  header: {
    fontWeight: '300',
    padding: 20,
  },
})
