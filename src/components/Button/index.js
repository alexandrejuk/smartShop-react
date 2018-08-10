import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Button extends Component {
  render() { 
    const { text } = this.props;
    return (<button className="button">{ text }</button>)
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
}