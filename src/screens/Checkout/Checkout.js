import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
// import PropTypes from 'prop-types'

const addresses = [
  { id: 1, title: 'HOME ADDRESS', address: '214 Levent\\Besiktas Apt.002' },
  { id: 2, title: 'WORK ADDRESS', address: '301 Makro\\Ankara Apt.124' },
]

const paymentMethods = [
  { id: 'paypal', icon: require('./images/paypal.png'), text: 'isnifer@gmail.com' },
  { id: 'visa', icon: require('./images/visa.png'), text: '**** **** **** 1234' },
  { id: 'mastercard', icon: require('./images/mastercard.png'), text: '**** **** **** 5678' },
]

// eslint-disable-next-line max-len
const iconChecked = require('@/components/MenuList/MenuListItem/MenuListProduct/images/icon_checked.png')

export default function Checkout() {
  const [selectedAddress, setAddress] = useState(1)
  const [selectedPaymentMethod, setPaymentMethod] = useState('visa')

  function handlePressAddress(id) {
    setAddress(id === selectedAddress ? null : id)
  }

  function handlePressPaymentMethod(id) {
    setPaymentMethod(id === selectedPaymentMethod ? null : id)
  }

  function handlePressPayment() {}

  return (
    <View style={styles.container}>
      <View style={styles.credentials}>
        <View style={styles.addressList}>
          <Text style={styles.title}>DELIVERY ADDRESS</Text>
          {addresses.map(({ id, title, address }) => (
            <TouchableOpacity onPress={() => handlePressAddress(id)} key={id}>
              <View
                style={[
                  styles.addressListItem,
                  id === selectedAddress && styles.addressListItemSelected,
                ]}>
                <View style={styles.addressListItemHeader}>
                  <Text style={styles.addressListItemTitle}>{title}</Text>
                  <Text style={styles.addressListItemStreet}>{address}</Text>
                </View>
                {id === selectedAddress && (
                  <Image source={iconChecked} style={styles.iconChecked} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.paymentMethods}>
          <Text style={styles.title}>PAYMENT METHOD</Text>
          {paymentMethods.map(({ id, icon, text }) => (
            <TouchableOpacity onPress={() => handlePressPaymentMethod(id)} key={id}>
              <View
                style={[
                  styles.paymentMethodsItem,
                  id === selectedPaymentMethod && styles.paymentMethodsItemSelected,
                ]}>
                <View style={styles.paymentMethodsItemHeader}>
                  <Image source={icon} />
                  <Text style={styles.paymentMethodsItemText}>{text}</Text>
                </View>
                {id === selectedPaymentMethod && (
                  <Image source={iconChecked} style={styles.iconChecked} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={handlePressPayment} style={styles.paymentButton}>
          <Text style={styles.paymentText}>Payment</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.touchIdContainer}>
        <Image source={require('./images/fingerprint.png')} />
        <Text style={styles.touchIdTitle}>Pay with Touch ID</Text>
      </View>
    </View>
  )
}

// Checkout.propTypes = {
//   navigation: PropTypes.object.isRequired,
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  credentials: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.11,
    shadowRadius: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#26315F',
  },
  addressListItem: {
    height: 58,
    backgroundColor: '#F5F8FB',
    borderWidth: 1,
    borderColor: '#F2F3F5',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  addressListItemSelected: {
    backgroundColor: '#E7F9F5',
    borderWidth: 1,
    borderColor: '#10CA87',
  },
  addressListItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10CA88',
  },
  addressListItemStreet: {
    fontSize: 14,
    fontWeight: '700',
    color: '#26315F',
    marginTop: 3,
  },
  paymentMethodsItem: {
    height: 58,
    backgroundColor: '#F5F8FB',
    borderWidth: 1,
    borderColor: '#F2F3F5',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  paymentMethodsItemSelected: {
    backgroundColor: '#E7F9F5',
    borderWidth: 1,
    borderColor: '#10CA87',
  },
  paymentMethodsItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodsItemText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#26315F',
    marginLeft: 16,
  },
  iconChecked: {
    width: 24,
    height: 24,
    tintColor: '#10CA88',
  },
  paymentMethods: {
    marginTop: 38,
  },
  touchIdContainer: {
    marginTop: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchIdTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#26315F',
    marginTop: 16,
  },
  paymentButton: {
    backgroundColor: '#F93963',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingTop: 14,
    paddingBottom: 15,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
})
