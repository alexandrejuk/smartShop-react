import { client } from 'pagarme'
import Card_creditSpec from '../../utils/card_creditSpec' 

const fetchCardHash = card_credit => {
  return client.connect({ encryption_key: 'ek_test_8Tevcd9yfp9BORb0l5WhVdnK3OTCOL' })
    .then(client => client.security.encrypt(Card_creditSpec(card_credit)))
}

export default fetchCardHash