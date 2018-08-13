import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Button extends Component{

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = $event => {
    const { onClick, value } = this.props
    return onClick(value)
  }

  render () {
    const { children, disabled } = this.props
    return (<button className="button" disabled={disabled} onClick={this.handleClick}> { children } </button>)
  }
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}
