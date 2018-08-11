import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Input extends Component {

  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleBlur = $event => {
    this.props.onBlur($event)
  }

  render() { 
    const { 
      name,
      className,
      label,
      type,
      id,
    } = this.props
    return ( 
      <div className="inputWrapper">
        <label className="label">{label}</label>
        <input 
          id="cliente"
          className={`input-group ${ className }`} 
          name={name} 
          type={type} 
          id={id}
          onBlur={this.handleBlur}
        />
      </div>
     )
  }
}

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    'text',
    'email',
    'phone',
  ]),
}
