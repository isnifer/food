import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Modal from 'react-native-modal'

export default function ModalOrderStatus({ isVisible, hideModal }) {
  function handlePressContinue() {
    hideModal()
  }

  function handlePressGoToOrders() {
    hideModal()
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={hideModal} onBackButtonPress={hideModal}>
      <View style={styles.container}>
        <Image source={require('./images/icon_success.png')} style={styles.iconStatus} />
        <Text style={styles.title}>Your order is{'\n'}successfully.</Text>
        <Text style={styles.subtitle}>
          You can track the delivery in the{'\n'}
          {'"'}Orders{'"'} section.
        </Text>
        <TouchableOpacity onPress={handlePressContinue} style={styles.continueButtonContainer}>
          <Text style={styles.continueButtonTitle}>Continue Shopping</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressGoToOrders} style={styles.goToOrdersButtonContainer}>
          <Text style={styles.goToOrdersButtonTitle}>Go to orders</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

ModalOrderStatus.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    paddingTop: 55,
    borderRadius: 20,
  },
  iconStatus: {
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#26315F',
    marginTop: 16,
    alignSelf: 'center',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#26315F',
    marginTop: 16,
    alignSelf: 'center',
    textAlign: 'center',
  },
  continueButtonContainer: {
    backgroundColor: '#F93963',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 85,
    paddingTop: 14,
    paddingBottom: 15,
  },
  continueButtonTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  goToOrdersButtonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 15,
  },
  goToOrdersButtonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#BABEC6',
  },
})
