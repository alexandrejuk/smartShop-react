import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const Header = () => (
  <div className="wrapper">
    <div className="navBar">
      <div className="logo">
        <strong><Link className="linkNav" to='/'>SmartSHOP</Link></strong>
      </div>
    </div>
  </div>
)

export default Header
