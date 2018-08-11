const ParsePrice = (value) => {
  const valueToString = value.toString()
  const valueLegth = valueToString.length
  return valueToString.slice(0, valueLegth - 2) + ',' + valueToString.slice(valueLegth - 2)
}
export default ParsePrice