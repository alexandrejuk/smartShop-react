import React, { Component } from 'react'

import Header from './components/Header'
import Main from './containers/Main'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

