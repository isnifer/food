import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useQuery, gql } from '@apollo/client'
import { Placeholder, PlaceholderMedia, PlaceholderLine, Shine } from 'rn-placeholder'
import { range } from 'lodash'
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
    return (
      <View style={{ flexDirection: 'row' }}>
        {range(3).map(item => (
          <View key={item} style={{ paddingLeft: 16 }}>
            <Placeholder Animation={Shine} style={{ width: 88, marginLeft: item ? 200 : 0 }}>
              <PlaceholderMedia style={{ width: 200, height: 200 }} />
              <PlaceholderLine style={{ width: 120, marginTop: 20, height: 10 }} />
              <PlaceholderLine style={{ width: 150, marginTop: 20, height: 10 }} />
              <PlaceholderLine style={{ width: 180, marginTop: 20, height: 10 }} />
            </Placeholder>
          </View>
        ))}
      </View>
    )
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
