import React, { Component } from 'react'
import { Modal } from 'react-native'
import PropTypes from 'prop-types'
import Login from '../Login'

export default class LoginModal extends Component {
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    onAuth: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Modal animationType="slide" transparent={false} visible={this.props.modalVisible}>
        <Login onAuth={this.props.onAuth} />
      </Modal>
    )
  }
}
