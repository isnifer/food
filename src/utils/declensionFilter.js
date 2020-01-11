export default function declensionFilter(value, variants = {}) {
  return (variants[value] || variants.other || '').replace('@', value)
}
