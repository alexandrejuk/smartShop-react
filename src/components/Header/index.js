import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export default class Header extends Component {
  render() { 
    return ( 
      <div className="wrapper">
        <div className="navBar">
          <div className="logo">
            <strong className="linkNav"><Link className="linkNav" to='/'>SmartSHOP</Link></strong>
          </div>
          <ul className="menu">
            <li className="menuItem"><Link className="linkNav" to='/products'>Briquedos</Link></li>
            <li className="menuItem"><a className="linkNav">Esportes</a></li>
            <li className="menuItem"><a className="linkNav">Livros</a></li>
            <li className="menuItem"><a className="linkNav">Ofertas</a></li>
          </ul>
          <div className="avatar">
            <img className="avatarPicture" src="http://fortunetech.com.bd/wp-content/uploads/2018/02/testmonial-default.png" alt="avatar" />
            <h4 className="login">Entrar</h4>
          </div>
        </div>
      </div>
     )
  }
}
