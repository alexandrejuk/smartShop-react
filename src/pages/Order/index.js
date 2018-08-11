import React, { Component, Fragment } from 'react'
import './index.css'
import axios from 'axios';

import ParsePrice from '../../utils/price'

import Button from '../../components/Button'
import Input from '../../components/Input'

export default class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      amount: 0,
      card_number: null,
      card_cvv: null,
      card_expiration_date: null,
      card_holder_name: null,
      customer: {
        external_id:  null,
        name:  null,
        type: 'individual',
        country: 'br',
        email:  null,
        documents: [
          {
            type: 'cpf',
            number:  null,
          }
        ],
        phone_numbers: [],
        birthday:  null,
      },
      billing: {
        name:  null,
        address: {
          country: 'br',
          state:  null,
          city:  null,
          neighborhood: null,
          street:  null,
          street_number:  null,
          zipcode:  null,
        }
      },
      shipping: {
        name:  null,
        fee:  null,
        delivery_date:  null,
        expedited:  null,
        address: {
          country:  null,
          state:  null,
          city:  null,
          neighborhood:  null,
          street:  null,
          street_number:  null,
          zipcode:  null,
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
  }

  handleChange = ($event) =>  {
    const { id, name, value } = $event.target;
    if (id) {
      return  this.setState({ [id]:{ ...this.state[id], [name]: value } })
    }
   this.setState({ [name]: value })
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
      case 'billing':
        return this.setState(
          {
            dropDown: {
              ...dropDown, 
              [value]: !dropDown[value],
              shipping: !dropDown.shipping,
            }
          }
        )
      case 'shipping':
        return this.setState(
          {
            dropDown: {
              ...dropDown, 
              [value]: !dropDown[value],
              payment: !dropDown.payment, 
            }
          }
        )
      default:
        break;
    }
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
          />
          <Input
            id='customer'
            name='email' 
            className='inputSize-4' 
            label='Email' 
            type='email' 
            onBlur={this.handleChange}
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
            onBlur={this.handleChange}
          />
          <Input
            id='billing'
            name='street' 
            className='inputSize-3' 
            label='Rua' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input 
            id='billing'
            name='street_number' 
            className='inputSize-1' 
            label='Número' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input
            id='billing'
            name='neighborhood' 
            className='inputSize-2' 
            label='Bairro' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input
            id='billing'
            name='city' 
            className='inputSize-2' 
            label='Cidade' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input 
            id='billing'
            name='state' 
            className='inputSize-2' 
            label='Estado' 
            type='text' 
            onBlur={this.handleChange}
          />
         <Button value='billing' onClick={this.handleClickDropDown}>Continuar</Button>
        </Fragment>
      )
    }
    return;
  }

  renderShippingForm = () => {
    if (this.state.dropDown.shipping) {
      return (
        <Fragment>
           <Input ParsePrice
            id='shipping'
            name='zipcode' 
            className='inputSize-2' 
            label='Cep' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input
            id='shipping'
            name='street' 
            className='inputSize-3' 
            label='Rua' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input 
            id='shipping'
            name='street_number' 
            className='inputSize-1' 
            label='Número' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input
            id='shipping'
            name='neighborhood' 
            className='inputSize-2' 
            label='Bairro' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input
            id='shipping'
            name='city' 
            className='inputSize-2' 
            label='Cidade' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input 
            id='shipping'
            name='state' 
            className='inputSize-2' 
            label='Estado' 
            type='text' 
            onBlur={this.handleChange}
          />
         <Button value='shipping' onClick={this.handleClickDropDown}>Continuar</Button>
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
            onBlur={this.handleChange}
          />
          <Input 
            name='card_holder_name' 
            className='inputSize-2' 
            label='Titular' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input
            name='card_cvv' 
            className='inputSize-2' 
            label='CVV' 
            type='text' 
            onBlur={this.handleChange}
          />
          <Input
            name='card_expiration_date' 
            className='inputSize-2' 
            label='Válidade' 
            type='text' 
            onBlur={this.handleChange}
          />
         <Button value='payment' onClick={this.handleClickDropDown}>Finalizar Comprar</Button>
        </Fragment>
      )
    }
    return;
  }

  render() {
    const { product } = this.state
    const imagePath = product.imagePath ? product.imagePath : 'default.png'
    const price = product.price ? ParsePrice(product.price) : '0,00'

    return <main className="main-container">
        <div className="header-main-order">
          <h1>
            Finalizar Pedido {this.state.customer.name}
            {this.state.customer.email}
          </h1>
        </div>
        <div className="body-main-order">
          <div className="body-content-order">
            <div className="dropDown">
              <div className="dropDown-header">
                <h2 className="dropDown-text">Dados Pessoais</h2>
              </div>
              <div className="dropDown-body">
                {this.renderCustomerForm()}
              </div>
            </div>

            <div className="dropDown">
              <div className="dropDown-header">
                <h2 className="dropDown-text">Endereço de Conbrança</h2>
              </div>
              <div className="dropDown-body">
                {this.renderBillingForm()}
              </div>
            </div>

            <div className="dropDown">
              <div className="dropDown-header">
                <h2 className="dropDown-text">Endereço de Entrega</h2>
              </div>
              <div className="dropDown-body">
                {this.renderShippingForm()}
              </div>
            </div>
            <div className="dropDown">
              <div className="dropDown-header">
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
                   <p><strong>Vendedor </strong> { product.saleman}</p>
                   <p><strong>Estado </strong> { product.situation}</p>
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

  componentDidMount() {
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

}