import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './index.css'

import ParsePrice from '../../utils/price'

export default class Card extends Component {

  constructor(props) {
    super(props);
    this.itemCard = this.itemCard.bind(this);
  }
  informationCard = () => (
    <Fragment>
      <div className="information-content">
      <img  className="icon" src={require('../../assets/img/icons/creditcard-flat.png')} alt="credit-card"/>
        <h3  className="information-text">Pague no Cartão</h3>
      </div>
      <div className="information-content">
        <img className="icon" src={require('../../assets/img/icons/transpo.png')} alt="shipping" />
        <h3  className="information-text">Frete para todo o BR</h3>
        </div>
      <div className="information-content">
        <img className="icon" src={require('../../assets/img/icons/wallet-flat.png')} alt="cash-boleto" />
        <h3 className="information-text">Economia na compra</h3>
      </div>
    </Fragment>
  )
  
  itemCard = (product) => {
    const { imagePath } = product
    const price = ParsePrice(product.price)
    return (
      <Fragment>
        <Link className="linkNav" to={`/order/product/${product.id}`}>
          <div className="item-header">
            <img className="image" src={require(`../../assets/img/products/${imagePath}`)} alt="item" />
          </div>
          <div className="item-content">
            <h1>R$ { price }</h1>
            <h3>{ product.description }</h3>
          </div>
        </Link>
      </Fragment>
    )
  }
  
  cardType = ({ type, product }) => {
    switch (type) {
      case 'information':
        return this.informationCard()
      default:
      return this.itemCard(product)
    }
  }

  render() {
    const { type } = this.props
    return (
      <div className={`card ${ type }`}>
        {this.cardType(this.props)}
      </div>
    )
  } 
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  product: PropTypes.object,
}
