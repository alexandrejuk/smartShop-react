import React, { Component } from 'react'
import './index.css'

import ParsePrice from '../../utils/price'

import { getPayableTransaction } from '../../services/payables'
import getRecipients from '../../services/recipients'

export default class Payables extends Component {

  constructor(props) {
    super(props);
    this.state = {
      payables: [],
      recipients: [],
      loadPayable: true,
      loadRecipient: true,
    }
  
  }

  componentDidMount() {
    
    getPayableTransaction(this.props.match.params.id)
      .then(payables => 
        this.setState({ loadPayable: false, payables })
      )

    getRecipients()
      .then(recipients => 
        this.setState({ loadRecipient: false, recipients })
      )
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
    const { loadPayable, loadRecipient } = this.state
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
                (loadPayable && loadPayable)
                ? <h4>Carregando...</h4>
                :
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
