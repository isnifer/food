import { isPlainObject, isNil, every, compact } from 'lodash'

export default function passFilterValue(value) {
  if (!value || value === '') {
    return undefined
  }

  if (Array.isArray(value) && !compact(value).length) {
    return undefined
  }

  if (isPlainObject(value)) {
    const isEveryValueNullOrFalseOrEmptyArray = every(
      Object.values(value),
      x => isNil(x) || x === false || !passFilterValue(x)
    )

    if (isEveryValueNullOrFalseOrEmptyArray) {
      return undefined
    }

    return value
  }

  return value
}
