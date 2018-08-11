import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Input extends Component {
  render() { 
    const { name, sizeInput, text, type } = this.props
    return ( 
      <div className="inputWrapper">
        <label className="label">{text}</label>
        <input className={`input-group ${ sizeInput }`} name={name} type={type} />
      </div>
     )
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,  
  sizeInput: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}