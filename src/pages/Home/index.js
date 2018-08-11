import React, { Component } from 'react'
import './index.css'
import axios from 'axios';

import ad35Off from '../../assets/img/ad/ad-off-35.png'
import Card from '../../components/Card'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    }
    this.fetchProducts();
  }

  fetchProducts() {
    return axios.get(`http://localhost:3002/products`)
      .then(response => response.data)
      .then(products => this.setState({ products, loading: false }))
  }

  render() {
    const { products } = this.state
    return (
      <main className="main-container">
        <div className="header-main">
          <div className="header-image">
            <img src={ad35Off} alt="ad-promotions"/>
          </div>
        </div>
        <div className="information">
          <Card type="information"/>
        </div>
        <div className="body-main">
          {
            products.map(
              product => <Card key={product.id} type="item" product={product}/>
            )
          }
        </div>
      </main>
    )
  }
}
