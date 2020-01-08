import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Category from './Category'

export default function Categories(props) {
  function handleShowAllCategories() {}

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Top Categories</Text>
        <TouchableOpacity onPress={handleShowAllCategories}>
          <Text style={styles.showAllButton}>Show all {'>'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        {props.items.map((category, index) => (
          <Category key={category.id} category={category} isFirst={index === 0} />
        ))}
      </ScrollView>
    </View>
  )
}

Categories.propTypes = {
  items: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#26315F',
  },
  showAllButton: {
    fontSize: 16,
    color: '#26315F',
  },
  categoriesContainer: {
    paddingTop: 16,
  },
})
