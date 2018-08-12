import { applySpec, prop }  from 'ramda'
import RemoveMask from '../replaceMask'

const removeMaskProp = propName => object => RemoveMask(prop(propName, object))

const card_creditSpec = {
  card_number: removeMaskProp('card_number'),
  card_holder_name: prop('card_holder_name'),
  card_expiration_date: removeMaskProp('card_expiration_date'),
  card_cvv: removeMaskProp('card_cvv'),
}
export default applySpec(card_creditSpec)
  