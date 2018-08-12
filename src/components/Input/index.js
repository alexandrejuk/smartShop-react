import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask';

import './index.css'

export default class Input extends Component {

  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleBlur = $event => this.props.onChange($event)

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
      findzipcode
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
          onChange={this.handleBlur}
          onBlur={findzipcode}
          />
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
  mask: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'email',
  ]),
}
