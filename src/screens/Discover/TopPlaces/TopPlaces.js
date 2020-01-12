import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import TopPlace from './TopPlace'

const TOP_PLACES = gql`
  {
    places(order_by: { id: asc }, limit: 5) {
      id
      name
      address
      photo
      delivery {
        name
        price
        minimum
      }
      rating: ratings_aggregate {
        aggregate {
          count
          avg {
            rating
          }
        }
      }
    }
  }
`

export default function TopPlaces() {
  const { loading, error, data } = useQuery(TOP_PLACES)

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>{JSON.stringify(error, null, 2)}</Text>
  }

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.places.map((item, index) => (
          <TopPlace key={item.id} item={item} isFirst={index === 0} />
        ))}
      </ScrollView>
    </View>
  )
}
