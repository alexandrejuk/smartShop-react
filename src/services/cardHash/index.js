import { client } from 'pagarme'
import Card_creditSpec from '../../utils/card_creditSpec' 
import { encryption_key } from '../../config/api_keys'

const fetchCardHash = card_credit => {
  const cardFormmater = Card_creditSpec(card_credit) 
  const cardCreditSend = {
    card_number: cardFormmater.card_number.slice(0,16),
    card_holder_name: cardFormmater.card_holder_name,
    card_expiration_date: cardFormmater.card_expiration_date.slice(0,4),
    card_cvv: cardFormmater.card_cvv.slice(0,3),
  }
  return client.connect({ encryption_key })
    .then(client => client.security.encrypt(cardCreditSend))
}

export default fetchCardHash