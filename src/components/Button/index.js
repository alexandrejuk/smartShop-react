import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

const Button = () => {
  const { text } = this.props;
  return (
    <button className="button">{ text }</button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Button