import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Header extends Component {
  render() { 
    return ( 
      <div class="wrapper">
        <div class="navBar">
          <div class="logo">
            <strong> <a class="linkNav">SmartSHOP</a></strong>
          </div>
          <ul class="menu">
            <li class="menuItem"><a class="linkNav">Briquedos</a></li>
            <li class="menuItem"><a class="linkNav">Esportes</a></li>
            <li class="menuItem"><a class="linkNav">Livros</a></li>
            <li class="menuItem"><a class="linkNav">Ofertas</a></li>
          </ul>
          <div class="avatar">
            <img class="avatarPicture" src="http://fortunetech.com.bd/wp-content/uploads/2018/02/testmonial-default.png" alt="avatar" />
            <h4 class="login">Entrar</h4>
          </div>
        </div>
      </div>
     )
  }
}

Header.propTypes = {
}