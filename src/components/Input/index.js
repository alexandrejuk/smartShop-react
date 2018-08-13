import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask';

import './index.css'

export default class Input extends Component {

  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  handleBlur = $event => this.props.onBlur($event)
  handleChange = $event => this.props.onChange($event)

  renderMessageError = (inputValidation, label) => {
    if(!inputValidation) return;
    return ( 
      <span className="messageError">
        <small>{label} é obrigatório!</small>
      </span>
    )
  }

  render() { 
    const { 
      name,
      className,
      label,
      type,
      mask,
      placeholder,
      id,
      value,
      validation,
    } = this.props
    return ( 
      <div className="inputWrapper">
        <label className="label">{label}</label>
        <InputMask 
          id={id}
          mask={mask}
          className={`input-group ${ className }`} 
          name={name} 
          type={type} 
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          />
          <div className="validation">
           {this.renderMessageError(validation, label)}
          </div>
      </div>
     )
  }
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  mask: PropTypes.string,
  validation: PropTypes.bool,
  type: PropTypes.oneOf([
    'text',
    'email',
  ]),
}
