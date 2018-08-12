import axios from 'axios'
import { api_pagar_me } from '../../config/api_keys'

const url = `https://api.pagar.me/1/transactions?api_key=${api_pagar_me}`

const postTransaction = transaction =>
  axios.post(url, transaction).then(res => res)

export default postTransaction