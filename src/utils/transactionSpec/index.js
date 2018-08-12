import { applySpec, prop }  from 'ramda'
import RemoveMask from '../replaceMask'

const removeMaskProp = propName => object => RemoveMask(prop(propName, object))
const addressProp = propName => object => applySpec(addressSpec)(object[propName])
const billingProp = propName => object => applySpec(billingSpec)(object[propName])

const addressSpec ={
  country: prop('country'),
  state: prop('state'),
  city: prop('city'),
  neighborhood: prop('neighborhood'),
  street: prop('street'),
  street_number: prop('street_number'),
  zipcode: removeMaskProp('zipcode'),
}
const billingSpec = {
  name: prop('name'),
  address: addressProp('address'),
}
const transactionSpec = {
  amount: prop('amount'),
  card_hash: prop('card_hash'),
  customer: prop('customer'),
  billing: billingProp('billing'),
  items: prop('items'),
  split_rules: prop('split_rules'),
}
export default applySpec(transactionSpec)
