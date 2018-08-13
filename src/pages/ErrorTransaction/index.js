import React, { Component } from 'react'
import './index.css'

import errorImage from '../../assets/img/icons/error.png'

export default class ErrorTransaction extends Component {
  render() {
    return (
      <main className="main-container">
        <div className="body-main-error">
          <div className="body-error">
            <img src={errorImage} alt='credit_cart_error'/>
            <h3>Não foi possível processar sua transação tente novamente mais tarde!</h3>
          </div>
        </div> 
      </main>
    )
  }
}
