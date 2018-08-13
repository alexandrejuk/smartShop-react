import axios from 'axios'
import { api_pagar_me } from '../../config/api_keys'

const url = 'https://api.pagar.me/1/payables'

const getPayables = () => 
  axios
  .get(`${url}?api_key=${api_pagar_me}`)
  .then(res => res.data)

const getPayableTransaction = transaction_id => 
  axios
    .get(`https://api.pagar.me/1/transactions/${transaction_id}/payables?api_key=${api_pagar_me}`)
    .then(res => res.data)

export {
  getPayables,
  getPayableTransaction
} 
