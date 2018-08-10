import React from 'react'
import { Switch, Route } from 'react-router-dom'

//Pages
import Home from '../../pages/Home'
import Products from '../../pages/Products'

const Main = () => (
  <main>
    <Switch>
     <Route exact path='/' component={Home}/>
     <Route path='/products' component={Products}/>
    </Switch>
  </main>
)

export default Main