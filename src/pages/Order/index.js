import React, { Component, Fragment } from 'react'
import './index.css'
import axios from 'axios'
import pagarme from 'pagarme'

import ParsePrice from '../../utils/price'
import split_rules from '../../utils/split_rule' 
import fetch from 'node-fetch';

import Button from '../../components/Button'
import Input from '../../components/Input'

export default class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      amount: 0,
      card_hash: null,
      card_number: '',
      card_cvv: '',
      card_expiration_date: '',
      card_holder_name: '',
      customer: {
        external_id: '',
        name: '',
        type: 'individual',
        country: 'br',
        email: '',
        documents: [
          {
            type: 'cpf',
            number: '',
          }
        ],
        phone_numbers: [],
        birthday: '',
      },
      billing: {
        name: '',
        address: {
          country: 'br',
          state: '',
          city: '',
          neighborhood: '',
          street: '',
          street_number: '',
          zipcode: '',
        }
      },
      items: [],
      dropDown: {
        customer: true,
        billing: false,
        shipping: false,
        payment: false,
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClickDropDown = this.handleClickDropDown.bind(this)
    this.handleClickDropDownHeader = this.handleClickDropDownHeader.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    return this.fetchProduct()
  }

  fetchProduct() {
    const { match: { params: { id } } } = this.props;
    return axios.get(`http://localhost:3002/products/${id}`)
      .then(response => response.data)
      .then(product =>
        this.setState({ 
          product, 
          amount: product.price, 
          items: [
            {
              id: product.id,
              title: product.description,
              unit_price: product.price,
              quantity: product.quantity,
              tangible: true
            }
          ]
        }))
  }

  fetchCardHash(card_credit) {
    pagarme.client.connect({ encryption_key: 'ek_test_8Tevcd9yfp9BORb0l5WhVdnK3OTCOL' })
    .then(client => client.security.encrypt(card_credit))
    .then(card_hash => {
      this.setState({ card_hash })
      if(card_hash) {
        return this.sendNewTransaction()
      }
    })
  }


  fetchZipcode() {
   const url = `https://viacep.com.br/ws/09784385/json`;
    fetch(url)
      .then(res => res.text())
      .then(body => console.log(body));
  }

  replaceZipconde = zipcode => zipcode.replace(/\D/g, '')

  handleChange = ($event) =>  {
    const { id, name, value } = $event.target;
    if (!id) {
      return this.setState({ [name]: value })
    }

    if (id === 'customer') {
      return this.setState({ [id]: { ...this.state[id], [name]: value }})
    }

    return  this.setState({
      [id]: { 
        ...this.state[id],
        name: this.state.customer.name, 
        address: {
          ...this.state[id].address, 
          [name]: value 
        }
      }
    })
  }

  handleClickDropDown(value) {
    const { dropDown } = this.state
    switch (value) {
      case 'customer':
        return this.setState(
          {
            dropDown: {
              ...dropDown, 
              [value]: !dropDown[value],
              billing: !dropDown.billing,
            }
          }
        )
      default:
        return this.setState(
          {
            dropDown: {
              ...dropDown, 
              [value]: !dropDown[value],
              payment: !dropDown.payment, 
            }
          }
        )
    }
  }

  handleClickDropDownHeader(value) {
    const { dropDown } = this.state
    const dropDownObject = {
      customer: false,
      billing: false,
      shipping: false,
      payment: false,
    }
    return this.setState(
      {
        dropDown: {
          ...dropDownObject, 
          [value]: !dropDown[value],
        }
      }
    )
  }


  renderCustomerForm = () => {
    if (this.state.dropDown.customer) {
      return (
        <Fragment>
          <Input
            id='customer'
            name='name'
            className='inputSize-4' 
            label='Nome Completo' 
            type='text' 
            onBlur={this.handleChange}
            value={this.state.customer.name}
          />
          <Input
            id='customer'
            name='email' 
            className='inputSize-4' 
            label='Email' 
            type='text' 
            onBlur={this.handleChange}
            value={this.state.customer.email}
          />
          <Button value='customer' onClick={this.handleClickDropDown}>Continuar</Button>
        </Fragment>
      )
    }
    return;
  }

  renderBillingForm = () => {
    if (this.state.dropDown.billing) {
      return (
        <Fragment>
          <Input 
            id='billing'
            name='zipcode' 
            className='inputSize-2' 
            label='Cep' 
            type='text' 
            value={this.state.billing.address.zipcode}
            onBlur={this.handleChange}
          />
          <Input
            id='billing'
            name='street' 
            className='inputSize-3' 
            label='Rua' 
            type='text' 
            value={this.state.billing.address.street}
            onBlur={this.handleChange}
          />
          <Input 
            id='billing'
            name='street_number' 
            className='inputSize-1' 
            label='Número' 
            type='text' 
            value={this.state.billing.address.street_number}
            onBlur={this.handleChange}
          />
          <Input
            id='billing'
            name='neighborhood' 
            className='inputSize-2' 
            label='Bairro' 
            type='text' 
            value={this.state.billing.address.neighborhood}
            onBlur={this.handleChange}
          />
          <Input
            id='billing'
            name='city' 
            className='inputSize-2' 
            label='Cidade' 
            type='text' 
            value={this.state.billing.address.city}
            onBlur={this.handleChange}
          />
          <Input 
            id='billing'
            name='state' 
            className='inputSize-2' 
            label='Estado' 
            type='text' 
            value={this.state.billing.address.state}
            onBlur={this.handleChange}
          />
         <Button value='billing' onClick={this.handleClickDropDown}>Continuar</Button>
        </Fragment>
      )
    }
    return;
  }
  
  renderPaymentForm = () => {
    if (this.state.dropDown.payment) {
      return (
        <Fragment>
          <Input
            name='card_number' 
            className='inputSize-2' 
            label='Número Cartão' 
            type='text' 
            value={this.state.card_number} 
            onBlur={this.handleChange}
          />
          <Input 
            name='card_holder_name' 
            className='inputSize-2' 
            label='Titular' 
            type='text'
            value={this.state.card_holder_name}  
            onBlur={this.handleChange}
          />
          <Input
            name='card_cvv' 
            className='inputSize-2' 
            label='CVV' 
            type='text'
            value={this.state.card_cvv}
            onBlur={this.handleChange}
          />
          <Input
            name='card_expiration_date' 
            className='inputSize-2' 
            label='Válidade' 
            type='text'
            value={this.state.card_expiration_date}
            onBlur={this.handleChange}
          />
         <Button value='payment' onClick={this.handleSave}>Finalizar Comprar</Button>
        </Fragment>
      )
    }
    return;
  }

  handleSave() {
    const card_credit = {
      card_number: this.state.card_number,
      card_holder_name:  this.state.card_holder_name,
      card_expiration_date:  this.state.card_expiration_date,
      card_cvv:  this.state.card_cvv,
    }
    this.fetchCardHash(card_credit)

  }

  sendNewTransaction() {
    const transaction = {
      amount: this.state.amount,
      card_hash: this.state.card_hash,
      customer: {
        external_id: '#2525',
        name: this.state.customer.name,
        type: 'individual',
        country: 'br',
        email: this.state.customer.email,
        documents: [
          {
            type: 'cpf',
            number: '11111111111',
          }
        ],
        phone_numbers: [
          '+5511999998888',
          '+5511888889999'
      ],
      birthday: '1965-01-01'
      },
      billing: this.state.billing,
      items: this.state.items,
      split_rules,
    }
    const url = 'https://api.pagar.me/1/transactions?api_key=ak_test_jwnUVcRJ0V4k3Py6K1qniuxOFNZqvl'
    return axios.post(url, transaction).then(res => console.log(res))
  }

  render() {
    const { product } = this.state
    const imagePath = product.imagePath ? product.imagePath : 'default.png'
    const price = product.price ? ParsePrice(product.price) : '0,00'

    return <main className="main-container">
        <div className="header-main-order">
          <h1>Finalizar Compra</h1>
        </div>
        <div className="body-main-order">
          <div className="body-content-order">

            <div className="dropDown">
              <div className="dropDown-header" onClick={() => this.handleClickDropDownHeader('customer')}>
                <h2 className="dropDown-text">Dados Pessoais</h2>
              </div>
              <div className="dropDown-body">
                {this.renderCustomerForm()}
              </div>
            </div>

            <div className="dropDown">
              <div className="dropDown-header" onClick={() => this.handleClickDropDownHeader('billing')}>
                <h2 className="dropDown-text">Endereço</h2>
              </div>
              <div className="dropDown-body">
                {this.renderBillingForm()}
              </div>
            </div>

            <div className="dropDown">
              <div className="dropDown-header" onClick={() => this.handleClickDropDownHeader('payment')}>
                <h2 className="dropDown-text">Pagamento</h2>
              </div>
              <div className="dropDown-body">
                {this.renderPaymentForm()}
              </div>
            </div>
          </div>

          <div className="body-content-order">
            <div className="dropDown">
              <div className="dropDown-header">
                <h2 className="dropDown-text">Item da Compra</h2>
              </div>
              <div className="dropDown-body">
                <div className="product-header">
                  <img className="product" src={require(`../../assets/img/products/${imagePath}`)} alt="item-product" />
                 <div className="product-description">
                   <h2><strong>{ product.description }</strong></h2>
                   <h3>R$ { price }</h3>
                   <p><strong>Vendedor </strong> {product.salesman}</p>
                   <p><strong>Estado </strong> {product.situation}</p>
                 </div>
                </div>
                <div className="product-body">
                  <h1>Total</h1>
                  <h1>R$ { price }</h1>
                </div>
              </div>
            </div>
          </div> 

        </div>
      </main>;
  }
}