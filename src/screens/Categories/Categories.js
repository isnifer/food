import React from 'react'
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { get } from 'lodash'
import Input from '@/components/Input'
import CategoryListItem from './CategoryListItem'

const CATEGORIES = gql`
  {
    categories(order_by: { name: asc }) {
      id
      name
      photo
      places_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export default function Categories({ navigation }) {
  const { loading, error, data } = useQuery(CATEGORIES)

  function handlePressItem({ categoryId, photo }) {
    navigation.navigate('Restaurants', { categoryId, photo })
  }

  const categories = get(data, 'categories') || []

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error}</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input placeholder="Search category" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {categories.map((item, index) => (
            <CategoryListItem key={item.id} index={index} item={item} onPress={handlePressItem} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

Categories.propTypes = {
  navigation: PropTypes.object.isRequired,
}

Categories.navigationOptions = {
  headerShown: false,
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingTop: 16,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  list: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
})
