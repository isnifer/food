import React from 'react'
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { get, last, unionBy } from 'lodash'
import Input from '@/components/Input'
import CategoryListItem from './CategoryListItem'

const PAGINATED_CATEGORIES = gql`
  query PaginatedCategories($id: Int!) {
    categories(limit: 20, where: { id: { _gt: $id } }) {
      id
      name
      photo
    }
  }
`

export default function Categories({ navigation }) {
  const { loading, error, data, fetchMore } = useQuery(PAGINATED_CATEGORIES, {
    variables: { id: 0 },
  })
  const categories = get(data, 'categories') || []
  const lastCategoryId = get(last(categories), 'id', 0)

  function handlePressCategory({ categoryId, photo }) {
    navigation.navigate('Restaurants', { categoryId, photo })
  }

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
        <Text>{JSON.stringify(error, null, 2)}</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input placeholder="Search category" />
        </View>
        <FlatList
          style={styles.list}
          data={categories}
          listkey="id"
          numColumns={2}
          columnWrapperStyle={styles.listColumnWrapper}
          onEndReached={() =>
            fetchMore({
              variables: { id: lastCategoryId },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                  return previousResult
                }

                return Object.assign({}, previousResult, {
                  categories: unionBy(previousResult.categories, fetchMoreResult.categories, 'id'),
                })
              },
            })
          }
          renderItem={({ item, index }) => (
            <CategoryListItem
              key={item.id}
              index={index}
              item={item}
              onPress={handlePressCategory}
            />
          )}
        />
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
    padding: 16,
  },
  listColumnWrapper: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
})
