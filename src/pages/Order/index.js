import React, { Component, Fragment } from 'react'
import './index.css'
import  { Redirect } from 'react-router-dom'
import RemoveMask from '../../utils/replaceMask'
import { isEmpty }  from 'ramda'
import loadingImage from '../../assets/img/icons/simplespin.gif'
// services
import fetchCardHash from '../../services/cardHash'
import { fetchProduct } from '../../services/product'
import postTransaction from '../../services/transaction'

import TransactionSpec from '../../utils/transactionSpec'

import { formBilling, formCustomer, formPayment } from '../../utils/form-control'
import ParsePrice from '../../utils/price'
import split_rules from '../../utils/split_rule' 

import Button from '../../components/Button'
import Input from '../../components/Input'

export default class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      amount: 0,
      card_hash: false,
      card_number: '',
      card_cvv: '',
      card_expiration_date: '',
      card_holder_name: '',
      customer: {
        external_id: '#1212345679',
        name: '',
        type: 'individual',
        country: 'br',
        email: '',
        documents: [{ type: 'cpf', number: '96065790184'}],
        phone_numbers: ['+5511987654321'],
        birthday: '1994-05-05',
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
      split_rules,
      dropDown: {
        customer: true,
        billing: false,
        payment: false,
      },
      formValidation: {
        name: false,
        email: false,
        state: false,
        city: false,
        neighborhood: false,
        street: false,
        street_number: false,
        zipcode: false,
        card_number: false,
        card_cvv: false,
        card_expiration_date: false,
        card_holder_name: false,
      },
      redirectPage: {
        redirect: false, 
        transaction_id: null,
      },
      loading: false,
      error: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClickDropDown = this.handleClickDropDown.bind(this)
    this.handleClickDropDownHeader = this.handleClickDropDownHeader.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }

  componentDidMount() {
    fetchProduct(this.props.match.params.id)
      .then(product => this.setState({ product }))
  }

  handleSave() {
    const card_credit = {
      card_number: this.state.card_number,
      card_holder_name:  this.state.card_holder_name,
      card_expiration_date:  this.state.card_expiration_date,
      card_cvv:  this.state.card_cvv,
    }
    return fetchCardHash(card_credit)
      .then(card_hash => {
        this.setState({ card_hash })
        this.sendNewTransaction()
      })
  }

  sendNewTransaction() {
    this.setState({ loading: true })
    const formattedTransaction = {
      ...this.state,
      amount: this.state.product.price,
      items: [
        {
          id: this.state.product.id,
          quantity: this.state.product.quantity,
          title: this.state.product.description,
          unit_price: this.state.product.price,
          tangible: true
        }
      ]
    } 
    return postTransaction(TransactionSpec(formattedTransaction))
      .then(transation => {
        this.setState({ redirectPage: { redirect: true, transaction_id: transation.id }})
      })
      .catch(err => this.setState({ error: true }))
    
  }

  renderRedirect = () => {
    const { redirect, transaction_id } = this.state.redirectPage
    if(redirect) {
      return <Redirect to={`/payables/${transaction_id}`} />
    }
    if(this.state.error) {
      return <Redirect to={`/error-transaction`} />
    }
  }

  setStateCustomer = ({ id, name, value }) => {
    return this.setState({ [id]: { ...this.state[id], [name]: value } })
  }

  setStateBilling = ({ id, name, value }) => {
    return this.setState({ 
      [id]: { 
        ...this.state[id], 
        name: this.state.customer.name,
        address: { ...this.state[id].address, [name]: value } 
      } 
    }) 
  }

  handleChange = ($event) =>  {
    const { id, name, value } = $event.target;
    switch (id) {
      case 'customer':
        return this.setStateCustomer($event.target)
      case 'billing':
        return this.setStateBilling($event.target)
      default:
        return this.setState({ [name]: value })
    }
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

  isEmpty = ({ name, value }) => {
    switch (name) {
      case 'zipcode':
        return RemoveMask(value).length >= 8
      case 'card_number':
        return RemoveMask(value).length >= 16
      case 'card_cvv':
        return RemoveMask(value).length >= 3
      case 'card_expiration_date':
        return RemoveMask(value).length >= 4
      default:
        return value.length >= 2
    }
  }

  isEmptyToSendTransaction = () => {
    let disabled = false;
    const formCheck = {
      name: this.state.customer.name,
      email: this.state.customer.email,
      state: this.state.billing.address.state,
      city: this.state.billing.address.city,
      neighborhood: this.state.billing.address.neighborhood,
      street: this.state.billing.address.street,
      street_number: this.state.billing.address.street_number,
      zipcode: this.state.billing.address.zipcode,
      card_number: this.state.card_number,
      card_holder_name: this.state.card_holder_name,
      card_cvv: this.state.card_cvv,
      card_expiration_date: this.state.card_expiration_date,
    }
    for(let key in formCheck) {
      if(isEmpty(formCheck[key])) {
        return disabled = true
      }
    }
    return disabled
  }

  setStateValidation = (name, value) => (
    this.setState({ 
      formValidation: { ...this.state.formValidation, [name]: value } 
    })
  )

  handleValidation($event) {
    const { name } = $event.target
    if(this.isEmpty($event.target)) {
      return this.setStateValidation(name, false)
    }
    return this.setStateValidation(name, true)
  }

  renderButtonSubmit = () => {
    for(let key in this.state.formValidation) {
      if(!this.state.formValidation[key]) {
        return false
      }
      return true
    }
  }

  renderCustomerForm = () => {
    if (this.state.dropDown.customer) {
      return (
        <Fragment>
          {formCustomer.map(customer => (
            <Input 
              key={customer.id}
              id={customer.name} 
              name={customer.input_name}
              className={customer.className}
              label={customer.label}
              type={customer.type}
              value={this.state.customer[customer.input_name]}
              onChange={this.handleChange}
              onBlur={this.handleValidation}
              validation={this.state.formValidation[customer.input_name]}
            />
            )
          )}
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
          {formBilling.map(billing => (
            billing.input_name === 'zipcode' ?
            <Input 
              key={billing.id}
              id={billing.name} 
              name={billing.input_name}
              className={billing.className}
              label={billing.label}
              type={billing.type}
              mask={billing.mask}
              value={this.state.billing.address[billing.input_name]}
              onChange={this.handleChange}
              onBlur={this.handleValidation}
              validation={this.state.formValidation[billing.input_name]}
            />
            :
            <Input 
              key={billing.id}
              id={billing.name} 
              name={billing.input_name}
              className={billing.className}
              label={billing.label}
              type={billing.type}
              value={this.state.billing.address[billing.input_name]}
              onChange={this.handleChange}
              onBlur={this.handleValidation}
              validation={this.state.formValidation[billing.input_name]}
            />
          )
          )}
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
          {formPayment.map(payment => (
              payment.input_name === 'card_holder_name' ?
              <Input 
              key={payment.id}
              id={payment.name} 
              name={payment.input_name}
              className={payment.className}
              label={payment.label}
              type={payment.type}
              placeholder={payment.placeholder}
              value={this.state[payment.input_name]}
              onChange={this.handleChange}
              onBlur={this.handleValidation}
              validation={this.state.formValidation[payment.input_name]}
            /> :
            <Input 
              key={payment.id}
              id={payment.name} 
              name={payment.input_name}
              className={payment.className}
              label={payment.label}
              type={payment.type}
              placeholder={payment.placeholder}
              value={this.state[payment.input_name]}
              mask={payment.mask}
              onChange={this.handleChange}
              onBlur={this.handleValidation}
              validation={this.state.formValidation[payment.input_name]}
            />
            )
          )}          
          <Button value='payment' disabled={this.isEmptyToSendTransaction()} onClick={this.handleSave}>Finalizar Comprar</Button>
        </Fragment>
      )
    }
    return;
  }

  render() {
    const { product, loading } = this.state
    const imagePath = product.imagePath ? product.imagePath : 'default.png'
    const price = product.price ? ParsePrice(product.price) : '0,00'

    return (<main className="main-container">
        <div className="header-main-order">
          <h1>Finalizar Compra</h1>
        </div>
        { 
          loading 
          ?           
            <div className="body-content-load"> 
              <img src={loadingImage} alt="loading"/>
              <h3>Processando transação...</h3>
            </div>
          :
            <div className="body-main-order">
            <div className="body-content-order">

              <div className="dropDown">
                <div className="dropDown-header" onClick={() => this.handleClickDropDownHeader('customer')}>
                  <h2 className="dropDown-text">Dados Pessoais </h2>
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
                    <p><strong>Descrição </strong> {product.information}</p>
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
        }
        { this.renderRedirect() }
      </main>)
  }
}