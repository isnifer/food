import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import FilterListItem from './FilterListItem'
import FilterTag from './FilterTag'

export default function FilterList(props) {
  function isChecked(id) {
    return props.type === 'checkbox' || props.type === 'tags'
      ? props.selected[id]
      : props.selected === id
  }

  function handlePress(id) {
    if (props.type === 'checkbox' || props.type === 'tags') {
      return props.onPress(state => ({ ...state, [id]: !state[id] }))
    }

    return props.onPress(state => (state === id ? '' : id))
  }

  const ItemComponent = props.type === 'tags' ? FilterTag : FilterListItem

  return (
    <View style={[styles.container, props.type === 'tags' && styles.containerTags]}>
      {props.items.map(item => (
        <ItemComponent
          key={item.id}
          item={item}
          type={props.type}
          checked={isChecked(item.id)}
          onPress={handlePress}
        />
      ))}
    </View>
  )
}

FilterList.propTypes = {
  type: PropTypes.oneOf(['checkbox', 'radio', 'tags']).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  selected: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]).isRequired,
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  containerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
})
