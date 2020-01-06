import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Card from './Card'

export default function Cards(props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.items.map(({ url, title, subtitle }, index) => (
          <Card
            key={url}
            pictureURI={{ uri: url }}
            title={title}
            subtitle={subtitle}
            isFirst={index === 0}
          />
        ))}
      </ScrollView>
    </View>
  )
}

Cards.propTypes = {
  items: PropTypes.array.isRequired,
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
})
