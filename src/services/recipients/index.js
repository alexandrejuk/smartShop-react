import axios from 'axios'
import { api_pagar_me } from '../../config/api_keys'

const url = `https://api.pagar.me/1/recipients?api_key=${api_pagar_me}`
const getRecipients = () => axios.get(url).then(res => res.data)

export default getRecipients
