import React from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import Header from './components/Header'

// pages
import Home from './pages/Home'
import Order from './pages/Order'

const App = props => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/order/product/:id" component={Order} />
    </Switch>
  </div>
)

export default App
