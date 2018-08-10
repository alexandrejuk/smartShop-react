import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './index.css'

//Pages
import Home from '../../pages/Home'
import Products from '../../pages/Products'

const Main = () => (
  <div className="container">
    <main className="main">
      <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/products' component={Products}/>
      </Switch>
    </main>
  </div>
)

export default Main