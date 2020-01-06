import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import MenuListItem from './MenuListItem'

export default function CardsList(props) {
  function handleOpenRestaurant() {}

  function handleShowAllMenuItems() {}

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Full Menu</Text>
        <TouchableOpacity onPress={handleShowAllMenuItems}>
          <Text style={styles.showAllButton}>Show all {'→'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.listContainer}>
        {props.items.map(item => (
          <TouchableOpacity key={item.id} onPress={handleOpenRestaurant}>
            <MenuListItem item={item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

CardsList.propTypes = {
  items: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#26315F',
  },
  showAllButton: {
    fontSize: 16,
    color: '#F93963',
  },
  listContainer: {
    marginTop: 10,
  },
})
