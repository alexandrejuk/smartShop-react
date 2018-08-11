import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.css'

export default class Card extends Component {

  constructor(props) {
    super(props);
    this.itemCard = this.itemCard.bind(this);
  }
  informationCard = () => (
    <React.Fragment>
      <div className="information-content">
        <img className="icon" src="https://freeiconshop.com/wp-content/uploads/edd/creditcard-flat.png" alt="credit-card" />
        <h3  className="information-text">Até 03x Sem Juros</h3>
      </div>
      <div className="information-content">
        <img className="icon" src="https://cdn3.iconfinder.com/data/icons/purchases-and-sales/512/transpo.png" alt="shipping" />
        <h3  className="information-text">Frete para todo o BR</h3>
        </div>
      <div className="information-content">
        <img className="icon" src="https://freeiconshop.com/wp-content/uploads/edd/wallet-flat.png" alt="cash-boleto" />
        <h3 className="information-text">À vista no boleto bancário</h3>
        </div>
    </React.Fragment>
  )
  
  itemCard = () => {
    const { product } = this.props
    return (
      <React.Fragment>
        <Link className="linkNav" to={`/order/product/${ product.id }`}>
          <div className="item-header">
            <img className="image" src="http://appsisecommerces3.s3.amazonaws.com/clientes/cliente3448/produtos/15594/L4982.jpg" alt="item" />
          </div>
          <div className="item-content">
            <h1>R$ { product.price }</h1>
            <h3>{ product.description }</h3>
          </div>
        </Link>
      </React.Fragment>
    )
  }
  
  cardType = (type) => {
    switch (type) {
      case 'information':
        return this.informationCard()
      default:
      return this.itemCard
    }
  }

  render() {
    const { type } = this.props
    return (
      <div className={`card ${ type }`}>
        {this.cardType(type)}
      </div>
    )
  } 
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  product: PropTypes.object,
}
