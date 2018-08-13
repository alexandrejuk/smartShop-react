import React, { Component } from 'react'
import './index.css'

import ParsePrice from '../../utils/price'

import {  
  getPayables,
} from '../../services/payables'
import getRecipients from '../../services/recipients'

export default class Payables extends Component {

  constructor(props) {
    super(props);
    this.state = {
      payables: [],
      recipients: [],
    }
  
  }

  componentDidMount() {
    getPayables().then(payables => this.setState({ payables }))
    getRecipients().then(recipients => this.setState({ recipients }))
  }

  sumAmountValue = (prev, acc) => prev + acc.amount
  
  payableRecipients = () => {
    const transactionID = parseInt(this.props.match.params.id)
    const { payables, recipients } = this.state
    const payableLastTransaction = payables.filter(payable => payable.transaction_id === transactionID)
    
    return recipients
      .map(recipient => {
        const payableRecipient = payableLastTransaction.find(pay => pay.recipient_id === recipient.id)
        if(payableRecipient) {
          return { id: recipient.id, name: recipient.bank_account.legal_name, amount: payableRecipient.amount }
        }
        return { id: recipient.id, name: recipient.bank_account.legal_name, amount: 0 }
      })
      .filter(recipient => recipient.amount > 0)

  }

  render() {
    return( 
      <main className="main-payables">

        <div className="main-header-payables">
          <h3>Dados da Transação</h3>
        </div>

        <div className="card-payables">
          <div className="card-header-payables">
            <h2 className="title-payables">Transação #{this.props.match.params.id}</h2>
          </div>

          <div className="card-body-payables">
            <h3>Recebedores / 3</h3>
              {
                this.payableRecipients()
                  .map(
                    recipient => 
                      <div key={recipient.id}>
                        <div className="recipient">
                          <h4>{recipient.name}</h4>
                           <h4>R$ {ParsePrice(recipient.amount)}</h4>
                        </div>
                      </div>
                )
              }
          </div>
        </div>
      </main>
    )
  }
}
